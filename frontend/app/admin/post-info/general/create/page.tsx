"use client";
import Breadcrumbs from "@/components/admin/breadcrumb";
import Link from 'next/link';
import { Button, Input, Chip, Textarea, Radio, RadioGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React from 'react';
import { CreateNewsDto, newsCategory } from '@/interfaces/news';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { on } from "events";


const categoryOptions = [
  {name: "Mẹo", uid: "Tips"},
  {name: "Thông báo", uid: "Announcements"},
  {name: "Cập nhật", uid: "Updates"},
];


export default function Page() {
    const router = useRouter(); 
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();

    const [titleValue, setTitleValue] = React.useState("");
    const [contentValue, setContentValue] = React.useState(""); 
    const [coverImageValue, setCoverImageValue] = React.useState("");
    const [categoryValue, setCategoryValue] = React.useState<newsCategory>(newsCategory.ANNOUNCEMENTS);

    // Email validation regex
    const validateURL = (url: string) => url.match(/^(https?:\/\/[^\s$.?#].[^\s]*)$/i);

    const isLinkInvalid = React.useMemo(() => {
        return coverImageValue && !validateURL(coverImageValue) ? true : false;
    }, [coverImageValue]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 

        if (!titleValue || !contentValue || (coverImageValue && !validateURL(coverImageValue))) {
            onErrorOpen();
            return; 
        }

        const data: CreateNewsDto = {
            title: titleValue,
            content: contentValue,
            coverImage: coverImageValue ? coverImageValue : "/images/sky.jpg",
            isPublished: false,
            category: categoryValue,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        // Call API to create news
        try {
            const res = await axios.post("http://localhost:5000/news", data);
            onOpen();
            console.log(data);
        } catch (error) {
            console.error(error);
            onErrorOpen();
        }
    };

    const handleCloseModal = () => {
      onClose();
      
      router.push("/admin/post-info/general");
    };

    const handleCloseErrorModal = () => {
      onErrorClose();
    };

    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
                { label: 'Thông tin', href: '/admin/post-info/general' },
                { label: 'Thêm thông tin chung', href: `/admin/post-info/general/create`, active: true},
            ]}
        />
        <div className="flex w-full items-center justify-between">
        <form className="w-full mb-5 max-h-[50vh] md:max-h-[90vh] overflow-y-auto" onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-5">
                <div>
                    <Input 
                        labelPlacement={"outside"}
                        placeholder="Tiêu đề"
                        size="lg" 
                        radius="sm"
                        type="text" 
                        label="Tiêu đề" 
                        variant="bordered" 
                        className="py-3 font-semibold"
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}
                    />
                </div>

                <div>
                    <Textarea 
                        labelPlacement={"outside"}
                        placeholder="Nội dung"
                        size="lg" 
                        radius="sm"
                        type="text" 
                        label="Nội dung" 
                        variant="bordered" 
                        className="py-3 font-semibold"
                        value={contentValue}
                        onChange={(e) => setContentValue(e.target.value)}
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
                    <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                    <div className="mt-2">
                        <Chip
                            color="warning"
                            variant="flat"
                            className="capitalize"
                        >
                            Chưa công bố
                        </Chip>
                    </div>
                </div>

                <div className="pb-3">
                    <label className="block text-sm font-semibold my-2">
                        Danh mục
                    </label>
                    <RadioGroup 
                        orientation="horizontal"
                        value={categoryValue}
                        onValueChange={(value) => setCategoryValue(value as newsCategory)}
                    >
                        {categoryOptions.map((option) => (
                            <Radio key={option.uid} value={option.uid}>
                                {option.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>

            </div>
            <div className="mt-6 flex justify-end gap-4 pb-5">
                <Link
                    href="/admin/post-info/general"
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
                <p>Tạo thông tin thành công!</p>
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
                        <p>Vui lòng kiểm tra lại thông tin. Đã có lỗi xảy ra khi tạo thông tin</p>
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