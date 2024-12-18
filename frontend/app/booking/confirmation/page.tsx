"use client";

import React, { useEffect, useMemo } from 'react';
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
import Link from 'next/link';

function formatDateTime(dateString: string) {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    return `${hours}:${minutes}, ${day}/${month}`;
}

export default function BookingConfirmationPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Get booking details from Redux store
     const selectedFlights = useAppSelector(state => state.bookingCreate.selectedFlights);
        const selectedFlight = useMemo(() => {
            if (selectedFlights?.departure && selectedFlights?.return) {
                return [selectedFlights.departure, selectedFlights.return];
            }
            return selectedFlights?.departure || null;
        }, [selectedFlights]);
    const passengerInfo = useAppSelector(state => state.bookingCreate.passengerInfo);
    const bookingConfirmationDeparture = useAppSelector(state => state.bookingCreate.bookingConfirmationDeparture);
    const bookingConfirmationReturn = useAppSelector(state => state.bookingCreate.bookingConfirmationReturn);

    // Redirect if no booking details
    useEffect(() => {
        if (!selectedFlight || !passengerInfo || !bookingConfirmationDeparture) {
            router.push('/booking');
        }
    }, [selectedFlight, passengerInfo, bookingConfirmationDeparture, router]);

    const handleNewBooking = () => {
        // Reset booking state and go to search page
        dispatch(resetBooking());
        router.push('/booking');
    };

    // If no booking details, return null
    if (!selectedFlight || !passengerInfo || !bookingConfirmationDeparture) {
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
                        <div className="flex flex-col space-y-2">
                            <Chip
                                color="success"
                                variant="flat"
                                className="text-lg font-semibold py-5"
                            >
                                Mã đặt chỗ đi: {bookingConfirmationDeparture.bookingId}
                            </Chip>
                            {selectedFlights.return && bookingConfirmationReturn && (
                                <Chip
                                    color="success"
                                    variant="flat"
                                    className="text-lg font-semibold py-5"
                                >
                                    Mã đặt chỗ về: {bookingConfirmationReturn.bookingId}
                                </Chip>
                            )}
                        </div>
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
                                        <span>{selectedFlights.departure?.flightNumber}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="font-medium">Tuyến bay:</span>
                                        <span>{selectedFlights.departure?.departureAirport?.name} → {selectedFlights.departure?.arrivalAirport?.name}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="font-medium">Ngày:</span>
                                        <span>{selectedFlights.departure?.departureTime ? formatDateTime(selectedFlights.departure.departureTime) : 'N/A'}</span>
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

                        {selectedFlights.return && (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                                        Thông tin chuyến bay
                                    </h2>
                                    <div className="space-y-2 text-gray-600">
                                        <p className="flex justify-between">
                                            <span className="font-medium">Số hiệu:</span>
                                            <span>{selectedFlights.return.flightNumber}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="font-medium">Tuyến bay:</span>
                                            <span>{selectedFlights.return.departureAirport?.name} → {selectedFlights.return.arrivalAirport?.name}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="font-medium">Ngày:</span>
                                            <span>{selectedFlights.return.departureTime ? formatDateTime(selectedFlights.return.departureTime) : 'N/A'}</span>
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
                        )}

                        <Divider />

                        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                            {/* <Button
                                color="primary"
                                variant="bordered"
                                startContent={<PrinterIcon size={20} />}
                                onClick={() => window.print()}
                                className="w-full sm:w-auto"
                            >
                                In vé
                            </Button> */}
                            <Button
                                color="primary"
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