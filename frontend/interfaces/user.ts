import { Booking } from "./booking";

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  dob?: string;
  gender?: UserGender;
  address?: string;
  passportNumber?: string;
  role: UserRole;
  //status?: UserStatus; // no need
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
}

export enum UserStatus { //no need
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
    BANNED = 'Banned',
    OTHER = 'Other'
}

export interface CreateUserDto {
  username: string; 
  email: string;
  password: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string; 
  dob?: string; 
  gender?: UserGender;
  address?: string; 
  passportNumber?: string; 
  role: UserRole;
  bookings?: Booking[];
  accessToken?: string; 
  refreshToken?: string; 
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}