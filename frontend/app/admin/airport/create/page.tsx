"use client";
import Breadcrumbs from "@/components/admin/breadcrumb";
import Link from 'next/link';
import { Button, Input, Chip, Textarea, Radio, RadioGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import React from 'react';
import { CreateAirportDto } from "@/interfaces/airport";
import axios from 'axios';
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter(); 
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();

    const [nameValue, setNameValue] = React.useState("");
    const [cityValue, setCityValue] = React.useState(""); 
    const [countryValue, setCountryValue] = React.useState("");
    const [iataCodeValue, setIataCodeValue] = React.useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        const authToken = localStorage.getItem('authToken');
        // console.log("Token:", authToken);
        const config = authToken
        ? {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        : {};

        event.preventDefault(); 

        if (!nameValue || !cityValue || !countryValue || !iataCodeValue) {
            onErrorOpen();
            return;
        }

        const data: CreateAirportDto = {
            name: nameValue,
            city: cityValue,
            country: countryValue,
            iataCode: iataCodeValue,
        };
        // Call API to create news
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/airport`, data, config);
            onOpen();
            console.log(data);
        } catch (error) {
            console.error(error);
            onErrorOpen();
        }
    };

    const handleCloseModal = () => {
        onClose();
        setTimeout(() => {
            router.push("/admin/airport");
        }, 250);  
    };

    const handleCloseErrorModal = () => {
      onErrorClose();
    };

    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
                { label: 'Sân bay', href: '/admin/airport' },
                { label: 'Thêm sân bay', href: `/admin/airport/create`, active: true},
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
                <Button type="submit" className="bg-blue-normal text-white">Tạo sân bay</Button>
            </div>
          </form>
        </div>

        <Modal isOpen={isOpen} onClose={handleCloseModal} isDismissable={false} isKeyboardDismissDisabled={true}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Thành công</ModalHeader>
              <ModalBody>
                <p>Tạo sân bay thành công!</p>
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
                        <p>Vui lòng kiểm tra lại thông tin. Đã có lỗi xảy ra khi tạo sân bay</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={handleCloseErrorModal}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
      </main>
    );
  }