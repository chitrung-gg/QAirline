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
import PolicyCard from '@/components/Card/PolicyCard';
import OfferInputCard from '@/components/Card/OfferInputCard';

interface PassengerInfo {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
}

interface ValidationErrors {
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

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
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

    // Capitalize first letter of a string
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Validate Vietnamese phone number
    const validateVietnamesePhone = (phone: string) => {
        const vietnamesePhoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b$/;
        return vietnamesePhoneRegex.test(phone);
    };

    // Validate email
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let processedValue = value;

        // Special handling for name fields to capitalize first letter
        if (name === 'firstName' || name === 'lastName') {
            processedValue = capitalizeFirstLetter(value);
        }

        setPassengerInfo(prev => ({
            ...prev,
            [name]: processedValue
        }));

        // Clear validation error when user starts typing
        setValidationErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setPassengerInfo(prev => ({
            ...prev,
            gender: value
        }));

        // Clear gender validation error
        setValidationErrors(prev => ({
            ...prev,
            gender: ''
        }));
    };

    const validateForm = () => {
        const errors: ValidationErrors = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            gender: ''
        };

        let isValid = true;

        // First name validation
        if (!passengerInfo.firstName.trim()) {
            errors.firstName = 'Vui lòng nhập tên';
            isValid = false;
        }

        // Last name validation
        if (!passengerInfo.lastName.trim()) {
            errors.lastName = 'Vui lòng nhập họ và tên đệm';
            isValid = false;
        }

        // Gender validation
        if (!passengerInfo.gender) {
            errors.gender = 'Vui lòng chọn giới tính';
            isValid = false;
        }

        // Phone number validation
        if (!passengerInfo.phoneNumber.trim()) {
            errors.phoneNumber = 'Vui lòng nhập số điện thoại';
            isValid = false;
        } else if (!validateVietnamesePhone(passengerInfo.phoneNumber)) {
            errors.phoneNumber = 'Số điện thoại không hợp lệ';
            isValid = false;
        }

        // Email validation
        if (!passengerInfo.email.trim()) {
            errors.email = 'Vui lòng nhập email';
            isValid = false;
        } else if (!validateEmail(passengerInfo.email)) {
            errors.email = 'Email không hợp lệ';
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleNextStep = () => {
        if (validateForm()) {
            // Store passenger info using new helper function
            savePassengerInfoToLocalStorage(passengerInfo);
            router.push('/booking/details/summary');
        }
    };

    const handleDiscountApply = (discountCode: string, discountedPrice: number) => {
        // Update flight details with discount information
        if (flightDetails) {
            const updatedFlightDetails = {
                ...flightDetails,
                price: discountedPrice,
                discount: {
                    code: discountCode,
                    originalPrice: flightDetails.price,
                    discountedPrice: discountedPrice
                }
            };

            // Save updated flight details to local storage
            localStorage.setItem('flightDetails', JSON.stringify(updatedFlightDetails));
            setFlightDetails(updatedFlightDetails);
        }
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
                                                variant="bordered"
                                                name="lastName"
                                                value={passengerInfo.lastName}
                                                onChange={handleInputChange}
                                                isRequired
                                                isInvalid={!!validationErrors.lastName}
                                                color={validationErrors.lastName ? "danger" : "default"}
                                                errorMessage={validationErrors.lastName}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-base text-blue-normal font-medium pl-1'>Tên của bạn:</p>
                                            <Input
                                                label="Vui lòng nhập tên"
                                                variant="bordered"
                                                name="firstName"
                                                value={passengerInfo.firstName}
                                                onChange={handleInputChange}
                                                isRequired
                                                isInvalid={!!validationErrors.firstName}
                                                color={validationErrors.firstName ? "danger" : "default"}
                                                errorMessage={validationErrors.firstName}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-base text-blue-normal font-medium pl-1'>Giới tính</p>
                                            <Select
                                                label="Giới tính"
                                                variant="bordered"
                                                name="gender"
                                                onChange={handleGenderChange}
                                                isRequired
                                                isInvalid={!!validationErrors.gender}
                                                color={validationErrors.gender ? "danger" : "default"}
                                                errorMessage={validationErrors.gender}
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
                                                variant="bordered"
                                                type="tel"
                                                name="phoneNumber"
                                                value={passengerInfo.phoneNumber}
                                                onChange={handleInputChange}
                                                isRequired
                                                isInvalid={!!validationErrors.phoneNumber}
                                                color={validationErrors.phoneNumber ? "danger" : "default"}
                                                errorMessage={validationErrors.phoneNumber}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-base text-blue-normal font-medium pl-1'>Email:</p>
                                            <Input
                                                label="Vui lòng nhập email"
                                                variant="bordered"
                                                type="email"
                                                name="email"
                                                value={passengerInfo.email}
                                                onChange={handleInputChange}
                                                isRequired
                                                isInvalid={!!validationErrors.email}
                                                color={validationErrors.email ? "danger" : "default"}
                                                errorMessage={validationErrors.email}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div>
                        {flightDetails && (
                            <OfferInputCard
                                originalPrice={flightDetails.price}
                                onDiscountApply={handleDiscountApply}
                            />
                        )}
                    </div>

                    <div>
                        <PolicyCard />
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