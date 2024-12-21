"use client";

import { Image } from "@nextui-org/react";

interface IntroductionProps {
    category: string;
    title: string;
    content: string[];
    image: string[];
}

export default function Introduction({ title, content, image }: IntroductionProps) {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="w-full flex flex-col justify-center items-center px-4 py-8 desktop:py-8 gap-8">
                <p className="text-2xl md:text-3xl lg:text-3xl font-bold text-blue-normal italic text-center">
                    {/* Qairline - Vui từng chuyến bay */}
                    {title}
                </p>
                <div className="grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1 gap-4">
                    {/* Intro paragraph */}
                    <p className="mobile:text-base tablet:text-base mini-laptop:text-base text-lg">
                        {/* Qairline tự hào là hãng hàng không tiên phong trong việc mang lại trải nghiệm bay đẳng cấp với dịch vụ chất lượng cao,
                        an toàn tuyệt đối và phong cách phục vụ tận tâm.
                        Hãy cùng chúng tôi khám phá thế giới theo cách riêng của bạn! */}
                        {/* {content.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))} */}
                        {/* {content.join(" ")} */}
                        {content[0]}
                    </p>

                    {/* Image Section */}
                    <Image 
                        // src="/images/sky.jpg"
                        src={image[0]}
                        width={1000}
                        height={150}
                        alt="image intro"
                        className="w-full h-full object-cover rounded-br-[10rem] rounded-tl-[10rem]"
                    /> 
                </div>
            </div>
        </div>
    )
}