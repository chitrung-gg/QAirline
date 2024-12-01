"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import Image from "next/image";
import { FlightProps, getFlightFromLocalStorage } from '@/interfaces/flight';

export default function FlightPreviewCard() {
    const [flight, setFlight] = useState<FlightProps | null>(null);

    useEffect(() => {
        const storedFlight = getFlightFromLocalStorage();
        if (storedFlight) {
            setFlight(storedFlight);
        }
    }, []);

    if (!flight) return null;

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
                    <p className="text-md">Hạng: {flight.type}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between">
                        <div>
                            <p className="font-bold">Khởi hành</p>
                            <p className="text-lg">{flight.departure_time}</p>
                            <p>{flight.departure_date}</p>
                            <p>{flight.departure_location}</p>
                            <p>{flight.departure_airport}</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold">Thời gian bay</p>
                            <p>{flight.duration}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">Đến</p>
                            <p className="text-lg">{flight.arrival_time}</p>
                            <p>{flight.arrival_date}</p>
                            <p>{flight.arrival_location}</p>
                            <p>{flight.arrival_airport}</p>
                        </div>
                    </div>
                    <Divider />
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-bold">Tổng tiền</p>
                        <p className="text-xl font-bold">{flight.price.toLocaleString()} VNĐ</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}