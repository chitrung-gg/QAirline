import { Flight } from "./flight";

export interface Airport {
  id: number;
  name: string;
  city: string;
  country: string;
  iataCode: string;
  departures?: Flight[];
  arrivals?: Flight[];
}

export interface CreateAirportDto {
  name: string;
  city: string;
  country: string;
  iataCode: string;
}

export interface UpdateAirportDto extends Partial<CreateAirportDto> { }

