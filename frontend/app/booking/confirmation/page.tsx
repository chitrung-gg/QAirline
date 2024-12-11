"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardBody,
    Button
} from "@nextui-org/react";
import { useAppSelector, useAppDispatch } from '@/components/redux/hooks';
import { resetBooking } from '@/components/redux/feature/booking/bookingSlice';

export default function BookingConfirmationPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Get booking details from Redux store
    const selectedFlight = useAppSelector(state => state.bookingCreate.selectedFlight);
    const passengerInfo = useAppSelector(state => state.bookingCreate.passengerInfo);
    const bookingConfirmation = useAppSelector(state => state.bookingCreate.bookingConfirmation);

    // Redirect if no booking details
    useEffect(() => {
        if (!selectedFlight || !passengerInfo || !bookingConfirmation) {
            router.push('/booking');
        }
    }, [selectedFlight, passengerInfo, bookingConfirmation, router]);

    const handleNewBooking = () => {
        // Reset booking state and go to search page
        dispatch(resetBooking());
        router.push('/booking');
    };

    // If no booking details, return null
    if (!selectedFlight || !passengerInfo || !bookingConfirmation) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Card>
                <CardBody className="space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-green-600 mb-4">
                            Đặt vé thành công
                        </h1>
                        <p className="text-gray-600">
                            Mã đặt chỗ: {bookingConfirmation.bookingId}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h2 className="font-semibold mb-2">Thông tin chuyến bay</h2>
                            <p>Số hiệu: {selectedFlight.flightNumber}</p>
                            <p>
                                {selectedFlight.departureAirport?.name} → {selectedFlight.arrivalAirport?.name}
                            </p>
                            <p>Ngày: {selectedFlight.departureTime}</p>
                        </div>

                        <div>
                            <h2 className="font-semibold mb-2">Thông tin hành khách</h2>
                            <p>
                                Tên: {passengerInfo.fullName}
                            </p>
                            <p> Ngày sinh: {passengerInfo.dateOfBirth} </p>
                            <p>Email: {passengerInfo.email}</p>
                            <p>Số hộ chiếu: {passengerInfo.passportNumber}</p>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <Button
                            color="primary"
                            variant="bordered"
                            onClick={() => window.print()}
                        >
                            In vé
                        </Button>
                        <Button
                            color="primary"
                            onClick={handleNewBooking}
                        >
                            Đặt vé mới
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}