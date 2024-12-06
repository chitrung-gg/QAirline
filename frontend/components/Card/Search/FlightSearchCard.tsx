import React, { useState } from 'react';
import {
    Card,
    Radio,
    CardBody,
    RadioGroup,
    Divider,
    Button,
    Input,
    Autocomplete,
    AutocompleteItem,
    DateRangePicker
} from "@nextui-org/react";
import { GoArrowSwitch } from "react-icons/go";
import { today } from "@internationalized/date";
import { getLocalTimeZone } from "@internationalized/date";

// TypeORM Flight Entity (to be created in NestJS)
interface Flight {
    id: number;
    departure: string;
    destination: string;
    departureDate: Date;
    returnDate?: Date;
    availableSeats: number;
}

// Flight Search Service (to be implemented in NestJS with TypeORM)
const FlightService = {
    async searchFlights(searchParams: {
        departure: string,
        destination: string,
        departureDate: Date,
        returnDate?: Date
    }): Promise<Flight[]> {
        try {
            const response = await fetch('/api/flights/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchParams)
            });

            if (!response.ok) {
                throw new Error('Flight search failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Error searching flights:', error);
            return [];
        }
    }
};

export default function FlightSearchCard() {
    // State management
    const [selected, setSelected] = useState("bay-thang");
    const [departure, setDeparture] = useState("london");
    const [destination, setDestination] = useState("paris");
    const [passengers, setPassengers] = useState(1);
    const [flights, setFlights] = useState<Flight[]>([]);
    const [dateRange, setDateRange] = useState({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ days: 7 })
    });

    // Sample location data
    const sampleData = [
        { value: "london", label: "London" },
        { value: "paris", label: "Paris" },
        { value: "new-york", label: "New York" },
        { value: "tokyo", label: "Tokyo" },
        { value: "berlin", label: "Berlin" },
        { value: "madrid", label: "Madrid" },
        { value: "rome", label: "Rome" },
        { value: "moscow", label: "Moscow" },
        { value: "beijing", label: "Beijing" },
        { value: "bangkok", label: "Bangkok" },
        { value: "hanoi", label: "Hanoi" },
        { value: "saigon", label: "Saigon" },
    ];

    // Swap departure and destination
    const handleSwap = () => {
        setDeparture(destination);
        setDestination(departure);
    };

    // Search flights handler
    const handleSearchFlights = async () => {
        try {
            const searchParams = {
                departure,
                destination,
                departureDate: new Date(dateRange.start.toString()),
                returnDate: selected === 'khu-hoi'
                    ? new Date(dateRange.end.toString())
                    : undefined,
            };

            const results = await FlightService.searchFlights(searchParams);
            setFlights(results);
        } catch (error) {
            console.error('Flight search error:', error);
        }
    };

    return (
        <div className="gap-5 bg-white w-full place-items-center rounded-lg">
            <Card className="max-w-screen-xl w-full" shadow="none">
                <CardBody>
                    {/* Flight Type Selection */}
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-5 items-center mb-3 mt-5">
                        <RadioGroup
                            orientation="horizontal"
                            value={selected}
                            onValueChange={setSelected}
                        >
                            <Radio value="bay-thang" className="mr-3">Bay thẳng</Radio>
                            <Radio value="khu-hoi">Khứ hồi</Radio>
                        </RadioGroup>
                    </div>

                    {/* Search Inputs */}
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 items-center">
                        {/* Departure and Destination Selection */}
                        <div className="flex flex-wrap md:flex-nowrap gap-1 items-center flex-auto">
                            <Autocomplete
                                label="Điểm đi"
                                size="sm"
                                variant="bordered"
                                className="flex-auto w-32"
                                selectedKey={departure}
                                onSelectionChange={(value) => setDeparture(value as string)}
                            >
                                {sampleData.map((data) => (
                                    <AutocompleteItem key={data.value} value={data.value}>
                                        {data.label}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>

                            {/* Swap Button */}
                            <Button
                                size="md"
                                onClick={handleSwap}
                                className="bg-transparent"
                                isIconOnly
                            >
                                <GoArrowSwitch />
                            </Button>

                            {/* Destination Selection */}
                            <Autocomplete
                                label="Điểm đến"
                                size="sm"
                                variant="bordered"
                                className="flex-auto w-32"
                                selectedKey={destination}
                                onSelectionChange={(value) => setDestination(value as string)}
                            >
                                {sampleData.map((data) => (
                                    <AutocompleteItem key={data.value} value={data.value}>
                                        {data.label}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>

                        {/* Date Range Picker */}
                        <DateRangePicker
                            label="Ngày đi"
                            size="sm"
                            variant="bordered"
                            className="flex-auto w-64"
                            value={dateRange}
                            onChange={setDateRange}
                            minValue={today(getLocalTimeZone())}
                            isDisabled={selected === 'bay-thang'}
                            isReadOnly={selected === 'bay-thang'}
                        />

                        {/* Passengers Input */}
                        <Input
                            size="sm"
                            type="number"
                            className="flex-auto w-20"
                            label="Hành khách"
                            variant="bordered"
                            value={passengers.toString()}
                            onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                            min={1}
                        />

                        {/* Search Button */}
                        <Button
                            size="md"
                            radius="sm"
                            className="flex-auto w-32 bg-blue-normal text-white font-medium text-base"
                            onClick={handleSearchFlights}
                        >
                            Tìm chuyến bay
                        </Button>
                    </div>
                </CardBody>
                <Divider />

                {/* Flight Results Section (Optional) */}
                {flights.length > 0 && (
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-3">Kết quả tìm kiếm</h2>
                        {flights.map((flight) => (
                            <div key={flight.id} className="border-b py-2">
                                <p>{flight.departure} → {flight.destination}</p>
                                <p>Ngày đi: {flight.departureDate.toLocaleDateString()}</p>
                                {flight.returnDate && (
                                    <p>Ngày về: {flight.returnDate.toLocaleDateString()}</p>
                                )}
                                <p>Ghế còn trống: {flight.availableSeats}</p>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}