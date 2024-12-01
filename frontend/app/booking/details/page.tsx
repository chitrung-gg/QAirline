"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardBody,
    Input,
    Button,
    Select,
    SelectItem
} from "@nextui-org/react";
import FlightPreviewCard from '@/components/Card/Flight/FlightPreviewCard';
import { FlightProps, getFlightFromLocalStorage, savePassengerInfoToLocalStorage } from '@/interfaces/flight';
import ImageSection from '@/components/ImageSection';

interface PassengerInfo {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
}

export default function BookingDetailsPage() {
    const router = useRouter();

    const [flightDetails, setFlightDetails] = useState<FlightProps | null>(null);
    const [passengerInfo, setPassengerInfo] = useState<PassengerInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: ''
    });

    useEffect(() => {
        const storedFlightDetails = getFlightFromLocalStorage();
        if (storedFlightDetails) {
            setFlightDetails(storedFlightDetails);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPassengerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPassengerInfo(prev => ({
            ...prev,
            gender: e.target.value
        }));
    };

    const handleNextStep = () => {
        // Basic validation
        if (!passengerInfo.firstName || !passengerInfo.lastName ||
            !passengerInfo.email || !passengerInfo.phoneNumber ||
            !passengerInfo.gender) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        // Store passenger info using new helper function
        savePassengerInfoToLocalStorage(passengerInfo);

        router.push('/booking/details/summary');
    };

    if (!flightDetails) {
        return <div>Đang tải...</div>;
    }

    return (
        <div>
            <ImageSection />
            <div className='mx-auto max-w-6xl'>
                <div className="px-4 py-6 flex flex-col gap-8 justify-center">
                    <div className='flex flex-col gap-4'>
                        <h1 className="text-2xl font-bold text-blue-normal pl-1">Thông tin chuyến bay</h1>
                        <FlightPreviewCard {...flightDetails} />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <div className='pl-1'>
                            <h1 className="text-2xl font-bold text-blue-normal">Thông tin hành khách</h1>
                            <p className="text-base">
                                Vui lòng nhập thông tin hành khách dưới đây
                            </p>
                        </div>
                        <Card className="w-full">
                            <CardBody className="gap-6">
                                <div>
                                    <div className="grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1 gap-2">
                                        <div className='flex flex-col'>
                                            <p className='text-base text-blue-normal font-medium pl-1'>Họ và tên đệm của bạn:</p>
                                            <Input
                                                label="Vui lòng nhập họ và tên đệm"
                                                name="lastName"
                                                value={passengerInfo.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-base text-blue-normal font-medium pl-1'>Tên của bạn:</p>
                                            <Input
                                                label="Vui lòng nhập tên"
                                                name="firstName"
                                                value={passengerInfo.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-base text-blue-normal font-medium pl-1'>Giới tính</p>
                                            <Select
                                                label="Giới tính"
                                                name="gender"
                                                onChange={handleGenderChange}
                                                required
                                            >
                                                <SelectItem key="male" value="male">Nam</SelectItem>
                                                <SelectItem key="female" value="female">Nữ</SelectItem>
                                                <SelectItem key="other" value="other">Khác</SelectItem>
                                            </Select>
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-base text-blue-normal font-medium pl-1'>Điện thoại liên lạc</p>
                                            <Input
                                                label="Số điện thoại của bạn"
                                                type="tel"
                                                name="phoneNumber"
                                                value={passengerInfo.phoneNumber}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-base text-blue-normal font-medium pl-1'>Email:</p>
                                            <Input
                                                label="Vui lòng nhập email"
                                                type="email"
                                                name="email"
                                                value={passengerInfo.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>  
                    </div>
                    <div className="flex justify-end">
                        <Button
                            className='bg-blue-normal font-semibold text-white'
                            onClick={handleNextStep}
                        >
                            Tiếp tục
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}