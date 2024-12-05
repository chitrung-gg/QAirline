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
}

export enum AircraftStatus {
  ACTIVE = "Active",
  MAINTENANCE = 'Maintenance',
  RETIRED = 'Retired',
}

export interface CreateAircraftDto {
  model?: string;
  airline?: string;
  capacity?: number;
}

export interface UpdateAircraftDto extends Partial<CreateAircraftDto> {}