"use client";
import Breadcrumbs from "@/components/admin/breadcrumb";
import Link from 'next/link';
import { Button, Input, RadioGroup, Radio, Modal, DateRangePicker, AutocompleteItem, ModalContent, useDisclosure, ModalBody, ModalHeader, ModalFooter, Autocomplete } from '@nextui-org/react';
import React from 'react';
import { Flight, CreateFlightDto, FlightStatus } from "@/interfaces/flight";
import { Airport } from "@/interfaces/airport";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getLocalTimeZone, parseDate, now, CalendarDateTime } from "@internationalized/date";
import { Aircraft, AircraftStatus } from "@/interfaces/aircraft";

const statusOptions = [
    { name: "Đã lên lịch", uid: "Scheduled" },
    { name: "Đã đến", uid: "Arrived" },
    { name: "Chậm", uid: "Delayed" },
    { name: "Hủy", uid: "Cancelled" },
];

export default function Page() {
    const router = useRouter(); 
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
    const { isOpen: isFetchedErrorOpen, onOpen: onFetchedErrorOpen, onClose: onFetchedErrorClose } = useDisclosure();
    const { isOpen: isDuplicatedOpen, onOpen: onDuplicatedOpen, onClose: onDuplicatedClose } = useDisclosure();

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

    const [dateRange, setDateRange] = React.useState({
        start: new CalendarDateTime(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), 0, 0),
        end: new CalendarDateTime(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), 0, 0)
      });
    
    
    React.useEffect(() => {
        const startZoned = now("UTC");
        const endZoned = now("UTC").add({ days: 7 });
        const start = new CalendarDateTime(startZoned.year, startZoned.month, startZoned.day, startZoned.hour, startZoned.minute);
        const end = new CalendarDateTime(endZoned.year, endZoned.month, endZoned.day, endZoned.hour, endZoned.minute);
        setDateRange({ start, end });
        setDepartureTimeValue(start.toDate("UTC").toISOString());
        setArrivalTimeValue(end.toDate("UTC").toISOString());
        setDurationValue(calculateDuration(start, end))
    }, []);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const aircraftRes = await axios.get("http://localhost:5000/aircraft");
                const airportRes = await axios.get("http://localhost:5000/airport"); 
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

        console.log(flightNumberValue, aircraftValue, departureAirport, arrivalAirport, departureTimeValue, arrivalTimeValue, statusValue, availableSeatsValue, seatClasses, durationValue);

        if (!flightNumberValue || !aircraftValue || !departureAirport || !arrivalAirport || !departureTimeValue || !arrivalTimeValue || !statusValue || !availableSeatsValue || !seatClasses || !durationValue) {
            onErrorOpen();
            return;
        }

        const data: CreateFlightDto = {
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
        };
        // Call API to create promotion
        try {
            console.log(data);
            const res = await axios.post("http://localhost:5000/flight", data);
            onOpen();
        } catch (error) {
            console.log(data)
            console.error(error);
            onErrorOpen();
        }
    }

    const handleCloseModal = () => {
      onClose();
      
      router.push("/admin/flight");
    };

    const handleCloseErrorModal = () => {
      onErrorClose();
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
                { label: 'Thêm chuyến bay', href: `/admin/flight/create`, active: true},
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
                        onChange={(e) => setAircraftCodeValue(e.target.value)} 
                        onSelectionChange={onSelectionChange} 
                        items={aircrafts.map((aircraft) => ({
                            key: aircraft.aircraftCode, 
                            label: `${aircraft.aircraftCode} - ${aircraft.model}`, 
                        }))}
                        aria-label="Tàu bay"
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
                    <div key={seatClass}>
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
                    </div>
                ))}

                <div>
                    <Autocomplete
                        isRequired
                        label="Sân bay khởi hành"
                        labelPlacement="outside"
                        placeholder="Chọn sân bay khởi hành"
                        value={departureAirportValue}
                        onChange={(e) => setDepartureAirportValue(e.target.value)} 
                        onSelectionChange={
                            (selectedKey) => onDepartureAirportSelectionChange(selectedKey)
                        }  
                        items={airports.map((airport) => ({
                            key: airport.iataCode, 
                            label: `${airport.iataCode} - ${airport.name}`,
                        }))}
                        aria-label="Chọn sân bay khởi hành"
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
                        onChange={(e) => setArrivalAirportValue(e.target.value)} 
                        onSelectionChange={
                            (selectedKey) => onArrivalAirportSelectionChange(selectedKey)
                        } 
                        items={airports.map((airport) => ({
                            key: airport.iataCode,
                            label: `${airport.iataCode} - ${airport.name}`, 
                        }))}
                        aria-label="Chọn sân bay đến"
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

            </div>
            <div className="mt-6 flex justify-end gap-4 pb-5">
                <Link
                    href="/admin/flight"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Quay lại
                </Link>
                <Button type="submit" className="bg-blue-normal text-white">Tạo chuyến bay</Button>
            </div>
          </form>
        </div>

        <Modal isOpen={isOpen} onClose={handleCloseModal} isDismissable={false} isKeyboardDismissDisabled={true}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Thành công</ModalHeader>
              <ModalBody>
                <p>Tạo chuyến bay thành công!</p>
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
                        <p>Vui lòng kiểm tra lại thông tin. Đã có lỗi xảy ra khi tạo chuyến bay</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={handleCloseErrorModal}>
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