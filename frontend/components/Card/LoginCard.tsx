"use client";
import {Card, CardHeader, CardBody, CardFooter, Input, Link, Image, Button} from "@nextui-org/react";
import React from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export default function LoginCard() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [emailValue, setEmailValue] = React.useState("");

    const validateEmail = (emailValue: String) => emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isEmailInvalid = React.useMemo(() => {
        if (emailValue === "") return false;

        return validateEmail(emailValue) ? false : true;
    }, [emailValue]);

  return (
    <Card className="max-w-sm">
      <CardHeader className="flex flex-col">
        <div className="flex flex-row items-center">
            <Image
                alt="Qairline logo"
                height={50}
                src="images/Qairline.png"
                width={55}
            />
            <p className="font-bold text-blue-normal text-xl">QAirline</p>
        </div>
        <p className="text-lg font-medium text-blue-normal">Đăng nhập QAirline</p>
      </CardHeader>
      <CardBody className="flex flex-col px-10 py-1">
            <Input 
                labelPlacement={"outside"}
                placeholder="Email"
                value={emailValue}
                size="lg" 
                radius="sm"
                type="email" 
                label="Email của bạn" 
                variant="bordered" 
                isInvalid={isEmailInvalid}
                color={isEmailInvalid ? "danger" : "default" }
                errorMessage="Vui lòng nhập đúng định dạng"
                onChange={(e) => setEmailValue(e.target.value)}
                className="mb-5"
            />
            <Input 
                labelPlacement={"outside"}
                placeholder="Mật khẩu"
                size="lg" 
                radius="sm" 
                label="Mật khẩu" 
                variant="bordered" 
                className="mb-5"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                        <HiEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <HiEye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
            />
        <Button size="md" radius="sm" className="bg-blue-normal text-white font-medium text-base mt-2">Đăng nhập</Button>
      </CardBody>
      <CardFooter className="flex flex-col">
      <div className="flex items-center">
            <span className="text-sm">Bạn chưa có tài khoản? 
                <Link href="/register" className="ml-1 text-sm text-blue-normal hover:underline">
                    Đăng ký ngay
                </Link>
            </span>
        </div>
      </CardFooter>
    </Card>
  );
}