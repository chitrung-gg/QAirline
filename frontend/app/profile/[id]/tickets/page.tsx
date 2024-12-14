
"use client"
import axios from "axios";
import { Button, Input, Accordion, AccordionItem, Card, CardFooter, CardBody, CardHeader, Divider, Image } from '@nextui-org/react';
import Link from 'next/link';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Booking } from "@/interfaces/booking";
import { FlightStatus } from "@/interfaces/flight";
import { AircraftStatus } from "@/interfaces/aircraft";
import { BookingStatus, PaymentStatus } from "@/interfaces/booking";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const tempBooking: Booking[] = [
    {
        id: 1,
        passengerName: "John Doe",
        passengerDob: "1990-01-01T00:00:00.000Z",
        passportNumber: "P12345678",
        bookingCode: "Q123456",
        seatClass: "Economy",
        ticketPrice: {
            "Giá vé": 1000000,
            "Thuế": 50000,
            "Phí": 10000
        },
        totalPrice: 1060000,
        flight: {
            id: 1,
            flightNumber: "FEF",
            departureTime: "2024-12-11T04:06:00.000Z",
            arrivalTime: "2024-12-19T04:06:00.000Z",
            status: FlightStatus.SCHEDULED,
            availableSeats: 450,
            seatClasses: {
                "Class 1": 48,
                "Class 2": 20,
                "Economy": 100
            },
            duration: 11520,
            aircraft: {
                id: 5,
                aircraftCode: "huhu1333",
                model: "hehe23",
                manufacturer: "abc32",
                capacity: 450,
                seatClasses: {
                    "Class 1": 48,
                    "Class 2": 20,
                    "Economy": 100
                },
                status: AircraftStatus.ACTIVE,
                createdAt: "2024-12-06T13:55:14.770Z",
                updatedAt: "2024-12-06T14:19:52.571Z"
            },
            departureAirport: {
                id: 1,
                name: "Tan Son Nhat International Airport",
                city: "Ho Chi Minh City",
                country: "Vietnam",
                iataCode: "SGN"
            },
            arrivalAirport: {
                id: 2,
                name: "Noi Bai International Airport",
                city: "Hanoi",
                country: "Vietnam",
                iataCode: "HAN"
            }
        },
        bookingDate: "2024-12-06T14:19:52.571Z",
        bookingStatus: BookingStatus.CONFIRMED,
        paymentStatus: PaymentStatus.PAID
    },
    {
        id: 2,
        passengerName: "John Doe",
        passengerDob: "1990-01-01T00:00:00.000Z",
        passportNumber: "P12345678",
        bookingCode: "Q123456",
        seatClass: "Economy",
        ticketPrice: {
            "Giá vé": 1000000,
            "Thuế": 50000,
            "Phí": 10000
        },
        totalPrice: 1060000,
        flight: {
            id: 1,
            flightNumber: "FEF",
            departureTime: "2024-12-11T04:06:00.000Z",
            arrivalTime: "2024-12-19T04:06:00.000Z",
            status: FlightStatus.SCHEDULED,
            availableSeats: 450,
            seatClasses: {
                "Class 1": 48,
                "Class 2": 20,
                "Economy": 100
            },
            duration: 11520,
            aircraft: {
                id: 5,
                aircraftCode: "huhu1333",
                model: "hehe23",
                manufacturer: "abc32",
                capacity: 450,
                seatClasses: {
                    "Class 1": 48,
                    "Class 2": 20,
                    "Economy": 100
                },
                status: AircraftStatus.ACTIVE,
                createdAt: "2024-12-06T13:55:14.770Z",
                updatedAt: "2024-12-06T14:19:52.571Z"
            },
            departureAirport: {
                id: 1,
                name: "Tan Son Nhat International Airport",
                city: "Ho Chi Minh City",
                country: "Vietnam",
                iataCode: "SGN"
            },
            arrivalAirport: {
                id: 2,
                name: "Noi Bai International Airport",
                city: "Hanoi",
                country: "Vietnam",
                iataCode: "HAN"
            }
        },
        bookingDate: "2024-12-06T14:19:52.571Z",
        bookingStatus: BookingStatus.CONFIRMED,
        paymentStatus: PaymentStatus.PAID
    }
];

const flightStatusOptions = [
    { name: "Đã lên lịch", uid: FlightStatus.SCHEDULED },
    { name: "Đã đến", uid: FlightStatus.ARRIVED },
    { name: "Chậm", uid: FlightStatus.DELAYED },
    { name: "Hủy", uid: FlightStatus.CANCELLED }
];

const bookingStatusOptions = [
    { name: "Đã xác nhận", uid: "Confirmed" },
    { name: "Đang chờ", uid: "Pending" },
    { name: "Đã hủy", uid: "Cancelled" }
];

const paymentStatusOptions = [
    { name: "Đã thanh toán", uid: "Paid" },
    { name: "Đang chờ", uid: "Pending" },
    { name: "Chưa thanh toán", uid: "Unpaid" }
];
       
