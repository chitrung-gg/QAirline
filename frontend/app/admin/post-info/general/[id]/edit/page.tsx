"use client";
import Breadcrumbs from "@/components/admin/breadcrumb";
import Link from 'next/link';
import { Button, Input, Textarea, Chip, Radio, RadioGroup, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { UpdateNewsDto, News, newsCategory } from '@/interfaces/news';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { on } from "events";

const categoryOptions = [
  {name: "Mẹo", uid: "Tips"},
  {name: "Thông báo", uid: "Announcements"},
  {name: "Cập nhật", uid: "Updates"},
];

export default function Page(props: { params: { id: string } }) {
    const [params, setParams] = useState<{ id: string } | null>(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
    const { isOpen: isDeletedOpen, onOpen: onDeletedOpen, onClose: onDeletedClose } = useDisclosure();
    const { isOpen: isPublishedOpen, onOpen: onPublishedOpen, onClose: onPublishedClose } = useDisclosure();

    const [titleValue, setTitleValue] = useState("");
    const [contentValue, setContentValue] = useState("");
    const [coverImageValue, setCoverImageValue] = useState<string>("");
    const [categoryValue, setCategoryValue] = useState<newsCategory>(newsCategory.ANNOUNCEMENTS);
    const [initialData, setInitialData] = useState<News | null>(null);

    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        setParams(props.params);
    }, [props.params]);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;  
            const res = await axios.get(`http://localhost:5000/news/${id}`);
            const data = res.data;
            setInitialData(data);
            setTitleValue(data.title);
            setContentValue(data.content);
            setCoverImageValue(data.coverImage && data.coverImage !== "/images/sky.jpg" ? data.coverImage : "");
            setCategoryValue(data.category);
        };

        fetchData();
    }, [id]);

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

        if (!initialData) {
            onErrorOpen();
            return;
        }

        const formData: UpdateNewsDto = {
            title: titleValue,
            content: contentValue,
            coverImage: coverImageValue ? coverImageValue : "/images/sky.jpg",
            isPublished: initialData.isPublished,
            category: categoryValue,
            createdAt: initialData.createdAt,
            updatedAt: new Date().toISOString(),
        };

        try {
            const res = await axios.patch(`http://localhost:5000/news/${id}`, formData);
            onOpen();
            console.log(formData);
        } catch (error) {
            onErrorOpen();
            console.error(error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa thông tin này?"); // Remake UI for confirmation
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/news/${id}`);
                onDeletedOpen();
            } catch (error) {
                console.error(error);
                onErrorOpen();
            }
        }
    };

    const handlePublish = async () => {

        if (!titleValue || !contentValue || (coverImageValue && !validateURL(coverImageValue))) {
            onErrorOpen();
            return; 
        }

        if (!initialData) {
            onErrorOpen();
            return;
        }

        const formData: UpdateNewsDto = {
            title: titleValue,
            content: contentValue,
            coverImage: coverImageValue ? coverImageValue : "/images/sky.jpg",
            isPublished: true,
            category: categoryValue,
            createdAt: initialData.createdAt,
            updatedAt: new Date().toISOString(),
        };

        try {
            const res = await axios.patch(`http://localhost:5000/news/${id}`, formData);
            onPublishedOpen();
            console.log(formData);
        } catch (error) {
            onErrorOpen();
            console.error(error);
        }
    };

    const handleCloseModal = () => {
        onClose();
        router.push("/admin/post-info/general");
    };

    const handleCloseErrorModal = () => {
        onErrorClose();
    };

    const handleCloseDeletedModal = () => {
        onDeletedClose();
        router.push("/admin/post-info/general");
    };

    const handleClosePublishedModal = () => {
        onPublishedClose();
        router.push("/admin/post-info/general");
    };


    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
                { label: 'Thông tin', href: '/admin/post-info/general' },
                { label: 'Chi tiết', href: `/admin/post-info/general/${id}`},
                { label: 'Chỉnh sửa thông tin', href: `/admin/post-info/general/${id}/edit`, active: true},
            ]}
        />
        <div className="flex w-full items-center justify-between">
        <form className="w-full mb-5 max-h-[50vh] md:max-h-[90vh] overflow-y-auto" onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-5">
                <div>
                    <Input 
                        labelPlacement="outside"
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
                        labelPlacement="outside"
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
                <Button 
                    type="button" 
                    className="bg-red-400 text-white"
                    onClick={handleDelete}
                >
                    Xóa Thông Tin
                </Button>
                <Button 
                    type="button" 
                    className="bg-blue-normal text-white"
                    onClick={handlePublish}
                >
                    Công bố
                </Button>
                <Button type="submit" className="bg-blue-normal text-white">Cập nhật Thông tin</Button>
            </div>
          </form>
        </div>

        <Modal isOpen={isOpen} onClose={handleCloseModal} isDismissable={false} isKeyboardDismissDisabled={true}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Thành công</ModalHeader>
              <ModalBody>
                <p>Chỉnh sửa thông tin thành công!</p>
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
                    <p>Vui lòng kiểm tra lại thông tin. Đã có lỗi xảy ra khi chỉnh sửa thông tin.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="light" onPress={handleCloseErrorModal}>
                        Đóng
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <Modal isOpen={isDeletedOpen} onClose={handleCloseDeletedModal}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Xóa thành công</ModalHeader>
                <ModalBody>
                    <p>Xóa thông tin thành công!</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="light" onPress={handleCloseDeletedModal}>
                        Đóng
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <Modal isOpen={isPublishedOpen} onClose={handleClosePublishedModal}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Công bố thành công</ModalHeader>
                <ModalBody>
                    <p>Công bố thông tin thành công!</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="light" onPress={handleClosePublishedModal}>
                        Đóng
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
      </main>
    );
  }