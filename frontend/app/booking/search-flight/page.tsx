"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { fetchBookingByCode, cancelBooking, } from '@/components/redux/feature/booking/bookingSlice';
import { RootState, AppDispatch } from '@/components/redux/store';
import PassengerForm from '@/components/Form/Form';
import { setPassengerInfo } from '@/components/redux/feature/booking/bookingSlice';
import ImageSection from '@/components/ImageSection';
import { AlertCircle, Printer, X } from 'lucide-react';
import Loading from '@/components/Loading';
import axios from 'axios';
import { FlightStatus } from '@/interfaces/flight';
import { useRouter } from 'next/navigation';
import { on } from 'events';

const statusOptions = [
    { name: "Đã lên lịch", uid: "Scheduled" },
    { name: "Đã đến", uid: "Arrived" },
    { name: "Chậm", uid: "Delayed" },
    { name: "Hủy", uid: "Cancelled" },
];

const bookingStatusOptions = [
    { name: "Đã xác nhận", uid: "Confirmed" },
    { name: "Đang chờ", uid: "Pending" },
    { name: "Đã hủy", uid: "Cancelled" }
];

function formatDateTime(dateString: string) {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    return `${hours}:${minutes}, ${day}/${month}`;
}

const BookingSearchPage: React.FC = () => {
    const [bookingCode, setBookingCode] = useState('');
    const [showCancelForm, setShowCancelForm] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
    const dispatch = useDispatch<AppDispatch>();
    //const { selectedBooking, loading, error } = useSelector((state: RootState) => state.bookingSearch);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const [otpValue, setOtpValue] = React.useState("");
    const [otpSent, setOtpSent] = React.useState(false);  
    const [otpVerified, setOtpVerified] = React.useState(false);

    const [cooldown, setCooldown] = React.useState(false);  
    const [countdown, setCountdown] = React.useState(60);   

    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSearch = async () => {
        setLoading(true);
        //dispatch(fetchBookingByCode(bookingCode));
        try {
            const response = await axios.get(`http://localhost:5000/booking/code?bookingCode=${bookingCode}`);
            if (response.data) {
                setSelectedBooking(response.data[0]); // check
                setErrorMessage('');
            } else {
                setErrorMessage('Không tìm thấy chuyến bay nào');
            }
        } catch (error) {
            setErrorMessage('Không tìm thấy chuyến bay nào');
        }
        setLoading(false);
        setShowCancelForm(false);
    };

    React.useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
    
        if (cooldown && countdown > 0) {
            intervalId = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setCooldown(false);  
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [cooldown, countdown]);

    const sendOtp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/booking/cancel/verify", { email: selectedBooking.passengerEmail });
            setOtpSent(true);
            setCooldown(true); 
            setCountdown(60);
            setOtpVerified(false);
        } catch (error) {
            onErrorOpen();
        } 
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/booking/cancel/verify/${otpValue}`, 
                { 
                    email: selectedBooking.passengerEmail, 
                    otp: otpValue 
                });

            setOtpVerified(true);
        } catch (error) {
            onErrorOpen();
        } 
    };

    const confirmCancellation = () => {
        if (selectedBooking) {
            dispatch(cancelBooking(selectedBooking.bookingCode));
            setSelectedBooking({ ...selectedBooking, bookingStatus: 'Cancelled' });
            onOpenChange();
        }
    };

    const handleCloseErrorModal = () => {
        onErrorClose();
    };

    const renderBookingDetails = () => {
        if (!selectedBooking) return null;

        const currentDate = new Date();
        const flightDepartureTime = new Date(selectedBooking.flight?.departureTime);

        const canCancelBooking = flightDepartureTime > currentDate;

        return (
            <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Passenger Details */}
                    <div className="bg-gray-100 p-5 rounded-lg">
                        <h2 className="text-xl font-bold mb-4 text-blue-normal border-b pb-2">
                            Thông Tin Người Đặt
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Mã Booking:</span>
                                <span className="font-bold text-gray-800">{selectedBooking.bookingCode}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Tên Người Đặt:</span>
                                <span className="font-bold text-gray-800">{selectedBooking.passengerName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Email:</span>
                                <span className="font-bold text-gray-800">{selectedBooking.passengerEmail}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Trạng thái:</span>
                                <span className="font-bold text-gray-800">
                                    {bookingStatusOptions.find(option => option.uid === selectedBooking.bookingStatus)?.name}
                                </span>
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
                                <span className="font-medium text-gray-600">Thời gian:</span>
                                <span className="font-bold text-gray-800">
                                {formatDateTime(selectedBooking.flight?.departureTime)} - {formatDateTime(selectedBooking.flight?.arrivalTime)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Trạng Thái:</span>
                                <span className='font-bold'>
                                    {statusOptions.find(option => option.uid === selectedBooking.flight?.status)?.name}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Đi - Đến:</span>
                                <span className='font-bold'>
                                    {selectedBooking.flight?.departureAirport?.name} - {selectedBooking.flight?.arrivalAirport?.name}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col md:flex-row gap-4 justify-end">
                    {/* <Button
                        color="primary"
                        variant="solid"
                        className="w-full md:w-auto"
                        startContent={<Printer size={20} />}
                        onClick={handlePrint}
                    >
                        In Vé
                    </Button> */}
                    {selectedBooking.bookingStatus !== 'Cancelled' 
                    && selectedBooking.flight.status != FlightStatus.ARRIVED 
                    && selectedBooking.flight.status != FlightStatus.CANCELLED
                    && canCancelBooking
                    && (
                        <Button 
                            // color="danger"
                            variant="solid"
                            className="w-full md:w-auto bg-red-400 hover:bg-red-600 text-white"
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
                        <Card className="w-full bg-gray-50" shadow='none'>
                            <CardHeader className="flex flex-col">
                            </CardHeader>
                            <CardBody className="flex flex-col px-10 py-1">
                                <div className="flex items-center mb-5">
                                    <Input 
                                        labelPlacement={"outside"}
                                        placeholder="Email"
                                        value={selectedBooking.passengerEmail}
                                        size="lg" 
                                        radius="sm"
                                        type="email" 
                                        label="Email của bạn" 
                                        variant="bordered" 
                                        className="mr-2"
                                        isReadOnly
                                    />
                                    <Button size="md" type="button" radius="sm" className="bg-blue-normal text-white font-medium text-base mt-6" onClick={sendOtp} isDisabled={cooldown}>
                                        {cooldown ? `Chờ ${countdown}s...` : "Gửi OTP"}
                                    </Button>
                                </div>

                                {otpSent && (
                                    <div className="flex items-center mb-5">
                                        <Input
                                            isRequired
                                            labelPlacement={"outside"}
                                            placeholder="Nhập mã OTP"
                                            size="lg"
                                            radius="sm"
                                            label="Mã OTP"
                                            variant="bordered"
                                            value={otpValue}
                                            onChange={(e) => setOtpValue(e.target.value)}
                                            className="mr-2"
                                            maxLength={6}
                                            color={otpVerified ? 'success' : 'default'}
                                        />
                                        <Button size="md" type="button" radius="sm" className="bg-blue-normal text-white font-medium text-base mt-7 px-7" onClick={verifyOtp} isDisabled={!otpSent || otpVerified}>
                                            {otpVerified ? "OTP đã xác thực" : "Xác thực OTP"}
                                        </Button>
                                    </div>
                                )}

                                <Button 
                                    size="md" 
                                    type="submit" 
                                    radius="sm" 
                                    className="bg-blue-normal text-white font-medium text-base mt-2"
                                    isDisabled={!otpVerified}
                                    onClick={onOpen}
                                >
                                    {loading ? "Đang hủy vé..." : "Hủy vé"}
                                </Button>

                            </CardBody>
                            <CardFooter className="flex flex-col">
                                <div className="flex items-center">
                                </div>
                            </CardFooter>
                        </Card>
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

                {/* Error Modal */}
                <Modal isOpen={isErrorOpen} onClose={handleCloseErrorModal}>
                    <ModalContent>
                        <ModalHeader className="flex flex-col gap-1">Có lỗi xảy ra</ModalHeader>
                        <ModalBody>
                            <p>Đã có lỗi xảy ra, xin vui lòng kiểm tra lại thông tin hoặc thử lại sau.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="light" onPress={handleCloseErrorModal}>
                                Đóng
                            </Button>
                        </ModalFooter>
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

                    {errorMessage && (
                        <div className="text-center text-red-600 py-4">
                            {errorMessage}
                        </div>
                    )}
                        
                    {/* Booking Details */}
                    {loading && <Loading />}

                    {selectedBooking && renderBookingDetails()}
                </div>
            </div>
        </div>
    )
};

 export default BookingSearchPage;