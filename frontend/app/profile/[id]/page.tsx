"use client";
import Link from 'next/link';
import { Button, Input, Chip, Textarea, Radio, RadioGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, DatePicker, DateValue } from '@nextui-org/react';
import React from 'react';
import axios from 'axios';
import { useRouter, useParams } from "next/navigation";
import { User, UserGender, UpdateUserDto, UserRole } from "@/interfaces/user";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { today, getLocalTimeZone } from '@internationalized/date';

const genderOptions = [
    { name: "Nam", uid: "Male" },
    { name: "Nữ", uid: "Female" },
    { name: "Khác", uid: "Other" }
];

export default function Page(props: { params: { id: string } }) {
    const [params, setParams] = React.useState<{ id: string } | null>(null);
    const { id } = useParams();

    const router = useRouter(); 
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure();

    const [emailValue, setEmailValue] = React.useState("");
    const [usernameValue, setUsernameValue] = React.useState("");
    const [passwordValue, setPasswordValue] = React.useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = React.useState("");
    const [phoneNumberValue, setPhoneNumberValue] = React.useState("");
    const [firstNameValue, setFirstNameValue] = React.useState("");
    const [lastNameValue, setLastNameValue] = React.useState("");
    const [dobValue, setDobValue] = React.useState<DateValue | null>(null);
    const [genderValue, setGenderValue] = React.useState<UserGender>(UserGender.MALE);
    const [addressValue, setAddressValue] = React.useState("");
    const [passportNumberValue, setPassportNumberValue] = React.useState(""); 
    const [roleValue, setRoleValue] = React.useState<UserRole>(UserRole.USER);

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);
    const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    const isConfirmPasswordInvalid = passwordValue !== confirmPasswordValue && confirmPasswordValue !== "";
    const isPasswordTooShort = passwordValue.length > 0 && passwordValue.length < 6;

    React.useEffect(() => {
        setParams(props.params);
    }, [props.params]);

    React.useEffect(() => {
        const fetchData = async () => {
            if (!id) return;  
            const res = await axios.get(`http://localhost:5000/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            const data = res.data;
            setEmailValue(data.email);
            setUsernameValue(data.username);
            setPhoneNumberValue(data.phoneNumber);
            setFirstNameValue(data.firstName);
            setLastNameValue(data.lastName);
            setDobValue(data.dob ? today("UTC").set({ year: new Date(data.dob).getFullYear(), month: new Date(data.dob).getMonth() + 1, day: new Date(data.dob).getDate() }) : null);
            setGenderValue(data.gender);
            setAddressValue(data.address);
            setPassportNumberValue(data.passportNumber);
            setRoleValue(data.role);
            //setPasswordValue(data.password);
        };

        fetchData();
    }, [id]);

    const validateVietnamesePhone = (phone: string) => {
        if (phone === "") return true;

        const vietnamesePhoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b$/;
        return vietnamesePhoneRegex.test(phone);
    };

    const validatePassportNumber = (passport: string) => {
        if (passport === "") return true;
        // Basic passport number validation 
        // Adjust regex as needed for specific passport format
        const passportRegex = /^[A-Z0-9]{6,9}$/;
        return passportRegex.test(passport);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 

        if (!usernameValue || !validatePassportNumber(passportNumberValue) || !validateVietnamesePhone(phoneNumberValue) || passwordValue === "" || confirmPasswordValue === "" || passwordValue !== confirmPasswordValue) {
            onErrorOpen();
            return;
        }

        const data: UpdateUserDto = {
            email: emailValue,
            username: usernameValue,
            password: passwordValue,
            phoneNumber: phoneNumberValue,
            firstName: firstNameValue,
            lastName: lastNameValue,
            dob: dobValue ? new Date(dobValue.year, dobValue.month - 1, dobValue.day).toISOString() : undefined,
            gender: genderValue,
            passportNumber: passportNumberValue,
            role: roleValue,
            address: addressValue
        };

        console.log(data);
        // Call API to create news
        try {
            const res = await axios.patch(`http://localhost:5000/user/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            onOpen();
            console.log(data);
        } catch (error) {
            console.error(error);
            onErrorOpen();
        }
    };

    const handleCloseModal = () => {
      onClose();
      
      //router.push("/admin/airport");
    };

    const handleCloseErrorModal = () => {
      onErrorClose();
    };


    return (
      <main className='min-h-[80vh] max-h-screen bg-gray-50 p-5'>
        <div className='flex flex-col items-center container mx-auto'>
            <h1 className="text-xl md:text-2xl text-blue-normal mb-3 text-left w-10/12 font-semibold">
                Thông tin tài khoản
            </h1>
            <div className="max-w-6xl w-10/12 flex w-full items-center justify-between">
                <form className="w-full mb-5 max-h-[50vh] md:max-h-[90vh] overflow-y-auto" onSubmit={handleSubmit}>
                <div className="rounded-md bg-gray-50 p-4 md:p-5">
                    <div>
                        <Input 
                            isRequired
                            labelPlacement={"outside"}
                            placeholder="Email"
                            size="lg"
                            radius="sm"
                            type="text"
                            label="Email"
                            variant="bordered"
                            className="py-3 font-semibold"
                            value={emailValue}
                            isReadOnly
                        />
                    </div>
                    
                    <div>
                        <Input 
                            isRequired
                            labelPlacement={"outside"}
                            placeholder="Tên người dùng"
                            size="lg"
                            radius="sm"
                            type="text"
                            label="Tên người dùng"
                            variant="bordered"
                            className="py-3 font-semibold"
                            value={usernameValue}
                            onChange={(e) => setUsernameValue(e.target.value)}
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
                        className="py-3 font-semibold"
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
                        className="py-3 font-semibold"
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

                    <Input 
                        isRequired
                        labelPlacement={"outside"}
                        placeholder="Số điện thoại"
                        size="lg" 
                        radius="sm"
                        type="text" 
                        label="SĐT" 
                        variant="bordered" 
                        value={phoneNumberValue}
                        onChange={(e) => setPhoneNumberValue(e.target.value)}
                        className="py-3 font-semibold"
                        isInvalid={!validateVietnamesePhone(phoneNumberValue)}
                        color={validateVietnamesePhone(phoneNumberValue) ? "default" : "danger"}
                        errorMessage="Vui lòng nhập đúng định dạng"
                    />

                    <div>
                        <Input 
                            labelPlacement={"outside"}
                            placeholder="Nguyễn"
                            size="lg"
                            radius="sm"
                            type="text"
                            label="Họ"
                            variant="bordered"
                            className="py-3 font-semibold"
                            value={lastNameValue}
                            onChange={(e) => setLastNameValue(e.target.value)}
                        />
                    </div>

                    <div>
                        <Input 
                            labelPlacement={"outside"}
                            placeholder="Chí Trung"
                            size="lg"
                            radius="sm"
                            type="text"
                            label="Tên đệm và tên"
                            variant="bordered"
                            className="py-3 font-semibold"
                            value={firstNameValue}
                            onChange={(e) => setFirstNameValue(e.target.value)}
                        />
                    </div>

                    <DatePicker
                        className="py-3 font-semibold"
                        label="Ngày sinh"
                        labelPlacement='outside'
                        value={dobValue}
                        onChange={(date) => setDobValue(date)}
                        maxValue={today("UTC").subtract({days: 1})}
                        variant='bordered'
                        size='lg'
                        radius='sm'
                        disableAnimation
                        showMonthAndYearPickers
                    />

                    <div className="py-3">
                        <label className="block text-md font-semibold my-2">
                            Giới tính
                        </label>
                        <RadioGroup 
                            orientation="horizontal"
                            value={genderValue} 
                            onChange={(value) => setGenderValue(value as unknown as UserGender)}
                        >
                            {genderOptions.map((option) => (
                                <Radio key={option.uid} value={option.uid}>
                                    {option.name}
                                </Radio>
                            ))}
                        </RadioGroup>
                    </div>

                    <div>
                        <Input 
                            labelPlacement={"outside"}
                            placeholder="Địa chỉ"
                            size="lg"
                            radius="sm"
                            type="text"
                            label="Địa chỉ"
                            variant="bordered"
                            className="py-3 font-semibold"
                            value={addressValue}
                            onChange={(e) => setAddressValue(e.target.value)}
                        />
                    </div>

                    <div>
                        <Input 
                            labelPlacement={"outside"}
                            placeholder="Số hộ chiếu"
                            size="lg"
                            radius="sm"
                            type="text"
                            label="Số hộ chiếu"
                            variant="bordered"
                            className="py-3 font-semibold"
                            value={passportNumberValue}
                            onChange={(e) => setPassportNumberValue(e.target.value)}
                            isInvalid={!validatePassportNumber(passportNumberValue)}
                            color={validatePassportNumber(passportNumberValue) ? "default" : "danger"}
                            errorMessage="Vui lòng nhập đúng định dạng"
                        />
                    </div>

                </div>
                <div className="mt-6 flex justify-end gap-4 pb-5">
                    <Link
                        href="/admin/airport"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Quay lại
                    </Link>
                    <Button type="submit" className="bg-blue-normal text-white">Cập nhật thông tin</Button>
                </div>
                </form>
            </div>
        </div>

        <Modal isOpen={isOpen} onClose={handleCloseModal} isDismissable={false} isKeyboardDismissDisabled={true}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Thành công</ModalHeader>
              <ModalBody>
                <p>Cập nhật thông tin thành công!</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={handleCloseModal}>
                  Đóng
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal isOpen={isErrorOpen} onClose={handleCloseErrorModal}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Không thành công</ModalHeader>
                    <ModalBody>
                        <p>Vui lòng kiểm tra lại thông tin. Đã có lỗi xảy ra khi cập nhật thông tin</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="light" onPress={handleCloseErrorModal}>
                            Đóng
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
      </main>
    );
  }