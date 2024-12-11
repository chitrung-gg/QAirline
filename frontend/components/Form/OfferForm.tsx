import React, { useState } from 'react';
import {
    Input,
    Button,
    Chip
} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from '@/components/redux/hooks';
import { setPromotionCode } from '@/components/redux/feature/booking/bookingSlice';
import { api } from '@/utils/api/config';
import { Promotion } from '@/interfaces/promotion';

interface PromotionCodeFormProps {
    basePrice: number;
    onDiscountApplied?: (discountAmount: number) => void;
}

export const PromotionCodeForm: React.FC<PromotionCodeFormProps> = ({
    basePrice,
    onDiscountApplied
}) => {
    const dispatch = useAppDispatch();
    const [promoCode, setPromoCode] = useState('');
    const [error, setError] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);

    const handleVerifyPromoCode = async () => {
        if (!promoCode) {
            setError('Vui lòng nhập mã giảm giá');
            return;
        }

        try {
            const response = await api.get<Promotion>(`/promotion/${promoCode}`);

            if (!response.data || !response.data.isActive) {
                setError('Mã giảm giá không hợp lệ');
                return;
            }

            // Calculate discount based on type
            let calculatedDiscount = 0;
            if (response.data.discountType === 'Percentage') {
                calculatedDiscount = basePrice * (response.data.discount / 100);
            } else {
                calculatedDiscount = Math.min(response.data.discount, basePrice);
            }

            // Dispatch promotion code to Redux
            dispatch(setPromotionCode({
                code: promoCode,
                discountAmount: calculatedDiscount
            }));

            // Optional callback for parent component
            onDiscountApplied?.(calculatedDiscount);

            // Reset error and show success
            setError('');
            setDiscountAmount(calculatedDiscount);
        } catch (err) {
            setError('Không thể xác minh mã giảm giá');
            console.error('Promotion verification error', err);
        }
    };

    const handleRemovePromoCode = () => {
        dispatch(setPromotionCode({
            code: '',
            discountAmount: 0
        }));
        setPromoCode('');
        setDiscountAmount(0);
        setError('');
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Nhập mã giảm giá"
                    className="flex-grow"
                    color={error ? 'danger' : 'default'}
                    errorMessage={error}
                />
                <Button
                    color="primary"
                    onClick={handleVerifyPromoCode}
                >
                    Áp dụng
                </Button>
            </div>

            {discountAmount > 0 && (
                <div className="flex items-center gap-2">
                    <Chip
                        color="success"
                        variant="flat"
                    >
                        Đã áp dụng mã giảm giá: {promoCode}
                    </Chip>
                    <Button
                        size="sm"
                        color="danger"
                        variant="light"
                        onClick={handleRemovePromoCode}
                    >
                        Xóa
                    </Button>
                </div>
            )}

            {discountAmount > 0 && (
                <div className="text-sm text-default-500">
                    Giảm giá: {discountAmount.toLocaleString()} VNĐ
                </div>
            )}
        </div>
    );
};