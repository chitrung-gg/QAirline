import { Flight } from "./flight";

export interface Airport {
  id: number;
  name: string;
  city: string;
  country: string;
  iataCode: string;
  departures?: Flight;
  arrivals?: Flight;
}
