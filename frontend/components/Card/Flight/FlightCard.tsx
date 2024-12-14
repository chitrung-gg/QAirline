"use client";

import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FlightDetailsCard from "./FlightDetailsCard";
import { Flight } from "@/interfaces/flight";
import { setSelectedFlight } from "@/components/redux/feature/booking/bookingSlice";
import { useAppDispatch } from "@/components/redux/hooks";

export default function FlightCard(props: Flight) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleFlightSelect = () => {
        // Dispatch selected flight to Redux store
        dispatch(setSelectedFlight(props));
        // Navigate to booking details page
        router.push('/booking/details');
    };

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
                    <p className="text-md">Mã chuyến bay: {props.flightNumber}</p>
                </div>
            </CardHeader>
            <Divider className="bg-transparent" />
            <CardBody>
                <div className="flex mobile:flex-col items-center flex-row">
                    <div className="w-4/5 flex items-center justify-between mx-2">
                        <div className="flex-1 flex flex-col items-start w-[25%]">
                            <p className="text-lg font-bold">{props.departureTime}</p>
                            <p>{props.departureAirport?.city}</p>
                            <p>{props.departureAirport?.name}</p>
                            <p>{props.departureAirport?.iataCode}</p>
                        </div>
                        <div className="mx-4 flex flex-col items-center w-[50%]">
                            <div className="border-t border-blue-normal w-full my-2"></div>
                            <p>{props.duration}</p>
                        </div>
                        <div className="flex-1 flex flex-col items-end text-right w-[25%]">
                            <p className="text-lg font-bold">{props.arrivalTime}</p>
                            <p>{props.arrivalAirport?.city}</p>
                            <p>{props.arrivalAirport?.name}</p>
                            <p>{props.arrivalAirport?.iataCode}</p>
                        </div>
                    </div>
                    <div className="md:w-1/5 flex items-center justify-between mx-2">
                        <div className="flex-1 flex flex-col items-center">
                            <p className="text-lg font-bold">Chỗ ngồi còn: {props.availableSeats}</p>
                            <Button
                                className="mt-2 bg-blue-normal text-white font-semibold"
                                onPress={handleFlightSelect} // Thay đổi từ handleBookNow sang handleFlightSelect
                            >
                                Đặt vé
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="flex flex-row justify-between mobile:flex-col mobile:items-center mobile:justify-center">
                <div className="flex flex-col mr-3 ml-1">
                    <FlightDetailsCard {...props} />
                </div>
            </CardFooter>
        </Card>
    );
}