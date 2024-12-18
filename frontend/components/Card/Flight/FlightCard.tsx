"use client";

import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FlightDetailsCard from "./FlightDetailsCard";
import { Flight } from "@/interfaces/flight";
import { setSelectedFlight, setRoundTripFlight, setFlightStep } from "@/components/redux/feature/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/components/redux/hooks";

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

export default function FlightCard(props: Flight) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const searchParams = useAppSelector(state => state.bookingCreate.searchParams);
    const selectedFlights = useAppSelector(state => state.bookingCreate.selectedFlights);
    const currentFlightStep = useAppSelector(state => state.bookingCreate.currentFlightStep);

    const handleFlightSelect = () => {
        if (searchParams.tripType === "khu-hoi") {
            if (currentFlightStep === "departure") {
                dispatch(setRoundTripFlight({ type: "departure", flight: props }));
                dispatch(setFlightStep("return")); 
                router.push(`/booking/results`); 
            } else if (currentFlightStep === "return") {
                dispatch(setRoundTripFlight({ type: "return", flight: props }));
                router.push('/booking/details'); 
            }
        } else {
            dispatch(setSelectedFlight(props));
            router.push('/booking/details');
        }
    };

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
                            <p className="text-lg font-bold">{departureTime}</p>
                            <p className="text-lg font-bold">{departureDate}</p>
                            <p>{props.departureAirport?.city}</p>
                            <p>{props.departureAirport?.name}</p>
                            <p>{props.departureAirport?.iataCode}</p>
                        </div>
                        <div className="mx-4 flex flex-col items-center w-[50%]">
                            <div className="border-t border-blue-normal w-full my-2"></div>
                            <p>{calculatedDuration}</p>
                        </div>
                        <div className="flex-1 flex flex-col items-end text-right w-[25%]">
                            <p className="text-lg font-bold">{arrivalTime}</p>
                            <p className="text-lg font-bold">{arrivalDate}</p>
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
                                onPress={handleFlightSelect}
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