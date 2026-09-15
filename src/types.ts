export type ServiceId = 'SOFTWARE_FACTORY' | 'DATA_ANALYTICS' | 'DIGITAL_MARKETING' | string;

export interface TechItem {
  name: string;
  category?: string;
  iconName: 'python' | 'pandas' | 'regex' | 'looker' | 'code' | 'database' | 'cpu' | 'chart' | 'selenium' | 'pywebview' | 'shield' | 'window';
}

export interface KeyServiceItem {
  title: string;
  detail?: string;
}

export interface CaseStudy {
  title: string;
  description: string;
  keyServices?: KeyServiceItem[];
}

export interface Service {
  id: ServiceId;
  categoryTitle: string;
  shortDescription: string;
  image?: string;       // Parámetro opcional / preview
  videoSrc?: string;    // Parámetro opcional para video local/remoto
  iframeSrc?: string;   // Nuevo parámetro para orígenes interactivos
  heading: string;
  description: string;
  keyServices?: KeyServiceItem[];
  caseStudy?: CaseStudy;
  techStack?: TechItem[];
  externalLink?: string;
  ctaText?: string;
}

