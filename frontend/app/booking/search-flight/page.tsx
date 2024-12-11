"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Card, CardBody, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { fetchBookingByCode, cancelBooking,} from '@/components/redux/feature/booking/bookingSlice';
import { RootState, AppDispatch } from '@/components/redux/store';
import PassengerForm from '@/components/Form/Form';
import { setPassengerInfo } from '@/components/redux/feature/booking/bookingSlice';
import ImageSection from '@/components/ImageSection';

const BookingSearchPage: React.FC = () => {
    const [bookingCode, setBookingCode] = useState('');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedBooking, loading, error } = useSelector((state: RootState) => state.bookingSearch);

    const handleSearch = () => {
        dispatch(fetchBookingByCode(bookingCode));
    };

    const handleCancelConfirmation = (passengerInfo: {
        fullName: string;
        dateOfBirth: string;
        passportNumber: string;
        email: string;
    }) => {
        // Verify passenger information matches booking
        if (
            selectedBooking?.passengerName === passengerInfo.fullName &&
            selectedBooking?.passengerDob === passengerInfo.dateOfBirth &&
            selectedBooking?.passportNumber === passengerInfo.passportNumber &&
            selectedBooking?.passengerEmail === passengerInfo.email
        ) {
            // Set passenger info and show confirmation modal
            setPassengerInfo(passengerInfo);
            onOpen();
        } else {
            // Show error that information doesn't match
            alert('Thông tin không khớp với booking');
        }
    };

    const confirmCancellation = () => {
        if (selectedBooking) {
            dispatch(cancelBooking(selectedBooking.id));
            onOpenChange();
        }
    };

    const renderBookingDetails = () => {
        if (!selectedBooking) return null;

        return (
            <Card className="mt-4">
                <CardBody>
                    <h2 className="text-xl font-bold mb-4">Thông tin Booking</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p><strong>Mã Booking:</strong> {selectedBooking.bookingCode}</p>
                            <p><strong>Tên Hành Khách:</strong> {selectedBooking.passengerName}</p>
                            <p><strong>Ngày Sinh:</strong> {selectedBooking.passengerDob}</p>
                        </div>
                        <div>
                            <p><strong>Chuyến Bay:</strong> {selectedBooking.flight?.flightNumber}</p>
                            <p><strong>Ghế:</strong> {selectedBooking.seatNumber}</p>
                            <p><strong>Trạng Thái:</strong> {selectedBooking.bookingStatus}</p>
                        </div>
                    </div>

                    {selectedBooking.bookingStatus !== 'Cancelled' && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Xác Nhận Hủy Vé</h3>
                            <PassengerForm
                                initialData={{
                                    fullName: selectedBooking.passengerName,
                                    dateOfBirth: selectedBooking.passengerDob,
                                    passportNumber: selectedBooking.passportNumber,
                                    email: selectedBooking.passengerEmail
                                }}
                                onValidSubmit={handleCancelConfirmation}
                            />
                        </div>
                    )}

                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Xác Nhận Hủy Vé</ModalHeader>
                                    <ModalBody>
                                        <p>Bạn có chắc chắn muốn hủy vé này?</p>
                                        <p>Việc hủy vé không thể hoàn tác.</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="default" variant="light" onPress={onClose}>
                                            Hủy
                                        </Button>
                                        <Button color="danger" onPress={() => {
                                            confirmCancellation();
                                            onClose();
                                        }}>
                                            Xác Nhận Hủy Vé
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </CardBody>
            </Card>
        );
    };

    return (
        <div className="">
            <ImageSection />
            <div className='mx-auto max-w-6xl flex flex-col gap-2 justify-center py-24
            mobile:px-4 
            tablet:px-8
            mini-laptop:px-12
            laptop:px-16
            '>
                <h1 className="text-4xl font-bold text-blue-normal pl-1
                mobile:text-2xl 
                tablet:text-3xl 
                mini-laptop:text-3xl

                ">
                    Tra Cứu & Hủy Booking
                </h1>

                <div className="flex gap-4">
                    <Input
                        placeholder="Nhập mã booking"
                        size='lg'
                        value={bookingCode}
                        onChange={(e) => setBookingCode(e.target.value)}
                    />
                    <Button onClick={handleSearch} size='lg' color="primary">
                        Tra Cứu
                    </Button>
                </div>

                {loading && <p>Đang tìm kiếm...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {renderBookingDetails()}
            </div>
        </div>
    );
};

export default BookingSearchPage;