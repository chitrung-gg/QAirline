import Breadcrumbs from "@/components/admin/breadcrumb";
 import axios from "axios";
 import { Button, Input } from '@nextui-org/react';
 import Link from 'next/link';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    const res = await axios.get(`http://localhost:5000/airport/${id}`);
    const data = res.data;

    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Sân bay', href: '/admin/airport' },
            {
                label: 'Chi tiết sân bay',
                href: `/admin/airport/${id}`,
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
                        placeholder="Tên sân bay"
                        size="lg"
                        radius="sm"
                        type="text"
                        label="Tên sân bay"
                        variant="bordered"
                        className="py-3 font-semibold"
                        value={data.name}
                        isReadOnly
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
                        value={data.city}
                        isReadOnly
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
                        value={data.country}
                        isReadOnly
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
                        value={data.iataCode}
                        isReadOnly
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
                <Button 
                  className="bg-blue-normal text-white" 
                  as={Link}
                  href={`/admin/airport/${data.id}/edit`}
                >
                  Chỉnh sửa
                </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }