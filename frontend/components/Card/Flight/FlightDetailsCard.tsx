"use client";

import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { Flight } from '@/interfaces/flight';
import { FlightStatus } from '@/interfaces/flight';

const statusOptions = [
    { name: "Đã lên lịch", uid: FlightStatus.SCHEDULED },
    { name: "Đã đến", uid: FlightStatus.ARRIVED },
    { name: "Chậm", uid: FlightStatus.DELAYED },
    { name: "Hủy", uid: FlightStatus.CANCELLED }
];

export const formatDateTime = (isoString: string, format: 'DD/MM/YYYY' | 'MM/DD/YYYY' = 'DD/MM/YYYY') => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    let formattedDate;
    if (format === 'DD/MM/YYYY') {
        formattedDate = `${day}/${month}/${year}`;
    } else {
        formattedDate = `${month}/${day}/${year}`;
    }

    const formattedTime = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    return { formattedDate, formattedTime };
};

export default function FlightDetailsCard(props: Flight) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { formattedDate: departureDate, formattedTime: departureTime } = formatDateTime(props.departureTime);
    const { formattedDate: arrivalDate, formattedTime: arrivalTime } = formatDateTime(props.arrivalTime);

    function calculateDuration(duration: number | undefined) {
        if (!duration) return "0 phút";
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return `${hours > 0 ? `${hours} giờ ` : ""}${minutes} phút`;
    }

    const calculatedDuration = calculateDuration(props.duration);

    return (
        <>
            <Button
                className="bg-transparent text-blue-normal text-md font-semibold"
                onPress={onOpen}
            >
                Chi tiết chuyến bay
            </Button>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="2xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Chi tiết chuyến bay
                            </ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col gap-4'>
                                    <div className="justify-between">
                                        <div className="flex flex-col mr-3">
                                            <p className="text-md">Mã chuyến bay: {props.flightNumber}</p>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div>
                                        <div className="flex flex-col space-y-4">
                                            <div className="flex justify-between">
                                                <div>
                                                    <p className="font-bold">Điểm đi</p>
                                                    <p className="text-lg">{departureTime}</p>
                                                    <p className="text-lg">{departureDate}</p>
                                                    <p>{props.departureAirport?.city}, {props.departureAirport?.country}</p>
                                                    <p>{props.departureAirport?.name}</p>
                                                    <p>Mã sân bay: {props.departureAirport?.iataCode}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-bold">Thời gian</p>
                                                    <p>{calculatedDuration}</p>
                                                    <p>Trạng thái: {statusOptions.find(option => option.uid === props.status)?.name}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold">Điểm đến</p>
                                                    <p className="text-lg">{arrivalTime}</p>
                                                    <p className="text-lg">{arrivalDate}</p>
                                                    <p>{props.arrivalAirport?.city}, {props.arrivalAirport?.country}</p>
                                                    <p>{props.arrivalAirport?.name}</p>
                                                    <p>Mã sân bay: {props.arrivalAirport?.iataCode}</p>
                                                </div>
                                            </div>
                                            <Divider />
                                            <div>
                                                <p className="font-bold">Chỗ ngồi còn</p>
                                                {Object.entries(props.seatClasses).map(([className, count]) => (
                                                    <p key={className}>{className}: {count} seats</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button className='text-blue-normal font-bold' variant="light" onPress={onClose}>
                                    Đóng
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}