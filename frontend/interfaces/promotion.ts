import { Booking } from "./booking";

export interface Promotion {
  id: number;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  discount: number;
  discountType: discountType;
  bookings?: Booking[];
  isActive: boolean;
  coverImage?: string;
}

export enum discountType {
    PERCENT = 'Percentage',
    FIXED = 'FixedAmount',
}

export interface CreatePromotionDto {
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  discount: number;
  discountType: discountType;
  bookings?: Booking[];
  isActive: boolean;
  coverImage?: string;
}

export interface UpdatePromotionDto extends Partial<CreatePromotionDto> {}