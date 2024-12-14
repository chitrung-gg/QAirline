export interface News {
    id: number;
    title: string;
    content: string;
    coverImage?: string;
    date: string;
}

export interface CreateNewsDto {
    title: string;
    content: string;
    image: string;
    date: string;
}

export interface UpdateNewsDto extends Partial<CreateNewsDto> {}