"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardBody,
    Chip,
    Breadcrumbs,
    BreadcrumbItem,
    Skeleton
} from "@nextui-org/react";
import FlightCard from '@/components/Card/Flight/FlightCard';
import { useAppDispatch, useAppSelector } from '@/components/redux/hooks';
import { Flight } from '@/interfaces/flight';
import { api } from '@/utils/api/config';
import { Calendar, MapPin, Users } from 'lucide-react';

export default function FlightResultsPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Get search params and flights from Redux store
    const searchParams = useAppSelector(state => state.bookingCreate.searchParams);
    const [flights, setFlights] = React.useState<Flight[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        // If no search params, redirect to search page
        if (!searchParams.departure || !searchParams.destination) {
            router.push('/booking');
            return;
        }

        // Fetch flights based on search parameters
        const fetchFlights = async () => {
            try {
                const response = await api.get('/flight', {
                    params: {
                        departureAirport: searchParams.departure,
                        arrivalAirport: searchParams.destination,
                        departureDate: searchParams.departureDate,
                    }
                });
                setFlights(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching flights:', error);
                setIsLoading(false);
            }
        };

        fetchFlights();
    }, [searchParams, router]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                {[...Array(3)].map((_, index) => (
                    <Card key={index} className="mb-4">
                        <CardBody>
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-20 w-20 rounded-full" />
                                <div className="w-full space-y-3">
                                    <Skeleton className="h-4 w-3/4 rounded-lg" />
                                    <Skeleton className="h-4 w-1/2 rounded-lg" />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumbs */}
            <Breadcrumbs
                className="mb-6"
                variant="light"
                color="primary"
            >
                <BreadcrumbItem href="/booking">Tìm kiếm</BreadcrumbItem>
                <BreadcrumbItem>Kết quả chuyến bay</BreadcrumbItem>
            </Breadcrumbs>

            {/* Search Summary */}
            <Card
                className="mb-8 bg-white/80 backdrop-blur-sm"
                shadow="sm"
            >
                <CardBody>
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                        <div className="flex flex-wrap gap-3">
                            <Chip
                                color="primary"
                                variant="flat"
                                startContent={<MapPin size={16} />}
                            >
                                Đi: {searchParams.departure}
                            </Chip>
                            <Chip
                                color="secondary"
                                variant="flat"
                                startContent={<MapPin size={16} />}
                            >
                                Đến: {searchParams.destination}
                            </Chip>
                            <Chip
                                color="success"
                                variant="flat"
                                startContent={<Calendar size={16} />}
                            >
                                Ngày đi: {searchParams.departureDate}
                            </Chip>
                            {searchParams.returnDate && (
                                <Chip
                                    color="warning"
                                    variant="flat"
                                    startContent={<Calendar size={16} />}
                                >
                                    Ngày về: {searchParams.returnDate}
                                </Chip>
                            )}
                        </div>
                        <Chip
                            color="default"
                            variant="dot"
                            startContent={<Users size={16} />}
                        >
                            Hành khách: {searchParams.passengers}
                        </Chip>
                    </div>
                </CardBody>
            </Card>

            {/* Flights List */}
            {flights.length === 0 ? (
                <Card>
                    <CardBody className="text-center">
                        <p className="text-gray-500">Không tìm thấy chuyến bay nào phù hợp</p>
                    </CardBody>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {flights.map((flight: Flight) => (
                        <FlightCard key={flight.id} {...flight} />
                    ))}
                </div>
            )}
        </div>
    );
}