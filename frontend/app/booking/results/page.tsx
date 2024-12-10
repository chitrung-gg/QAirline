"use client";

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardBody, Button } from "@nextui-org/react";
import { Flight } from '@/interfaces/flight';
import { FlightSearchParams } from '@/utils/services/flightservices';

export default function FlightResultsPage() {
    const location = useLocation();
    const searchParams = location.state as FlightSearchParams;
    const flights = location.state.flights as Flight[];

    // Redirect to search page if no search params found\
    if (!searchParams) {
        window.location.href = '/booking/';
    }

    // Redirect to search page if no flights found
    if (!flights) {
        window.location.href = '/booking/';
    }

    // Render flight results

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
                    <strong> Ngày đi:</strong> {searchParams.departureDate?.toLocaleDateString()} |
                    {searchParams.tripType === 'khu-hoi' && (
                        <span>
                            <strong> Ngày về:</strong> {searchParams.returnDate?.toLocaleDateString()} |
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