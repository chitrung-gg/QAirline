"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardBody,
    Button,
    CardHeader,
    Chip,
    Divider
} from "@nextui-org/react";
import { useAppSelector, useAppDispatch } from '@/components/redux/hooks';
import { resetBooking } from '@/components/redux/feature/booking/bookingSlice';
import ImageSection from '@/components/ImageSection';
import { TicketIcon, PrinterIcon, PlusIcon } from 'lucide-react';

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
        <>
            <ImageSection />
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <Card
                    className="w-full shadow-lg"
                    radius="lg"
                >
                    <CardHeader className="flex justify-between items-center p-6 bg-gradient-to-r from-green-50 to-green-100">
                        <div className="flex items-center space-x-3">
                            <TicketIcon className="text-green-600" size={32} />
                            <h1 className="text-2xl md:text-3xl font-bold text-green-700">
                                Đặt vé thành công
                            </h1>
                        </div>
                        <Chip
                            color="success"
                            variant="flat"
                            className="text-sm font-medium"
                        >
                            Mã đặt chỗ: {bookingConfirmation.bookingId}
                        </Chip>
                    </CardHeader>

                    <Divider />

                    <CardBody className="p-6 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                                    Thông tin chuyến bay
                                </h2>
                                <div className="space-y-2 text-gray-600">
                                    <p className="flex justify-between">
                                        <span className="font-medium">Số hiệu:</span>
                                        <span>{selectedFlight.flightNumber}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="font-medium">Tuyến bay:</span>
                                        <span>{selectedFlight.departureAirport?.name} → {selectedFlight.arrivalAirport?.name}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="font-medium">Ngày:</span>
                                        <span>{selectedFlight.departureTime}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                                    Thông tin hành khách
                                </h2>
                                <div className="space-y-2 text-gray-600">
                                    <p className="flex justify-between">
                                        <span className="font-medium">Tên:</span>
                                        <span>{passengerInfo.fullName}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="font-medium">Ngày sinh:</span>
                                        <span>{passengerInfo.dateOfBirth}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="font-medium">Email:</span>
                                        <span>{passengerInfo.email}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="font-medium">Số hộ chiếu:</span>
                                        <span>{passengerInfo.passportNumber}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Divider />

                        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                            <Button
                                color="primary"
                                variant="bordered"
                                startContent={<PrinterIcon size={20} />}
                                onClick={() => window.print()}
                                className="w-full sm:w-auto"
                            >
                                In vé
                            </Button>
                            <Button
                                color="success"
                                onClick={handleNewBooking}
                                startContent={<PlusIcon size={20} />}
                                className="w-full sm:w-auto"
                            >
                                Đặt vé mới
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}