export default function Page(props: { params: { id: string } }) {
    const [params, setParams] = React.useState<{ id: string } | null>(null);
    const router = useRouter();
    const { id } = useParams();

    const [data, setData] = React.useState<Booking[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        setParams(props.params);
    }, [props.params]);
    
    React.useEffect(() => {
        const fetchData = async () => {
            if (!id) return;  
            try {
                const res = await axios.get(`http://localhost:5000/booking/user/${id}`);
                const data = res.data;
                if (data.length === 0) {
                    //setError("Không tìm thấy đặt vé nào");
                    setError(null)
                } else {
                    setData(data);
                    setError(null); 
                }
            } catch (error) {
                setError("Có lỗi xảy ra khi tải dữ liệu");
            }
        };
        fetchData();
    }, [id]);   
    
    //const data = tempBooking;

    function formatDuration(duration: number): string {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return `${hours > 0 ? `${hours} giờ ` : ""}${minutes} phút`;
    }

    return (
        <main className=' min-h-[80vh] max-h-screen bg-gray-50 p-5'>
            <div className="flex flex-col items-center container mx-auto">
                <h1 className="text-xl md:text-2xl text-blue-normal mb-3 text-left w-10/12 font-semibold">
                    Vé của tôi
                </h1>
                <div className="max-w-6xl mx-auto pb-12 flex flex-col justify-center items-center w-10/12">
                    {error && (
                        <div className="font-semibold text-center mb-4">
                            {error}
                        </div>
                    )}
                    {data.length > 0 ? (
                        <Accordion variant='splitted'>
                            {data.map((data: Booking, index: number) => (
                                <AccordionItem key={index}
                                    aria-label={data.bookingCode}
                                    indicator={({ isOpen }) =>
                                        (isOpen ? <FaMinus className='text-blue-normal' /> : <FaPlus className='text-blue-normal' />)}
                                    title={<div>
                                        <p className="text-lg mobile:text-base tablet:text-base font-medium">Mã đặt vé: <span className="text-blue-normal">{data.bookingCode}</span></p>
                                    </div>}>
                                    <Card className="w-full" shadow="none">
                                        <CardHeader className="justify-between">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex flex-col items-left">
                                                    <p className="text-md font-semibold">Tên hành khách: {data.passengerName}</p>
                                                    <p className="text-md font-semibold">Ngày sinh: {new Date(data.passengerDob).toLocaleDateString()}</p>
                                                </div>
                                                {/* <div className="flex flex-col justify-center items-center">
                                                    <p className="text-md">QAirline</p>
                                                </div> */}
                                            </div>
                                            <div className="flex flex-col text-right">
                                                <p className="text-md">Hạng: <span className="font-semibold">{data.seatClass}</span></p>
                                            </div>
                                        </CardHeader>
                                        <Divider />
                                        <CardBody>
                                            <div className="flex flex-col space-y-4">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <p className="font-bold">Khởi hành</p>
                                                        <p>{new Date(data.flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                        <p>{new Date(data.flight.departureTime).toLocaleDateString()}</p>
                                                        <p>{data.flight.departureAirport.city}</p>
                                                        <p>{data.flight.departureAirport.name}</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="font-bold">Thời gian bay</p>
                                                        <p>{data.flight.duration !== undefined ? formatDuration(data.flight.duration) : "N/A"}</p>
                                                    </div>
                                                    
                                                    <div className="text-right">
                                                        <p className="font-bold">Đến</p>
                                                        <p>{new Date(data.flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                        <p>{new Date(data.flight.arrivalTime).toLocaleDateString()}</p>
                                                        <p>{data.flight.arrivalAirport.city}</p>
                                                        <p>{data.flight.arrivalAirport.name}</p>
                                                    </div>
                                                </div>
                                                <Divider />
                                                <div className="flex flex-col justify-between items-start">
                                                    {/* Map qua các giá trị ticketPrice */}
                                                    {Object.entries(data.ticketPrice).map(([key, value], index) => (
                                                        <div key={index} className="flex justify-between w-full">
                                                        <p className="text-left">{key}:</p>
                                                        <p className="text-right">{value} VND</p>
                                                        </div>
                                                    ))}
                                                    
                                                    {/* Dòng tổng tiền */}
                                                    <div className="flex justify-between w-full mt-1">
                                                        <p className="text-left font-bold">Tổng tiền:</p>
                                                        <p className="text-right font-bold">{data.totalPrice} VND</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                        <Divider />
                                        <CardFooter>
                                        <div className="flex flex-row justify-between w-full">
                                            <div className="flex flex-col items-left">
                                                <p className="text-md">Trạng thái đặt vé: <span className="font-semibold">{bookingStatusOptions.find(option => option.uid === data.bookingStatus)?.name}</span></p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <p className="text-md">Trạng thái thanh toán: <span className="font-semibold">{paymentStatusOptions.find(option => option.uid === data.paymentStatus)?.name}</span></p>
                                            </div>
                                            <div className="flex flex-col text-right">
                                                <p className="text-md">Ngày đặt vé: {new Date(data.bookingDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        </CardFooter>
                                    </Card>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    ) : (
                        <div className="text-center font-semibold text-gray-500">
                            Không có dữ liệu vé nào.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}