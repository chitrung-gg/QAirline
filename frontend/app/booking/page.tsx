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

    // Fetch airports on component mount
    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const response = await api.get<Airport[]>('/airport'); // Adjust API endpoint
                setAirports(response.data);
            } catch (error) {
                console.error('Error fetching airports:', error);
            }
        };

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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Đặt vé máy bay
            </h1>

            <Card className="max-w-2xl mx-auto">
                <CardBody>
                    <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">
                        <div>
                            <label className="block mb-2">Điểm đi</label>
                            <Autocomplete
                                name="departure"
                                placeholder="Nhập điểm đi"
                                items={getAirportOptions()}
                                onSelectionChange={(key) => {
                                    const selected = airports.find(a => a.id === Number(key));
                                    handleAirportSelect('departure', selected?.name || '');
                                }}
                            >
                                {(item) => (
                                    <AutocompleteItem key={item.key}>
                                        {item.label}
                                    </AutocompleteItem>
                                )}
                            </Autocomplete>
                        </div>
                        <div>
                            <label className="block mb-2">Điểm đến</label>
                            <Autocomplete
                                name="destination"
                                placeholder="Nhập điểm đến"
                                items={getAirportOptions()}
                                onSelectionChange={(key) => {
                                    const selected = airports.find(a => a.id === Number(key));
                                    handleAirportSelect('destination', selected?.name || '');
                                }}
                            >
                                {(item) => (
                                    <AutocompleteItem key={item.key}>
                                        {item.label}
                                    </AutocompleteItem>
                                )}
                            </Autocomplete>
                        </div>
                        <div>
                            <label className="block mb-2">Ngày đi</label>
                            <Input
                                type="date"
                                name="departureDate"
                                value={searchForm.departureDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Loại chuyến bay</label>
                            <Select
                                name="tripType"
                                value={searchForm.tripType}
                                onChange={handleInputChange}
                            >
                                <SelectItem key="mot-chieu" value="mot-chieu">
                                    Một chiều
                                </SelectItem>
                                <SelectItem key="khu-hoi" value="khu-hoi">
                                    Khứ hồi
                                </SelectItem>
                            </Select>
                        </div>
                        {searchForm.tripType === 'khu-hoi' && (
                            <div>
                                <label className="block mb-2">Ngày về</label>
                                <Input
                                    type="date"
                                    name="returnDate"
                                    value={searchForm.returnDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        <div>
                            <label className="block mb-2">Số hành khách</label>
                            <Input
                                type="number"
                                name="passengers"
                                min={1}
                                max={10}
                                value={searchForm.passengers.toString()}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <Button
                        color="primary"
                        className="w-full mt-6"
                        onClick={handleSearch}
                    >
                        Tìm kiếm chuyến bay
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}