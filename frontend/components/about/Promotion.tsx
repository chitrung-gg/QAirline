"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Promotion() {
    const router = useRouter();
    return (
        <div className="max-w-6xl mx-auto">
            <div className="w-full flex flex-col justify-center items-center px-4 py-8 desktop:py-8 gap-8">
                <p className="text-2xl md:text-3xl lg:text-3xl font-bold text-blue-normal italic text-center">
                    Hãy để Qairline đồng hành cùng bạn trên những chuyến bay đáng nhớ.<br/>
                    Đặt vé ngay hôm nay!
                </p>
                <div className="grid grid-cols-1 gap-4">
                    <Button size="lg" className="text-white bg-blue-normal font-medium text-lg" onClick={() => router.push('/')}>
                        Đặt vé ngay
                    </Button>
                </div>
            </div>
        </div>
    )
}