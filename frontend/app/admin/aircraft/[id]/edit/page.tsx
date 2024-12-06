"use client";
import Breadcrumbs from "@/components/admin/breadcrumb";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { Aircraft, AircraftStatus, UpdateAircraftDto } from "@/interfaces/aircraft";
import Link from 'next/link';
import { Button, Input, RadioGroup, Radio, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';

const statusOptions = [
  {name: "Hoạt động", uid: "Active"},
  {name: "Vứt bỏ", uid: "Retired"},
  {name: "Bảo trì", uid: "Maintenance"},
];

export default  function Page(props: { params: { id: string } }) {
    const [params, setParams] = useState<{ id: string } | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();
    const { isOpen: isDeletedOpen, onOpen: onDeletedOpen, onClose: onDeletedClose } = useDisclosure();

    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
      setParams(props.params);
    }, [props.params]);

    const [aircraftCodeValue, setAircraftCodeValue] = React.useState("");
    const [modelValue, setModelValue] = React.useState("");
    const [manufacturerValue, setmanufacturerValue] = React.useState("");
    const [capacityValue, setCapacityValue] = React.useState(0);
    const [statusValue, setStatusValue] = React.useState<AircraftStatus>(AircraftStatus.ACTIVE);
    const [seatClasses, setSeatClasses] = React.useState<{ [key: string]: number }>({
      Economy: 100,
    });
    const [seatClassNames, setSeatClassNames] = React.useState<{ [key: string]: string }>({
      Economy: "Economy",
    });
    const [initialData, setInitialData] = useState<Aircraft | null>(null);

    useEffect(() => {
      const fetchData = async () => {
          if (!id) return;  
          const res = await axios.get(`http://localhost:5000/aircraft/${id}`);
          const data = res.data;
          setInitialData(data);
          setAircraftCodeValue(data.aircraftCode);
          setModelValue(data.model);
          setmanufacturerValue(data.manufacturer);
          setCapacityValue(data.capacity);
          setStatusValue(data.status);
          setSeatClasses(data.seatClasses);
          setSeatClassNames(
            Object.keys(data.seatClasses).reduce((acc, className) => {
              acc[className] = className;
              return acc;
            }, {} as { [key: string]: string })
          );
      };

      fetchData();
  }, [id]);

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

  const handleSeatClassChange = (className: string, value: string, isNameChange: boolean) => {
    if (isNameChange) {
      setSeatClassNames((prev) => ({
        ...prev,
        [className]: value.trim(),
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
      alert('Không thể xóa hạng ghế, ít nhất một hạng ghế phải tồn tại.');
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

    if (!initialData) {
      onErrorOpen();
      return;
  }

    const data: UpdateAircraftDto = {
        aircraftCode: aircraftCodeValue,
        model: modelValue,
        manufacturer: manufacturerValue,
        capacity: capacityValue,
        status: statusValue,
        seatClasses: seatClasses,
        createdAt: initialData.createdAt,
        updatedAt: new Date().toISOString(),
    };
    try {
        const res = await axios.patch(`http://localhost:5000/aircraft/${initialData.id}`, data);
        onOpen();
    } catch (error) {
        onErrorOpen();
        console.error(error);
    }
  };

    const handleDelete = async () => {
      try {
        const res = await axios.delete(`http://localhost:5000/aircraft/${id}`);
        onDeletedOpen();
      } catch (error) {
        console.error(error);
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

    const handleCloseDeletedModal = () => {
      onDeletedClose();

      router.push("/admin/aircraft");
    };  

    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
                { label: 'Tàu bay', href: '/admin/aircraft' },
                { label: 'Chi tiết', href: `/admin/aircraft/${id}`},
                { label: 'Chỉnh sửa thông tin', href: `/admin/aircraft/${id}/edit`, active: true},
            ]}
        />
        <form className="w-full mb-5 max-h-[75vh] md:max-h-[90vh] overflow-y-auto" onSubmit={handleSubmit}>
          <div className="rounded-md bg-gray-50 p-4 md:p-5">
            <div>
              <Input
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
                labelPlacement={"outside"}
                placeholder="Hãng máy bay"
                size="lg"
                radius="sm"
                type="text"
                label="Hãng máy bay"
                variant="bordered"
                className="py-3 font-semibold"
                value={manufacturerValue}
                onChange={(e) => setmanufacturerValue(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-md font-semibold py-2">Hạng ghế</label>
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
                    className="bg-red-400 text-white mt-3"
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
                Trạng thái
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

            {initialData && initialData.flights && initialData.flights.length > 0 && (
              <div>
                <label className="block text-md font-semibold py-2">Chuyến bay</label>
                <div className="flex flex-wrap gap-2">
                  {initialData.flights.map((flight) => (
                    <Link
                      key={flight.id}
                      href={`/admin/flights/${flight.id}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {flight.flightNumber}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-end gap-4 pb-5">
            <Link
              href="/admin/aircraft"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Quay lại
            </Link>
            <Link
              href={`/admin/aircraft/${id}`}
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Về chi tiết
            </Link>
            {initialData && (!initialData.flights || initialData.flights.length === 0) && (
              <Button 
              className="bg-red-400 text-white"
              onClick={() => handleDelete()}
              >
              Xóa tàu bay
              </Button>
            )}
            <Button type="submit" className="bg-blue-normal text-white">Chỉnh sửa</Button>
          </div>
        </form>

        <Modal isOpen={isOpen} onClose={handleCloseModal} isDismissable={false} isKeyboardDismissDisabled={true}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Thành công</ModalHeader>
              <ModalBody>
                <p>Chỉnh sửa tàu bay thành công!</p>
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
                        <p>Vui lòng kiểm tra lại thông tin. Đã có lỗi xảy ra khi chỉnh sửa tàu bay.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={handleCloseErrorModal}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isDeletedOpen} onClose={handleCloseDeletedModal}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Xóa thành công</ModalHeader>
                    <ModalBody>
                        <p>Xóa tàu bay thành công!</p>
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