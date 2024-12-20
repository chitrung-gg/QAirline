"use client";
import Breadcrumbs from "@/components/admin/breadcrumb";
import Link from 'next/link';
import { Button, Input, RadioGroup, Radio, Modal, ModalContent, useDisclosure, ModalBody, ModalHeader, ModalFooter } from '@nextui-org/react';
import React from 'react';
import { Aircraft, AircraftStatus, CreateAircraftDto } from '@/interfaces/aircraft';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const statusOptions = [
  {name: "Hoạt động", uid: "Active"},
  {name: "Không sử dụng", uid: "Retired"},
  {name: "Bảo trì", uid: "Maintenance"},
];

export default function Page() {
    const router = useRouter(); 
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();

    const [aircraftCodeValue, setAircraftCodeValue] = React.useState("");
    const [manufacturerValue, setManufacturerValue] = React.useState("");
    const [modelValue, setModelValue] = React.useState("");
    const [capacityValue, setCapacityValue] = React.useState(0);
    const [statusValue, setStatusValue] = React.useState<AircraftStatus>(AircraftStatus.ACTIVE); 
    const [seatClasses, setSeatClasses] = React.useState<{ [key: string]: number }>({
        Economy: 100,
    });
    const [seatClassNames, setSeatClassNames] = React.useState<{ [key: string]: string }>({
        Economy: "Economy",
    });


    const handleAddSeatClass = () => {
        const existingClassNames = Object.keys(seatClasses);
    
        
        let newClassNumber = 1;
        while (existingClassNames.includes(`Class ${newClassNumber}`)) {
            newClassNumber++;
        }
    
        const newClassName = `Class ${newClassNumber}`;
        setSeatClasses((prev) => ({
            ...prev,
            [newClassName]: 0, 
        }));
        setSeatClassNames((prev) => ({
            ...prev,
            [newClassName]: newClassName, 
        }));
    };

    const handleSeatClassChange = (
        className: string,
        value: string,
        isNameChange: boolean
    ) => {
        if (isNameChange) {
            setSeatClassNames((prev) => ({
                ...prev,
                [className]: value,
            }));
        } else {
            setSeatClasses((prev) => ({
                ...prev,
                [className]: parseInt(value),
            }));
        }
    };

    const handleRemoveSeatClass = (className: string) => {
        if (Object.keys(seatClasses).length > 1) {
            const newSeatClasses = { ...seatClasses };
            const newSeatClassNames = { ...seatClassNames };
            delete newSeatClasses[className];
            delete newSeatClassNames[className];
            setSeatClasses(newSeatClasses);
            setSeatClassNames(newSeatClassNames);
        } else {
            alert("Không thể xóa hạng ghế, ít nhất một hạng ghế phải tồn tại.");
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 

        if (
          !aircraftCodeValue ||
          !manufacturerValue ||
          !modelValue ||
          capacityValue <= 0 ||
          !statusValue ||
          Object.keys(seatClasses).length === 0
        ) {
            onErrorOpen();
            return;
        }

        const seatClassesWithNames: { [key: string]: number } = {};
        Object.entries(seatClassNames).forEach(([className, name]) => {
            if (name.trim()) {
                seatClassesWithNames[name] = seatClasses[className]; // Sử dụng tên mới
            }
        });

        const data: CreateAircraftDto = {
            aircraftCode: aircraftCodeValue,
            model: modelValue,
            capacity: capacityValue,
            status: statusValue,
            manufacturer: manufacturerValue,
            //seatClasses,
            seatClasses: seatClassesWithNames,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        try {
          await axios.post("http://localhost:5000/aircraft", data);
          onOpen(); //open modal

        } catch (error) {
          console.error("Tạo tàu bay thất bại", error);
          onErrorOpen();
        }
    };

    const handleCloseModal = () => {
      onClose();
      
      router.push("/admin/aircraft");
    };

    const handleCloseErrorModal = () => {
      onErrorClose();
    };


    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
                { label: 'Tàu bay', href: '/admin/aircraft' },
                { label: 'Thêm tàu bay', href: `/admin/aircraft/create`, active: true},
            ]}
        />
        <form className="w-full mb-5 max-h-[75vh] md:max-h-[90vh] overflow-y-auto" onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-5">
                <div>
                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Mã máy bay"
                        size="lg" 
                        radius="sm"
                        type="text" 
                        label="Mã máy bay" 
                        variant="bordered" 
                        className="py-3 font-semibold"
                        value={aircraftCodeValue}
                        onChange={(e) => setAircraftCodeValue(e.target.value)}
                    />
                </div>

                <div>
                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Model máy bay"
                        size="lg" 
                        radius="sm"
                        type="text" 
                        label="Model máy bay" 
                        variant="bordered" 
                        className="py-3 font-semibold"
                        value={modelValue}
                        onChange={(e) => setModelValue(e.target.value)}
                    />
                </div>

                <div>
                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Sức chứa máy bay"
                        size="lg" 
                        radius="sm"
                        type="number" 
                        label="Sức chứa máy bay" 
                        variant="bordered" 
                        className="py-3 font-semibold"
                        value={capacityValue.toString()}
                        onChange={(e) => setCapacityValue(Number(e.target.value))}
                    />
                </div>

                <div>
                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Hãng sản xuất"
                        size="lg" 
                        radius="sm"
                        type="text" 
                        label="Hãng sản xuất" 
                        variant="bordered" 
                        className="py-3 font-semibold"
                        value={manufacturerValue}
                        onChange={(e) => setManufacturerValue(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-md font-semibold py-2">Hạng ghế <span className="text-red-400">*</span></label>
                    {Object.entries(seatClasses).map(([className, numSeats]) => (
                        <div key={className} className="flex items-center gap-4 mb-2">
                             <Input
                                labelPlacement={"outside"}
                                placeholder="Tên hạng ghế"
                                size="lg"
                                radius="sm"
                                type="text"
                                label={`Tên hạng ghế`}
                                variant="bordered"
                                value={seatClassNames[className]} 
                                onChange={(e) => handleSeatClassChange(className, e.target.value, true)} 
                                className="my-2"
                            />
                            <Input
                                labelPlacement={"outside"}
                                placeholder="Số ghế"
                                size="lg"
                                radius="sm"
                                type="number"
                                label="Số ghế"
                                variant="bordered"
                                value={numSeats.toString()}
                                onChange={(e) => handleSeatClassChange(className, e.target.value, false)}
                                className="my-2"
                            />
                            <Button
                                size="md"
                                className='bg-red-400 text-white mt-3'
                                onClick={() => handleRemoveSeatClass(className)}
                                disabled={Object.keys(seatClasses).length <= 1} 
                            >
                                Xóa
                            </Button>
                        </div>
                    ))}
                    <Button onClick={handleAddSeatClass} className="bg-blue-normal text-white">
                        Thêm hạng ghế
                    </Button>
                </div>

                <div className="pb-3">
                    <label className="block text-md font-semibold my-2">
                        Trạng thái <span className="text-red-400">*</span>
                    </label>
                    <RadioGroup 
                        orientation="horizontal"
                        value={statusValue}
                        onValueChange={(value) => setStatusValue(value as AircraftStatus)}
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
                    href="/admin/aircraft"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Quay lại
                </Link>
                <Button type="submit" className="bg-blue-normal text-white">Tạo tàu bay</Button>
            </div>
        </form>

        <Modal isOpen={isOpen} onClose={handleCloseModal} isDismissable={false} isKeyboardDismissDisabled={true}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Thành công</ModalHeader>
              <ModalBody>
                <p>Tạo tàu bay thành công!</p>
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
                        <p>Vui lòng kiểm tra lại thông tin. Đã có lỗi xảy ra khi tạo tàu bay.</p>
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