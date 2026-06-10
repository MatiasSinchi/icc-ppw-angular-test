// Modelos del dominio del portafolio.
// Diseñados para mapear directo desde Strapi v5 (response { data: [...] }).

export type ProjectType = 'academico' | 'personal' | 'laboral' | 'simulado';

export type RequestStatus = 'Pendiente' | 'Respondida';

export interface Developer {
  id: number | string;
  slug: string;
  fullName: string;
  role: string;
  shortBio: string;
  fullBio: string;
  photoUrl: string;
  email: string;
  github?: string;
  linkedin?: string;
  website?: string;
  active: boolean;
}

export interface Project {
  id: number | string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  type: ProjectType;
  technologies: string[];
  repoUrl?: string;
  demoUrl?: string;
  featured: boolean;
  developerSlugs: string[];
}

export interface Service {
  id: number | string;
  title: string;
  description: string;
  icon: string;
}

export interface ContactRequest {
  id?: string;
  applicantName: string;
  applicantEmail: string;
  description: string;
  developerSlug: string;
  developerName: string;
  userUid: string;
  userEmail: string;
  status: RequestStatus;
  response?: string;
  createdAt: number;
  updatedAt?: number;
}
