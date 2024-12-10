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
    Divider,
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownItem,
    DropdownMenu
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import UserProfile from '../UserProfile';

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: "Giới thiệu", href: "/about" },
    { label: "Ưu đãi", href: "/offers" },
    { label: "Đặt vé", href: "/booking" },
    { label: "Thông tin hành trình", href: "/search-flight" },
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
        // <UserProfile />
    );

    return (
        <Navbar
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            isBordered
            position='static'
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
                            className="text-lg font-medium hover:cursor-pointer hover:text-blue-normal transition-all"
                        >
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {/* Render Auth Button */}
            <NavbarContent justify="end">
                <NavbarItem>
                    {renderAuthButton()}
                </NavbarItem>
            </NavbarContent>
            
            {/* Mobile menu items */}
            <NavbarMenu className='gap-3 pt-4'>
                {navItems.map((item) => (
                    <NavbarMenuItem key={item.href}>
                        <div>
                            <Link
                                onClick={() => router.push(item.href)}
                                size="lg"
                                className="w-full font-semibold text-blue-normal"
                            >
                                {item.label}
                            </Link>
                            <Divider className="font-bold bg-black mt-2"/>
                        </div>

                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};
