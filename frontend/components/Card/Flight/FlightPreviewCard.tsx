"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import Image from "next/image";
import { Flight } from '@/interfaces/flight';

interface FlightPreviewCardProps extends Partial<Flight> {
    getDiscountInfo?: () => { discountedPrice?: number; code?: string };
}

export const formatDateTime = (isoString: string, format: 'DD/MM/YYYY' | 'MM/DD/YYYY' = 'DD/MM/YYYY') => {
    const date = new Date(isoString);

    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();

    let formattedDate;
    if (format === 'DD/MM/YYYY') {
        formattedDate = `${day}/${month}/${year}`;
    } else {
        formattedDate = `${month}/${day}/${year}`;
    }

    const formattedTime = date.toUTCString().slice(17, 22); 
    return { formattedDate, formattedTime };
};

export default function FlightPreviewCard(prop: Flight) {
    const [currentPrice, setCurrentPrice] = useState<number | undefined>(undefined);
    const [appliedDiscount, setAppliedDiscount] = useState<string | undefined>(undefined);

    // useEffect(() => {
    //     // Check for stored discount info on component mount
    //     if (getDiscountInfo) {
    //         const storedDiscount = getDiscountInfo();
    //         if (storedDiscount) {
    //             setCurrentPrice(storedDiscount.discountedPrice);
    //             setAppliedDiscount(storedDiscount.code);
    //         }
    //     }
    // }, [getDiscountInfo]);

    // Determine the default price based on the first seat class
    const defaultPrice = prop.baseClassPrice && Object.values(prop.baseClassPrice)[0];

    const { formattedDate: departureDate, formattedTime: departureTime } = formatDateTime(prop.departureTime);
    const { formattedDate: arrivalDate, formattedTime: arrivalTime } = formatDateTime(prop.arrivalTime);

    function calculateDuration(duration: number | undefined) {
        if (!duration) return "0 phút";
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return `${hours > 0 ? `${hours} giờ ` : ""}${minutes} phút`;
    }

    const calculatedDuration = calculateDuration(prop.duration);

    return (
        <Card className="w-full">
            <CardHeader className="justify-between">
                <div className="flex gap-3">
                    <Image
                        alt="logo"
                        height={40}
                        src="/images/Qairline.png"
                        width={40}
                        className='transition-all hover:scale-100'
                    />
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-md">QAirline</p>
                        {prop.flightNumber && <p className="text-sm text-gray-500">{prop.flightNumber}</p>}
                    </div>
                </div>
                <div className="flex flex-col mr-3">
                    {status && <p className="text-md">Trạng thái: {status}</p>}
                    {prop.availableSeats !== undefined && (
                        <p className="text-sm text-gray-500">
                            Ghế trống: {prop.availableSeats}
                        </p>
                    )}
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between">
                        <div>
                            <p className="font-bold">Khởi hành</p>
                            <p className="text-lg">{departureTime}</p>
                            <p className="text-lg">{departureDate}</p>
                            <p>{prop.departureAirport?.name || 'Không xác định'}</p>
                            <p>{prop.departureAirport?.iataCode}</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold">Thời gian bay</p>
                            <p>{calculatedDuration}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">Đến</p>
                            <p className="text-lg">{arrivalTime}</p>
                            <p className="text-lg">{arrivalDate}</p>
                            <p>{prop.arrivalAirport?.name || 'Không xác định'}</p>
                            <p>{prop.arrivalAirport?.iataCode}</p>
                        </div>
                    </div>
                    {/* <Divider />
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-bold">Tổng tiền</p>
                        <div className="text-right">
                            {appliedDiscount && (
                                <p className="text-sm text-green-600 mb-1">
                                    Đã áp dụng mã: {appliedDiscount}
                                </p>
                            )}
                            <p className="text-xl font-bold">
                                {currentPrice
                                    ? `${currentPrice.toLocaleString()} VNĐ`
                                    : defaultPrice
                                        ? `${defaultPrice.toLocaleString()} VNĐ`
                                        : 'Chưa xác định'}
                            </p>
                            {(currentPrice && defaultPrice && currentPrice !== defaultPrice) && (
                                <p className="text-sm line-through text-gray-400">
                                    {defaultPrice.toLocaleString()} VNĐ
                                </p>
                            )}
                        </div>
                    </div> */}
                </div>
            </CardBody>
        </Card>
    );
}