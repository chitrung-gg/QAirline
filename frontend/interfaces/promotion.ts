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
}

export enum discountType {
    PERCENT = 'Percentage',
    FIXED = 'FixedAmount',
}

export interface CreatePromotionDto {
  code?: string;
  discount?: number;
  startDate?: Date;
  endDate?: Date;
  description?: string;
}

export interface UpdatePromotionDto extends Partial<CreatePromotionDto> {}