"use client";
import Breadcrumbs from "@/components/admin/breadcrumb";
import Link from 'next/link';
import { Button, Input, RadioGroup, Radio, Modal, DateRangePicker, AutocompleteItem, ModalContent, useDisclosure, ModalBody, ModalHeader, ModalFooter, Autocomplete } from '@nextui-org/react';
import React from 'react';
import { Flight, CreateFlightDto, FlightStatus } from "@/interfaces/flight";
import { Airport } from "@/interfaces/airport";
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { getLocalTimeZone, parseDate, now, CalendarDateTime, parseZonedDateTime } from "@internationalized/date";
import { Aircraft, AircraftStatus } from "@/interfaces/aircraft";

const statusOptions = [
    { name: "Đã lên lịch", uid: "Scheduled" },
    { name: "Đã đến", uid: "Arrived" },
    { name: "Chậm", uid: "Delayed" },
    { name: "Hủy", uid: "Cancelled" },
];

export default function Page(props: { params: { id: string } }) {
    const [params, setParams] = React.useState<{ id: string } | null>(null);
    const { id } = useParams();

    React.useEffect(() => {
      setParams(props.params);
    }, [props.params]);

    const [initialData, setInitialData] = React.useState<Flight | null>(null);
    const [aircrafts, setAircrafts] = React.useState<Aircraft[]>([]); 
    const [airports, setAirports] = React.useState<Airport[]>([]); 

    React.useEffect(() => {
        const fetchData = async () => {
            if (!id) return;  
            const res = await axios.get(`http://localhost:5000/flight/${id}`);
            const data = res.data;            
            setInitialData(data);

            const resAircrafts = await axios.get(`http://localhost:5000/aircraft`);
            const activeAircrafts = resAircrafts.data.filter((aircraft: Aircraft) => aircraft.status === AircraftStatus.ACTIVE);
            setAircrafts(activeAircrafts);

            const resAirports = await axios.get(`http://localhost:5000/airport`);
            const airportsData = resAirports.data;
            setAirports(airportsData);
        };
    
        fetchData();
    }, [id]);
    
    const flightData = initialData;
    
    if (!flightData) {
        return <div className="text-xl md:text-2xl">Loading...</div>;
    }

    const localTimeZone = getLocalTimeZone();
    const startZonedDateTime = parseZonedDateTime(flightData.departureTime.slice(0, 19) + "[UTC]");
    const endZonedDateTime = parseZonedDateTime(flightData.arrivalTime.slice(0, 19) + "[UTC]");

    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Chuyến bay', href: '/admin/flight' },
            {
                label: 'Chi tiết chuyến bay',
                href: `/admin/flight/${id}`,
                active: true,
            },
            ]}
        />
        <div className="w-full mb-5 max-h-[75vh] md:max-h-[90vh] overflow-y-auto">
            <div className="rounded-md bg-gray-50 p-4 md:p-5">
                <div>
                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Số chuyến bay"
                        size="lg" 
                        radius="sm"
                        type="text" 
                        label="Số chuyến bay" 
                        variant="bordered" 
                        className="py-3 font-semibold"
                        value={flightData.flightNumber}
                        isReadOnly
                    />
                </div>

                <Autocomplete
                    label="Tàu bay"
                    labelPlacement="outside"
                    placeholder="Chọn tàu bay"
                    value={flightData.aircraft.aircraftCode}
                    defaultSelectedKey={flightData.aircraft.aircraftCode}
                    items={aircrafts.map((aircraft) => ({
                        key: aircraft.aircraftCode, 
                        label: `${aircraft.aircraftCode} - ${aircraft.model}`, 
                    }))}
                    aria-label="Tàu bay"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    className="py-3 font-semibold"
                    isReadOnly 
                >
                    {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                </Autocomplete>
    

                <div>
                    <Input
                        label="Số ghế khả dụng"
                        type="number"
                        labelPlacement="outside"
                        size="lg"
                        radius="sm"
                        variant="bordered"
                        className="py-3 font-semibold"
                        value={flightData.availableSeats.toString()}
                        isReadOnly
                    />
                </div>

                {Object.keys(flightData.aircraft.seatClasses).map((seatClass) => (
                    <div key={seatClass}>
                        <Input
                            label={`Số ghế lớp ${seatClass}`}
                            labelPlacement="outside"
                            size="lg"
                            radius="sm"
                            variant="bordered"
                            className="py-3 font-semibold"
                            type="number"
                            value={flightData.aircraft.seatClasses[seatClass].toString()}
                            isReadOnly
                        />
                    </div>
                ))}

                <Autocomplete
                    label="Sân bay đi"
                    labelPlacement="outside"
                    placeholder="Chọn sân bay đi"
                    value={flightData.departureAirport.iataCode}
                    defaultSelectedKey={flightData.departureAirport.iataCode}
                    items={airports.map((airport) => ({
                        key: airport.iataCode, 
                        label: `${airport.iataCode} - ${airport.name}`, 
                    }))}
                    aria-label="Sân bay đi"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    className="py-3 font-semibold"
                    isReadOnly
                >
                    {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                </Autocomplete>

                <Autocomplete
                    label="Sân bay đến"
                    labelPlacement="outside"
                    placeholder="Chọn sân bay đến"
                    value={flightData.arrivalAirport.iataCode}
                    defaultSelectedKey={flightData.arrivalAirport.iataCode}
                    items={airports.map((airport) => ({
                        key: airport.iataCode, 
                        label: `${airport.iataCode} - ${airport.name}`, 
                    }))}
                    aria-label="Sân bay đến"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    className="py-3 font-semibold"
                    isReadOnly
                >
                    {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                </Autocomplete>

                <DateRangePicker
                  isRequired
                  label="Thời gian khởi hành và đến (theo UTC)"
                  labelPlacement={"outside"}
                  size="lg"
                  radius="sm"
                  variant="bordered"
                  className="py-3 font-semibold"
                  value={{
                    start: startZonedDateTime, 
                    end: endZonedDateTime, 
                  }}
                  disableAnimation
                  granularity="minute"
                  isReadOnly
                />

                <Input
                    isRequired
                    label="Thời gian chuyến bay (phút)"
                    labelPlacement={"outside"}
                    type="number"
                    placeholder="Thời gian chuyến bay"
                    value={flightData.duration?.toString() || '0'}
                    isReadOnly
                    aria-label="Thời gian chuyến bay"
                    size="lg"
                    radius="sm"
                    variant="bordered"
                    className="py-3 font-semibold"
                />

                <div className="pb-3">
                    <label className="block text-sm font-semibold my-2">
                        Trạng thái <span className="text-red-400">*</span>
                    </label>
                    <RadioGroup 
                        orientation="horizontal"
                        value={flightData.status}
                        isDisabled
                    >
                        {statusOptions.map((option) => (
                            <Radio key={option.uid} value={option.uid}>
                                {option.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>

                {initialData && initialData.bookings && initialData.bookings.length > 0 && (
                  <div>
                    <label className="block text-md font-semibold py-2">Đặt vé</label>
                    <div className="flex flex-wrap gap-2">
                      {initialData.bookings.map((booking) => (
                        <Link
                          key={booking.id}
                          href={`/admin/booking/${booking.id}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {booking.bookingCode}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

            </div>
            <div className="mt-6 flex justify-end gap-4 pb-5">
                <Link
                    href="/admin/flight"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                    Quay lại
                </Link>
                <Button 
                    className="bg-blue-normal text-white" 
                    as={Link}
                    href={`/admin/flight/${flightData.id}/edit`}
                >
                    Chỉnh sửa
                </Button>
            </div>
        </div>
      </main>
    );
  }