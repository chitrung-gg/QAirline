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

export default function FlightDetailsCard(props: Flight) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                                                    <p className="text-lg">{props.departureTime}</p>
                                                    <p>{props.departureAirport?.city}, {props.departureAirport?.country}</p>
                                                    <p>{props.departureAirport?.name}</p>
                                                    <p>Mã sân bay: {props.departureAirport?.iataCode}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-bold">Thời gian</p>
                                                    <p>{props.duration}</p>
                                                    <p>Trạng thái: {props.status}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold">Điểm đến</p>
                                                    <p className="text-lg">{props.arrivalTime}</p>
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