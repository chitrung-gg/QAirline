"use client";
import {Card, CardHeader, CardBody, CardFooter, Input, Link, Image, Button} from "@nextui-org/react";
import React from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export default function RegisterPage() {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);
    const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    const [emailValue, setEmailValue] = React.useState("");
    const [passwordValue, setPasswordValue] = React.useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = React.useState("");
    const [fullNameValue, setFullNameValue] = React.useState(""); 
    const [phoneValue, setPhoneValue] = React.useState("");

    const [loading, setLoading] = React.useState(false);

    const validateEmail = (emailValue: String) => emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isEmailInvalid = React.useMemo(() => {
        if (emailValue === "") return false;

        return validateEmail(emailValue) ? false : true;
    }, [emailValue]);

    const isConfirmPasswordInvalid = passwordValue !== confirmPasswordValue && confirmPasswordValue !== "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isEmailInvalid || passwordValue === "" || confirmPasswordValue === "" || passwordValue !== confirmPasswordValue) {
            // TODO: Alert user to check their input
            alert("Vui lòng kiểm tra thông tin đăng ký.");
            return;
        }

        setLoading(true);

        try {
            alert('Đăng ký');
            // TODO: Call API to register
            // const response = await axios.post('', {
            //     fullName: fullNameValue,
            //     phone: phoneValue,
            //     email: emailValue,
            //     password: passwordValue,
            // });

            // if (response.status === 200) {
            //     alert('Đăng ký thành công!');
            //     TODO: Redirect user to login
            //     window.location.href = '/auth/login';
            // }
        } catch (error) {
            console.error('Đăng ký thất bại:', error);
            // TODO: Alert user that register failed
            alert('Đăng ký thất bại, vui lòng thử lại.');
        } finally {
            setLoading(false); 
        }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/images/sky.jpg)' }}>
            <form>
                <Card className="max-w-sm">
                    <CardHeader className="flex flex-col">
                        <div className="flex flex-row items-center">
                            <Image
                                alt="Qairline logo"
                                height={50}
                                src="/images/Qairline.png"
                                width={55}
                            />
                            <p className="font-bold text-blue-normal text-xl">QAirline</p>
                        </div>
                        <p className="text-lg font-medium text-blue-normal">Đăng ký QAirline</p>
                    </CardHeader>
                    <CardBody className="flex flex-col px-10 py-1">
                        <Input 
                            labelPlacement={"outside"}
                            placeholder="Họ và tên"
                            size="lg" 
                            radius="sm"
                            type="text" 
                            label="Họ và tên" 
                            variant="bordered" 
                            value={fullNameValue}
                            onChange={(e) => setFullNameValue(e.target.value)}
                            className="mb-5"
                        />
                        <Input 
                            labelPlacement={"outside"}
                            placeholder="Số điện thoại"
                            size="lg" 
                            radius="sm"
                            type="number" 
                            label="SĐT" 
                            variant="bordered" 
                            value={phoneValue}
                            onChange={(e) => setPhoneValue(e.target.value)}
                            className="mb-5"
                        />
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
                                <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility} aria-label="toggle password visibility">
                                {isPasswordVisible ? (
                                    <HiEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <HiEye className="text-2xl text-default-400 pointer-events-none" />
                                )}
                                </button>
                            }
                            type={isPasswordVisible ? "text" : "password"}
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                        />
                        <Input 
                            labelPlacement={"outside"}
                            placeholder="Nhập lại mật khẩu"
                            size="lg" 
                            radius="sm" 
                            label="Nhập lại mật khẩu" 
                            variant="bordered" 
                            className="mb-5"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleConfirmPasswordVisibility} aria-label="toggle password visibility">
                                {isConfirmPasswordVisible ? (
                                    <HiEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <HiEye className="text-2xl text-default-400 pointer-events-none" />
                                )}
                                </button>
                            }
                            type={isConfirmPasswordVisible ? "text" : "password"}
                            value={confirmPasswordValue}
                            onChange={(e) => setConfirmPasswordValue(e.target.value)}
                            isInvalid={isConfirmPasswordInvalid}
                            color={isConfirmPasswordInvalid ? "danger" : "default"}
                            errorMessage="Mật khẩu nhập lại không khớp"
                        />
                        <Button 
                            size="md" 
                            type="submit"
                            radius="sm" 
                            className="bg-blue-normal text-white font-medium text-base mt-2"
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading ? "Đang đăng ký..." : "Đăng ký"}
                        </Button>
                    </CardBody>
                    <CardFooter className="flex flex-col">
                        <div className="flex items-center">
                            <span className="text-sm">Bạn đã có tài khoản? 
                                <Link href="/auth/login" className="ml-1 text-sm text-blue-normal hover:underline">
                                    Đăng nhập ngay
                                </Link>
                            </span>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}