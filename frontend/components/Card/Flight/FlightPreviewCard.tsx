"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import Image from "next/image";
import { FlightProps, getDiscountInfoFromLocalStorage } from '@/interfaces/flight';

export default function FlightPreviewCard({
    type,
    departure_time,
    departure_date,
    departure_location,
    departure_airport,
    arrival_time,
    arrival_date,
    arrival_location,
    arrival_airport,
    price,
    duration,
    discount
}: FlightProps) {
    const [currentPrice, setCurrentPrice] = useState(price);
    const [appliedDiscount, setAppliedDiscount] = useState<string | undefined>(undefined);

    useEffect(() => {
        // Check for stored discount info on component mount
        const storedDiscount = getDiscountInfoFromLocalStorage();
        if (storedDiscount) {
            setCurrentPrice(storedDiscount.discountedPrice || price);
            setAppliedDiscount(storedDiscount.code);
        }
    }, [price]);

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
                    </div>
                </div>
                <div className="flex flex-col mr-3">
                    <p className="text-md">Hạng: {type}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between">
                        <div>
                            <p className="font-bold">Khởi hành</p>
                            <p className="text-lg">{departure_time}</p>
                            <p>{departure_date}</p>
                            <p>{departure_location}</p>
                            <p>{departure_airport}</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold">Thời gian bay</p>
                            <p>{duration}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">Đến</p>
                            <p className="text-lg">{arrival_time}</p>
                            <p>{arrival_date}</p>
                            <p>{arrival_location}</p>
                            <p>{arrival_airport}</p>
                        </div>
                    </div>
                    <Divider />
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-bold">Tổng tiền</p>
                        <div className="text-right">
                            {appliedDiscount && (
                                <p className="text-sm text-green-600 mb-1">
                                    Đã áp dụng mã: {appliedDiscount}
                                </p>
                            )}
                            <p className="text-xl font-bold">
                                {currentPrice.toLocaleString()} VNĐ
                            </p>
                            {appliedDiscount && (
                                <p className="text-sm line-through text-gray-400">
                                    {price.toLocaleString()} VNĐ
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}