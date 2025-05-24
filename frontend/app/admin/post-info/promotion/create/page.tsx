"use client";
import Breadcrumbs from "@/components/admin/breadcrumb";
import Link from 'next/link';
import { Button, Input, DateRangePicker, Textarea, Radio, RadioGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React from 'react';
import { Promotion, discountType, CreatePromotionDto } from "@/interfaces/promotion";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { today } from "@internationalized/date";
import { getLocalTimeZone, now, CalendarDateTime } from "@internationalized/date";

const discountTypeOptions = [
  {name: "Phần trăm", uid: "Percentage"},
  {name: "Cố định", uid: "FixedAmount"},
];

export default function Page() {
    const router = useRouter(); 
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();

    const [codeValue, setCodeValue] = React.useState("");
    const [descriptionValue, setDescriptionValue] = React.useState(""); 
    const [discountTypeValue, setDiscountTypeValue] = React.useState<discountType>(discountType.PERCENT);
    const [discountValue, setDiscountValue] = React.useState(1);
    const [isActiveValue, setIsActiveValue] = React.useState(false);
    const [coverImageValue, setCoverImageValue] = React.useState("");

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    const [dateRange, setDateRange] = React.useState({
      start: new CalendarDateTime(currentYear, currentMonth, currentDay, 0, 0, 0),
      end: new CalendarDateTime(currentYear, currentMonth, currentDay, 0, 0, 0)
    });
    
    React.useEffect(() => {
      // const startZoned = now(getLocalTimeZone());
      // const endZoned = now(getLocalTimeZone()).add({ days: 7 });
      // const start = new CalendarDateTime(startZoned.year, startZoned.month, startZoned.day, startZoned.hour, startZoned.minute, startZoned.second);
      // const end = new CalendarDateTime(endZoned.year, endZoned.month, endZoned.day, endZoned.hour, endZoned.minute, endZoned.second);
      // setDateRange({ start, end });
      const startUTC = now("UTC");
      const endUTC = now("UTC").add({ days: 7 });
      const start = new CalendarDateTime(startUTC.year, startUTC.month, startUTC.day, startUTC.hour, startUTC.minute, startUTC.second);
      const end = new CalendarDateTime(endUTC.year, endUTC.month, endUTC.day, endUTC.hour, endUTC.minute, endUTC.second);
      setDateRange({ start, end });
    }, []);
    
    const validateURL = (url: string) => url.match(/^(https?:\/\/[^\s$.?#].[^\s]*)$/i);

    const isLinkInvalid = React.useMemo(() => {
        return coverImageValue && !validateURL(coverImageValue) ? true : false;
    }, [coverImageValue]);

    const handleDiscountTypeChange = (value: string) => {
      setDiscountTypeValue(value as discountType);
      
      if (value === discountType.FIXED) {
          setDiscountValue(1000);
      } else if (value === discountType.PERCENT) {
          if (discountValue > 100) {
              setDiscountValue(100);
          }
      }
  };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 

        if (!codeValue || !descriptionValue || !discountValue || (coverImageValue && !validateURL(coverImageValue))) {
            onErrorOpen();
            return; 
        }

        const data: CreatePromotionDto = {
            code: codeValue,
            description: descriptionValue,
            startDate: dateRange.start.toDate("UTC").toISOString(),
            endDate: dateRange.end.toDate("UTC").toISOString(),
            discount: discountValue,
            discountType: discountTypeValue,
            isActive: isActiveValue,
            coverImage: coverImageValue ? coverImageValue : "/images/sky.jpg",
        };
        // Call API to create promotion
        try {
            console.log(data);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/promotion`, data);
            onOpen();
        } catch (error) {
            console.error(error);
            onErrorOpen();
        }
    }

    const handleCloseModal = () => {
      onClose();
      
      router.push("/admin/post-info/promotion");
    };

    const handleCloseErrorModal = () => {
      onErrorClose();
    };

    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
                { label: 'Khuyến mại', href: '/admin/post-info/promotion' },
                { label: 'Thêm khuyến mại', href: `/admin/post-info/promotion/create`, active: true},
            ]}
        />
        <div className="flex w-full items-center justify-between">
        <form className="w-full mb-5 max-h-[50vh] md:max-h-[90vh] overflow-y-auto" onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-5">
                <div>
                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Mã khuyến mại"
                        size="lg" 
                        radius="sm"
                        type="text" 
                        label="Mã khuyến mại" 
                        variant="bordered" 
                        className="py-3 font-semibold"
                        value={codeValue}
                        onChange={(e) => setCodeValue(e.target.value.toUpperCase())}
                    />
                </div>

                <div>
                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Mô tả"
                        size="lg" 
                        radius="sm"
                        type="text" 
                        label="Mô tả" 
                        variant="bordered" 
                        className="py-3 font-semibold"
                        value={descriptionValue}
                        onChange={(e) => setDescriptionValue(e.target.value)}
                    />
                </div>

                <DateRangePicker
                  isRequired
                  label="Thời gian áp dụng (theo UTC)"
                  labelPlacement={"outside"}
                  size="lg"
                  radius="sm"
                  variant="bordered"
                  className="py-3 font-semibold"
                  value={dateRange}
                  onChange={setDateRange}
                  disableAnimation
                  granularity="second"
                />

                <div className="pb-3">
                    <label className="block text-sm font-semibold my-2">
                        Loại giảm giá <span className="text-red-400">*</span>
                    </label>
                    <RadioGroup 
                        orientation="horizontal"
                        value={discountTypeValue}
                        onValueChange={(value) => handleDiscountTypeChange(value)}
                    >
                        {discountTypeOptions.map((option) => (
                            <Radio key={option.uid} value={option.uid}>
                                {option.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>

                <div>
                  <Input
                    isRequired
                    labelPlacement={"outside"}
                    placeholder="Giảm giá"
                    size="lg"
                    radius="sm"
                    type="number"
                    label="Giảm giá"
                    variant="bordered"
                    className="py-3 font-semibold"
                    value={discountValue.toString()}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);

                      if (discountTypeValue === discountType.PERCENT) {
                        if (value >= 1 && value <= 100) {
                          setDiscountValue(value);
                        } else if (value < 1) {
                          setDiscountValue(1); 
                        } else if (value > 100) {
                          setDiscountValue(100);
                        }
                      } else if (discountTypeValue === discountType.FIXED) {
                        if (value >= 1000) {
                          setDiscountValue(value);
                        } else if (value < 1000) {
                          setDiscountValue(1000); 
                        }
                      }
                    }}
                  />
                </div>

                <div>
                    <Input 
                        labelPlacement={"outside"}
                        placeholder="Link ảnh nền"
                        size="lg" 
                        radius="sm"
                        type="text" 
                        label="Ảnh nền" 
                        variant="bordered" 
                        className="py-3 font-semibold"
                        value={coverImageValue}
                        onChange={(e) => setCoverImageValue(e.target.value)}
                        isInvalid={isLinkInvalid}
                        color={isLinkInvalid ? "danger" : "default" }
                        errorMessage="Vui lòng nhập đúng định dạng"
                    />
                </div>

                <div className="pb-3">
                  <React.Fragment>
                    {now(getLocalTimeZone()).compare(dateRange.start) < 0 || now(getLocalTimeZone()).compare(dateRange.end) > 0 ? (
                      <div>
                        <label className="block text-sm font-semibold my-2">
                          Trạng thái <span className="text-red-400">*</span>
                        </label>
                        <p className="text-red-400 text-sm pb-2">Thời gian không hợp lệ để kích hoạt khuyến mãi</p>
                        <RadioGroup 
                          orientation="horizontal"
                          value="false"
                          isDisabled
                        >
                          <Radio value="true">Kích hoạt</Radio>
                          <Radio value="false">Không kích hoạt</Radio>
                        </RadioGroup>
                      </div>
                    ) : (
                      <div className="pb-3">
                        <label className="block text-sm font-semibold my-2">
                          Trạng thái <span className="text-red-400">*</span>
                        </label>
                        <RadioGroup 
                          orientation="horizontal"
                          value={isActiveValue.toString()}
                          onValueChange={(value) => setIsActiveValue(value === 'true')}
                        >
                          <Radio value="true">Kích hoạt</Radio>
                          <Radio value="false">Không kích hoạt</Radio>
                        </RadioGroup>
                      </div>
                    )}
                  </React.Fragment>
                </div>
                

            </div>
            <div className="mt-6 flex justify-end gap-4 pb-5">
                <Link
                    href="/admin/post-info/promotion"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Quay lại
                </Link>
                <Button type="submit" className="bg-blue-normal text-white">Tạo Thông tin</Button>
            </div>
          </form>
        </div>

        <Modal isOpen={isOpen} onClose={handleCloseModal} isDismissable={false} isKeyboardDismissDisabled={true}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Thành công</ModalHeader>
              <ModalBody>
                <p>Tạo khuyến mãi thành công!</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={handleCloseModal}>
                  Đóng
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal isOpen={isErrorOpen} onClose={handleCloseErrorModal}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Không thành công</ModalHeader>
                    <ModalBody>
                        <p>Vui lòng kiểm tra lại thông tin. Đã có lỗi xảy ra khi tạo khuyến mãi</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={handleCloseErrorModal}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
      </main>
    );
  }