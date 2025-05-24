"use client";
import Breadcrumbs from "@/components/admin/breadcrumb";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { Aircraft, AircraftStatus } from "@/interfaces/aircraft";
import { Airport } from "@/interfaces/airport";
import { Flight, FlightStatus, UpdateFlightDto } from "@/interfaces/flight";
import Link from 'next/link';
import { Button, Input, DateRangePicker, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Autocomplete, AutocompleteItem, Radio, RadioGroup } from '@nextui-org/react';
import { getLocalTimeZone, parseDate, now, CalendarDateTime, parseZonedDateTime, toCalendarDateTime } from "@internationalized/date";

const statusOptions = [
    { name: "Đã lên lịch", uid: "Scheduled" },
    { name: "Đã đến", uid: "Arrived" },
    { name: "Chậm", uid: "Delayed" },
    { name: "Hủy", uid: "Cancelled" },
];

export default function Page(props: { params: { id: string } }) {
    const [params, setParams] = useState<{ id: string } | null>(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
    const { isOpen: isDeletedOpen, onOpen: onDeletedOpen, onClose: onDeletedClose } = useDisclosure();
    const { isOpen: isFetchedErrorOpen, onOpen: onFetchedErrorOpen, onClose: onFetchedErrorClose } = useDisclosure();
    const { isOpen: isDuplicatedOpen, onOpen: onDuplicatedOpen, onClose: onDuplicatedClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    const [initialData, setInitialData] = useState<Flight | null>(null);
    const [flightNumberValue, setFlightNumberValue] = React.useState("");

    const [aircrafts, setAircrafts] = React.useState<Aircraft[]>([]); 
    const [aircraftCodeValue, setAircraftCodeValue] = React.useState(""); 
    const [aircraftValue, setAircraftValue] = React.useState<Aircraft | null>(null);

    const [airports, setAirports] = React.useState<Airport[]>([]); 
    const [departureAirportValue, setDepartureAirportValue] = React.useState("");
    const [arrivalAirportValue, setArrivalAirportValue] = React.useState(""); 
    const [departureAirport, setDepartureAirport] = React.useState<Airport | null>(null); 
    const [arrivalAirport, setArrivalAirport] = React.useState<Airport | null>(null); 

    const [departureTimeValue, setDepartureTimeValue] = React.useState("");
    const [arrivalTimeValue, setArrivalTimeValue] = React.useState("");
    const [statusValue, setStatusValue] = React.useState(FlightStatus.SCHEDULED);
    const [availableSeatsValue, setAvailableSeatsValue] = React.useState(0);
    const [durationValue, setDurationValue] = React.useState(0);

    const [seatClasses, setSeatClasses] = React.useState<{ [key: string]: number }>({});
    const [baseClassPrice, setBaseClassPrice] = React.useState<{ [key: string]: number }>({});

    const [dateRange, setDateRange] = React.useState({
        start: new CalendarDateTime(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), 0, 0),
        end: new CalendarDateTime(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), 0, 0)
    });

    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        setParams(props.params);
    }, [props.params]);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;  
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/flight/${id}`);
            const data = res.data;
            setInitialData(data);
            setFlightNumberValue(data.flightNumber);
            setAircraftValue(data.aircraft);
            setDepartureAirport(data.departureAirport);
            setArrivalAirport(data.arrivalAirport);
            setDepartureTimeValue(data.departureTime);
            setArrivalTimeValue(data.arrivalTime);
            setStatusValue(data.status);
            setAvailableSeatsValue(data.availableSeats);
            setSeatClasses(data.seatClasses);
            setDurationValue(data.duration);
            setBaseClassPrice(data.baseClassPrice);

            const startZonedDateTime = parseZonedDateTime(data.departureTime.slice(0, 19) + "[UTC]");
            const endZonedDateTime = parseZonedDateTime(data.arrivalTime.slice(0, 19) + "[UTC]");
            setDateRange({
                start: toCalendarDateTime(startZonedDateTime), 
                end: toCalendarDateTime(endZonedDateTime),
            });
        };

        fetchData();
    }, [id]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const aircraftRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/aircraft`);
                const airportRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/airport`); 
                const activeAircrafts = aircraftRes.data.filter((aircraft: Aircraft) => aircraft.status === AircraftStatus.ACTIVE);
                setAircrafts(activeAircrafts);
                setAirports(airportRes.data);
            } catch (error) {
                onFetchedErrorOpen();
                console.error("Failed to fetch data", error);
            }
        };
        fetchData();
    }, []); 

    const onSelectionChange = (selectedKey: React.Key | null) => {
        const selectedAircraft = aircrafts.find((aircraft) => aircraft.aircraftCode === selectedKey);
        setAircraftValue(selectedAircraft || null); 

        if (selectedAircraft) {
            // Set initial availableSeats and seatClasses based on selected aircraft
            setAvailableSeatsValue(selectedAircraft.capacity);
            setSeatClasses({ ...selectedAircraft.seatClasses });
        }
    };

    const onDepartureAirportSelectionChange = (selectedKey: React.Key | null) => {
        const selectedAirport = airports.find((airport) => airport.iataCode === selectedKey);
    
        if (selectedAirport && selectedAirport.iataCode !== arrivalAirport?.iataCode) {
            setDepartureAirport(selectedAirport || null);
        } else if (selectedAirport && selectedAirport.iataCode === arrivalAirport?.iataCode) {
            onDuplicatedOpen();
            setDepartureAirport(null); 
        }
    };

    const onArrivalAirportSelectionChange = (selectedKey: React.Key | null) => {
        const selectedAirport = airports.find((airport) => airport.iataCode === selectedKey);
    
        if (selectedAirport && selectedAirport.iataCode !== departureAirport?.iataCode) {
            setArrivalAirport(selectedAirport || null);
        } else if (selectedAirport && selectedAirport.iataCode === departureAirport?.iataCode) {
            onDuplicatedOpen();
            setArrivalAirport(null);
        }
    };

    const calculateDuration = (start: CalendarDateTime, end: CalendarDateTime) => {
        const diffInMillis = end.toDate(getLocalTimeZone()).getTime() - start.toDate(getLocalTimeZone()).getTime();
        const diffInMinutes = diffInMillis / (1000 * 60); // Convert milliseconds to minutes
        return diffInMinutes;
    };

    const handleDateChange = (range: { start: CalendarDateTime, end: CalendarDateTime }) => {
        setDateRange(range);
    
        const startISO = range.start.toDate("UTC").toISOString(); 
        const endISO = range.end.toDate("UTC").toISOString(); 
    
        setDepartureTimeValue(startISO);
        setArrivalTimeValue(endISO);
    
        const duration = calculateDuration(range.start, range.end);
        setDurationValue(duration); 
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 

        if (!initialData) {
            onErrorOpen();
            return;
        }

        if (!flightNumberValue || !aircraftValue || !departureAirport || !arrivalAirport || !departureTimeValue || !arrivalTimeValue || !statusValue || !availableSeatsValue || !seatClasses || !durationValue) {
            onErrorOpen();
            return;
        }

        const formData: UpdateFlightDto = {
            flightNumber: flightNumberValue,
            aircraft: aircraftValue,
            departureAirport: departureAirport,
            arrivalAirport: arrivalAirport,
            departureTime: departureTimeValue,
            arrivalTime: arrivalTimeValue,
            status: statusValue,
            availableSeats: availableSeatsValue,
            seatClasses: seatClasses,
            duration: durationValue,
            baseClassPrice: baseClassPrice,
        };

        try {
            console.log(formData);
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/flight/${id}`, formData);
            onOpen();
        } catch (error) {
            onErrorOpen();
            console.error(error);
        }
    };

    const handleDelete = async () => {
        // const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa thông tin này?"); // Remake UI for confirmation
        // if (confirmDelete) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/flight/${id}`);
                onDeletedOpen();
            } catch (error) {
                console.error(error);
                onErrorOpen();
            }
        // }
    };

    const handleCloseModal = () => {
        onClose();
        router.push("/admin/flight");
    };

    const handleCloseErrorModal = () => {
        onErrorClose();
    };

    const handleCloseDeletedModal = () => {
        onDeletedClose();
        router.push("/admin/flight");
    };

    const handleCloseFetchedErrorModal = () => {
        onFetchedErrorClose();

        router.push("/admin/flight");
    };

    const handleCloseDuplicatedModal = () => {
        onDuplicatedClose();
    };

    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
                { label: 'Chuyến bay', href: '/admin/flight' },
                { label: 'Chi tiết', href: `/admin/flight/${id}`},
                { label: 'Chỉnh sửa chuyến bay', href: `/admin/flight/${id}/edit`, active: true},
            ]}
        />
        <div className="flex w-full items-center justify-between">
        <form className="w-full mb-5 max-h-[50vh] md:max-h-[90vh] overflow-y-auto" onSubmit={handleSubmit}>
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
                        value={flightNumberValue}
                        onChange={(e) => setFlightNumberValue(e.target.value.toUpperCase())}
                    />
                </div>

                <div>
                    <Autocomplete
                        isRequired
                        label="Tàu bay"
                        labelPlacement="outside"
                        placeholder="Chọn tàu bay"
                        value={aircraftCodeValue}
                        selectedKey={aircraftValue?.aircraftCode}
                        onChange={(e) => setAircraftCodeValue(e.target.value)} 
                        onSelectionChange={(selectedKey) => {
                            onSelectionChange(selectedKey);
                        }}
                        items={aircrafts.map((aircraft) => ({
                            key: aircraft.aircraftCode, 
                            label: `${aircraft.aircraftCode} - ${aircraft.model}`, 
                        }))}
                        // aria-label="Tàu bay"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        className="py-3 font-semibold"
                    >
                        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                    </Autocomplete>
                </div>

                <div>
                    <Input
                        label="Số ghế khả dụng"
                        type="number"
                        labelPlacement="outside"
                        size="lg"
                        radius="sm"
                        variant="bordered"
                        className="py-3 font-semibold"
                        value={availableSeatsValue.toString()}
                        min={0}
                        max={aircraftValue?.capacity}
                        onChange={(e) => setAvailableSeatsValue(Math.min(Number(e.target.value), aircraftValue?.capacity || 0))}
                    />
                </div>

                {aircraftValue && Object.keys(aircraftValue.seatClasses).map((seatClass) => (
                    <div key={seatClass} className="flex flex-row gap-3">
                        <Input
                            label={`Số ghế lớp ${seatClass}`}
                            labelPlacement="outside"
                            size="lg"
                            radius="sm"
                            variant="bordered"
                            className="py-3 font-semibold"
                            type="number"
                            value={seatClasses[seatClass].toString()}
                            min={0}
                            max={aircraftValue.seatClasses[seatClass]}
                            onChange={(e) => setSeatClasses(prev => ({
                                ...prev,
                                [seatClass]: Math.min(Number(e.target.value), aircraftValue.seatClasses[seatClass]),
                            }))}
                        />
                        <Input
                            label={`Giá tiền lớp ${seatClass}`}
                            labelPlacement="outside"
                            size="lg"
                            radius="sm"
                            variant="bordered"
                            className="py-3 font-semibold"
                            type="number"
                            value={baseClassPrice[seatClass].toString() || ''}
                            onChange={(e) => setBaseClassPrice(prev => ({
                                ...prev,
                                [seatClass]: Math.max(Number(e.target.value), 1000),
                            }))}
                            min={1000}
                            placeholder="Nhập giá"
                        />
                    </div>
                ))}

                <div>
                    <Autocomplete
                        isRequired
                        label="Sân bay khởi hành"
                        labelPlacement="outside"
                        placeholder="Chọn sân bay khởi hành"
                        value={departureAirportValue}
                        selectedKey={departureAirport?.iataCode}
                        onChange={(e) => setDepartureAirportValue(e.target.value)} 
                        onSelectionChange={
                            (selectedKey) => onDepartureAirportSelectionChange(selectedKey)
                        } 
                        items={airports.map((airport) => ({
                            key: airport.iataCode, 
                            label: `${airport.iataCode} - ${airport.name}`,
                        }))}
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        className="py-3 font-semibold"
                    >
                        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                    </Autocomplete>
                </div>

                <div>
                    <Autocomplete
                        isRequired
                        label="Sân bay đến"
                        labelPlacement="outside"
                        placeholder="Chọn sân bay đến"
                        value={arrivalAirportValue}
                        selectedKey={arrivalAirport?.iataCode}
                        onChange={(e) => setArrivalAirportValue(e.target.value)} 
                        onSelectionChange={
                            (selectedKey) => onArrivalAirportSelectionChange(selectedKey)
                        } 
                        items={airports.map((airport) => ({
                            key: airport.iataCode,
                            label: `${airport.iataCode} - ${airport.name}`, 
                        }))}
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        className="py-3 font-semibold"
                    >
                        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                    </Autocomplete>
                </div>

                <DateRangePicker
                    isRequired
                    label="Thời gian khởi hành và đến (theo UTC)"
                    labelPlacement={"outside"}
                    size="lg"
                    radius="sm"
                    variant="bordered"
                    className="py-3 font-semibold"
                    value={dateRange}
                    //onChange={setDateRange}
                    onChange={handleDateChange}
                    disableAnimation
                    granularity="minute"
                />

                <Input
                    isRequired
                    label="Thời gian chuyến bay (phút)"
                    labelPlacement={"outside"}
                    type="number"
                    placeholder="Thời gian chuyến bay"
                    value={durationValue.toString()}
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
                        value={statusValue}
                        onValueChange={(value) => setStatusValue(value as FlightStatus)}
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
                {statusValue === "Cancelled" && (
                    <Button 
                        type="button" 
                        className="bg-red-400 text-white"
                        onClick={onDeleteOpen}
                    >
                        Xóa chuyến bay
                    </Button>
                )}

                <Button type="submit" className="bg-blue-normal text-white">Cập nhật chuyến bay</Button>
            </div>
          </form>
        </div>

        <Modal isOpen={isOpen} onClose={handleCloseModal} isDismissable={false} isKeyboardDismissDisabled={true}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Thành công</ModalHeader>
              <ModalBody>
                <p>Chỉnh sửa chuyến bay thành công!</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={handleCloseModal}>
                  Đóng
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

        <Modal isOpen={isErrorOpen} onClose={handleCloseErrorModal}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Không thành công</ModalHeader>
                <ModalBody>
                    <p>Vui lòng kiểm tra lại thông tin. Đã có lỗi xảy ra khi chỉnh sửa chuyến bay.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="light" onPress={handleCloseErrorModal}>
                        Đóng
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Xác Nhận Xóa</ModalHeader>
                <ModalBody>
                    <p>Bạn có chắc chắn muốn xóa thông tin này?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="default" variant="light" onPress={onDeleteClose}>
                        Hủy
                    </Button>
                    <Button className="bg-red-400 text-white" onPress={handleDelete}>
                        Xóa
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <Modal isOpen={isDeletedOpen} onClose={handleCloseDeletedModal} isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Xóa thành công</ModalHeader>
                <ModalBody>
                    <p>Xóa chuyến bay thành công!</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="light" onPress={handleCloseDeletedModal}>
                        Đóng
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <Modal isOpen={isFetchedErrorOpen} onClose={handleCloseFetchedErrorModal} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Đã có lỗi xảy ra</ModalHeader>
                    <ModalBody>
                        <p>Đã có lỗi xảy ra khi lấy thông tin về tàu bay hoặc sân bay</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={handleCloseFetchedErrorModal}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isDuplicatedOpen} onClose={handleCloseDuplicatedModal}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Lỗi</ModalHeader>
                    <ModalBody>
                        <p>Sân bay khởi hành và sân bay đến không được trùng nhau. Vui lòng chọn lại.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={handleCloseDuplicatedModal}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

      </main>
    );
}