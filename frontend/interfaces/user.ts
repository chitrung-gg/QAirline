import { Booking } from "./booking";

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  dob?: string | null;
  gender: UserGender;
  address?: string;
  passportNumber?: string;
  role: UserRole;
  status?: UserStatus;
  bookings?: Booking[];
  accessToken?: string;
  refreshToken?: string;
}

export enum UserGender {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other',
}

export enum UserRole {
    ADMIN = 'Admin',
    USER = 'User',
    STAFF = 'Staff',
    OTHER = 'Other',
}

export enum UserStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
    BANNED = 'Banned',
    OTHER = 'Other'
}