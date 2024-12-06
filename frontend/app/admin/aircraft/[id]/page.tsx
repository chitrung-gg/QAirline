import Breadcrumbs from "@/components/admin/breadcrumb";
import axios from "axios";
import Link from 'next/link';
import { Button, Input, RadioGroup, Radio } from '@nextui-org/react';
import React from 'react';
import { Aircraft, AircraftStatus } from '@/interfaces/aircraft';

const statusOptions = [
  {name: "Hoạt động", uid: "Active"},
  {name: "Vứt bỏ", uid: "Retired"},
  {name: "Bảo trì", uid: "Maintenance"},
];

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    const res = await axios.get(`http://localhost:5000/aircraft/${id}`);
    const aircraftData: Aircraft = res.data;

    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Tàu bay', href: '/admin/aircraft' },
            {
                label: 'Chi tiết tàu bay',
                href: `/admin/aircraft/${id}`,
                active: true,
            },
            ]}
        />
        <div className="w-full mb-5 max-h-[75vh] md:max-h-[90vh] overflow-y-auto">
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
            value={aircraftData.aircraftCode}
            isReadOnly
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
            value={aircraftData.model}
            isReadOnly
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
            value={aircraftData.capacity.toString()}
            isReadOnly
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
            value={aircraftData.manufacturer}
            isReadOnly
          />
        </div>

        <div>
          <label className="block text-md font-semibold py-2">Hạng ghế</label>
          {Object.entries(aircraftData.seatClasses).map(([className, numSeats]) => (
            <div key={className} className="flex items-center gap-4 mb-2">
              <Input
                labelPlacement={"outside"}
                placeholder="Tên hạng ghế"
                size="lg"
                radius="sm"
                type="text"
                label={`Tên hạng ghế`}
                variant="bordered"
                value={className}
                isReadOnly
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
                isReadOnly
                className="my-2"
              />
            </div>
          ))}
        </div>

        <div className="pb-3">
          <label className="block text-md font-semibold my-2">
            Trạng thái
          </label>
          <RadioGroup 
            orientation="horizontal"
            value={aircraftData.status}
            isDisabled
          >
            {statusOptions.map((option) => (
              <Radio key={option.uid} value={option.uid}>
                {option.name}
              </Radio>
            ))}
          </RadioGroup>
        </div>

        {aircraftData.flights && aircraftData.flights.length > 0 && (
          <div>
            <label className="block text-md font-semibold py-2">Chuyến bay</label>
            <div className="flex flex-wrap gap-2">
              {aircraftData.flights.map((flight) => (
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
        <Button 
          className="bg-blue-normal text-white" 
          as={Link}
          href={`/admin/aircraft/${aircraftData.id}/edit`}
        >
          Chỉnh sửa
        </Button>
      </div>
    </div>
      </main>
    );
  }