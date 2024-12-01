"use client";

import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import Image from "next/image";

interface FlightPreviewCardProps {
    departure_location: string;
    departure_time: string;
    departure_airport: string;
    arrival_location: string;
    arrival_time: string;
    arrival_airport: string;
    price: number;
    duration: string;
}

export default function FlightPreviewCard(props: FlightPreviewCardProps) {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="justify-between">
                <div className="flex gap-3 items-center">
                    <Image
                        alt="airline logo"
                        height={40}
                        src="/images/Qairline.png"
                        width={40}
                        className='transition-all hover:scale-105'
                    />
                    <p className="text-md font-semibold">QAirline</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">{props.price.toLocaleString()} VNĐ</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-lg font-bold">{props.departure_time}</p>
                        <p>{props.departure_location}</p>
                        <p className="text-sm text-gray-500">{props.departure_airport}</p>
                    </div>
                    <div className="mx-4 text-center">
                        <div className="border-t border-blue-normal w-full my-2"></div>
                        <p className="text-sm">{props.duration}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold">{props.arrival_time}</p>
                        <p>{props.arrival_location}</p>
                        <p className="text-sm text-gray-500">{props.arrival_airport}</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}