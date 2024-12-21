"use client";
import {Card, CardHeader, CardBody, CardFooter, Input, Link, Image, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import React from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserRole } from "@/interfaces/user";
import { UserContext } from "@/app/UserContext";

export default function RegisterPage() {
    const { user } = React.useContext(UserContext);

    const router = useRouter();

    React.useEffect(() => {
        if (user && user.isAuthenticated === true) {
            router.push('/')
        }
    }, [user, router]);

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);
    const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    const [emailValue, setEmailValue] = React.useState("");
    const [passwordValue, setPasswordValue] = React.useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = React.useState("");
    const [usernameValue, setUsernameValue] = React.useState(""); 
    const [phoneValue, setPhoneValue] = React.useState("");

    const [loading, setLoading] = React.useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenError, onOpen: onOpenError, onClose: onCloseError } = useDisclosure();

    const validateEmail = (emailValue: String) => emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isEmailInvalid = React.useMemo(() => {
        if (emailValue === "") return false;

        return validateEmail(emailValue) ? false : true;
    }, [emailValue]);

    const validateVietnamesePhone = (phone: string) => {
        if (phone === "") return true;
        const vietnamesePhoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b$/;
        return vietnamesePhoneRegex.test(phone);
    };

    const isConfirmPasswordInvalid = passwordValue !== confirmPasswordValue && confirmPasswordValue !== "";
    const isPasswordTooShort = passwordValue.length > 0 && passwordValue.length < 6;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isEmailInvalid || !usernameValue || !phoneValue || !validateVietnamesePhone(phoneValue) || passwordValue === "" || confirmPasswordValue === "" || passwordValue !== confirmPasswordValue || isPasswordTooShort) {
            // TODO: Alert user to check their input
            alert("Vui lòng kiểm tra thông tin đăng ký.");
            return;
        }

        setLoading(true);

        try {
            const data = {
                email: emailValue,
                password: passwordValue,
                username: usernameValue,
                phoneNumber: phoneValue,
                role: UserRole.USER
            };
            console.log('Data:', data);
            const response = await axios.post("http://localhost:5000/authentication/signup", {
                username: usernameValue,
                phoneNumber: phoneValue,
                email: emailValue,
                password: passwordValue,
                role: UserRole.USER
            });

            onOpen();
        } catch (error) {
            // console.error("Đăng ký thất bại:", error);
            // alert("Đăng ký thất bại, vui lòng thử lại.");
            onOpenError();
        } finally {
            setLoading(false); 
        }
    };

    const handleCloseModal = () => {
        onClose();
        
        router.push("/auth/login");
    };

    const handleCloseError = () => {
        onCloseError();
    }
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/images/sky.jpg)' }}>
            <form className="p-5">
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
                            isRequired
                            labelPlacement={"outside"}
                            placeholder="Tên người dùng"
                            size="lg" 
                            radius="sm"
                            type="text" 
                            label="Tên người dùng" 
                            variant="bordered" 
                            value={usernameValue}
                            onChange={(e) => setUsernameValue(e.target.value)}
                            className="mb-5"
                        />
                        
                        <Input 
                            isRequired
                            labelPlacement={"outside"}
                            placeholder="Số điện thoại"
                            size="lg" 
                            radius="sm"
                            type="text" 
                            label="SĐT" 
                            variant="bordered" 
                            value={phoneValue}
                            onChange={(e) => setPhoneValue(e.target.value)}
                            className="mb-5"
                            isInvalid={!validateVietnamesePhone(phoneValue)}
                            color={validateVietnamesePhone(phoneValue) ? "default" : "danger"}
                            errorMessage="Vui lòng nhập đúng định dạng"
                        />
                        <div className="flex items-center mb-5">
                            <Input 
                                isRequired
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
                                className="mr-2"
                            />
                            
                        </div>
                        
                        <Input 
                            isRequired
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
                            isInvalid={isPasswordTooShort}
                            color={isPasswordTooShort ? "danger" : "default"}
                            errorMessage="Mật khẩu phải có ít nhất 6 ký tự"
                        />

                        <Input 
                            isRequired
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
                            isDisabled={loading}
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

            <Modal isOpen={isOpen} onClose={handleCloseModal} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    <ModalHeader>Thành công</ModalHeader>
                    <ModalBody>
                        <p>Đăng ký thành công</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={handleCloseModal}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            
            <Modal isOpen={isOpenError} onClose={handleCloseError} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    <ModalHeader>Lỗi</ModalHeader>
                    <ModalBody>
                        <p>Có lỗi xảy ra, vui lòng kiểm tra lại thông tin hoặc thử lại sau.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={handleCloseError}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}