"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { fetchBookingByCode, cancelBooking, } from '@/components/redux/feature/booking/bookingSlice';
import { RootState, AppDispatch } from '@/components/redux/store';
import PassengerForm from '@/components/Form/Form';
import { setPassengerInfo } from '@/components/redux/feature/booking/bookingSlice';
import ImageSection from '@/components/ImageSection';
import { AlertCircle, Printer, X } from 'lucide-react';
import Loading from '@/components/Loading';

const BookingSearchPage: React.FC = () => {
    const [bookingCode, setBookingCode] = useState('');
    const [showCancelForm, setShowCancelForm] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedBooking, loading, error } = useSelector((state: RootState) => state.bookingSearch);

    const handleSearch = () => {
        dispatch(fetchBookingByCode(bookingCode));
        setShowCancelForm(false);
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

    const handlePrint = () => {
        window.print();
    };

    const renderBookingDetails = () => {
        if (!selectedBooking) return null;

        return (
            <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Passenger Details */}
                    <div className="bg-gray-100 p-5 rounded-lg">
                        <h2 className="text-xl font-bold mb-4 text-blue-normal border-b pb-2">
                            Thông Tin Hành Khách
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Mã Booking:</span>
                                <span className="font-bold text-gray-800">{selectedBooking.bookingCode}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Tên Hành Khách:</span>
                                <span className="font-bold text-gray-800">{selectedBooking.passengerName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Ngày Sinh:</span>
                                <span className="font-bold text-gray-800">{selectedBooking.passengerDob}</span>
                            </div>
                        </div>
                    </div>

                    {/* Flight Details */}
                    <div className="bg-gray-100 p-5 rounded-lg">
                        <h2 className="text-xl font-bold mb-4 text-blue-normal border-b pb-2">
                            Chi Tiết Chuyến Bay
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Chuyến Bay:</span>
                                <span className="font-bold text-gray-800">{selectedBooking.flight?.flightNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Ghế:</span>
                                <span className="font-bold text-gray-800">{selectedBooking.seatNumber }</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Trạng Thái:</span>
                                <span className='font-bold'>{selectedBooking.bookingStatus}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col md:flex-row gap-4 justify-end">
                    <Button
                        color="primary"
                        variant="solid"
                        className="w-full md:w-auto"
                        startContent={<Printer size={20} />}
                        onClick={handlePrint}
                    >
                        In Vé
                    </Button>
                    {selectedBooking.bookingStatus !== 'Cancelled' && (
                        <Button color="danger"
                            variant="solid"
                            className="w-full md:w-auto"
                            startContent={<X size={20} />}
                            onClick={() => setShowCancelForm(!showCancelForm)}>
                            {showCancelForm ? 'Ẩn Form Hủy Vé' : 'Hủy Vé'}
                        </Button>
                    )}
                </div>

                {showCancelForm && (
                    <div className="mt-6 bg-gray-50 p-5 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-blue-normal flex items-center gap-2">
                            Xác Nhận Hủy Vé
                        </h3>
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

                {/* Cancellation Confirmation Modal */}
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex items-center gap-2 text-red-600">
                                    <AlertCircle size={24} />
                                    Xác Nhận Hủy Vé
                                </ModalHeader>
                                <ModalBody>
                                    <p className="text-gray-700">Bạn có chắc chắn muốn hủy vé này?</p>
                                    <p className="text-red-500 font-medium">Việc hủy vé không thể hoàn tác.</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="default"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        Quay Lại
                                    </Button>
                                    <Button
                                        color="danger"
                                        onPress={() => {
                                            confirmCancellation();
                                            onClose();
                                            setShowCancelForm(false);
                                        }}
                                    >
                                        Xác Nhận Hủy Vé
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div >
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ImageSection />
            <div className='container mx-auto px-4 py-12 max-w-7xl'>
                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    {/* Search Section */}
                    <div className=" text-blue-normal p-6">
                        <h1 className="text-3xl font-bold mb-4 text-center">
                            Tra Cứu & Hủy Booking
                        </h1>
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Input
                                placeholder="Nhập mã booking"
                                size='lg'
                                variant="bordered"
                                className="max-w-md"
                                classNames={{
                                    input: "text-black",
                                    inputWrapper: "bg-white/20 hover:bg-white/30 focus:bg-white/30"
                                }}
                                value={bookingCode}
                                onChange={(e) => setBookingCode(e.target.value)}
                            />
                            <Button
                                size='lg'
                                color="primary"
                                variant="solid"
                                className="w-full md:w-auto"
                                onClick={handleSearch}
                            >
                                Tra Cứu
                            </Button>
                        </div>
                    </div>
                        
                    {/* Booking Details */}
                    {loading && <Loading />}
                    {error && <div className="p-6 text-center text-red-600">{error}</div>}

                    {selectedBooking && renderBookingDetails()}
                </div>
            </div>
        </div>
    )
};

 export default BookingSearchPage;