import React, { useState } from 'react';
import { Card, CardBody, Input, Button } from "@nextui-org/react";

interface PassengerFormProps {
    initialData?: {
        fullName?: string;
        dateOfBirth?: string;
        passportNumber?: string;
        email?: string;
    };
    onValidSubmit: (passengerInfo: PassengerInfo) => void;
}

interface PassengerInfo {
    fullName: string;
    dateOfBirth: string;
    passportNumber: string;
    email: string;
}

interface ValidationErrors {
    fullName: string;
    dateOfBirth: string;
    passportNumber: string;
    email: string;
}

const PassengerForm: React.FC<PassengerFormProps> = ({
    initialData = {},
    onValidSubmit
}) => {
    const [passengerInfo, setPassengerInfo] = useState<PassengerInfo>({
        fullName: initialData.fullName || '',
        dateOfBirth: initialData.dateOfBirth || '',
        passportNumber: initialData.passportNumber || '',
        email: initialData.email || ''
    });

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
        fullName: '',
        dateOfBirth: '',
        passportNumber: '',
        email: ''
    });

    const capitalizeFullName = (str: string) => {
        return str.split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    const validatePassportNumber = (passport: string) => {
        const passportRegex = /^[A-Z0-9]{6,9}$/;
        return passportRegex.test(passport);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let processedValue = value;

        if (name === 'fullName') {
            processedValue = capitalizeFullName(value);
        }

        const updatedInfo = {
            ...passengerInfo,
            [name]: processedValue
        };

        setPassengerInfo(updatedInfo);

        setValidationErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const validateForm = () => {
        const errors: ValidationErrors = {
            fullName: '',
            dateOfBirth: '',
            passportNumber: '',
            email: ''
        };

        let isValid = true;

        if (!passengerInfo.fullName.trim()) {
            errors.fullName = 'Vui lòng nhập tên đầy đủ';
            isValid = false;
        }

        if (!passengerInfo.dateOfBirth.trim()) {
            errors.dateOfBirth = 'Vui lòng nhập ngày sinh';
            isValid = false;
        } else {
            const dobDate = new Date(passengerInfo.dateOfBirth);
            const currentDate = new Date();
            const minAge = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

            if (isNaN(dobDate.getTime())) {
                errors.dateOfBirth = 'Ngày sinh không hợp lệ';
                isValid = false;
            } else if (dobDate > currentDate) {
                errors.dateOfBirth = 'Ngày sinh không được lớn hơn ngày hiện tại';
                isValid = false;
            } else if (dobDate > minAge) {
                errors.dateOfBirth = 'Bạn phải từ 18 tuổi trở lên';
                isValid = false;
            }
        }

        if (!passengerInfo.passportNumber.trim()) {
            errors.passportNumber = 'Vui lòng nhập số hộ chiếu';
            isValid = false;
        } else if (!validatePassportNumber(passengerInfo.passportNumber)) {
            errors.passportNumber = 'Số hộ chiếu không hợp lệ';
            isValid = false;
        }

        if (!passengerInfo.email.trim()) {
            errors.email = 'Vui lòng nhập email';
            isValid = false;
        } else if (!validateEmail(passengerInfo.email)) {
            errors.email = 'Email không hợp lệ';
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onValidSubmit(passengerInfo);
        }
    };

    return (
        <Card className="w-full">
            <CardBody className="gap-6">
                <div>
                    <div className="grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1 gap-2">
                        <div className='flex flex-col'>
                            <p className='text-base text-blue-normal font-medium pl-1'>Tên đầy đủ:</p>
                            <Input
                                label="Nhập tên đầy đủ"
                                variant="bordered"
                                name="fullName"
                                value={passengerInfo.fullName}
                                onChange={handleInputChange}
                                isRequired
                                isInvalid={!!validationErrors.fullName}
                                color={validationErrors.fullName ? "danger" : "default"}
                                errorMessage={validationErrors.fullName}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-base text-blue-normal font-medium pl-1'>Ngày sinh:</p>
                            <Input
                                label="Nhập ngày sinh"
                                variant="bordered"
                                type="date"
                                name="dateOfBirth"
                                value={passengerInfo.dateOfBirth}
                                onChange={handleInputChange}
                                isRequired
                                isInvalid={!!validationErrors.dateOfBirth}
                                color={validationErrors.dateOfBirth ? "danger" : "default"}
                                errorMessage={validationErrors.dateOfBirth}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-base text-blue-normal font-medium pl-1'>Số hộ chiếu:</p>
                            <Input
                                label="Nhập số hộ chiếu"
                                variant="bordered"
                                name="passportNumber"
                                value={passengerInfo.passportNumber}
                                onChange={handleInputChange}
                                isRequired
                                isInvalid={!!validationErrors.passportNumber}
                                color={validationErrors.passportNumber ? "danger" : "default"}
                                errorMessage={validationErrors.passportNumber}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-base text-blue-normal font-medium pl-1'>Email:</p>
                            <Input
                                label="Nhập email"
                                variant="bordered"
                                type="email"
                                name="email"
                                value={passengerInfo.email}
                                onChange={handleInputChange}
                                isRequired
                                isInvalid={!!validationErrors.email}
                                color={validationErrors.email ? "danger" : "default"}
                                errorMessage={validationErrors.email}
                            />
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default PassengerForm;