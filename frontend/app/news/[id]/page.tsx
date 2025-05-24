"use client";
import React from "react";
import Image from "next/image";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { News } from "@/interfaces/news";

const newItem = {
    id: 1,
    image: '/images/sky.jpg',
    title: 'Thông báo về việc mở rộng đường bay',
    content: 'QAirline vừa công bố kế hoạch mở rộng đường bay mới từ Hà Nội đến New York, Mỹ. Đây là một bước tiến quan trọng trong việc mở rộng mạng lưới bay của hãng. Đường bay mới sẽ được khai trương vào ngày dd/mm/yyyy. Để chào mừng sự kiện này, QAirline sẽ tặng kèm đồ ăn nhẹ cho tất cả các chuyến bay từ Hà Nội đến New York trong vòng 1 tuần kể từ ngày khai trương. Đây là cơ hội tuyệt vời để Quý khách trải nghiệm dịch vụ hàng không chất lượng cao của QAirline với mức giá ưu đãi nhất.',
}

const formatContent = (content: string) => {
    return content.split("\n").map((item, index) => (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    ));
};

export default function NewsDetailsPage(props: { params: { id: string } }) {
    const [params, setParams] = React.useState<{ id: string } | null>(null);

    const { id } = useParams();
    
    React.useEffect(() => {
        setParams(props.params);
    }, [props.params]);

    const [initialData, setInitialData] = React.useState<News | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            if (!id) return;  
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/news/${id}`);
            const data = res.data;
            console.log('data:', data); 
            setInitialData(data);
        };
  
        fetchData();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative h-[200px] w-full">
                <img
                    src={initialData?.coverImage || "/images/sky.jpg"}
                    alt="cover image"
                    className="w-full h-full object-cover"
                    width={1000}
                    height={1000}
                />
            </div>

            <Breadcrumbs
                className="md:container w-full px-8 py-5"
                variant="light"
                color="primary"
            >
                <BreadcrumbItem href="/news">Tin tức</BreadcrumbItem>
                <BreadcrumbItem>{initialData?.title}</BreadcrumbItem>
            </Breadcrumbs>

            <div className="max-w-7xl mx-auto px-8 py-6 container">
                <div className="flex items-center md:justify-start justify-center pb-12">
                    <p className="text-3xl font-semibold text-blue-normal">{initialData?.title}</p>
                </div>

                <div className="">
                    <p>{initialData ? formatContent(initialData.content) : null}</p>
                </div>
            </div>
            
        </div>
    )
}