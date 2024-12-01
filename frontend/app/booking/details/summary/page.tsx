"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardBody,
    Button
} from "@nextui-org/react";
import FlightPreviewCard from '@/components/Card/Flight/FlightPreviewCard';
import { clearBookingLocalStorage, FlightProps, getDiscountInfoFromLocalStorage, getFlightFromLocalStorage, getPassengerInfoFromLocalStorage } from '@/interfaces/flight';
import ImageSection from '@/components/ImageSection';
import PolicyCard from '@/components/Card/PolicyCard';
import PaymentCard from '@/components/Card/PaymentCard';

interface PassengerInfo {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
}

export default function BookingSummaryPage() {
    const router = useRouter();
    const [passengerInfo, setPassengerInfo] = useState<PassengerInfo | null>(null);
    const [flightDetails, setFlightDetails] = useState<FlightProps | null>(null);

    useEffect(() => {
        const storedPassengerInfo = getPassengerInfoFromLocalStorage();
        const storedFlightDetails = getFlightFromLocalStorage();
        const storedDiscountInfo = getDiscountInfoFromLocalStorage();

        if (storedPassengerInfo && storedFlightDetails) {
            // If there's a discount, update the flight details
            if (storedDiscountInfo) {
                storedFlightDetails.price = storedDiscountInfo.discountedPrice || storedFlightDetails.price;
                storedFlightDetails.discount = storedDiscountInfo;
            }

            setPassengerInfo(storedPassengerInfo);
            setFlightDetails(storedFlightDetails);
        } else {
            // If no stored data, redirect back to booking details
            router.push('/booking/details');
        }
    }, [router]);

    const handleConfirmBooking = () => {
        // Implement booking confirmation logic
        clearBookingLocalStorage();

        alert('Đặt vé thành công!');
        router.push('/'); // Or successful booking confirmation page
    };


    if (!passengerInfo || !flightDetails) {
        return <div>Đang tải...</div>;
    }

    return (
        <div>
            <ImageSection />
            <div className="max-w-6xl mx-auto">
                <div className="w-full px-4 py-6 flex justify-center flex-col gap-8">
                    <div className='flex flex-col gap-4'>
                        <h1 className="text-2xl font-bold text-blue-normal pl-1">Xác nhận thông tin đặt vé</h1>
                        {flightDetails && <FlightPreviewCard {...flightDetails} />}
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='pl-1'>
                            <h1 className="text-2xl font-bold text-blue-normal">Thông tin hành khách</h1>
                            <p className="text-base">
                                Vui lòng xác nhận thông tin hành khách dưới đây
                            </p>
                        </div>
                        <Card>
                            <CardBody>
                                <div className="grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1 gap-2">
                                    <div className='flex flex-col mobile:flex-row'>
                                        <p className='text-blue-normal text-lg font-medium'>Họ và tên:</p>
                                        <p className='text-lg'> {passengerInfo.lastName} {passengerInfo.firstName} </p>
                                    </div>

                                    <div className='flex flex-col'>
                                        <p className='text-blue-normal text-xl font-medium'>Giới tính:</p>
                                        <p className='text-lg'> {passengerInfo.gender === 'male' ? 'Nam' : passengerInfo.gender === 'female' ? 'Nữ' : 'Khác'} </p>
                                    </div>

                                    <div className='flex flex-col'>
                                        <p className='text-blue-normal text-xl font-medium'>Điện thoại liên lạc:</p>
                                        <p className='text-lg'> {passengerInfo.phoneNumber} </p>
                                    </div>

                                    <div className='flex flex-col'>
                                        <p className='text-blue-normal text-xl font-medium'>Email liên hệ:</p>
                                        <p className='text-lg'> {passengerInfo.email} </p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div>
                        <PolicyCard />
                    </div>
                    <div>
                        <PaymentCard />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            className='bg-blue-normal text-white text-base font-medium'
                            onClick={handleConfirmBooking}
                        >
                            Xác nhận đặt vé
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        
    );
}