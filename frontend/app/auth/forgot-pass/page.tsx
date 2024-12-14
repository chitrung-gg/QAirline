"use client";
import {Card, CardHeader, CardBody, CardFooter, Input, Link, Image, Button} from "@nextui-org/react";
import React from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserContext, ContextData } from "@/app/UserContext";

export default function LoginPage() {
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
    const [cooldown, setCooldown] = React.useState(false);
    const [otpVerified, setOtpVerified] = React.useState(false);
    const [isEmailChecked, setIsEmailCheckedValue] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);
    const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    const validateEmail = (emailValue: String) => emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isEmailInvalid = React.useMemo(() => {
        if (emailValue === "") return false;

        return validateEmail(emailValue) ? false : true;
    }, [emailValue]);

    const isConfirmPasswordInvalid = passwordValue !== confirmPasswordValue && confirmPasswordValue !== "";
    const isPasswordTooShort = passwordValue.length > 0 && passwordValue.length < 6;

    const checkEmailExists = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/user/email", { email: emailValue });
            if (response.status === 200) {
                return true; // Nếu email đã tồn tại
            }
            return false; // Nếu email chưa tồn tại
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                alert("Email chưa tồn tại.");
                return false;
            } else {
                alert("Lỗi khi kiểm tra email.");
                return false;
            }
        } finally {
            setLoading(false);
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

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/user/forget", { email: emailValue });
            console.log(response);
            //if (response.status === 200 || response.status === 201) {
                setOtpSent(true);
                setCooldown(true);
                setTimeout(() => setCooldown(false), 60000);  // 60s cooldown
                alert("OTP đã được gửi vào email của bạn.");
            //} else {
            //     alert("Gửi OTP thất bại.");
            // }
        } catch (error) {
            alert("Có lỗi khi gửi OTP.");
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:5000/user/forget/verify`, 
                { 
                    email: emailValue, 
                    otp: otpValue 
                });
            //if (response.status === 200 || response.status === 201) {
                setOtpVerified(true);
                alert("OTP xác thực thành công!");
            // } else {
            //     alert("OTP không chính xác.");
            // }
        } catch (error) {
            alert("Xác thực OTP thất bại.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        if (!otpVerified) {
            alert("Vui lòng xác thực OTP trước khi đăng ký.");
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


            //if (response.status === 201 || response.status === 200) {
                alert("Đổi mk thành công");
                
                router.push("/auth/login");
                //window.location.reload();
            //} else {
            //     alert('Đổi mk thất bại, vui lòng thử lại.');
            //     console.error('Đổi mk thất bại:', response);
            // }
        } catch (error) {
            console.error('Đổi mk thất bại:', error);
            alert('Đổi mk thất bại, vui lòng thử lại.');
        } finally {
            setLoading(false); 
        }
    };

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
                            <Button size="md" type="button" radius="sm" className="bg-blue-normal text-white font-medium text-base" onClick={sendOtp} isDisabled={cooldown || otpSent}>
                                {cooldown ? "Chờ 60s..." : "Gửi OTP"}
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
                                <Button size="md" type="button" radius="sm" className="bg-blue-normal text-white font-medium text-base mt-2" onClick={verifyOtp} isDisabled={!otpSent || otpVerified}>
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
        </div>
    )
}