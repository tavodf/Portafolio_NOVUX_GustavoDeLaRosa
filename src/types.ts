export type ServiceId = 
  | 'CASE-SANTAFE-BI' 
  | 'CASE-ARES-GRID' 
  | 'CASE-COT-OPS' 
  | 'CASE-CPC-PULSE' 
  | 'LABORATORIO_INVESTIGACION'
  | 'SOFTWARE_FACTORY' 
  | 'DATA_ANALYTICS' 
  | 'NOVUX_MARKETPULSE' 
  | 'DATAOPS_RPA'
  | 'AI_DOCUMENT_NLP'
  | 'WEB_DATA_HARVESTING'
  | string;

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

export interface MetricItem {
  label: string;
  value: string;
  detail?: string;
}

export interface Service {
  id: ServiceId;
  categoryTitle: string;
  shortIdentifier?: string;
  tag?: string;
  statusTag?: string;
  caseBadge?: string;
  technicalArgument?: string;
  shortDescription: string;
  image?: string;
  videoSrc?: string;
  iframeSrc?: string;
  videoDemoUrl?: string;
  demoUrl?: string;
  heading: string;
  description: string;
  keyMetric?: string;
  metrics?: MetricItem[];
  derivedServiceTitle?: string;
  derivedServiceDescription?: string;
  derivedServices?: string[];
  keyServices?: KeyServiceItem[];
  caseStudy?: CaseStudy;
  techStack?: TechItem[];
  externalLink?: string;
  ctaText?: string;
  secondaryCtaText?: string;
  isLab?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  videoUrl?: string;
  content: string;
  readingTime?: string;
  author?: {
    name: string;
    role: string;
  };
}

export type NewsCategory = 
  | 'Todas'
  | 'IA & Machine Learning'
  | 'Apps & Herramientas'
  | 'Avances Corporativos'
  | 'Recursos & Open Source'
  | 'Cloud & Datos';

export interface CodeSnippet {
  language: string;
  title: string;
  code: string;
  description?: string;
}

export interface ArchitectureDiagramStep {
  step: string;
  title: string;
  desc: string;
  highlight?: boolean;
}

export interface VideoDemo {
  youtubeId: string;
  title: string;
  caption: string;
}

export interface TechNewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'IA & Machine Learning' | 'Apps & Herramientas' | 'Avances Corporativos' | 'Recursos & Open Source' | 'Cloud & Datos';
  date: string;
  source: string;
  impactBadge?: 'LANZAMIENTO' | 'TENDENCIA' | 'AVANCE' | 'RECURSO' | 'DISRUPCIÓN' | 'DESPACHO TÉCNICO / ARQUITECTURA';
  tags: string[];
  externalUrl?: string;
  details?: string;
  content?: string[];
  keyTakeaways?: string[];
  architectureImpact?: string;
  readTime?: string;
  author?: string;
  videoDemo?: VideoDemo;
  codeSnippets?: CodeSnippet[];
  diagramSteps?: ArchitectureDiagramStep[];
}

