"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardBody,
    Input,
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
import { FlightStatus } from '@/interfaces/flight';

interface ValidationErrors {
    fullName: string;
    dateOfBirth: string;
    passportNumber: string;
    email: string;
}

export default function BookingDetailsPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Get selected flight from Redux store
    const selectedFlight = useAppSelector(state => state.booking.selectedFlight);
    const savedPassengerInfo = useAppSelector(state => state.booking.passengerInfo);

    // If no flight is selected, redirect to search page
    // useEffect(() => {
    //     if (!selectedFlight) {
    //         router.push('/booking');
    //     }
    // }, [selectedFlight, router]);

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [passengerInfo, setLocalPassengerInfo] = useState({
        fullName: savedPassengerInfo?.fullName || '',
        dateOfBirth: savedPassengerInfo?.dateOfBirth || '',
        passportNumber: savedPassengerInfo?.passportNumber || '',
        email: savedPassengerInfo?.email || ''
    });

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
        fullName: '',
        dateOfBirth: '',
        passportNumber: '',
        email: ''
    });

    const capitalizeFullName = (str: string) => {
        return str.split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    const validatePassportNumber = (passport: string) => {
        // Basic passport number validation 
        // Adjust regex as needed for specific passport format
        const passportRegex = /^[A-Z0-9]{6,9}$/;
        return passportRegex.test(passport);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let processedValue = value;

        if (name === 'fullName') {
            processedValue = capitalizeFullName(value);
        }

        const updatedInfo = {
            ...passengerInfo,
            [name]: processedValue
        };

        setLocalPassengerInfo(updatedInfo);

        setValidationErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const validateForm = () => {
        const errors: ValidationErrors = {
            fullName: '',
            dateOfBirth: '',
            passportNumber: '',
            email: ''
        };

        let isValid = true;

        if (!passengerInfo.fullName.trim()) {
            errors.fullName = 'Vui lòng nhập tên đầy đủ';
            isValid = false;
        }

        if (!passengerInfo.dateOfBirth.trim()) {
            errors.dateOfBirth = 'Vui lòng nhập ngày sinh';
            isValid = false;
        } else {
            // Basic date validation
            const dobDate = new Date(passengerInfo.dateOfBirth);
            const currentDate = new Date();
            const minAge = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

            if (isNaN(dobDate.getTime())) {
                errors.dateOfBirth = 'Ngày sinh không hợp lệ';
                isValid = false;
            } else if (dobDate > currentDate) {
                errors.dateOfBirth = 'Ngày sinh không được lớn hơn ngày hiện tại';
                isValid = false;
            } else if (dobDate > minAge) {
                errors.dateOfBirth = 'Bạn phải từ 18 tuổi trở lên';
                isValid = false;
            }
        }

        if (!passengerInfo.passportNumber.trim()) {
            errors.passportNumber = 'Vui lòng nhập số hộ chiếu';
            isValid = false;
        } else if (!validatePassportNumber(passengerInfo.passportNumber)) {
            errors.passportNumber = 'Số hộ chiếu không hợp lệ';
            isValid = false;
        }

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
            // Save passenger info to Redux store
            dispatch(setPassengerInfo(passengerInfo));
            onOpen();
        }
    };

    const confirmBooking = async () => {
        setIsSubmitting(true);
        try {
            const bookingData = {
                flight: selectedFlight,
                passengerName: passengerInfo.fullName,
                contact: {
                    email: passengerInfo.email,
                    passportNumber: passengerInfo.passportNumber
                }
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

    // If no flight is selected, don't render anything
    if (!selectedFlight) return null;

    return (
        <div>
            <ImageSection />
            <div className='mx-auto max-w-6xl'>
                <div className="px-4 py-6 flex flex-col gap-8 justify-center">
                    <div className='flex flex-col gap-4'>
                        <h1 className="text-2xl font-bold text-blue-normal pl-1">Thông tin chuyến bay</h1>
                        <FlightPreviewCard
                            id={1}
                            flightNumber="QA123"
                            departureAirport={{
                                id: 1,
                                name: "Sân bay Nội Bài",
                                iataCode: "HAN",
                                city: "Hà Nội",
                                country: "Việt Nam"
                            }}
                            arrivalAirport={{
                                id: 2,
                                name: "Sân bay Tân Sơn Nhất",
                                iataCode: "SGN",
                                city: "Hồ Chí Minh",
                                country: "Việt Nam"
                            }}
                            departureTime="08:00"
                            arrivalTime="10:00"
                            duration="2h"
                            availableSeats={50}
                            baseClassPrice={{
                                "economy": 1500000
                            }}
                            status={FlightStatus.SCHEDULED}
                            seatClasses={
                                {
                                    "economy": 50,
                                    "business": 20
                                }
                            }
                        />
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
                                            <p className='text-base text-blue-normal font-medium pl-1'>Tên đầy đủ:</p>
                                            <Input
                                                label="Nhập tên đầy đủ"
                                                variant="bordered"
                                                name="fullName"
                                                value={passengerInfo.fullName}
                                                onChange={handleInputChange}
                                                isRequired
                                                isInvalid={!!validationErrors.fullName}
                                                color={validationErrors.fullName ? "danger" : "default"}
                                                errorMessage={validationErrors.fullName}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-base text-blue-normal font-medium pl-1'>Ngày sinh:</p>
                                            <Input
                                                label="Nhập ngày sinh"
                                                variant="bordered"
                                                type="date"
                                                name="dateOfBirth"
                                                value={passengerInfo.dateOfBirth}
                                                onChange={handleInputChange}
                                                isRequired
                                                isInvalid={!!validationErrors.dateOfBirth}
                                                color={validationErrors.dateOfBirth ? "danger" : "default"}
                                                errorMessage={validationErrors.dateOfBirth}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-base text-blue-normal font-medium pl-1'>Số hộ chiếu:</p>
                                            <Input
                                                label="Nhập số hộ chiếu"
                                                variant="bordered"
                                                name="passportNumber"
                                                value={passengerInfo.passportNumber}
                                                onChange={handleInputChange}
                                                isRequired
                                                isInvalid={!!validationErrors.passportNumber}
                                                color={validationErrors.passportNumber ? "danger" : "default"}
                                                errorMessage={validationErrors.passportNumber}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-base text-blue-normal font-medium pl-1'>Email:</p>
                                            <Input
                                                label="Nhập email"
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
                        <PaymentCard />
                    </div>

                    <div>
                        <PolicyCard />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            className='bg-blue-normal font-semibold text-white'
                            onClick={handleNextStep}
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