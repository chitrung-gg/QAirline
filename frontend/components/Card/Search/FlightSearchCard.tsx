import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    Radio,
    CardBody,
    RadioGroup,
    Button,
    Input,
    Autocomplete,
    AutocompleteItem,
    DatePicker,
} from "@nextui-org/react";
import { GoArrowSwitch } from "react-icons/go";
import { today } from "@internationalized/date";
import { getLocalTimeZone } from "@internationalized/date";

// Importing services
import { airportService } from '@/utils/services/airportservice';
import { flightService, FlightSearchParams } from '@/utils/services/flightservices';
import { Airport } from '@/interfaces/airport';

export default function FlightSearchCard() {
    const router = useRouter();

    // State for airports
    const [airports, setAirports] = useState<Airport[]>([]);

    // Search states
    const [selected, setSelected] = useState("bay-thang");
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [passengers, setPassengers] = useState(1);
    const [departureDate, setDepartureDate] = useState(today(getLocalTimeZone()));
    const [returnDate, setReturnDate] = useState(today(getLocalTimeZone()).add({ days: 7 }));

    // Fetch airports on component mount
    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const fetchedAirports = await airportService.getAll();
                setAirports(fetchedAirports);

                // Set default airports if not set
                if (!departure && fetchedAirports.length > 0) {
                    setDeparture(fetchedAirports[0].iataCode);
                }
                if (!destination && fetchedAirports.length > 1) {
                    setDestination(fetchedAirports[1].iataCode);
                }
            } catch (error) {
                console.error('Error fetching airports:', error);
            }
        };

        fetchAirports();
    }, []);

    // Swap departure and destination
    const handleSwap = () => {
        setDeparture(destination);
        setDestination(departure);
    };

    // Determine if the trip is round trip
    const isRoundTrip = selected === 'khu-hoi';

    // Search flights handler
    const handleSearchFlights = async () => {
        try {
            const searchParams: FlightSearchParams = {
                isRoundTrip,
                departure,
                destination,
                departureDate: departureDate.toDate(getLocalTimeZone()),
            };

            // Add return date for round trips
            if (selected === 'khu-hoi') {
                searchParams.returnDate = returnDate.toDate(getLocalTimeZone());
            }

            // Search flights
            const flights = await flightService.searchFlights(searchParams);

            // Navigate to results page with search parameters
            router.push(`/booking/results?flights=${JSON.stringify(flights)}&searchParams=${JSON.stringify(searchParams)}`);
        } catch (error) {
            console.error('Flight search error:', error);
            // Optional: Add error handling UI
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
                                {airports.map((airport) => (
                                    <AutocompleteItem
                                        key={airport.iataCode}
                                        value={airport.iataCode}
                                    >
                                        {`${airport.name} (${airport.iataCode})`}
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
                                {airports.map((airport) => (
                                    <AutocompleteItem
                                        key={airport.iataCode}
                                        value={airport.iataCode}
                                    >
                                        {`${airport.name} (${airport.iataCode})`}
                                    </AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>

                        {/* Departure Date Picker */}
                        <DatePicker
                            label="Ngày đi"
                            size="sm"
                            variant="bordered"
                            className="flex-auto w-64"
                            value={departureDate}
                            onChange={setDepartureDate}
                            minValue={today(getLocalTimeZone())}
                        />

                        {/* Return Date Picker (Only for round trips) */}
                        {selected === 'khu-hoi' && (
                            <DatePicker
                                label="Ngày về"
                                size="sm"
                                variant="bordered"
                                className="flex-auto w-64"
                                value={returnDate}
                                onChange={setReturnDate}
                                minValue={departureDate}
                            />
                        )}

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
            </Card>
        </div>
    );
}