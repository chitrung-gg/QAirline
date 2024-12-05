"use client";

import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { FlightProps } from '@/interfaces/flightsample';

export default function FlightDetailsCard(props: FlightProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                className="bg-transparent text-blue-normal text-md font-semibold"
                onPress={onOpen}
            >
                Chi tiết hành trình
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
                                            <p className="text-md">Hạng: {props.type}</p>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div>
                                        <div className="flex flex-col space-y-4">
                                            <div className="flex justify-between">
                                                <div>
                                                    <p className="font-bold">Khởi hành</p>
                                                    <p className="text-lg">{props.departure_time}</p>
                                                    <p>{props.departure_date}</p>
                                                    <p>{props.departure_location}</p>
                                                    <p>{props.departure_airport}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-bold">Thời gian bay</p>
                                                    <p>{props.duration}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold">Đến</p>
                                                    <p className="text-lg">{props.arrival_time}</p>
                                                    <p>{props.arrival_date}</p>
                                                    <p>{props.arrival_location}</p>
                                                    <p>{props.arrival_airport}</p>
                                                </div>
                                            </div>
                                            <Divider />
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