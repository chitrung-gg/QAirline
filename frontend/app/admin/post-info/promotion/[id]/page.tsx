"use client";
import Breadcrumbs from "@/components/admin/breadcrumb";
import axios from "axios";
 import { Button, Input, Chip, Textarea, Radio, RadioGroup, DateRangePicker } from '@nextui-org/react';
 import Link from 'next/link';
 import { toCalendarDate, parseDate, CalendarDate, getLocalTimeZone, parseZonedDateTime, ZonedDateTime} from '@internationalized/date';
import { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation';
import { Promotion } from "@/interfaces/promotion";


const discountTypeOptions = [
  {name: "Phần trăm", uid: "Percentage"},
  {name: "Cố định", uid: "FixedAmount"},
];


export default function Page(props: { params: { id: string } }) {
  const [params, setParams] = useState<{ id: string } | null>(null);
  const { id } = useParams();

  useEffect(() => {
      setParams(props.params);
  }, [props.params]);

  const [initialData, setInitialData] = useState<Promotion | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        if (!id) return;  
        const res = await axios.get(`http://localhost:5000/promotion/${id}`);
        const data = res.data;
        setInitialData(data);
    };

    fetchData();
  }, [id]);

  const data = initialData;

  if (!data) {
    return <div>Loading...</div>;
  }
//T23:59:59
  const localTimeZone = getLocalTimeZone();
  const startZonedDateTime = parseZonedDateTime(data.startDate.slice(0, 19) + "[" + localTimeZone + "]");
  const endZonedDateTime = parseZonedDateTime(data.endDate.slice(0, 19) + "[" + localTimeZone + "]");

    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Khuyến mại', href: '/admin/post-info/promotion' },
            {
                label: 'Chi tiết khuyến mại',
                href: `/admin/post-info/promotion/${id}`,
                active: true,
            },
            ]}
        />
        <div className="flex w-full items-center justify-between">
        <div className="w-full mb-5 max-h-[75vh] md:max-h-[90vh] overflow-y-auto">
            <div className="rounded-md bg-gray-50 p-4 md:p-5">
              <div>
                <Input 
                  isRequired
                  labelPlacement={"outside"}
                  placeholder="Mã khuyến mại"
                  size="lg" 
                  radius="sm"
                  type="text" 
                  label="Mã khuyến mại" 
                  variant="bordered" 
                  className="py-3 font-semibold"
                  value={data.code}
                  isReadOnly
                />
              </div>

              <div>
                <Input 
                  isRequired
                  labelPlacement={"outside"}
                  placeholder="Mô tả"
                  size="lg" 
                  radius="sm"
                  type="text" 
                  label="Mô tả" 
                  variant="bordered" 
                  className="py-3 font-semibold"
                  value={data.description}
                  isReadOnly
                />
              </div>

              

              <DateRangePicker
                  isRequired
                  label="Thời gian áp dụng"
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
                  granularity="second"
                  isReadOnly
                />

                <div className="pb-3">
                    <label className="block text-sm font-semibold my-2">
                        Loại giảm giá <span className="text-red-400">*</span>
                    </label>
                    <RadioGroup 
                        orientation="horizontal"
                        value={data.discountType}
                        isDisabled
                    >
                        {discountTypeOptions.map((option) => (
                            <Radio key={option.uid} value={option.uid}>
                                {option.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>

                <div>
                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Giảm giá"
                        size="lg" 
                        radius="sm"
                        type="number" 
                        step="0.01"
                        label="Giảm giá" 
                        variant="bordered" 
                        className="py-3 font-semibold"
                        value={data.discount.toString()}
                        isReadOnly
                    />
                </div>

                {data.bookings && data.bookings.length > 0 && (
                  <div>
                    <label className="block text-md font-semibold py-2">Đặt vé</label>
                    <div className="flex flex-wrap gap-2">
                      {data.bookings.map((booking) => (
                        <Link
                          key={booking.id}
                          href={`/admin/${booking.id}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {booking.bookingCode}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pb-3">
                  <label className="block text-sm font-semibold my-2">
                      Trạng thái <span className="text-red-400">*</span>
                  </label>
                  <RadioGroup 
                    orientation="horizontal"
                    value={data.isActive ? "true" : "false"}
                    isDisabled
                  >
                    <Radio value="true">Kích hoạt</Radio>
                    <Radio value="false">Không kích hoạt</Radio>
                  </RadioGroup>
                </div>

            </div>
            <div className="mt-6 flex justify-end gap-4 pb-5">
              <Link
                href="/admin/post-info/promotion"
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
              >
                Quay lại
              </Link>
              
              <Button 
                className="bg-blue-normal text-white" 
                as={Link}
                href={`/admin/post-info/promotion/${data.id}/edit`}
              >
                Chỉnh sửa
              </Button>
              
            </div>
          </div>
        </div>
      </main>
    );
  }