"use client";

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Button,
    useDisclosure,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from '@/components/redux/hooks';
import { setPassengerInfo, setBookingConfirmation } from '@/components/redux/feature/booking/bookingSlice';
import FlightPreviewCard from '@/components/Card/Flight/FlightPreviewCard';
import ImageSection from '@/components/ImageSection';
import PolicyCard from '@/components/Card/PolicyCard';
import PaymentCard from '@/components/Card/PaymentCard';
import { api } from '@/utils/api/config';
import PassengerForm from '@/components/Form/Form';
import { PromotionCodeForm } from '@/components/Form/OfferForm';

export default function BookingDetailsPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Get selected flight from Redux store
    const selectedFlight = useAppSelector(state => state.bookingCreate.selectedFlight);
    const savedPassengerInfo = useAppSelector(state => state.bookingCreate.passengerInfo);
    const promotionCode = useAppSelector(state => state.bookingCreate.promotionCode);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [discountAmount, setDiscountAmount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passengerInfo, setLocalPassengerInfo] = useState(savedPassengerInfo || {
        fullName: '',
        dateOfBirth: '',
        passportNumber: '',
        email: ''
    });

    // Calculate total price
    const basePrice: number = useMemo(() => {
        const price = selectedFlight?.baseClassPrice;
        return typeof price === 'number' ? price : 0;
    }, [selectedFlight]);
    const totalPrice = useMemo(() => {
        return Math.max(basePrice - (discountAmount || 0), 0);
    }, [basePrice, discountAmount]);

    // If no flight is selected, don't render anything
    if (!selectedFlight) return null;

    const handleNextStep = (validatedPassengerInfo: any) => {
        // Save passenger info to Redux store
        dispatch(setPassengerInfo(validatedPassengerInfo));
        onOpen();
    };

    const confirmBooking = async () => {
        setIsSubmitting(true);
        try {
            const bookingData = {
                flight: selectedFlight,
                passengerName: passengerInfo.fullName,
                passengerDob: passengerInfo.dateOfBirth,
                passengerEmail: passengerInfo.email,
                passportNumber: passengerInfo.passportNumber,
                price: totalPrice,
            };

            const response = await api.post('/booking', bookingData);

            // Save booking confirmation to Redux store
            dispatch(setBookingConfirmation({
                bookingId: response.data.bookingId,
                status: response.data.status
            }));

            onClose();
            router.push('/booking/confirmation');
        } catch (error) {
            console.error('Booking error', error);
            // Handle error (show toast, error message, etc.)
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDiscountApplied = (discountAmount: number) => {
        setDiscountAmount(discountAmount);
        alert(`Mã giảm giá đã được áp dụng. Giảm ${discountAmount} VNĐ`);
    };

    return (
        <div>
            <ImageSection />
            <div className='mx-auto max-w-6xl'>
                <div className="px-4 py-6 flex flex-col gap-8 justify-center">
                    <div className='flex flex-col gap-4'>
                        <h1 className="text-2xl font-bold text-blue-normal pl-1">Thông tin chuyến bay</h1>
                        <FlightPreviewCard
                            {...selectedFlight}
                        />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <div className='pl-1'>
                            <h1 className="text-2xl font-bold text-blue-normal">Thông tin hành khách</h1>
                            <p className="text-base">
                                Vui lòng nhập thông tin hành khách dưới đây
                            </p>
                        </div>
                        <PassengerForm
                            initialData={savedPassengerInfo}
                            onValidSubmit={handleNextStep}
                        />
                    </div>

                    {/* Promotion Code Section */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold text-blue-normal pl-1">Mã Giảm Giá</h2>
                        <PromotionCodeForm
                            basePrice={basePrice}
                            onDiscountApplied={handleDiscountApplied}
                        />
                    </div>

                    <div>
                        <PaymentCard />
                    </div>

                    <div>
                        <PolicyCard />
                    </div>

                    <div className="flex justify-between">
                        <div className="text-lg font-bold text-blue-normal">
                            Tổng tiền: {totalPrice.toLocaleString()} VNĐ
                        </div>
                        <Button
                            className='bg-blue-normal font-semibold text-white'
                            onClick={onOpen}
                        >
                            Xác nhận và đặt vé
                        </Button>

                        {/* Confirmation Modal */}
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader>Xác nhận đặt vé</ModalHeader>
                                        <ModalBody>
                                            Bạn có chắc chắn muốn đặt vé này không?
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button
                                                color="danger"
                                                variant="light"
                                                onPress={onClose}
                                            >
                                                Không
                                            </Button>
                                            <Button
                                                color="primary"
                                                onPress={confirmBooking}
                                                isLoading={isSubmitting}
                                            >
                                                Có
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}