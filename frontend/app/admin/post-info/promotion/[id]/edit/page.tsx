"use client";
import Breadcrumbs from "@/components/admin/breadcrumb";
import Link from 'next/link';
import { Button, Input, DateRangePicker, Chip, Radio, RadioGroup, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { UpdatePromotionDto, discountType, Promotion } from "@/interfaces/promotion";
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { getLocalTimeZone, now, CalendarDateTime, parseZonedDateTime, toCalendarDateTime } from "@internationalized/date";
import { on } from "events";

const discountTypeOptions = [
    {name: "Phần trăm", uid: "Percentage"},
    {name: "Cố định", uid: "FixedAmount"},
  ];

export default function Page(props: { params: { id: string } }) {
    const [params, setParams] = useState<{ id: string } | null>(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
    const { isOpen: isDeletedOpen, onOpen: onDeletedOpen, onClose: onDeletedClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    const [codeValue, setCodeValue] = React.useState("");
    const [descriptionValue, setDescriptionValue] = React.useState(""); 
    const [discountTypeValue, setDiscountTypeValue] = React.useState<discountType>(discountType.PERCENT);
    const [discountValue, setDiscountValue] = React.useState(0);
    const [isActiveValue, setIsActiveValue] = React.useState(false);
    const [coverImageValue, setCoverImageValue] = React.useState("");
    const [initialData, setInitialData] = useState<Promotion | null>(null);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    const [dateRange, setDateRange] = React.useState({
      start: new CalendarDateTime(currentYear, currentMonth, currentDay, 0, 0, 0),
      end: new CalendarDateTime(currentYear, currentMonth, currentDay, 0, 0, 0)
    });

    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        setParams(props.params);
    }, [props.params]);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;  
            const res = await axios.get(`http://localhost:5000/promotion/${id}`);
            const data = res.data;
            setInitialData(data);
            setCodeValue(data.code);
            setDescriptionValue(data.description);
            setDiscountTypeValue(data.discountType);
            setDiscountValue(data.discount);
            setIsActiveValue(data.isActive);
            setCoverImageValue(data.coverImage && data.coverImage !== "/images/sky.jpg" ? data.coverImage : "");

            const startZonedDateTime = parseZonedDateTime(data.startDate.slice(0, 19) + "[UTC]");
            const endZonedDateTime = parseZonedDateTime(data.endDate.slice(0, 19) + "[UTC]");
            setDateRange({
                start: toCalendarDateTime(startZonedDateTime), 
                end: toCalendarDateTime(endZonedDateTime),
            });
        };

        fetchData();
    }, [id]);

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

    const validateURL = (url: string) => url.match(/^(https?:\/\/[^\s$.?#].[^\s]*)$/i);

    const isLinkInvalid = React.useMemo(() => {
        return coverImageValue && !validateURL(coverImageValue) ? true : false;
    }, [coverImageValue]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 

        if (!codeValue || !descriptionValue || !discountValue || !dateRange.start || !dateRange.end || (coverImageValue && !validateURL(coverImageValue))) {
            onErrorOpen();
            return;
        }

        if (!initialData) {
            onErrorOpen();
            return;
        }

        const formData: UpdatePromotionDto = {
            code: codeValue,
            description: descriptionValue,
            discountType: discountTypeValue,
            discount: discountValue,
            startDate: dateRange.start.toDate("UTC").toISOString(),
            endDate: dateRange.end.toDate("UTC").toISOString(),
            isActive: isActiveValue,
            coverImage: coverImageValue ? coverImageValue : "/images/sky.jpg",
        };

        try {
            console.log(formData);
            const res = await axios.patch(`http://localhost:5000/promotion/${id}`, formData);
            onOpen();
        } catch (error) {
            onErrorOpen();
            console.error(error);
        }
    };

    const handleDelete = async () => {
        // const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa thông tin này?"); // Remake UI for confirmation
        // if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/promotion/${id}`);
                onDeletedOpen();
            } catch (error) {
                console.error(error);
                onErrorOpen();
            }
        // }
    };

    const handleCloseModal = () => {
        onClose();
        router.push("/admin/post-info/promotion");
    };

    const handleCloseErrorModal = () => {
        onErrorClose();
    };

    const handleCloseDeletedModal = () => {
        onDeletedClose();
        router.push("/admin/post-info/promotion");
    };


    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
                { label: 'Khuyến mãi', href: '/admin/post-info/promotion' },
                { label: 'Chi tiết', href: `/admin/post-info/promotion/${id}`},
                { label: 'Chỉnh sửa khuyến mãi', href: `/admin/post-info/promotion/${id}/edit`, active: true},
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
                        labelPlacement="outside"
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

                {initialData && initialData.bookings && initialData.bookings.length > 0 && (
                  <div>
                    <label className="block text-md font-semibold py-2">Đặt vé</label>
                    <div className="flex flex-wrap gap-2">
                      {initialData.bookings.map((booking) => (
                        <Link
                          key={booking.id}
                          href={`/admin/booking/${booking.id}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {booking.bookingCode}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

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
                {!isActiveValue && (
                    <Button 
                        type="button" 
                        className="bg-red-400 text-white"
                        onClick={onDeleteOpen}
                    >
                        Xóa Khuyến mãi
                    </Button>
                )}

                <Button type="submit" className="bg-blue-normal text-white">Cập nhật Khuyến mãi</Button>
            </div>
          </form>
        </div>

        <Modal isOpen={isOpen} onClose={handleCloseModal} isDismissable={false} isKeyboardDismissDisabled={true}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Thành công</ModalHeader>
              <ModalBody>
                <p>Chỉnh sửa khuyến mãi thành công!</p>
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
                    <p>Vui lòng kiểm tra lại thông tin. Đã có lỗi xảy ra khi chỉnh sửa khuyến mãi.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="light" onPress={handleCloseErrorModal}>
                        Đóng
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Xác Nhận Xóa</ModalHeader>
                <ModalBody>
                    <p>Bạn có chắc chắn muốn xóa thông tin này?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="default" variant="light" onPress={onDeleteClose}>
                        Hủy
                    </Button>
                    <Button className="bg-red-400 text-white" onPress={handleDelete}>
                        Xóa
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <Modal isOpen={isDeletedOpen} onClose={handleCloseDeletedModal}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Xóa thành công</ModalHeader>
                <ModalBody>
                    <p>Xóa khuyến mãi thành công!</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="light" onPress={handleCloseDeletedModal}>
                        Đóng
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

      </main>
    );
}