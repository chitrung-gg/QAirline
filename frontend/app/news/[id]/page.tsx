"use client";
import React from "react";
import Image from "next/image";

const newItem = {
    id: 1,
    image: '/images/sky.jpg',
    title: 'Thông báo về việc mở rộng đường bay',
    content: 'QAirline vừa công bố kế hoạch mở rộng đường bay mới từ Hà Nội đến New York, Mỹ. Đây là một bước tiến quan trọng trong việc mở rộng mạng lưới bay của hãng. Đường bay mới sẽ được khai trương vào ngày dd/mm/yyyy. Để chào mừng sự kiện này, QAirline sẽ tặng kèm đồ ăn nhẹ cho tất cả các chuyến bay từ Hà Nội đến New York trong vòng 1 tuần kể từ ngày khai trương. Đây là cơ hội tuyệt vời để Quý khách trải nghiệm dịch vụ hàng không chất lượng cao của QAirline với mức giá ưu đãi nhất.',
}

export default function NewsDetailsPage() {

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative h-[200px] w-full">
                <Image
                    src={newItem.image}
                    alt="cover image"
                    className="w-full h-full object-cover"
                    width={1000}
                    height={1000}
                />
            </div>

            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="flex items-center md:justify-start justify-center pb-12">
                    <p className="text-3xl font-semibold text-blue-normal">{newItem.title}</p>
                </div>

                <div className="">
                    <p>{newItem.content}</p>
                </div>
            </div>
            
        </div>
    )
}