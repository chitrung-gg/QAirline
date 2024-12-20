"use client";
import Breadcrumbs from "@/components/admin/breadcrumb";
import Link from 'next/link';
import { Button, Input, RadioGroup, Radio, DatePicker, Modal, DateRangePicker, AutocompleteItem, ModalContent, useDisclosure, ModalBody, ModalHeader, ModalFooter, Autocomplete } from '@nextui-org/react';
import React from 'react';
import { Booking, BookingStatus, PaymentStatus } from "@/interfaces/booking";
import { Airport } from "@/interfaces/airport";
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { parseDate, parseDateTime } from '@internationalized/date';

const bookingStatusOptions = [
    { name: "Đã xác nhận", uid: "Confirmed" },
    { name: "Đang chờ", uid: "Pending" },
    { name: "Đã hủy", uid: "Cancelled" }
];

const paymentStatusOptions = [
    { name: "Đã thanh toán", uid: "Paid" },
    { name: "Đang chờ", uid: "Pending" },
    { name: "Chưa thanh toán", uid: "Unpaid" }
];

export default function Page(props: { params: { id: string } }) {
    const [params, setParams] = React.useState<{ id: string } | null>(null);
    const { id } = useParams();

    React.useEffect(() => {
      setParams(props.params);
    }, [props.params]);

    const [initialData, setInitialData] = React.useState<Booking | null>(null); 

    React.useEffect(() => {
        const fetchData = async () => {
            if (!id) return;  
            const res = await axios.get(`http://localhost:5000/booking/${id}`);
            const data = res.data;     
            //console.log('data:', data);       
            setInitialData(data);
        };
    
        fetchData();
    }, [id]);
    
    
    if (!initialData) {
        return <div className="text-xl md:text-2xl">Loading...</div>;
    }

    const dateString = initialData.bookingDate.split('T')[0];
    const dobString = initialData.passengerDob.split('T')[0];

    return (
      <main className='h-full w-full'>
        <h1 className="text-xl md:text-2xl text-blue-normal mb-3">
          Chi tiết đặt vé
        </h1>
        <div className="w-full mb-5 max-h-[75vh] md:max-h-[90vh] overflow-y-auto">
            <div className="rounded-md bg-gray-50 p-4 md:p-5">

                {initialData && initialData.user  && (
                  <div>
                    <label className="block text-md font-semibold py-2">Người dùng</label>
                    <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/${initialData.user.id}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {initialData.user.email}
                        </Link>
                    </div>
                  </div>
                )}

                {initialData && initialData.flight  && (
                  <div>
                    <label className="block text-md font-semibold py-2">Chuyến bay</label>
                    <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/flight/${initialData.flight.id}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {initialData.flight.flightNumber}
                        </Link>
                    </div>
                  </div>
                )}

                <Input
                    isRequired
                    label="Tên người đặt"
                    labelPlacement="outside"
                    type="text"
                    placeholder="Tên người đặt"
                    value={initialData.passengerName}
                    isReadOnly
                    size="lg"
                    radius="sm"
                    variant="bordered"
                    className="py-3 font-semibold"
                />

                <DatePicker
                    isRequired
                    label="Ngày sinh"
                    labelPlacement="outside"
                    //value={initialData.passengerDob}
                    value={parseDate(dobString)}
                    isReadOnly
                    size="lg"
                    radius="sm"
                    variant="bordered"
                    className="py-3 font-semibold"
                />

                <Input
                    isRequired
                    label="Số hộ chiếu"
                    labelPlacement="outside"
                    type="text"
                    placeholder="Số hộ chiếu"
                    value={initialData.passportNumber}
                    isReadOnly
                    size="lg"
                    radius="sm"
                    variant="bordered"
                    className="py-3 font-semibold"
                />

                <Input
                    isRequired
                    label="Mã đặt vé"
                    labelPlacement="outside"
                    type="text"
                    placeholder="Mã đặt vé"
                    value={initialData.bookingCode}
                    isReadOnly
                    size="lg"
                    radius="sm"
                    variant="bordered"
                    className="py-3 font-semibold"
                />

                {/* {Object.keys(initialData.ticketPrice).map((ticketPrice) => (
                    <div key={ticketPrice}>
                        <Input
                            label={`Giá (${ticketPrice})`}
                            labelPlacement="outside"
                            size="md"
                            radius="sm"
                            variant="bordered"
                            className="py-3 font-semibold"
                            type="number"
                            value={initialData.ticketPrice[ticketPrice].toString()}
                            isReadOnly
                        />
                    </div>
                ))} */}
                <div>
                    <Input
                        label={`Giá vé`}
                        labelPlacement="outside"
                        size="lg"
                        radius="sm"
                        variant="bordered"
                        className="py-3 font-semibold"
                        type="number"
                        value={initialData.ticketPrice[initialData.seatClass].toString()}
                        isReadOnly
                    />
                </div>

                <Input
                    isRequired
                    label="Hạng ghế"
                    labelPlacement="outside"
                    type="text"
                    placeholder="Hạng ghế"
                    value={initialData.seatClass}
                    isReadOnly
                    size="lg"
                    radius="sm"
                    variant="bordered"
                    className="py-3 font-semibold"
                />

                <div>
                    <DatePicker
                        isRequired
                        showMonthAndYearPickers
                        //defaultValue={parseDate(initialData.bookingDate)} 
                        value={parseDate(dateString)}
                        label="Ngày đặt vé"
                        labelPlacement="outside"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        className="py-3 font-semibold"
                        isReadOnly
                    />
                </div>

                <div>
                    <label className="block text-md font-semibold py-2">
                        Trạng thái đặt vé <span className="text-red-400">*</span>
                    </label>
                    <RadioGroup 
                        orientation="horizontal"
                        value={initialData.bookingStatus}
                        isDisabled
                    >
                        {bookingStatusOptions.map((option) => (
                            <Radio key={option.uid} value={option.uid}>
                                {option.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>

                <div>
                    <label className="block text-md font-semibold py-2">
                        Trạng thái thanh toán <span className="text-red-400">*</span>
                    </label>
                    <RadioGroup 
                        orientation="horizontal"
                        value={initialData.paymentStatus}
                        isDisabled
                    >
                        {paymentStatusOptions.map((option) => (
                            <Radio key={option.uid} value={option.uid}>
                                {option.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>

            </div>
            <div className="mt-6 flex justify-end gap-4 pb-5">
                <Link
                    href="/admin"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                    Quay lại
                </Link>
            </div>
        </div>
      </main>
    );
  }