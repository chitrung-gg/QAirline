"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardBody,
    Input,
    Button,
    Select,
    SelectItem,
    Autocomplete,
    AutocompleteItem
} from "@nextui-org/react";
import { useAppDispatch } from '@/components/redux/hooks';
import { setSearchParams } from '@/components/redux/feature/booking/bookingSlice';
import { Airport } from '@/interfaces/airport'; // Adjust import path as needed
import { api } from '@/utils/api/config';
import ImageSection from '@/components/ImageSection';
import { Calendar, Users } from 'lucide-react';
import { FaPlaneArrival, FaPlaneDeparture } from 'react-icons/fa';

export default function BookingPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // State for airports and search form
    const [airports, setAirports] = useState<Airport[]>([]);
    const [searchForm, setSearchForm] = useState({
        departure: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        passengers: 1,
        tripType: 'mot-chieu' as 'mot-chieu' | 'khu-hoi'
    });

    const fetchAirports = async () => {
        try {
            const response = await api.get<Airport[]>('http://localhost:5000/airport'); // Adjust API endpoint
            setAirports(response.data);
        } catch (error) {
            console.error('Error fetching airports:', error);
        }
    };

    // Fetch airports on component mount
    useEffect(() => {
        fetchAirports();
    }, []);

    // Handle autocomplete selection
    const handleAirportSelect = (field: 'departure' | 'destination', value: string) => {
        setSearchForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle other input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSearchForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = () => {
        // Dispatch search parameters to Redux store
        dispatch(setSearchParams({
            departure: searchForm.departure,
            destination: searchForm.destination,
            departureDate: searchForm.departureDate,
            returnDate: searchForm.tripType === 'khu-hoi' ? searchForm.returnDate : undefined,
            passengers: searchForm.passengers,
            tripType: searchForm.tripType
        }));

        // Navigate to flight results page
        router.push('/booking/results');
    };

    // Prepare airport options for autocomplete
    const getAirportOptions = () => {
        return airports.map(airport => ({
            key: airport.id,
            label: `${airport.name} (${airport.city})`,
            value: airport.name // or use iataCode if preferred
        }));
    };

    return (
        <div>
            <ImageSection />
            <div className='min-h-96 place-content-center'>
                <div className="container max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold mb-6 text-center text-primary">
                        Đặt vé máy bay
                    </h1>

                    <Card className="w-full" shadow="md">
                        <CardBody>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row gap-4">
                                {/* Departure Airport */}
                                <Autocomplete
                                    name='departure'
                                    label="Điểm đi"
                                    placeholder="Chọn điểm đi"
                                    items={getAirportOptions()}
                                    startContent={<FaPlaneDeparture className="text-default-400 text-xl" />}
                                    onSelectionChange={(key) => {
                                        const selected = airports.find((a) => a.id === Number(key));
                                        handleAirportSelect("destination", selected?.name || "");
                                    }}
                                    className="w-full"
                                >
                                    {(item) => (
                                        <AutocompleteItem key={item.key}>
                                            {item.label}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>

                                {/* Destination Airport */}
                                <Autocomplete
                                    name='destination'
                                    label="Điểm đến"
                                    placeholder="Chọn điểm đến"
                                    items={getAirportOptions()}
                                    startContent={<FaPlaneArrival className="text-default-400 text-xl" />}
                                    onSelectionChange={(key) => {
                                        const selected = airports.find((a) => a.id === Number(key));
                                        handleAirportSelect("destination", selected?.name || "");
                                    }}
                                    className="w-full"
                                >
                                    {(item) => (
                                        <AutocompleteItem key={item.key}>
                                            {item.label}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>

                                {/* Trip Type */}
                                <Select
                                    name='tripType'
                                    label="Loại chuyến bay"
                                    value={searchForm.tripType}
                                    onChange={handleInputChange}
                                    className="w-full"
                                >
                                    <SelectItem key="mot-chieu" value="mot-chieu">
                                        Một chiều
                                    </SelectItem>
                                    <SelectItem key="khu-hoi" value="khu-hoi">
                                        Khứ hồi
                                    </SelectItem>
                                </Select>

                                {/* Departure Date */}
                                <Input
                                    name="departureDate"
                                    type="date"
                                    label="Ngày đi"
                                    placeholder="Chọn ngày đi"
                                    value={searchForm.departureDate}
                                    onChange={handleInputChange}
                                    className="w-full"
                                />

                                {/* Return Date (conditional) */}
                                {searchForm.tripType === 'khu-hoi' && (
                                    <Input
                                        name="returnDate"
                                        type="date"
                                        label="Ngày về"
                                        placeholder="Chọn ngày về"
                                        value={searchForm.returnDate}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                )}

                                {/* Passengers */}
                                <Input
                                    name="passengers"
                                    type="number"
                                    label="Số hành khách"
                                    placeholder="Nhập số hành khách"
                                    startContent={<Users className="text-default-400" />}
                                    min={1}
                                    max={10}
                                    value={searchForm.passengers.toString()}
                                    onChange={handleInputChange}
                                    className="w-full"
                                />
                            </div>

                            <Button
                                color="primary"
                                className="mt-6"
                                size="lg"
                                onClick={handleSearch}
                            >
                                Tìm kiếm chuyến bay
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}