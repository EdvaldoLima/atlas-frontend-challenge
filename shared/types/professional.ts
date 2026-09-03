export interface Professional {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  profession: string;
  description: string;
  email: string;
  serviceCost: number;
  rating?: number;
  location?: string;
  distanceKm?: number;
  services?: string[];
  gallery?: string[];
  reviews?: ProfessionalReview[];
  availability?: string;
}

export interface ProfessionalReview {
  id: number;
  author: string;
  rating: number;
  comment: string;
}
