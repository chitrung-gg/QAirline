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
    Avatar,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ContextData, UserContext } from '../../app/UserContext';
import { LiaUserCircleSolid } from "react-icons/lia";
import { UserRole } from '@/interfaces/user';

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: "Giới thiệu", href: "/about" },
    { label: "Ưu đãi", href: "/offers" },
    { label: "Đặt vé", href: "/booking" },
    { label: "Thông tin hành trình", href: "/booking/search-flight" },
    { label: "Hỗ trợ", href: "/support" }
];

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const router = useRouter();
    
    const { user, logoutContext } = React.useContext(UserContext);
    console.log('User:', user);


    const handleLogout = async () => {
        if (window.confirm('Bạn có muốn đăng xuất không?')) {
            //const resLogout = await handleLogoutRequest();

            localStorage.removeItem('authToken');

            logoutContext()

        };

    }

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
    );

    const renderUserMenu = () => (
        <div className="flex gap-4">
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <LiaUserCircleSolid className="text-4xl"/>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-fit">
                        <p className="font-semibold">{user.account.username}</p>
                    </DropdownItem>
                    <DropdownItem key="information" href={`/profile/${user.account.id}`} className='text-normal'>Thông tin</DropdownItem>
                    <DropdownItem key="my_tickets" href={`/profile/${user.account.id}/tickets`} className='text-normal'>Vé của tôi</DropdownItem>
                    <DropdownItem key="logout" className='font-semibold text-red-500 data-[hover=true]:text-red-500' onClick={handleLogout}>
                        Đăng xuất
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
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

                {user && user.account.role === UserRole.ADMIN && (
                    <NavbarItem key="/admin">
                        <Link
                            color="foreground"
                            onClick={() => router.push("/admin")}
                            className="text-lg font-medium hover:cursor-pointer hover:text-blue-normal transition-all"
                        >
                            Admin
                        </Link>
                    </NavbarItem>
                )}
            </NavbarContent>

            {/* Render Auth Button */}
            <NavbarContent justify="end">
                <NavbarItem>
                    {/* {renderAuthButton()} */}
                    {(user && user.isLoading === false && user.isAuthenticated === false) ? renderAuthButton() : renderUserMenu()}
                    {/* {renderUserMenu()} */}
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

                {user && user.account.role === UserRole.ADMIN && (
                    <NavbarMenuItem key="/admin">
                        <Link
                            onClick={() => router.push("/admin")}
                            size="lg"
                            className="w-full font-semibold text-blue-normal"
                        >
                            Admin
                        </Link>
                        <Divider className="font-bold bg-black mt-2"/>
                    </NavbarMenuItem>
                )}
            </NavbarMenu>
        </Navbar>
    );
};
