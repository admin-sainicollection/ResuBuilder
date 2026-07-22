export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  location: string;
  jobTitle: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string; // Markdown or plain text with bullet points
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  grade: string;
  location: string;
  description: string;
}

export interface SkillGroup {
  id: string;
  category: string; // e.g. "Languages", "Frontend", "Backend"
  list: string[];   // e.g. ["React", "TypeScript"]
}

export interface Project {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  url: string;
  description: string; // Markdown or bullet points
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface ResumeData {
  id?: string;
  creatorToken: string;
  creatorEmail?: string;
  title: string;
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skills: SkillGroup[];
  projects: Project[];
  certifications: Certification[];
  customSections?: CustomSection[];
  templateId: 'classic' | 'modern' | 'tech' | 'executive';
  themeColor: string; // Primary brand color hex
  fontFamily?: 'georgia' | 'inter' | 'merriweather' | 'garamond' | 'jetbrains';
  fontSize?: 'xs' | 'sm' | 'md' | 'lg';
  spacingDensity?: 'compact' | 'comfortable' | 'spacious';
  targetJobDescription?: string;
  sectionOrder: string[]; // Order of sections, e.g. ["summary", "experiences", "projects", "skills", "educations", "certifications"]
  createdAt?: string;
  updatedAt?: string;
}

export interface ATSScoreResult {
  score: number;
  grammarFeedback: string;
  formatFeedback: string;
  optimizationSuggestions: string[];
  suggestedKeywords: string[];
}
