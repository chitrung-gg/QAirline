"use client";

import { Image } from "@nextui-org/react";

interface OurValueProps {
    title: string;
    content: string[];  
    imageUrl: string;
}

export default function OurValue({ title, content, imageUrl }: OurValueProps) {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="w-full flex flex-col justify-center items-center px-4 py-8 desktop:py-8 gap-8">
                <p className="text-2xl md:text-3xl lg:text-3xl font-bold text-blue-normal italic text-center">
                    {/* Giá trị cốt lõi */}
                    {title}
                </p>
                {/* Value section */}
                <Image 
                    // src="/images/value.png"
                    src={imageUrl}
                    alt="our value"
                    className="w-full object-cover"
                />

                <div className="mt-6">
                    {content.map((text, index) => (
                        <p key={index} className="text-lg mobile:text-base tablet:text-base mt-4">
                            {text}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}