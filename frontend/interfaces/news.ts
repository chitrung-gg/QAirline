export interface News {
    id: number;
    title: string; 
    content: string; 
    category: newsCategory; 
    coverImage?: string; 
    isPublished: boolean; 
    createdAt: string; 
    updatedAt: string;
  }

  export enum newsCategory {
    UPDATES = 'Updates',
    ANNOUNCEMENTS = 'Announcements',
    TIPS = 'Tips',
  }
  
  export interface CreateNewsDto {
    title: string; 
    content: string; 
    category: newsCategory; 
    coverImage?: string;
    isPublished: boolean; 
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UpdateNewsDto extends Partial<CreateNewsDto> {
  }
  