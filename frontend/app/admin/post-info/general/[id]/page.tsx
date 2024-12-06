import Breadcrumbs from "@/components/admin/breadcrumb";
 import axios from "axios";
 import { Button, Input, Chip, Textarea, Radio, RadioGroup } from '@nextui-org/react';
 import Link from 'next/link';


 const categoryOptions = [
  {name: "Mẹo", uid: "Tips"},
  {name: "Thông báo", uid: "Announcements"},
  {name: "Cập nhật", uid: "Updates"},
];

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    const res = await axios.get(`http://localhost:5000/news/${id}`);
    const newsData = res.data;

    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Thông tin', href: '/admin/post-info/general' },
            {
                label: 'Chi tiết thông tin',
                href: `/admin/post-info/general/${id}`,
                active: true,
            },
            ]}
        />
        <div className="flex w-full items-center justify-between">
        <div className="w-full mb-5 max-h-[75vh] md:max-h-[90vh] overflow-y-auto">
          <div className="rounded-md bg-gray-50 p-4 md:p-5">
            <div>
              <Input
                labelPlacement={"outside"}
                placeholder="Tiêu đề"
                size="lg"
                radius="sm"
                type="text"
                label="Tiêu đề"
                variant="bordered"
                className="py-3 font-semibold"
                value={newsData.title}
                isReadOnly
              />
            </div>

            <div>
              <Textarea
                labelPlacement={"outside"}
                placeholder="Nội dung"
                size="lg"
                radius="sm"
                type="text"
                label="Nội dung"
                variant="bordered"
                className="py-3 font-semibold"
                value={newsData.content}
                isReadOnly
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
              <div className="py-2">
                <Chip
                  color={newsData.isPublished ? "success" : "warning"}
                  variant="flat"
                  className="capitalize"
                >
                  {newsData.isPublished ? "Đã công bố" : "Chưa công bố"}
                </Chip>
              </div>
            </div>

            <div className="pb-3">
              <label className="block text-md font-semibold my-2">
                Danh mục
              </label>
              <RadioGroup 
                orientation="horizontal"
                value={newsData.category}
                isDisabled
              >
                {categoryOptions.map((option) => (
                  <Radio key={option.uid} value={option.uid}>
                    {option.name}
                  </Radio>
                ))}
              </RadioGroup>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Ảnh bìa</label>
              <div className="mt-2">
                <img
                  src={newsData.coverImage || '/images/sky.jpg'}
                  alt="Cover Image"
                  className="max-w-[500px] max-h-[300px] w-full h-auto rounded-md"
                />
              </div>
            </div>

          </div>
          <div className="mt-6 flex justify-end gap-4 pb-5">
            <Link
              href="/admin/post-info/general"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Quay lại
            </Link>
            {!newsData.isPublished && (
              <Button 
                className="bg-blue-normal text-white" 
                as={Link}
                href={`/admin/post-info/general/${newsData.id}/edit`}
              >
                Chỉnh sửa
              </Button>
            )}
          </div>
        </div>
        </div>
      </main>
    );
  }