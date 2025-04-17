"use client";
import Breadcrumbs from "@/components/admin/breadcrumb";
import Link from 'next/link';
import { Button, Input, RadioGroup, Radio, Modal, DatePicker, AutocompleteItem, ModalContent, useDisclosure, ModalBody, ModalHeader, ModalFooter, Autocomplete } from '@nextui-org/react';
import React from 'react';
import { Flight, CreateFlightDto, FlightStatus } from "@/interfaces/flight";
import { Airport } from "@/interfaces/airport";
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { getLocalTimeZone, DateValue, parseDate, now, CalendarDateTime, parseZonedDateTime, today } from "@internationalized/date";
import { UserRole, User, UserGender } from "@/interfaces/user";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

const genderOptions = [
    { name: "Nam", uid: "Male" },
    { name: "Nữ", uid: "Female" },
    { name: "Khác", uid: "Other" },
];

const roleOptions = [
    { name: "Admin", uid: "Admin" },
    { name: "Người dùng", uid: "User" }
];

export default function Page({ params }: { params: { id: string } }) {
    const [id, setId] = React.useState<string | null>(null);

    React.useEffect(() => {
        setId(params.id);
    }, [params]);

    const [initialData, setInitialData] = React.useState<User | null>(null);

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    React.useEffect(() => {
        const fetchData = async () => {
            console.log('ID:', id);
            if (!id) return;  
            const res = await axios.post(`http://localhost:5000/user/id`, {
                id: id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            const data = res.data;
            setInitialData(data);
        };

        fetchData();
    }, [id]);

    if (!initialData) {
        return <div className="text-xl md:text-2xl">Loading...</div>;
    }

    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Người dùng', href: '/admin' },
            {
                label: 'Chi tiết người dùng',
                href: `/admin/${id}`,
                active: true,
            },
            ]}
        />
        <div className="w-full mb-5 max-h-[70vh] md:max-h-[90vh] overflow-y-auto">
            <div className="rounded-md bg-gray-50 p-4 md:p-5">
                <div>
                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Email"
                        size="lg"
                        radius="sm"
                        type="text"
                        label="Email"
                        variant="bordered"
                        className="py-3 font-semibold"
                        value={initialData.email}
                        isReadOnly
                    />
                </div>

                <div>
                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Tên người dùng"
                        size="lg"
                        radius="sm"
                        type="text"
                        label="Tên người dùng"
                        variant="bordered"
                        className="py-3 font-semibold"
                        value={initialData.username}
                        isReadOnly
                    />
                </div>
    
                {/* <Input 
                    isRequired
                    labelPlacement={"outside"}
                    placeholder="Mật khẩu"
                    size="lg" 
                    radius="sm" 
                    label="Mật khẩu" 
                    variant="bordered" 
                    className="py-3 font-semibold"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility} aria-label="toggle password visibility">
                            {isPasswordVisible ? (
                                <HiEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <HiEye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isPasswordVisible ? "text" : "password"}
                    value={initialData.password}
                    isReadOnly
                /> */}

                <Input 
                    isRequired
                    labelPlacement={"outside"}
                    placeholder="Số điện thoại"
                    size="lg" 
                    radius="sm"
                    type="text" 
                    label="SĐT" 
                    variant="bordered" 
                    value={initialData.phoneNumber}
                    className="py-3 font-semibold"
                    isReadOnly
                />

                <div>
                    <Input 
                        labelPlacement={"outside"}
                        placeholder="Nguyễn"
                        size="lg"
                        radius="sm"
                        type="text"
                        label="Họ"
                        variant="bordered"
                        className="py-3 font-semibold"
                        value={initialData.lastName || ""}
                        isReadOnly
                    />
                </div>

                <div>
                    <Input 
                        labelPlacement={"outside"}
                        placeholder="Chí Trung"
                        size="lg"
                        radius="sm"
                        type="text"
                        label="Tên đệm và tên"
                        variant="bordered"
                        className="py-3 font-semibold"
                        value={initialData.firstName || ""}
                        isReadOnly
                    />
                </div>

                <DatePicker
                    className="py-3 font-semibold"
                    label="Ngày sinh"
                    labelPlacement='outside'
                    value={initialData.dob ? today("UTC").set({ year: new Date(initialData.dob).getFullYear(), month: new Date(initialData.dob).getMonth() + 1, day: new Date(initialData.dob).getDate() }) : null}
                    variant='bordered'
                    size='lg'
                    radius='sm'
                    disableAnimation
                    showMonthAndYearPickers
                />

                <div className="py-3">
                    <label className="block text-md font-semibold my-2">
                        Giới tính
                    </label>
                    <RadioGroup 
                        orientation="horizontal"
                        value={initialData.gender || UserGender.MALE} 
                        isDisabled
                    >
                        {genderOptions.map((option) => (
                            <Radio key={option.uid} value={option.uid}>
                                {option.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>

                <div className="py-3">
                    <label className="block text-md font-semibold my-2">
                        Vai trò
                    </label>
                    <RadioGroup 
                        orientation="horizontal"
                        value={initialData.role} 
                        isDisabled
                    >
                        {roleOptions.map((option) => (
                            <Radio key={option.uid} value={option.uid}>
                                {option.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>

                <div>
                    <Input 
                        labelPlacement={"outside"}
                        placeholder="Địa chỉ"
                        size="lg"
                        radius="sm"
                        type="text"
                        label="Địa chỉ"
                        variant="bordered"
                        className="py-3 font-semibold"
                        value={initialData.address || ""}
                        isReadOnly
                    />
                </div>

                <div>
                    <Input 
                        labelPlacement={"outside"}
                        placeholder="Số hộ chiếu"
                        size="lg"
                        radius="sm"
                        type="text"
                        label="Số hộ chiếu"
                        variant="bordered"
                        className="py-3 font-semibold"
                        value={initialData.passportNumber || ""}
                        isReadOnly
                    />
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