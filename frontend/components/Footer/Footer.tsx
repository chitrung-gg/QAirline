"use client";

import React from 'react';
import { Link } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const footerData: FooterSection[] = [
    {
        title: "Liên kết nhanh",
        links: [
            { label: "Về chúng tôi", href: "/about" },
            { label: "Đặt vé", href: "/booking" },
            { label: "Tin tức", href: "/ariticles" },
            { label: "Ưu đãi", href: "/special-deals" },
        ]
    },
    {
        title: "Chính sách và Hỗ trợ",
        links: [
            { label: "Chính sách", href: "/policy" },
            { label: "Hỗ trợ", href: "/support  " },
        ]
    },
];

export default function Footer() {
    const router = useRouter();
    return (
        <footer className="bg-blue-normal text-white py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 laptop:grid-cols-4 desktop:grid-cols-4">
                    {/* Logo Column */}
                    <div className="col-span-1 hover:cursor-pointer" onClick={() => router.push('/')}>
                        <Image
                            src="/images/Qairline.png"
                            width={75}
                            height={75}
                            alt='Qairline logo'
                            className='transition-all hover:scale-110'
                        />
                        <p className="font-bold text-white text-xl">QAirline</p>
                    </div>

                    {/* Navigation Columns */}
                    {footerData.map((section) => (
                        <div key={section.title} className="col-span-1">
                            <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            onClick={() => router.push(link.href)}
                                            className=" text-white hover:text-gray-300 transition-colors hover:cursor-pointer hover:underline"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-white">
                    <p className="text-center text-sm">
                        © 2024 QAirline Inc.
                    </p>
                </div>
            </div>
        </footer>
    );
};