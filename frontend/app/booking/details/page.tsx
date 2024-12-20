"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Button,
    useDisclosure,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Autocomplete,
    AutocompleteItem
} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from '@/components/redux/hooks';
import { setPassengerInfo, setBookingConfirmationDeparture, setBookingConfirmationReturn } from '@/components/redux/feature/booking/bookingSlice';
import FlightPreviewCard from '@/components/Card/Flight/FlightPreviewCard';
import ImageSection from '@/components/ImageSection';
import PolicyCard from '@/components/Card/PolicyCard';
import PaymentCard from '@/components/Card/PaymentCard';
import { api } from '@/utils/api/config';
import PassengerForm from '@/components/Form/Form';
import { PromotionCodeForm } from '@/components/Form/OfferForm';
import { Promotion } from '@/interfaces/promotion';
import { CreateBookingDto, BookingStatus, PaymentStatus } from '@/interfaces/booking';
import { UserContext } from '@/app/UserContext';
import axios from 'axios';
import { discountType } from '@/interfaces/promotion';

export default function BookingDetailsPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { user } = React.useContext(UserContext);

    // Get selected flight from Redux store
    const selectedFlights = useAppSelector(state => state.bookingCreate.selectedFlights);
    const searchParams = useAppSelector(state => state.bookingCreate.searchParams);
    const selectedFlight = useMemo(() => {
        if (selectedFlights?.departure && selectedFlights?.return) {
            return [selectedFlights.departure, selectedFlights.return];
        }
        return selectedFlights?.departure || null;
    }, [selectedFlights]);
    const savedPassengerInfo = useAppSelector(state => state.bookingCreate.passengerInfo);
    const promotionCode = useAppSelector(state => state.bookingCreate.promotionCode);

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [discountAmount, setDiscountAmount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const passengerInfo = useAppSelector(state => state.bookingCreate.passengerInfo);

    const [selectedDepartureClass, setSelectedDepartureClass] = useState<string>(''); 
    const [selectedReturnClass, setSelectedReturnClass] = useState<string>('');

    const [promotions, setPromotions] = useState<Promotion[]>([]);
    //const [promotionInput, setPromotionInput] = useState('');
    const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

    const [isPassengerInfoSubmitted, setIsPassengerInfoSubmitted] = useState(false);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/promotion');
                setPromotions(response.data);
            } catch (error) {
                console.error('Error fetching promotions:', error);
            }
        };
        fetchPromotions();
    }, []);
    

    useEffect(() => {
        if (selectedFlights?.departure && !selectedDepartureClass) {
            const firstClass = Object.keys(selectedFlights.departure.baseClassPrice || {})[0];
            setSelectedDepartureClass(firstClass || ''); 
        }

        if (selectedFlights?.return && !selectedReturnClass) {
            const firstClass = Object.keys(selectedFlights.return.baseClassPrice || {})[0];
            setSelectedReturnClass(firstClass || ''); 
        }
    }, [selectedFlights, selectedDepartureClass, selectedReturnClass]);

    const basePrice = useMemo(() => {
        const departurePrice = selectedFlights.departure?.baseClassPrice?.[selectedDepartureClass] || 0;
        const returnPrice = selectedFlights.return?.baseClassPrice?.[selectedReturnClass] || 0;

        return (typeof departurePrice === 'number' ? departurePrice : 0) + (typeof returnPrice === 'number' ? returnPrice : 0);
    }, [selectedFlights, selectedDepartureClass, selectedReturnClass]);

    const departurePrice = useMemo(() => {
        return selectedFlights.departure?.baseClassPrice?.[selectedDepartureClass] || 0;
    }, [selectedFlights, selectedDepartureClass]);
    
    const returnPrice = useMemo(() => {
        return selectedFlights.return?.baseClassPrice?.[selectedReturnClass] || 0;
    }, [selectedFlights, selectedReturnClass]);
    
    useEffect(() => {
        if (!selectedFlight) {
            router.push('/booking');
        }
    }, [selectedFlight]);
    
    if (!selectedFlight) {
        return null;
    }

    const handleNextStep = (validatedPassengerInfo: any) => {
        // Save passenger info to Redux store
        dispatch(setPassengerInfo(validatedPassengerInfo));
        setIsPassengerInfoSubmitted(true);
    };    

    const handlePromotionSelect = (key: string) => {
        const promotion = promotions.find(promo => promo.code === key);
        setSelectedPromotion(promotion || null);
      };
    
    const calculateTotalPrice = () => {
        let newDeparturePrice = departurePrice;
        let newReturnPrice = returnPrice;

        if (selectedPromotion) {
            if (selectedPromotion.discountType === discountType.PERCENT) {
                newDeparturePrice = departurePrice - (departurePrice * (selectedPromotion.discount / 100));
                if (selectedFlights.return) {
                    newReturnPrice = returnPrice - (returnPrice * (selectedPromotion.discount / 100));
                }
            } else if (selectedPromotion.discountType === discountType.FIXED) {
                newDeparturePrice = Math.max(departurePrice - selectedPromotion.discount, 0);
                newReturnPrice = returnPrice; 
            }
        }

            return Math.max(newDeparturePrice + newReturnPrice, 0);
        };

    const calculateDeparturePriceWithDiscount = () => {
        let discountedPrice = departurePrice;

        if (selectedPromotion) {
            if (selectedPromotion.discountType === discountType.PERCENT) {
                discountedPrice = departurePrice - (departurePrice * (selectedPromotion.discount / 100));
            } else if (selectedPromotion.discountType === discountType.FIXED) {
                discountedPrice = Math.max(departurePrice - selectedPromotion.discount, 0);
            }
        }

        return discountedPrice;
    };

    const calculateReturnPriceWithDiscount = () => {
        let discountedPrice = returnPrice;

        if (selectedPromotion) {
            if (selectedPromotion.discountType === discountType.PERCENT) {
                discountedPrice = returnPrice - (returnPrice * (selectedPromotion.discount / 100));
            } else if (selectedPromotion.discountType === discountType.FIXED) {
                discountedPrice = returnPrice; 
            }
        }

        return discountedPrice;
    };
    
    
    const confirmBooking = async () => {
        setIsSubmitting(true);
        try {
            if (!passengerInfo) {
                alert('Thông tin hành khách không được để trống.');
                setIsSubmitting(false);
                return;
            }

            const userInfo = user?.account;

            let userData = null;
            if (userInfo?.userId) {
                const res = await axios.post(`http://localhost:5000/user/id`, {
                    id: userInfo.userId
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                userData = res.data;
                console.log('Fetched user data:', userData);
            }

            // POST for departure flight
            if (selectedFlights.departure) {
                const departureBookingData: CreateBookingDto = {
                    ...(userData && { user: userData }),
                    flight: selectedFlights.departure,
                    passengerName: passengerInfo.fullName,
                    passengerDob: new Date(passengerInfo.dateOfBirth).toISOString(),
                    passengerEmail: passengerInfo.email,
                    passportNumber: passengerInfo.passportNumber,
                    seatClass: selectedDepartureClass,
                    bookingDate: new Date().toISOString(),
                    bookingStatus: BookingStatus.CONFIRMED,
                    paymentStatus: PaymentStatus.PAID,
                    ticketPrice: {
                        [selectedDepartureClass]: selectedFlights.departure.baseClassPrice?.[selectedDepartureClass] || 0,
                    },
                    totalPrice: calculateDeparturePriceWithDiscount(),
                    passengerNumber: Number(searchParams.passengers),
                    promotion: selectedPromotion ? selectedPromotion : undefined,
                };

                console.log('Departure booking data:', departureBookingData);
    
                const departureResponse = await api.post(
                    'http://localhost:5000/booking',
                    departureBookingData
                );
    
                dispatch(setBookingConfirmationDeparture({
                    bookingId: departureResponse.data.bookingCode,
                    status: departureResponse.data.bookingStatus,
                }));
            }
    
            // POST for return flight (if exists)
            if (selectedFlights.return) {
                const returnBookingData: CreateBookingDto = {
                    user: userData,
                    flight: selectedFlights.return,
                    passengerName: passengerInfo.fullName,
                    passengerDob: new Date(passengerInfo.dateOfBirth).toISOString(),
                    passengerEmail: passengerInfo.email,
                    passportNumber: passengerInfo.passportNumber,
                    totalPrice: calculateReturnPriceWithDiscount(), 
                    seatClass: selectedReturnClass,
                    bookingDate: new Date().toISOString(),
                    bookingStatus: BookingStatus.CONFIRMED,
                    paymentStatus: PaymentStatus.PAID,
                    ticketPrice: {
                        [selectedReturnClass]: selectedFlights.return.baseClassPrice?.[selectedReturnClass] || 0,
                    },
                    passengerNumber: Number(searchParams.passengers),
                    promotion: selectedPromotion?.discountType === discountType.PERCENT ? selectedPromotion : undefined,
                };

                console.log('Return booking data:', returnBookingData);
    
                const returnResponse = await api.post(
                    'http://localhost:5000/booking',
                    returnBookingData
                );
    
                // Append return booking confirmation to Redux
                dispatch(setBookingConfirmationReturn({
                    bookingId: returnResponse.data.bookingCode,
                    status: returnResponse.data.bookingStatus,
                }));
            }
    
            // Navigate to confirmation page
            onClose();
            router.push('/booking/confirmation');
        } catch (error) {
            console.error('Booking error', error);
            // Handle error 
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <ImageSection />
            <div className='mx-auto max-w-6xl'>
                <div className="px-4 py-6 flex flex-col gap-8 justify-center">
                    <div className='flex flex-col gap-4'>
                        <h1 className="text-2xl font-bold text-blue-normal pl-1">Thông tin chuyến bay</h1>
                        {/* deparure flight */}
                        {selectedFlights.departure && (
                            <div>
                                <h2 className="text-lg font-semibold">Chuyến đi</h2>
                                <FlightPreviewCard {...selectedFlights.departure} />
                            </div>
                        )}

                        {/* return flight */}
                        {selectedFlights.return && (
                            <div>
                                <h2 className="text-lg font-semibold">Chuyến về</h2>
                                <FlightPreviewCard {...selectedFlights.return} />
                            </div>
                        )}
                    </div>

                    {selectedFlights.departure && (
                        <div>
                            <Autocomplete
                                isRequired
                                label="Chọn hạng bay cho chuyến đi"
                                placeholder="Chọn hạng bay"
                                size='lg'
                                radius="sm"
                                variant='bordered'
                                className=""
                                labelPlacement='outside'
                                selectedKey={selectedDepartureClass}
                                onSelectionChange={(key) => setSelectedDepartureClass(key as string)}
                                defaultItems={Object.entries(selectedFlights.departure?.baseClassPrice || {}).map(([className, price]) => ({
                                    key: className,
                                    label: `${className} - ${price.toLocaleString()} VND`,
                                }))}
                                >
                                {(item) => (
                                    <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
                                )}
                            </Autocomplete>
                        </div>
                    )}

                    {selectedFlights.return && (
                        <div>
                            <Autocomplete
                                isRequired
                                label="Chọn hạng bay cho chuyến về"
                                placeholder="Chọn hạng bay"
                                size='lg'
                                radius="sm"
                                variant='bordered'
                                className=""
                                labelPlacement='outside'
                                selectedKey={selectedReturnClass}
                                onSelectionChange={(key) => setSelectedReturnClass(key as string)}
                                defaultItems={Object.entries(selectedFlights.return.baseClassPrice || {}).map(([className, price]) => ({
                                    key: className,
                                    label: `${className} - ${price.toLocaleString()} VND`,
                                }))}
                                >
                                {(item) => (
                                    <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
                                )}
                            </Autocomplete>
                        </div>
                    )}

                    <div className="flex flex-col items-start gap-4">
                        <div className='pl-1'>
                            <h1 className="text-2xl font-bold text-blue-normal">Thông tin người đặt</h1>
                            <p className="text-base">
                                Vui lòng nhập thông tin người đặt dưới đây
                            </p>
                        </div>
                        <PassengerForm
                            initialData={savedPassengerInfo}
                            onValidSubmit={handleNextStep}
                        />
                    </div>

                    {isPassengerInfoSubmitted && (
                        <>
                    {/* Promotion Code Section */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold text-blue-normal pl-1">Mã Giảm Giá</h2>
                        <Autocomplete
                            label="Chọn mã giảm giá"
                            placeholder="Chọn mã giảm giá"
                            allowsCustomValue={false}
                            size="lg"
                            radius="sm"
                            variant="bordered"
                            selectedKey={selectedPromotion?.code}
                            onSelectionChange={(key) => {
                                handlePromotionSelect(key as string);
                                //setPromotionInput(key ? promotions.find(p => p.code === key)?.code || "" : "");
                              }}
                            defaultItems={promotions
                                .filter(promo => promo.isActive) 
                                .map(promo => ({
                                    key: promo.code,
                                    label: `${promo.code} - ${promo.discount} ${promo.discountType === discountType.PERCENT ? '%' : 'VNĐ'}`
                                }))
                            }
                            //value={promotionInput}
                            //onInputChange={(value) => setPromotionInput(value)}
                        >
                            {(item) => (
                                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
                            )}
                        </Autocomplete>

                        {/* {selectedPromotion && (
                            <Button
                                className='bg-red-500 font-semibold text-white'
                                size="sm"
                                onPress={() => {
                                    setSelectedPromotion(null);
                                    setPromotionInput("");
                                  }}
                            >
                                Bỏ mã giảm giá
                            </Button>
                        )} */}
                    </div>

                    
                    <div>
                        <PaymentCard />
                    </div>

                    <div>
                        <PolicyCard />
                    </div>

                    <div className="flex justify-between">
                        <div className="text-lg font-bold text-blue-normal">
                            {/* Tổng tiền: {totalPrice.toLocaleString()} VNĐ */}
                            Tổng tiền: {calculateTotalPrice().toLocaleString()} VNĐ
                        </div>
                        <Button
                            className='bg-blue-normal font-semibold text-white'
                            onClick={onOpen}
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
                    </>
                    )}
                </div>
            </div>
        </div>
    );
}