"use client";

import React from 'react';
import { Accordion, AccordionItem, Divider, Link } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaFacebook, FaInstagram, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';

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
            { label: "Giới thiệu", href: "/about" },
            { label: "Đặt vé", href: "/booking" },
            { label: "Tin tức", href: "/news" },
            { label: "Ưu đãi", href: "/offers" },
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
        <footer className="bg-blue-normal py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 laptop:grid-cols-4 desktop:grid-cols-4 mobile:gap-2">
                    {/* Logo Column */}
                    <div className="col-span-1 flex
                    mobile:justify-center mobile:pb-4
                    tablet:justify-center tablet:pb-4
                    mini-laptop:justify-center mini-laptop:pb-4"
                        >
                        <div className="flex w-fit h-fit hover:cursor-pointer bg-white rounded-xl items-center py-2 pr-4 pl-2" onClick={() => router.push('/')}>
                            <Image
                                src="/images/Qairline.png"
                                width={75}
                                height={75}
                                alt='Qairline logo'
                                className='transition-all hover:scale-110'
                            />
                            <p className="font-bold text-blue-normal text-xl">QAirline</p>
                        </div>

                    </div>

                    {/* Navigation Columns for desktop */}
                    {footerData.map((section) => (
                        <div key={section.title} className="col-span-1 mobile:hidden tablet:hidden mini-laptop:hidden">
                            <h2 className="text-lg font-semibold mb-4 text-white">{section.title}</h2>
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

                    {/* Navigation Columns for mobile */}
                    {footerData.map((section) => (
                        <div key={section.title} className="col-span-1 desktop:hidden laptop:hidden">
                            <Accordion>
                                <AccordionItem key={section.title} aria-label={section.title}
                                    title={
                                        <span className="w-fit font-medium text-white">
                                            {section.title}
                                            <Divider className="bg-white mt-2" />
                                        </span>
                                    }
                                >
                                    {section.links.map((link) => (
                                        <div key={link.label} className='mb-2 ml-2'>
                                            <Link
                                                onClick={() => router.push(link.href)}
                                                className="hover:text-gray-300 transition-colors hover:cursor-pointer hover:underline text-white text-base"
                                            >
                                                {link.label}
                                            </Link>
                                        </div>
                                    ))}
                                </AccordionItem>
                            </Accordion>
                        </div>
                    ))}

                    {/* Contact Column */}
                    <div className="col-span-1 flex flex-col gap-2
                    mobile:justify-center mobile:pt-8
                    tablet:justify-center tablet:pt-8
                    mini-laptop:justify-center mini-laptop:pt-8"
                    >
                        {/* phone number */}
                        <div className="flex gap-2 desktop:flex-col laptop:flex-col font-bold text-white justify-center
                        mobile:items-center
                        tablet:items-center
                        mini-laptop:items-center"
                        >
                            <p className="text-2xl">Liên Hệ</p>
                            <div className='flex items-center gap-2 p-2 w-fit rounded-lg border-2'> 
                                <FaPhoneAlt className='text-xl'/>
                                <p className="text-3xl">1900.8386</p>
                            </div>
                        </div>

                        {/* Social media */}
                        <div className="flex gap-2 flex-col font-medium text-white justify-center pt-4
                        mobile:items-center
                        tablet:items-center tablet:flex-row tablet:gap-4
                        mini-laptop:items-center mini-laptop:flex-row mini-laptop:gap-4">
                            <p className="text-base">Kết nối với chúng tôi</p>
                            <div className='flex flex-row gap-4'>
                                <Link className='hover:cursor-pointer text-2xl text-white' target='_blank' href='https://youtube.com'>
                                    <FaYoutube />
                                </Link>
                                <Link className='hover:cursor-pointer text-2xl text-white' target='_blank' href='https://facebook.com'>
                                    <FaFacebook />
                                </Link>
                                <Link className='hover:cursor-pointer text-2xl text-white' target='_blank' href='https://instagram.com'>
                                    <FaInstagram />
                                </Link>
                                <Link className='hover:cursor-pointer text-2xl text-white' target='_blank' href='https://x.com'>
                                    <FaXTwitter />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 desktop:border-t laptop:border-t border-white flex justify-center">
                    <p className="text-center text-sm text-white">
                        © 2024 QAirline Inc.
                    </p>
                </div>
            </div>
        </footer>
    );
};

