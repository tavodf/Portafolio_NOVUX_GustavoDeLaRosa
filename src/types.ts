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
  image?: string;
  videoSrc?: string;
  iframeSrc?: string;
  heading: string;
  description: string;
  keyServices?: KeyServiceItem[];
  caseStudy?: CaseStudy;
  techStack?: TechItem[];
  externalLink?: string;
  ctaText?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  content: string;
  readingTime?: string;
  author?: {
    name: string;
    role: string;
  };
}

