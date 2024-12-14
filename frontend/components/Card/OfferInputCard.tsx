import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Input, Button, useDisclosure } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { saveDiscountInfoToLocalStorage } from '@/interfaces/flightsample';

// Explicitly define allowed discount codes
type DiscountCode = 'SUMMER20' | 'FLIGHT10' | 'NEW25';

// Type-safe discount codes object
const DISCOUNT_CODES: Record<DiscountCode, number> = {
    'SUMMER20': 0.2,   // 20% off
    'FLIGHT10': 0.1,   // 10% off
    'NEW25': 0.25      // 25% off
};

export default function OfferInputCard({
    originalPrice,
    onDiscountApply
}: {
    originalPrice: number,
    onDiscountApply?: (discountCode: string, discountedPrice: number) => void
}) {
    const [discountCode, setDiscountCode] = useState('');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalMessage, setModalMessage] = useState('');

    const handleApplyDiscount = () => {
        const normalizedCode = discountCode.trim().toUpperCase() as DiscountCode;

        if (DISCOUNT_CODES.hasOwnProperty(normalizedCode)) {
            // Valid discount code
            const discountPercentage = DISCOUNT_CODES[normalizedCode];
            const discountedPrice = originalPrice * (1 - discountPercentage);

            // Save to local storage
            const discountInfo = {
                code: normalizedCode,
                originalPrice,
                discountedPrice,
                discountPercentage
            };
            saveDiscountInfoToLocalStorage(discountInfo);

            // Callback to parent if provided
            if (onDiscountApply) {
                onDiscountApply(normalizedCode, discountedPrice);
            }

            // Show success modal
            setModalMessage(`Áp dụng mã giảm giá ${normalizedCode} thành công!`);
            onOpen();
        } else {
            // Invalid discount code
            setModalMessage('Mã giảm giá không hợp lệ. Vui lòng thử lại.');
            onOpen();
        }
    };

    return (
        <>
            <Card>
                <CardHeader className="flex gap-3 pb-1 ml-1">
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold">Ưu đãi & Giảm giá</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="flex w-full mobile:flex-col gap-2 items-center">
                        <Input
                            size="sm"
                            className="w-2/3 mobile:w-full"
                            type="text"
                            label="Mã khuyến mại"
                            variant="bordered"
                            value={discountCode}
                            onValueChange={setDiscountCode}
                        />
                        <Button
                            size="md"
                            radius="sm"
                            className="w-1/3 bg-blue-normal text-white font-medium text-base"
                            onClick={handleApplyDiscount}

                        >
                            Áp dụng
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Thông Báo</ModalHeader>
                            <ModalBody>
                                <p>{modalMessage}</p>
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
}