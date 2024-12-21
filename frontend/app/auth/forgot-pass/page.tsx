"use client";
import {Card, CardHeader, CardBody, CardFooter, Input, Link, Image, Button, Modal, ModalBody, ModalFooter, ModalHeader, useDisclosure, ModalContent} from "@nextui-org/react";
import React from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserContext, ContextData } from "@/app/UserContext";
import { on } from "events";

export default function Page() {
    const { user } = React.useContext(UserContext);

    const router = useRouter();

    React.useEffect(() => {
        if (user && user.isAuthenticated === true) {
            router.push('/')
        }
    }, [user, router]);

    const [emailValue, setEmailValue] = React.useState("");
    const [passwordValue, setPasswordValue] = React.useState(""); 
    const [confirmPasswordValue, setConfirmPasswordValue] = React.useState("");
    const [otpValue, setOtpValue] = React.useState("");
    const [otpSent, setOtpSent] = React.useState(false);  
    const [otpVerified, setOtpVerified] = React.useState(false);
    const [storedEmail, setStoredEmail] = React.useState<string | null>(null);

    const [loading, setLoading] = React.useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);
    const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    const [cooldown, setCooldown] = React.useState(false);  
    const [countdown, setCountdown] = React.useState(60); 
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenError, onOpen: onOpenError, onClose: onCloseError } = useDisclosure();
    const { isOpen: isOpenSuccess, onOpen: onOpenSuccess, onClose: onCloseSuccess } = useDisclosure();
    const { isOpen: isOpenSent, onOpen: onOpenSent, onClose: onCloseSent } = useDisclosure();

    React.useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (cooldown && countdown > 0) {
            intervalId = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setCooldown(false);  
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [cooldown, countdown]);

    const validateEmail = (emailValue: String) => emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isEmailInvalid = React.useMemo(() => {
        if (emailValue === "") return false;

        return validateEmail(emailValue) ? false : true;
    }, [emailValue]);

    const isConfirmPasswordInvalid = passwordValue !== confirmPasswordValue && confirmPasswordValue !== "";
    const isPasswordTooShort = passwordValue.length > 0 && passwordValue.length < 6;

    const checkEmailExists = async () => {
        try {
            const response = await axios.post("http://localhost:5000/user/email", { email: emailValue });
            if (response.status === 200) {
                return true; 
            }
            return false; 
        } catch (error) {
            //alert("Email chưa tồn tại.");
            return false;
        } 
    };

    const sendOtp = async () => {
        if (!validateEmail(emailValue)) {
            alert("Vui lòng nhập email hợp lệ.");
            return;
        }

        const isEmailExists = await checkEmailExists();
        console.log(isEmailExists);
        if (!isEmailExists) {
            alert("Email chưa được đăng ký.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/user/forget", { email: emailValue });
            setStoredEmail(emailValue);
            setOtpSent(true);
            setCooldown(true); 
            setCountdown(60);
            setOtpVerified(false);
            //alert("OTP đã được gửi vào email của bạn.");
            onOpenSent();
        } catch (error) {
            //alert("Có lỗi khi gửi OTP.");
            onOpenError();
        } 
    };

    const verifyOtp = async () => {
        if (emailValue !== storedEmail) {
            alert("Email đã bị thay đổi. Vui lòng gửi OTP lại.");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:5000/user/forget/verify`, 
                { 
                    email: emailValue, 
                    otp: otpValue 
                });

            setOtpVerified(true);
            //alert("OTP xác thực thành công!");
            onOpenSuccess();    
        } catch (error) {
            //alert("Xác thực OTP thất bại.");
            onOpenError();
        } 
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        if (!otpVerified) {
            alert("Vui lòng xác thực OTP trước khi đổi mật khẩu.");
            return;
        }

        if (emailValue !== storedEmail) {
            alert("Email đã bị thay đổi. Vui lòng gửi OTP lại.");
            return;
        }

        if (isEmailInvalid || passwordValue === "" || confirmPasswordValue === "" || isConfirmPasswordInvalid || isPasswordTooShort) {
            // TODO: Alert user to check their input
            alert("Vui lòng kiểm tra thông tin.");
            return;
        }

        setLoading(true); 

        try {
            const response = await axios.patch('http://localhost:5000/user/change', { 
                isVerified: otpVerified,
                email: emailValue,
                password: passwordValue,
            });

            onOpen();
            //alert("Đổi mk thành công");
            //router.push("/auth/login");
        } catch (error) {
            console.error('Đổi mk thất bại:', error);
            alert('Đổi mk thất bại, vui lòng thử lại.');
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

    const handleCloseSuccess = () => {
        onCloseSuccess();
    }

    const handleCloseSent = () => {
        onCloseSent();
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
                        <p className="text-lg font-medium text-blue-normal">Quên mật khẩu</p>
                    </CardHeader>
                    <CardBody className="flex flex-col px-10 py-1">
                        <div className="flex items-center mb-5">
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
                                className="mr-2"
                            />
                            <Button size="md" type="button" radius="sm" className="bg-blue-normal text-white font-medium text-base mt-4" onClick={sendOtp} isDisabled={cooldown}>
                                {cooldown ? `Chờ ${countdown}s...` : "Gửi OTP"}
                            </Button>
                        </div>

                        {otpSent && (
                            <div className="flex items-center mb-5">
                                <Input
                                    isRequired
                                    labelPlacement={"outside"}
                                    placeholder="Nhập mã OTP"
                                    size="lg"
                                    radius="sm"
                                    label="Mã OTP"
                                    variant="bordered"
                                    value={otpValue}
                                    onChange={(e) => setOtpValue(e.target.value)}
                                    className="mr-2"
                                    maxLength={6}
                                />
                                <Button size="md" type="button" radius="sm" className="bg-blue-normal text-white font-medium text-base mt-7 px-7" onClick={verifyOtp} isDisabled={!otpSent || otpVerified}>
                                    {otpVerified ? "OTP đã xác thực" : "Xác thực OTP"}
                                </Button>
                            </div>
                        )}

                        <Input 
                            labelPlacement={"outside"}
                            placeholder="Mật khẩu mới"
                            size="lg" 
                            radius="sm" 
                            label="Mật khẩu mới" 
                            variant="bordered" 
                            className="mb-5"
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
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
                            isInvalid={isPasswordTooShort}
                            color={isPasswordTooShort ? "danger" : "default"}
                            errorMessage="Mật khẩu phải có ít nhất 6 ký tự"
                        />

                        <Input 
                            isRequired
                            labelPlacement={"outside"}
                            placeholder="Nhập lại mật khẩu mới"
                            size="lg" 
                            radius="sm" 
                            label="Nhập lại mật khẩu mới" 
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
                            isDisabled={loading || !otpVerified}
                            onClick={handleSubmit}
                        >
                            {loading ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
                        </Button>

                    </CardBody>
                    <CardFooter className="flex flex-col">
                        <div className="flex items-center">
                            {/* <span className="text-sm">Bạn chưa có tài khoản? 
                                <Link href="/auth/register" className="ml-1 text-sm text-blue-normal hover:underline">
                                    Đăng ký ngay
                                </Link>
                            </span> */}
                        </div>
                    </CardFooter>
                </Card>
            </form>

            <Modal isOpen={isOpen} onClose={handleCloseModal} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    <ModalHeader>Thành công</ModalHeader>
                    <ModalBody>
                        <p>Đổi mật khẩu thành công</p>
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
                        <p>Có lỗi xảy ra, vui lòng thử lại sau.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={handleCloseError}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenSuccess} onClose={handleCloseSuccess} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    <ModalHeader>Thành công</ModalHeader>
                    <ModalBody>
                        <p>Xác thực mã OTP thành công</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={handleCloseSuccess}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenSent} onClose={handleCloseSent} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    <ModalHeader>Thành công</ModalHeader>
                    <ModalBody>
                        <p>Gửi mã OTP thành công. Hãy kiểm tra email của bạn</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={handleCloseSent}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}