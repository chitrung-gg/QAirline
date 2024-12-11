"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, Button } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from '@/components/redux/hooks';
import { setSearchParams, setSelectedFlight } from '@/components/redux/feature/booking/bookingSlice';
import { Flight } from '@/interfaces/flight';
import { api } from '@/utils/api/config';
import Loading from '@/components/Loading';
 ;

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

    const handleFlightSelect = (flight: Flight) => {
        // Dispatch selected flight to Redux store
        dispatch(setSelectedFlight(flight));
        // Navigate to booking details page
        router.push('/booking/details');
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">
                Kết quả tìm kiếm chuyến bay
            </h1>

            {/* Search Parameters Summary */}
            <div className="mb-6 bg-gray-100 p-4 rounded">
                <p>
                    <strong>Điểm đi:</strong> {searchParams.departure} |
                    <strong> Điểm đến:</strong> {searchParams.destination} |
                    <strong> Ngày đi:</strong> {searchParams.departureDate} |
                    {searchParams.tripType === 'khu-hoi' && (
                        <span>
                            <strong> Ngày về:</strong> {searchParams.returnDate} |
                        </span>
                    )}
                    <strong> Hành khách:</strong> {searchParams.passengers}
                </p>
            </div>

            {/* Flights List */}
            {flights.length === 0 ? (
                <div className="text-center text-gray-500">
                    Không tìm thấy chuyến bay nào phù hợp
                </div>
            ) : (
                flights.map((flight: Flight) => (
                    <Card key={flight.id} className="mb-4">
                        <CardBody>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="font-bold text-lg">
                                        {flight.flightNumber}
                                    </h2>
                                    <p>
                                        {flight.departureAirport?.name} → {flight.arrivalAirport?.name}
                                    </p>
                                    <p>
                                        <strong>Giờ đi:</strong> {flight.departureTime} |
                                        <strong> Giờ đến:</strong> {flight.arrivalTime}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-blue-600">
                                        {(flight.baseClassPrice ?? 0).toLocaleString()} VND
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Còn {flight.availableSeats} chỗ
                                    </p>
                                    <Button
                                        color="primary"
                                        className="mt-2"
                                        onClick={() => handleFlightSelect(flight)}
                                    >
                                        Chọn chuyến bay
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))
            )}
        </div>
    );
}