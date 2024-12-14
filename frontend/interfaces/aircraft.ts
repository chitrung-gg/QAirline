import { Flight } from "./flight";

export interface Aircraft {
    id: number;
    aircraftCode: string;
    model: string;
    manufacturer: string;
    capacity: number;
    seatClasses: Record<string, number>;
    status: AircraftStatus;
    createdAt?: string;
    updatedAt?: string;
    flights?: Flight[];
  }
  
  export enum AircraftStatus {
    ACTIVE = "Active",
    MAINTENANCE = 'Maintenance',
    RETIRED = 'Retired',
  }

  export interface CreateAircraftDto {
    aircraftCode: string;
    model: string;
    manufacturer: string;
    capacity: number;
    seatClasses: Record<string, number>;
    status: AircraftStatus;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UpdateAircraftDto extends Partial<CreateAircraftDto> {}