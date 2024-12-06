"use client";

import { Image } from "@nextui-org/react";

export default function OurValue() {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="w-full flex flex-col justify-center items-center px-4 py-8 desktop:py-8 gap-8">
                <p className="text-2xl md:text-3xl lg:text-3xl font-bold text-blue-normal italic text-center">Giá trị cốt lõi</p>
                {/* Value section */}
                <Image src="/images/value.png"
                    alt="our value"
                    className="w-full object-cover"
                />
            </div>
        </div>
    )
}