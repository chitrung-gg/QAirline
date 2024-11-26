"use client";

import { Image } from "@nextui-org/react";

export default function OurVision() {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="w-full flex flex-col justify-center items-center px-4 py-8 desktop:py-8 gap-8">
                <p className="text-2xl md:text-3xl lg:text-3xl font-bold text-blue-normal italic text-center">Sứ mệnh & Tầm nhìn</p>
                <div className="grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1 gap-4">
                    {/* Image Section */}
                    <Image src="/images/hero-section.png"
                        width={1000}
                        height={150}
                        alt="image intro"
                        className="w-full h-full object-cover rounded-tr-[10rem] rounded-bl-[10rem]"
                    />

                    {/* Vision paragraph */}
                    <p className="mobile:text-base tablet:text-base mini-laptop:text-base text-lg">
                        Với sứ mệnh mang thế giới đến gần hơn, Qairline luôn nỗ lực để trở thành lựa chọn hàng đầu của khách hàng trên mỗi hành trình.
                        Tầm nhìn của chúng tôi là vươn cao trên bầu trời quốc tế, xây dựng thương hiệu hàng không được yêu thích nhất thế giới.
                    </p>
                </div>
            </div>
        </div>
    )
}