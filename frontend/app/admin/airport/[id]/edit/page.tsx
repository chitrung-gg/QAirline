"use client";
import Breadcrumbs from "@/components/admin/breadcrumb";
import Link from 'next/link';
import { Button, Input, Textarea, Chip, Radio, RadioGroup, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { Airport, UpdateAirportDto } from "@/interfaces/airport";
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { on } from "events";

export default function Page(props: { params: { id: string } }) {
    const [params, setParams] = useState<{ id: string } | null>(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
    const { isOpen: isDeletedOpen, onOpen: onDeletedOpen, onClose: onDeletedClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    const [initialData, setInitialData] = useState<Airport | null>(null);

    const [nameValue, setNameValue] = React.useState("");
    const [cityValue, setCityValue] = React.useState("");
    const [countryValue, setCountryValue] = React.useState("");
    const [iataCodeValue, setIataCodeValue] = React.useState("");

    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        setParams(props.params);
    }, [props.params]);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;  
            const res = await axios.get(`http://localhost:5000/airport/${id}`);
            const data = res.data;
            setInitialData(data);
            console.log(data);
            setNameValue(data.name);
            setCityValue(data.city);
            setCountryValue(data.country);
            setIataCodeValue(data.iataCode);
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 

        if (!nameValue || !cityValue || !countryValue || !iataCodeValue) {
            onErrorOpen();
            return;
        }

        if (!initialData) {
            onErrorOpen();
            return;
        }

        const formData: UpdateAirportDto = {
            name: nameValue,
            city: cityValue,
            country: countryValue,
            iataCode: iataCodeValue,
        };

        try {
            const res = await axios.patch(`http://localhost:5000/airport/${id}`, formData);
            onOpen();
            console.log(formData);
        } catch (error) {
            onErrorOpen();
            console.error(error);
        }
    };

    const handleDelete = async () => {
        // const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa thông tin này?"); // Remake UI for confirmation
        // if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/airport/${id}`);
                onDeletedOpen();
            } catch (error) {
                console.error(error);
                onErrorOpen();
            }
        // }
    };

    const handleCloseModal = () => {
        onClose();
        router.push("/admin/airport");
    };

    const handleCloseErrorModal = () => {
        onErrorClose();
    };

    const handleCloseDeletedModal = () => {
        onDeletedClose();
        router.push("/admin/airport");
    };


    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
                { label: 'Sân bay', href: '/admin/airport' },
                { label: 'Chi tiết', href: `/admin/airport/${id}`},
                { label: 'Chỉnh sửa sân bay', href: `/admin/airport/${id}/edit`, active: true},
            ]}
        />
        <div className="flex w-full items-center justify-between">
        <form className="w-full mb-5 max-h-[50vh] md:max-h-[90vh] overflow-y-auto" onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-5">
                <div>
                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Tên sân bay"
                        size="lg"
                        radius="sm"
                        type="text"
                        label="Tên sân bay"
                        variant="bordered"
                        className="py-3 font-semibold"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                    />
                </div>

                <div>
                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Thành phố"
                        size="lg"
                        radius="sm"
                        type="text"
                        label="Thành phố"
                        variant="bordered"
                        className="py-3 font-semibold"
                        value={cityValue}
                        onChange={(e) => setCityValue(e.target.value)}
                    />
                </div>

                <div>
                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Quốc gia"
                        size="lg"
                        radius="sm"
                        type="text"
                        label="Quốc gia"
                        variant="bordered"
                        className="py-3 font-semibold"
                        value={countryValue}
                        onChange={(e) => setCountryValue(e.target.value)}
                    />
                </div>

                <div>
                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Mã IATA"
                        size="lg"
                        radius="sm"
                        type="text"
                        label="Mã IATA"
                        variant="bordered"
                        className="py-3 font-semibold"
                        value={iataCodeValue}
                        onChange={(e) => setIataCodeValue(e.target.value.toUpperCase())}
                    />
                </div>

            </div>

            <div className="mt-6 flex justify-end gap-4 pb-5">
                <Link
                    href="/admin/airport"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Quay lại
                </Link>
                {(
                (initialData?.departures?.length === 0 || initialData?.departures == null) &&
                (initialData?.arrivals?.length === 0 || initialData?.arrivals == null)
                ) && (
                <Button 
                    type="button" 
                    className="bg-red-400 text-white"
                    onClick={onDeleteOpen}
                >
                    Xóa sân bay
                </Button>
                )}
                <Button type="submit" className="bg-blue-normal text-white">Cập nhật sân bay</Button>
            </div>
          </form>
        </div>

        <Modal isOpen={isOpen} onClose={handleCloseModal} isDismissable={false} isKeyboardDismissDisabled={true}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Thành công</ModalHeader>
              <ModalBody>
                <p>Chỉnh sửa sân bay thành công!</p>
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
                    <p>Vui lòng kiểm tra lại thông tin. Đã có lỗi xảy ra khi chỉnh sửa sân bay.</p>
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

        <Modal isOpen={isDeletedOpen} onClose={handleCloseDeletedModal}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Xóa thành công</ModalHeader>
                <ModalBody>
                    <p>Xóa sân bay thành công!</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="light" onPress={handleCloseDeletedModal}>
                        Đóng
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
      </main>
    );
  }