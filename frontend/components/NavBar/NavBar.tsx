"use client";

import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,
    Link,
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownMenu,
    DropdownItem
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: "Về chúng tôi", href: "/about" },
    { label: "Ưu đãi", href: "/special-deals" },
    { label: "Đặt vé", href: "/booking" },
    { label: "Thông tin hành trình", href: "/trip-info" },
    { label: "Hỗ trợ", href: "/support" }
];

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const router = useRouter();

    const renderAuthButton = () => (
        <div className="flex gap-4">
            <Button
                onClick={() => router.push("/auth/login")}
                className="text-base mobile:text-sm font-medium text-white bg-blue-normal"
                radius='sm'
            >
                Đăng nhập
            </Button>
            <Link
                onClick={() => router.push("/auth/register")}
                className="text-base mobile:text-sm font-medium hover:cursor-pointer text-blue-normal"
            >
                Đăng kí
            </Link>
        </div>
        // <Dropdown placement="bottom-end">
        //     <DropdownTrigger>
        //         <Avatar
        //             isBordered
        //             as="button"
        //             className="transition-transform"
        //             name="Jason Hughes"
        //             size="sm"
        //             src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        //         />
        //     </DropdownTrigger>
        //     <DropdownMenu aria-label="Profile Actions" variant="flat">
        //         <DropdownItem key="profile" className="h-fit">
        //             <p className="font-semibold">Nguyễn Văn A</p>
        //         </DropdownItem>
        //         <DropdownItem key="information">Thông tin</DropdownItem>
        //         <DropdownItem key="my_tickets">Vé của tôi</DropdownItem>
        //         <DropdownItem key="logout" className='font-semibold text-red-500'>
        //             Đăng xuất
        //         </DropdownItem>
        //     </DropdownMenu>
        // </Dropdown>
    );

    return (
        <Navbar
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="bg-white"
            maxWidth="2xl"
        >
            {/* Mobile menu */}
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className='text-blue-normal font-bold desktop:hidden laptop:hidden'
            />

            {/* Logo */}
            <NavbarContent className="flex" justify="start">
                <NavbarBrand className="hover:cursor-pointer" onClick={() => router.push('/')}>
                    <Image
                        src="/images/Qairline.png"
                        width={75}
                        height={75}
                        alt='Qairline logo'
                        className='transition-all hover:scale-110'
                    />
                    <p className="font-bold text-blue-normal text-xl">QAirline</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden laptop:flex desktop:flex gap-4" justify="center">
                {navItems.map((item) => (
                    <NavbarItem key={item.href}>
                        <Link
                            color="foreground"
                            onClick={() => router.push(item.href)}
                            className="text-lg font-medium hover:cursor-pointer hover:text-blue-normal"
                        >
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    {renderAuthButton()}
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {navItems.map((item) => (
                    <NavbarMenuItem key={item.href}>
                        <Link
                            color="foreground"
                            onClick={() => router.push(item.href)}
                            size="lg"
                            className="w-full"
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};
