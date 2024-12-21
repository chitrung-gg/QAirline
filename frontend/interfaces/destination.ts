export interface Destination {
  id: number;
  name: string;
  description: string;
  image?: string;
  city: string;
  country: string;
}

export interface CreateDestinationDto {
  description: string;
  image?: string;
  city: string;
  country: string;
}

export interface UpdateDestinationDto extends Partial<CreateDestinationDto> {}
