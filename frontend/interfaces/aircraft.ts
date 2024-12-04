export interface Aircraft {
  id: number;
  aircraftCode: string;
  model: string;
  manufacturer: string;
  capacity: number;
  seatClasses: Record<string, number>;
  status: "Active" | "Maintenance" | "Retired";
  createdAt?: string;
  updatedAt?: string;
}
