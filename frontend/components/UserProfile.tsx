import React, { useState } from 'react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure
} from "@nextui-org/react";

const UserProfile = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleInfoClick = () => {
        onOpen();
    };

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        name="Jason Hughes"
                        size="sm"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-fit">
                        <p className="font-semibold">Nguyễn Văn A</p>
                    </DropdownItem>
                    <DropdownItem key="information" onClick={handleInfoClick}>
                        Thông tin
                    </DropdownItem>
                    <DropdownItem key="my_tickets">Vé của tôi</DropdownItem>
                    <DropdownItem key="logout" className='font-semibold text-red-500'>
                        Đăng xuất
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Thông Tin Cá Nhân
                            </ModalHeader>
                            <ModalBody>
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-semibold">Tên:</p>
                                        <p>Nguyễn Văn A</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Email:</p>
                                        <p>nguyenvana@example.com</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Số Điện Thoại:</p>
                                        <p>+84 123 456 789</p>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                    Đóng
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default UserProfile;