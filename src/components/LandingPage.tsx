import React from 'react';
import { 
  Sparkles, FileText, CheckCircle2, Eye, ShieldCheck, ArrowRight, 
  Layers, Zap, Award, BookOpen, Users, Star, ArrowUpRight, Check,
  Search, Phone, Mail, MapPin, Briefcase, ChevronLeft, ChevronRight, X, ExternalLink
} from 'lucide-react';
// @ts-ignore
import resumeShowcaseBg from '../assets/images/resume_showcase_bg_1784576068231.jpg';
import ResumePreview from './ResumePreview';
import { ResumeData } from '../types';

const sampleClassicHarvardData: ResumeData = {
  creatorToken: 'demo-classic',
  title: 'Classic Harvard Resume',
  templateId: 'classic',
  themeColor: '#1e293b',
  sectionOrder: ['summary', 'experience', 'education', 'skills'],
  personalInfo: {
    name: 'Alexander Morgan',
    jobTitle: 'Senior Product Manager',
    email: 'alex.morgan@harvard.edu',
    phone: '+1 (512) 555-0199',
    location: 'Cambridge, MA',
    website: 'alexmorgan.com',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
  },
  summary: 'Results-driven Senior Product Manager with 8+ years of experience leading cross-functional teams in SaaS, fintech, and enterprise cloud applications. Track record of scaling product revenue by 300% and launching top-rated customer features.',
  experiences: [
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Lead Product Manager',
      startDate: '2021',
      endDate: 'Present',
      current: true,
      location: 'Boston, MA',
      description: '- Spearheaded enterprise platform overhaul resulting in $12M ARR increase over 18 months.\n- Directed a team of 12 software engineers, UX designers, and data analysts across 4 global offices.'
    },
    {
      id: '2',
      company: 'Global Fintech Partners',
      position: 'Senior Product Analyst',
      startDate: '2018',
      endDate: '2021',
      current: false,
      location: 'New York, NY',
      description: '- Optimized algorithmic credit approval pipeline, reducing processing latency by 40%.\n- Built real-time customer behavior funnel analytics tracking over 2M active monthly users.'
    }
  ],
  educations: [
    {
      id: 'e1',
      school: 'Harvard University',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science & Economics',
      startDate: '2014',
      endDate: '2018',
      current: false,
      grade: '3.9 GPA (Magna Cum Laude)',
      location: 'Cambridge, MA',
      description: 'First Class Honors, President of FinTech & Product Club'
    }
  ],
  skills: [
    { id: 's1', category: 'Core Competencies', list: ['Product Strategy & Roadmapping', 'Agile & Scrum Methodologies', 'User Research & A/B Testing', 'SQL & Data Visualization'] }
  ],
  projects: [],
  certifications: []
};

const sampleModernSlateData: ResumeData = {
  creatorToken: 'demo-modern',
  title: 'Modern Slate Resume',
  templateId: 'modern',
  themeColor: '#1e3a8a',
  sectionOrder: ['summary', 'experience', 'education', 'skills'],
  personalInfo: {
    name: 'Alex Mercer',
    jobTitle: 'Senior Software Architect',
    email: 'alex.mercer@gmail.com',
    phone: '+1 (555) 432-8765',
    location: 'Austin, TX',
    website: 'alexmercer.dev',
    linkedin: 'linkedin.com/in/alexmercer',
    github: 'github.com/alexmercer',
  },
  summary: 'Innovative Senior Software Architect with 8+ years of expertise designing, building, and deploying complex enterprise web applications and microservices.',
  experiences: [
    {
      id: '1',
      company: 'CloudScale Technologies',
      position: 'Senior Full Stack Architect',
      startDate: 'Mar 2022',
      endDate: 'Present',
      current: true,
      location: 'Austin, TX',
      description: '- Architected distributed microservices handling 50M+ requests monthly.\n- Reduced system response latency by 45% using GraphQL caching and edge CDN.'
    }
  ],
  educations: [
    {
      id: 'e1',
      school: 'University of Texas at Austin',
      degree: 'B.S. Computer Science',
      fieldOfStudy: 'Software Engineering',
      startDate: '2015',
      endDate: '2019',
      current: false,
      grade: '3.8 GPA',
      location: 'Austin, TX',
      description: 'Graduated with Distinction'
    }
  ],
  skills: [
    { id: 's1', category: 'Technical Stack', list: ['React 18', 'TypeScript', 'Node.js APIs', 'PostgreSQL', 'Docker & Kubernetes'] }
  ],
  projects: [],
  certifications: []
};

const sampleTechMinimalistData: ResumeData = {
  creatorToken: 'demo-tech',
  title: 'Technical Minimalist Resume',
  templateId: 'tech',
  themeColor: '#0f766e',
  sectionOrder: ['summary', 'skills', 'experience', 'education'],
  personalInfo: {
    name: 'Alexander Morgan',
    jobTitle: 'Staff Distributed Systems Engineer',
    email: 'alex@dev.io',
    phone: '+1 (415) 555-0144',
    location: 'San Francisco, CA',
    website: 'alexm.dev',
    linkedin: 'linkedin.com/in/alexm-dev',
    github: 'github.com/alexm-dev',
  },
  summary: 'Staff Systems Engineer specializing in low-latency event streaming, Rust/Go microservices, and high-concurrency cloud infrastructure.',
  experiences: [
    {
      id: '1',
      company: 'DataMesh Systems',
      position: 'Principal Infrastructure Engineer',
      startDate: '2021',
      endDate: 'Present',
      current: true,
      location: 'San Francisco, CA',
      description: '- Built streaming data pipeline processing 10B+ daily messages with zero data loss.\n- Cut AWS compute infrastructure spend by $350K annually.'
    }
  ],
  educations: [
    {
      id: 'e1',
      school: 'UC Berkeley',
      degree: 'B.S. Electrical Engineering & Computer Science',
      fieldOfStudy: 'Systems Architecture',
      startDate: '2015',
      endDate: '2019',
      current: false,
      grade: 'First Class Honors',
      location: 'Berkeley, CA',
      description: 'Distributed Systems Research Lab Contributor'
    }
  ],
  skills: [
    { id: 's1', category: 'Languages & Tools', list: ['Go', 'Rust', 'TypeScript', 'Docker', 'Kubernetes', 'Redis', 'Kafka'] }
  ],
  projects: [],
  certifications: []
};

const sampleExecutiveLuxuryData: ResumeData = {
  creatorToken: 'demo-executive',
  title: 'Executive Luxury Resume',
  templateId: 'executive',
  themeColor: '#0f172a',
  sectionOrder: ['summary', 'experience', 'education', 'skills'],
  personalInfo: {
    name: 'Ethan Vance, MBA',
    jobTitle: 'Vice President of Global Engineering',
    email: 'ethan.vance@executive.com',
    phone: '+1 (212) 555-0188',
    location: 'New York, NY',
    website: 'ethanvance.exec',
    linkedin: 'linkedin.com/in/ethanvance-vp',
    github: 'github.com/ethanvance',
  },
  summary: 'Visionary technology executive with 15+ years of strategic leadership across Fortune 500 enterprises. Specialized in engineering transformation, $100M+ P&L management, and international team expansion.',
  experiences: [
    {
      id: '1',
      company: 'Horizon Global Tech',
      position: 'VP of Engineering & Operations',
      startDate: '2018',
      endDate: 'Present',
      current: true,
      location: 'New York, NY',
      description: '- Scaled business unit ARR from $45M to $120M in 3 years through organic growth and strategic tech acquisitions.\n- Direct oversight of 140+ software engineers, engineering directors, and product managers.'
    }
  ],
  educations: [
    {
      id: 'e1',
      school: 'Columbia Business School',
      degree: 'Master of Business Administration (MBA)',
      fieldOfStudy: 'Executive Leadership & Finance',
      startDate: '2014',
      endDate: '2016',
      current: false,
      grade: 'Dean\'s List',
      location: 'New York, NY',
      description: 'Beta Gamma Sigma Honors Society'
    }
  ],
  skills: [
    { id: 's1', category: 'Leadership Focus', list: ['Strategic P&L Management', 'Global Team Expansion', 'Enterprise Architecture', 'M&A Due Diligence'] }
  ],
  projects: [],
  certifications: []
};

export function getSampleDataForTemplate(templateId: string): ResumeData {
  switch (templateId) {
    case 'classic':
      return sampleClassicHarvardData;
    case 'modern':
      return sampleModernSlateData;
    case 'tech':
      return sampleTechMinimalistData;
    case 'executive':
      return sampleExecutiveLuxuryData;
    default:
      return sampleClassicHarvardData;
  }
}

export interface PortfolioUser {
  name: string;
  username: string;
  designation: string;
  phone: string;
  email: string;
  location: string;
  initials: string;
  colorClass: string;
  avatarUrl?: string;
  resume: {
    personalInfo: {
      name: string;
      email: string;
      phone: string;
      location: string;
      jobTitle: string;
      website: string;
      summary: string;
    };
    skills: string[];
    education: Array<{
      institution: string;
      degree: string;
      fieldOfStudy?: string;
      startDate: string;
      endDate: string;
      grade?: string;
      description: string;
    }>;
    experience: Array<{
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    projects: Array<{
      name: string;
      role: string;
      link: string;
      description: string;
    }>;
    certifications?: Array<{
      name: string;
      issuer: string;
      date: string;
      url?: string;
    }>;
  };
}

export const PORTFOLIO_USERS: PortfolioUser[] = [
  {
    name: "manoj kumar",
    username: "manojkumar688",
    designation: "software",
    phone: "8851513697",
    email: "manojk.scr@gmail.com",
    location: "gurgaon, Haryana, India",
    initials: "MK",
    colorClass: "bg-blue-600 text-white",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=250&auto=format&fit=crop",
    resume: {
      personalInfo: {
        name: "Manoj Kumar",
        email: "manojk.scr@gmail.com",
        phone: "8851513697",
        location: "Gurgaon, Haryana, India",
        jobTitle: "Senior Software Engineer & Full-Stack Architect",
        website: "https://github.com/manojkumar688",
        summary: "Dynamic and detail-oriented Senior Software Engineer with 6+ years of experience architecting and delivering high-throughput enterprise applications. Proven expertise in React, TypeScript, Node.js microservices, distributed cloud architectures, and relational database tuning. Adept at leading cross-functional engineering teams, implementing CI/CD deployment pipelines, and ensuring 99.99% system availability."
      },
      skills: ["React 18", "TypeScript", "Node.js & Express", "Next.js", "PostgreSQL", "MongoDB", "Tailwind CSS", "Docker", "AWS Cloud", "RESTful & GraphQL APIs", "Git & CI/CD", "Jest & Cypress"],
      education: [
        {
          institution: "Delhi Technological University (DTU)",
          degree: "Post Graduation - Master of Technology (M.Tech)",
          fieldOfStudy: "Computer Science & Engineering",
          startDate: "2023",
          endDate: "2025",
          grade: "CGPA 9.2 / 10",
          description: "Specialized in Advanced Distributed Computing, Cloud Microservices Architecture, and Database Query Optimization. Authored thesis on real-time stream processing with low latency."
        },
        {
          institution: "Delhi Technological University (DTU)",
          degree: "Graduation - Bachelor of Technology (B.Tech)",
          fieldOfStudy: "Computer Science",
          startDate: "2019",
          endDate: "2023",
          grade: "First Class with Distinction (88.4%)",
          description: "Graduated with highest departmental honors. Core coursework included Data Structures & Algorithms, Operating Systems, Computer Networks, Software Engineering, and Compiler Design."
        },
        {
          institution: "National Institute of Electronics & IT (NIELIT)",
          degree: "Advanced Postgraduate Diploma",
          fieldOfStudy: "Full-Stack Web Engineering & DevOps",
          startDate: "2022",
          endDate: "2023",
          grade: "Grade A+",
          description: "Intensive 1-year professional diploma covering containerized software deployment, Kubernetes orchestration, automated testing suites, and secure payment integrations."
        }
      ],
      experience: [
        {
          company: "TechNexus Global Solutions",
          position: "Senior Software Engineer",
          startDate: "2023",
          endDate: "Present",
          description: "• Architected and deployed modern micro-frontend UI layouts utilizing React 18, TypeScript, and Vite, resulting in a 35% reduction in client-side load times.\n• Led backend API optimization for core transactional services using Node.js and PostgreSQL, reducing average query response times from 180ms to 42ms.\n• Implemented automated CI/CD deployment pipelines on AWS EC2 and Docker, cutting deployment cycle times by 50% and eliminating manual error."
        },
        {
          company: "InnovaBytes Corporation",
          position: "Full-Stack Software Developer",
          startDate: "2021",
          endDate: "2023",
          description: "• Engineered 12+ responsive web applications for enterprise clients using React, Redux Toolkit, and Tailwind CSS.\n• Integrated secure multi-currency payment gateways (Stripe & Razorpay) handling over $500K in monthly customer volume.\n• Mentored 5 junior developers on clean code practices, TypeScript type safety, and unit testing using Jest."
        },
        {
          company: "Apex Tech Labs",
          position: "Software Engineering Intern",
          startDate: "2020",
          endDate: "2021",
          description: "• Developed interactive data visualization dashboards using D3.js and Recharts for real-time server health monitoring.\n• Refactored legacy monolithic backend modules into modular Express routes, improving maintainability and code readability."
        }
      ],
      projects: [
        {
          name: "Saini E-Commerce Engine & Analytics Portal",
          role: "Lead Full-Stack Architect",
          link: "https://github.com/manojkumar688/saini-store",
          description: "Designed a high-availability e-commerce platform processing 1,000+ daily orders. Built real-time inventory tracking, automated PDF invoice generation, and custom admin analytics dashboards."
        },
        {
          name: "OmniCloud Real-Time Telemetry Suite",
          role: "Creator & Maintainer",
          link: "https://github.com/manojkumar688/omnicloud",
          description: "Created an open-source server metrics dashboard with WebSocket streaming, threshold alert triggers, and virtualized data table rendering."
        },
        {
          name: "ResuCraft AI - Smart Resume Builder",
          role: "Full-Stack Engineer",
          link: "https://github.com/manojkumar688/resucraft",
          description: "Engineered an ATS-friendly, multi-template CV generation engine supporting instant A4 PDF compilation with zero layout shifting."
        }
      ],
      certifications: [
        {
          name: "AWS Certified Solutions Architect – Associate",
          issuer: "Amazon Web Services (AWS)",
          date: "Nov 2024",
          url: "https://aws.amazon.com/verification"
        },
        {
          name: "Oracle Certified Professional: Java SE 17 Developer",
          issuer: "Oracle Corporation",
          date: "Mar 2023",
          url: "https://oracle.com/certifications"
        },
        {
          name: "Certified ScrumMaster (CSM)",
          issuer: "Scrum Alliance",
          date: "Jan 2022",
          url: "https://scrumalliance.org"
        }
      ]
    }
  },
  {
    name: "Manoj Kumar",
    username: "manojkumar836",
    designation: "Software dev",
    phone: "8851513692",
    email: "manojsunar5151@gmail.com",
    location: "Gurgaon, Haryana, Nepal",
    initials: "MK",
    colorClass: "bg-indigo-600 text-white",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
    resume: {
      personalInfo: {
        name: "Manoj Kumar",
        email: "manojsunar5151@gmail.com",
        phone: "8851513692",
        location: "Gurgaon, Haryana, Nepal",
        jobTitle: "Senior Software Developer & Database Specialist",
        website: "https://manojsunar.com",
        summary: "Proactive and solution-driven Senior Software Developer with 5+ years of experience specializing in high-performance Java Spring Boot backend microservices, cross-border payment solutions, and scalable cloud database engineering. Dedicated to building bulletproof API infrastructures, implementing automated testing suites, and optimizing transaction workflows across international boundaries."
      },
      skills: ["Java 17", "Spring Boot", "Microservices", "PostgreSQL", "MySQL & Redis", "Docker & Kubernetes", "React", "Kafka Event Streaming", "AWS ECS", "CI/CD Pipelines", "System Design"],
      education: [
        {
          institution: "Tribhuvan University - Central Department of CS",
          degree: "Post Graduation - Master of Science (M.Sc)",
          fieldOfStudy: "Computer Science & Information Technology",
          startDate: "2022",
          endDate: "2024",
          grade: "Distinction (3.85 / 4.0)",
          description: "Advanced study in High-Performance Computing, Parallel Database Engineering, and Cryptographic Security Protocols. Conducted research on cross-border digital payment gateways."
        },
        {
          institution: "Tribhuvan University - Pulchowk Campus",
          degree: "Graduation - Bachelor of Science (B.Sc. CSIT)",
          fieldOfStudy: "Computer Science & Information Technology",
          startDate: "2018",
          endDate: "2022",
          grade: "First Division (84.2%)",
          description: "Rigorous 4-year degree focusing on Software Development Methodologies, Object-Oriented Analysis & Design, Database Management Systems, and Web Technologies."
        },
        {
          institution: "Nepal Institute of Information Technology",
          degree: "Professional Diploma",
          fieldOfStudy: "Enterprise Java Architecture & Cloud Engineering",
          startDate: "2021",
          endDate: "2022",
          grade: "Gold Medalist",
          description: "Comprehensive professional diploma in building fault-tolerant microservices, Spring Cloud infrastructure, and asynchronous messaging queues using Apache Kafka."
        }
      ],
      experience: [
        {
          company: "Apex Tech Labs International",
          position: "Senior Software Developer",
          startDate: "2022",
          endDate: "Present",
          description: "• Engineered 15+ high-volume RESTful microservices using Java Spring Boot, handling over 2M daily transactions with 99.98% uptime.\n• Optimized database query plans and implemented multi-tier Redis caching, reducing server CPU utilization by 40% under peak holiday loads.\n• Directed deployment of containerized Docker services on AWS ECS with automated auto-scaling triggers."
        },
        {
          company: "Himalayan Fintech Solutions",
          position: "Backend Developer",
          startDate: "2020",
          endDate: "2022",
          description: "• Developed secure ledger transaction engines for digital wallet systems, integrating JWT authentication and OAuth2 token validation.\n• Collaborated closely with frontend engineers to deliver intuitive REST and GraphQL endpoints for mobile and web clients."
        },
        {
          company: "Kathmandu Software Hub",
          position: "Junior Developer",
          startDate: "2019",
          endDate: "2020",
          description: "• Built automated unit tests using JUnit and Mockito, increasing codebase test coverage from 55% to 88%.\n• Created admin tools for monitoring database health and log aggregation."
        }
      ],
      projects: [
        {
          name: "BorderPay Multi-Currency Remittance System",
          role: "Lead Backend Architect",
          link: "https://manojsunar.com/borderpay",
          description: "Created a secure cross-border currency conversion and transaction proxy for localized payments between Nepal and India, processing over $1M in transaction volume."
        },
        {
          name: "TaskStream Distributed Workflow Engine",
          role: "Creator",
          link: "https://manojsunar.com/taskstream",
          description: "Developed a distributed background job scheduler using Java Spring Batch and Redis Queue capable of executing 50,000 tasks per minute."
        },
        {
          name: "FinVault Ledger Audit Tool",
          role: "Backend Engineer",
          link: "https://manojsunar.com/finvault",
          description: "Built an immutable audit logging service using PostgreSQL append-only tables and SHA-256 cryptographic hash chains for compliance verification."
        }
      ],
      certifications: [
        {
          name: "AWS Certified Developer – Associate",
          issuer: "Amazon Web Services",
          date: "Oct 2024",
          url: "https://aws.amazon.com/verification"
        },
        {
          name: "MongoDB Certified Developer Associate",
          issuer: "MongoDB Inc.",
          date: "Feb 2023",
          url: "https://university.mongodb.com"
        },
        {
          name: "Docker Certified Associate (DCA)",
          issuer: "Mirantis / Docker",
          date: "Jun 2022",
          url: "https://docker.com/certification"
        }
      ]
    }
  },
  {
    name: "versha saini",
    username: "vershasaini699",
    designation: "Software developer",
    phone: "7838307318",
    email: "vershathakur27@gmail.com",
    location: "Gurugram, Haryana, India",
    initials: "VS",
    colorClass: "bg-blue-500 text-white",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop",
    resume: {
      personalInfo: {
        name: "Versha Saini",
        email: "vershathakur27@gmail.com",
        phone: "7838307318",
        location: "Gurugram, Haryana, India",
        jobTitle: "Senior Software Developer & Frontend Architect",
        website: "https://vershasaini.dev",
        summary: "Results-driven Senior Software Engineer with 5+ years of experience architecting scalable web applications, modern single-page applications, and cloud-native microservices. Specialist in Next.js, React, Node.js, and TypeScript with a relentless focus on UI performance, web accessibility standards (WCAG 2.1 AA), and state optimization. Proven leader in mentoring junior engineers and implementing automated CI/CD practices."
      },
      skills: ["React 18", "Next.js", "TypeScript", "Node.js & Express", "Angular", "GraphQL", "Docker", "Kubernetes", "Redux Toolkit", "Tailwind CSS", "Jest & Playwright", "Web Vitals Optimization"],
      education: [
        {
          institution: "Maharshi Dayanand University (MDU)",
          degree: "Post Graduation - Master of Computer Applications (MCA)",
          fieldOfStudy: "Computer Science & Software Applications",
          startDate: "2020",
          endDate: "2022",
          grade: "First Class with Distinction (86.5%)",
          description: "Mastered Advanced Web Application Engineering, Enterprise Software Architecture, Cloud Infrastructure, and Distributed Systems. Research paper published on micro-frontend state management."
        },
        {
          institution: "Maharshi Dayanand University (MDU)",
          degree: "Graduation - Bachelor of Computer Applications (BCA)",
          fieldOfStudy: "Computer Applications",
          startDate: "2017",
          endDate: "2020",
          grade: "Top 3 Rank in University (85.0%)",
          description: "Core focus on Data Structures, Database Systems (SQL), Object-Oriented Programming in C++/Java, System Analysis, and Web Development Fundamentals."
        },
        {
          institution: "Indian Institute of Web Technologies",
          degree: "Postgraduate Diploma",
          fieldOfStudy: "Advanced Web Engineering & Microservices",
          startDate: "2020",
          endDate: "2021",
          grade: "Excellence Grade",
          description: "Specialized post-grad diploma in modern web application design, REST/GraphQL API design, containerized deployment, and security protocols."
        }
      ],
      experience: [
        {
          company: "CloudCore Technologies India",
          position: "Senior Software Developer",
          startDate: "2022",
          endDate: "Present",
          description: "• Led a cross-functional team of 6 engineers in migrating legacy monolith applications to Next.js & Server Components, boosting page speed index by 65% and organic SEO traffic by 40%.\n• Designed modular design system components using React, Radix UI, and Tailwind CSS, adopted across 4 major product lines.\n• Established rigorous code review guidelines and automated pre-commit testing, reducing production deployment bugs by 30%."
        },
        {
          company: "NextGen Digital Studios",
          position: "Software Developer",
          startDate: "2020",
          endDate: "2022",
          description: "• Engineered 10+ responsive single-page applications using Angular and React for enterprise healthcare and logistics clients.\n• Integrated OAuth2 & SAML single sign-on mechanisms ensuring compliant security standards across web portals."
        },
        {
          company: "TechInnova Solutions",
          position: "Associate Web Developer",
          startDate: "2019",
          endDate: "2020",
          description: "• Developed interactive UI widgets and optimized client-side CSS/JS bundles for fast mobile browser rendering."
        }
      ],
      projects: [
        {
          name: "Saini Retail Management System (SRMS)",
          role: "Lead Systems Architect",
          link: "https://vershasaini.dev/sms",
          description: "Re-engineered inventory tracking and supply order management for 20+ retail branches, decreasing stock discrepancies by 22% and automating daily sales reports."
        },
        {
          name: "HealthConnect Patient Portal & Telemed Platform",
          role: "Senior Frontend Engineer",
          link: "https://vershasaini.dev/healthconnect",
          description: "Built HIPAA-compliant real-time video consultation portal using WebRTC, Socket.io, and Next.js, serving 10k+ active monthly appointments."
        },
        {
          name: "DesignSystem UI Component Library",
          role: "Author & Maintainer",
          link: "https://vershasaini.dev/designsystem",
          description: "Created an open-source accessible React UI component library featuring automatic dark mode, zero runtime CSS overhead, and complete keyboard navigation support."
        }
      ],
      certifications: [
        {
          name: "Google Professional Cloud Developer",
          issuer: "Google Cloud Platform (GCP)",
          date: "Dec 2024",
          url: "https://cloud.google.com/certification"
        },
        {
          name: "Certified Kubernetes Administrator (CKA)",
          issuer: "Cloud Native Computing Foundation (CNCF)",
          date: "May 2023",
          url: "https://cncf.io/certification"
        },
        {
          name: "Meta Front-End Developer Professional Certificate",
          issuer: "Meta / Coursera",
          date: "Aug 2021",
          url: "https://coursera.org/verify/meta"
        }
      ]
    }
  },
  {
    name: "Jatin Sharma",
    username: "jatinsharma673",
    designation: "Frontend Developer",
    phone: "8860133659",
    email: "jatin200336@gmail.com",
    location: "Gurgaon, Haryana, India",
    initials: "JS",
    colorClass: "bg-sky-500 text-white",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop",
    resume: {
      personalInfo: {
        name: "Jatin Sharma",
        email: "jatin200336@gmail.com",
        phone: "8860133659",
        location: "Gurgaon, Haryana, India",
        jobTitle: "Senior Frontend Developer & UI Engineer",
        website: "https://jatinsharma.com",
        summary: "Energetic, creative, and highly technical Senior Frontend Developer with 4+ years of experience specializing in React, TypeScript, modern CSS architectures, fluid animations, and high-performance Web Vitals. Passionate about translating complex Figma design mockups into pixel-perfect, fully accessible, and responsive web applications with lightning-fast load times."
      },
      skills: ["React 18", "TypeScript", "HTML5 & CSS3/SASS", "Tailwind CSS", "JavaScript (ES6+)", "Vite", "Framer Motion", "Figma to Code", "State Management (Zustand/Redux)", "Web Vitals Optimization"],
      education: [
        {
          institution: "Kurukshetra University",
          degree: "Post Graduation - Master of Science (M.Sc)",
          fieldOfStudy: "Computer Science & Interactive Graphics",
          startDate: "2023",
          endDate: "2025",
          grade: "Distinction (87.2%)",
          description: "Focused on Human-Computer Interaction (HCI), Advanced Web Technologies, Animation Systems, and User Experience Engineering. Research project on micro-interaction performance."
        },
        {
          institution: "Guru Gobind Singh Indraprastha University (GGSIPU)",
          degree: "Graduation - Bachelor of Science (B.Sc)",
          fieldOfStudy: "Information Technology",
          startDate: "2020",
          endDate: "2023",
          grade: "First Class (82.6%)",
          description: "Comprehensive study in Web Development, Database Management, Data Structures, Software Testing, and Object-Oriented Programming."
        },
        {
          institution: "Delhi Design & Technology Institute",
          degree: "Advanced Diploma",
          fieldOfStudy: "Modern UI Engineering & Web Performance",
          startDate: "2022",
          endDate: "2023",
          grade: "Grade A+",
          description: "Specialized diploma covering advanced CSS layouts (Grid/Flexbox), responsive fluid typography, accessibility compliance (WCAG 2.1), and web asset optimization."
        }
      ],
      experience: [
        {
          company: "PixelPerfect Labs Gurgaon",
          position: "Senior Frontend UI Developer",
          startDate: "2023",
          endDate: "Present",
          description: "• Engineered 20+ responsive web interfaces using React, TypeScript, and Tailwind CSS, achieving consistent 95+ Google Lighthouse performance scores.\n• Implemented complex fluid layout animations and page transitions using Framer Motion, lifting average user engagement duration by 18%.\n• Optimized web asset delivery pipelines, lazy loading heavy components and reducing total initial bundle payload by 42%."
        },
        {
          company: "CreativeCode Digital Solutions",
          position: "Frontend Developer",
          startDate: "2021",
          endDate: "2023",
          description: "• Built custom web portals for e-commerce and SaaS startups, ensuring seamless multi-device responsiveness across smartphones, tablets, and desktops.\n• Collaborated closely with UI designers to build and maintain a comprehensive Figma design token system mapped directly to Tailwind CSS."
        },
        {
          company: "WebCraft Agency",
          position: "Junior Frontend Developer",
          startDate: "2020",
          endDate: "2021",
          description: "• Developed interactive landing pages, bug fixes, and client email templates using semantic HTML5, CSS3, and JavaScript."
        }
      ],
      projects: [
        {
          name: "ResuBuilder Custom Themes & Render Engine",
          role: "Lead UI Engineer",
          link: "https://github.com/jatinsharma673/themes",
          description: "Engineered ultra-fast rendering layout frames with zero CSS bloat for recruitment tools, allowing candidates to customize color palettes and preview multi-page A4 layouts instantly."
        },
        {
          name: "MotionCanvas Interactive UI Showcase",
          role: "Creator",
          link: "https://jatinsharma.com/motioncanvas",
          description: "Built an interactive web gallery showcasing physics-based drag-and-drop cards, custom cursors, and fluid glassmorphism component libraries."
        },
        {
          name: "Saini Store Mobile Web App",
          role: "Frontend Developer",
          link: "https://jatinsharma.com/saini-app",
          description: "Created a touch-optimized progressive web app (PWA) with offline caching and instant cart add animations."
        }
      ],
      certifications: [
        {
          name: "Meta Front-End Developer Professional Certificate",
          issuer: "Meta / Coursera",
          date: "Jul 2024",
          url: "https://coursera.org/verify/meta"
        },
        {
          name: "React Certified Architect",
          issuer: "OpenJS Foundation",
          date: "Feb 2023",
          url: "https://openjsf.org"
        },
        {
          name: "Google UX/UI Design Professional Certificate",
          issuer: "Google",
          date: "Nov 2021",
          url: "https://coursera.org/verify/google-ux"
        }
      ]
    }
  },
  {
    name: "Priya Sharma",
    username: "priyasharma260",
    designation: "Senior Accountant / Finance Advisor",
    phone: "9812345678",
    email: "priya.sharma@finance.org",
    location: "New Delhi, Delhi, India",
    initials: "PS",
    colorClass: "bg-emerald-600 text-white",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop",
    resume: {
      personalInfo: {
        name: "Priya Sharma",
        email: "priya.sharma@finance.org",
        phone: "9812345678",
        location: "New Delhi, Delhi, India",
        jobTitle: "Senior Accountant & Financial Advisory Director",
        website: "https://priyasharma.finance",
        summary: "Certified Chartered Accountant and Senior Financial Advisor with 7+ years of experience in corporate tax planning, statutory auditing, financial risk management, and strategic asset allocation. Proven track record of auditing multi-crore balance sheets, discovering operational cost inefficiencies, and ensuring 100% compliance with international financial reporting standards (IFRS) and Indian GST laws."
      },
      skills: ["Corporate Taxation", "Statutory Auditing", "Tally Prime ERP", "Advanced Excel & Financial Modeling", "IFRS Compliance", "Risk Management", "Budget Forecasting", "SAP FI/CO"],
      education: [
        {
          institution: "Delhi University - Delhi School of Economics",
          degree: "Post Graduation - Master of Commerce (M.Com)",
          fieldOfStudy: "Finance & Corporate Accounting",
          startDate: "2018",
          endDate: "2020",
          grade: "First Class with Honors (84.8%)",
          description: "Specialized in Advanced Financial Analysis, Corporate Tax Planning, Portfolio Management, and Econometric Modeling. Published paper on tax optimization strategies."
        },
        {
          institution: "Shri Ram College of Commerce (SRCC), Delhi University",
          degree: "Graduation - Bachelor of Commerce (B.Com Hons)",
          fieldOfStudy: "Commerce & Accounting",
          startDate: "2015",
          endDate: "2018",
          grade: "Top 5% in College (91.2%)",
          description: "Prestigious degree covering Financial Accounting, Cost Accounting, Corporate Law, Microeconomics, Business Statistics, and Auditing Standards."
        },
        {
          institution: "Institute of Chartered Accountants of India (ICAI)",
          degree: "Chartered Accountant (CA) & Post-CA Diploma",
          fieldOfStudy: "International Financial Reporting & Tax Audit",
          startDate: "2016",
          endDate: "2020",
          grade: "All India Rank 42",
          description: "Completed 3-year mandatory articleship training in statutory auditing, tax litigation, and corporate restructuring."
        }
      ],
      experience: [
        {
          company: "Apex Wealth Advisors & Corporate Consultants",
          position: "Senior Corporate Finance Director",
          startDate: "2021",
          endDate: "Present",
          description: "• Directed statutory audits and corporate tax compliance filings for 30+ enterprise clients representing over $25M in annual turnover.\n• Discovered $180K in cumulative tax savings through strategic restructuring of corporate expenditures and capital allowances.\n• Implemented automated financial dashboard reporting using SAP FI/CO and PowerBI, reducing quarterly closing times by 40%."
        },
        {
          company: "KPMG India Consulting",
          position: "Assistant Audit Manager",
          startDate: "2019",
          endDate: "2021",
          description: "• Managed statutory audit engagements for manufacturing and retail sector leaders.\n• Audited internal financial controls, inventory evaluation procedures, and multi-state GST reconciliations."
        },
        {
          company: "Gupta & Associates CA Firm",
          position: "Articleship Trainee & Tax Accountant",
          startDate: "2016",
          endDate: "2019",
          description: "• Prepared corporate and individual tax returns, represented clients during income tax assessments, and maintained ledger balance accounts."
        }
      ],
      projects: [
        {
          name: "TaxScribe Automated Financial Modeling Suite",
          role: "Lead Financial Architect",
          link: "https://priyasharma.finance/taxscribe",
          description: "Created customized automated Excel financial models with macros that reduced quarterly tax preparation cycles from 14 days to 3 days for SMB clients."
        },
        {
          name: "GST Auto-Reconciliation Engine",
          role: "Creator",
          link: "https://priyasharma.finance/gstrecon",
          description: "Engineered a Python/Excel reconciliation script matching purchase registers against GSTR-2A data, flagging input tax credit mismatches automatically."
        },
        {
          name: "Saini Group Corporate Restructuring Plan",
          role: "Financial Consultant",
          link: "https://priyasharma.finance/saini-audit",
          description: "Audited multi-branch inventory logistics, streamlining working capital utilization by 15% across 5 retail stores."
        }
      ],
      certifications: [
        {
          name: "Chartered Accountant (CA) License",
          issuer: "Institute of Chartered Accountants of India (ICAI)",
          date: "Nov 2020",
          url: "https://icai.org"
        },
        {
          name: "Chartered Financial Analyst (CFA) – Level II Candidate",
          issuer: "CFA Institute USA",
          date: "Jun 2023",
          url: "https://cfainstitute.org"
        },
        {
          name: "Diploma in International Financial Reporting (DipIFR)",
          issuer: "ACCA UK",
          date: "Jan 2022",
          url: "https://accaglobal.com"
        }
      ]
    }
  },
  {
    name: "Rahul Verma",
    username: "rahulverma309",
    designation: "Creative UI/UX Designer",
    phone: "9876543210",
    email: "rahul.verma@behance.net",
    location: "Mumbai, Maharashtra, India",
    initials: "RV",
    colorClass: "bg-purple-600 text-white",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=250&auto=format&fit=crop",
    resume: {
      personalInfo: {
        name: "Rahul Verma",
        email: "rahul.verma@behance.net",
        phone: "9876543210",
        location: "Mumbai, Maharashtra, India",
        jobTitle: "Lead Product Designer & UI/UX Director",
        website: "https://behance.net/rahulverma309",
        summary: "Visionary Lead Product Designer with 6+ years of experience crafting intuitive user interfaces, comprehensive design systems, and seamless user experiences for high-scale mobile and web products. Master of Figma, user research methodologies, prototyping, and accessibility standards (WCAG 2.1). Proven history of boosting user retention rates by up to 25% through human-centered design iterations."
      },
      skills: ["UI/UX Design", "Figma", "Design Systems", "User Research & Testing", "Interactive Prototyping", "Adobe Creative Suite", "Design Tokens", "Micro-Interactions", "HTML/CSS Basics", "Accessibility (WCAG)"],
      education: [
        {
          institution: "National Institute of Design (NID) Ahmedabad",
          degree: "Post Graduation - Master of Design (M.Des)",
          fieldOfStudy: "Interaction Design & Digital Products",
          startDate: "2019",
          endDate: "2021",
          grade: "President's Gold Medalist",
          description: "Top departmental rank. Researched micro-interactions, gesture-driven mobile interfaces, and accessible design frameworks. Thesis focused on touch navigation ergonomics."
        },
        {
          institution: "National Institute of Fashion Technology (NIFT) Mumbai",
          degree: "Graduation - Bachelor of Design (B.Des)",
          fieldOfStudy: "Visual Communication & Graphic Design",
          startDate: "2015",
          endDate: "2019",
          grade: "First Class with Distinction (89.0%)",
          description: "Comprehensive 4-year degree covering Typography, Color Theory, Layout Design, Brand Identity Systems, Digital Illustration, and User Psychology."
        },
        {
          institution: "Human Factors International (HFI)",
          degree: "Certified Usability Analyst (CUA) Diploma",
          fieldOfStudy: "Human-Computer Interaction (HCI) & Usability Engineering",
          startDate: "2021",
          endDate: "2022",
          grade: "Certified Practitioner",
          description: "Specialized diploma covering quantitative user testing, eye-tracking heatmaps, cognitive walkthroughs, and accessibility audit methodologies."
        }
      ],
      experience: [
        {
          company: "Cosmic Digital Studios Mumbai",
          position: "Lead Product Designer & UX Director",
          startDate: "2021",
          endDate: "Present",
          description: "• Spearheaded redesign of a flagship fintech mobile app with 5M+ active users, resulting in a 24% increase in user conversion and 30% reduction in checkout drop-offs.\n• Created a comprehensive Figma Design System with 400+ reusable accessible UI components, cutting designer-to-developer handoff times by half.\n• Conducted 50+ in-person and remote user testing sessions to iterate on wireframes and visual UI assets."
        },
        {
          company: "PixelCraft Design Agency",
          position: "Senior UI/UX Designer",
          startDate: "2019",
          endDate: "2021",
          description: "• Designed custom SaaS product dashboards, mobile applications, and marketing landing pages for international clients.\n• Formatted design specification guidelines and interactive prototypes using Figma and Principle."
        },
        {
          company: "Vivid Media Labs",
          position: "Visual Design Intern",
          startDate: "2018",
          endDate: "2019",
          description: "• Created brand identities, vector icons, typography guidelines, and digital marketing banners for retail startups."
        }
      ],
      projects: [
        {
          name: "Saini Retail E-Commerce Design System & Mobile App",
          role: "Lead UI/UX Architect",
          link: "https://behance.net/rahulverma309/saini",
          description: "Crafted a modern brand guideline, color system, and high-fidelity mobile e-commerce prototype for luxury fashion retail stores, featuring instant one-tap checkout user flows."
        },
        {
          name: "Aura Health & Mindfulness App Design",
          role: "Creator",
          link: "https://behance.net/rahulverma309/aura",
          description: "Designed a calming dark-mode mobile interface for meditation tracking with custom animated breathing rings and audio player UI controls."
        },
        {
          name: "FinPulse Banking Dashboard Concept",
          role: "Product Designer",
          link: "https://behance.net/rahulverma309/finpulse",
          description: "Designed a responsive web analytics dashboard rendering multi-asset stock portfolios, transaction histories, and card limit controls."
        }
      ],
      certifications: [
        {
          name: "Google UX Design Professional Certificate",
          issuer: "Google / Coursera",
          date: "Aug 2023",
          url: "https://coursera.org/verify/google-ux"
        },
        {
          name: "Nielsen Norman Group UX Master Certification",
          issuer: "Nielsen Norman Group (NN/g)",
          date: "Jan 2022",
          url: "https://nngroup.com"
        },
        {
          name: "Certified Usability Analyst (CUA)",
          issuer: "Human Factors International",
          date: "Nov 2021",
          url: "https://humanfactors.com"
        }
      ]
    }
  },
  {
    name: "Dr. Sneha Patel",
    username: "snehapatel358",
    designation: "Pediatrician / Medical Consultant",
    phone: "9123456789",
    email: "sneha.patel@healthnet.com",
    location: "Ahmedabad, Gujarat, India",
    initials: "SP",
    colorClass: "bg-rose-500 text-white",
    avatarUrl: "https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=250&auto=format&fit=crop",
    resume: {
      personalInfo: {
        name: "Dr. Sneha Patel",
        email: "sneha.patel@healthnet.com",
        phone: "9123456789",
        location: "Ahmedabad, Gujarat, India",
        jobTitle: "Senior Consultant Pediatrician & Child Health Specialist",
        website: "https://snehapatelmed.com",
        summary: "Compassionate, highly skilled Senior Consultant Pediatrician with 7+ years of active clinical experience in tertiary care hospitals and pediatric outpatient departments. Expert in neonatal intensive care (NICU), pediatric emergency resuscitation, child nutrition, growth assessment, and adolescent health counseling. Dedicated to delivering patient-centric medical care and leading community health initiatives."
      },
      skills: ["Pediatric Medicine", "Neonatal Resuscitation (NRP)", "Clinical Diagnostics", "Pediatric ICU Management", "Emergency Medicine", "Child Preventive Care", "Patient Communication", "Medical Research & Audits"],
      education: [
        {
          institution: "All India Institute of Medical Sciences (AIIMS) New Delhi",
          degree: "Post Graduation - Doctor of Medicine (M.D.)",
          fieldOfStudy: "Pediatrics & Child Health",
          startDate: "2017",
          endDate: "2020",
          grade: "Gold Medalist in Pediatrics",
          description: "3-year intensive medical residency at India's premier medical institution. Specialized in Neonatology, Pediatric Intensive Care, Preventive Pediatrics, and Pediatric Pulmonology."
        },
        {
          institution: "B.J. Medical College & Civil Hospital Ahmedabad",
          degree: "Graduation - Bachelor of Medicine, Bachelor of Surgery (MBBS)",
          fieldOfStudy: "Medicine & Surgery",
          startDate: "2011",
          endDate: "2017",
          grade: "First Class with Distinction (82.4%)",
          description: "Completed 5.5-year rigorous medical degree including 1-year compulsory rotating internship across General Surgery, Pediatrics, Obstetrics, and Internal Medicine."
        },
        {
          institution: "Royal College of Pediatrics and Child Health (UK)",
          degree: "Postgraduate Diploma (DCH)",
          fieldOfStudy: "Diploma in Child Health & Pediatric Clinical Care",
          startDate: "2020",
          endDate: "2021",
          grade: "Passed with Honors",
          description: "International clinical diploma focused on advanced pediatric diagnostics, developmental assessment, and emergency resuscitation protocols."
        }
      ],
      experience: [
        {
          company: "HealCare Children's Hospital & Research Center",
          position: "Senior Consultant Pediatrician",
          startDate: "2020",
          endDate: "Present",
          description: "• Lead attending physician supervising 20-bed Pediatric ICU and Outpatient Department treating 50+ young patients daily.\n• Successfully managed complex pediatric emergencies, acute respiratory distress cases, and neonatal infections with zero critical complications.\n• Supervised a medical team of 12 junior resident doctors and nursing staff during daily clinical ward rounds."
        },
        {
          company: "Civil Hospital Ahmedabad",
          position: "Pediatric Senior Resident",
          startDate: "2018",
          endDate: "2020",
          description: "• Conducted emergency neonatal resuscitations, vaccination drives, and child health screening camps in rural Gujarat.\n• Published clinical study on pediatric asthma management strategies in national medical journals."
        },
        {
          company: "AIIMS New Delhi",
          position: "Junior Resident Medical Officer",
          startDate: "2017",
          endDate: "2018",
          description: "• Managed pediatric emergency triage and inpatient care under senior faculty supervision."
        }
      ],
      projects: [
        {
          name: "Arogya Rural Child Healthcare Initiative",
          role: "Director of Medical Outreach",
          link: "https://snehapatelmed.com/arogya",
          description: "Organized 15 free health screening camps across rural Gujarat, providing health checkups, free medications, and nutritional guidance to 2,500+ underprivileged children."
        },
        {
          name: "Pediatric Asthma Management Telemed Portal",
          role: "Medical Advisor",
          link: "https://snehapatelmed.com/telemed",
          description: "Co-developed an online consultation platform connecting rural families with pediatric specialists for remote symptom tracking and prescription renewals."
        },
        {
          name: "Childhood Immunization Tracker App",
          role: "Clinical Specialist",
          link: "https://snehapatelmed.com/vaccine-app",
          description: "Created an automated SMS and WhatsApp vaccine reminder schedule for parents, improving booster dose compliance by 35%."
        }
      ],
      certifications: [
        {
          name: "Board Certified Pediatrician Registration",
          issuer: "Medical Council of India (MCI / NMC)",
          date: "May 2020",
          url: "https://nmc.org.in"
        },
        {
          name: "Advanced Pediatric Life Support (APLS)",
          issuer: "American Heart Association (AHA)",
          date: "Mar 2023",
          url: "https://cpr.heart.org"
        },
        {
          name: "Neonatal Resuscitation Program (NRP Certified)",
          issuer: "American Academy of Pediatrics (AAP)",
          date: "Jan 2022",
          url: "https://aap.org"
        }
      ]
    }
  },
  {
    name: "Amit Saini",
    username: "amitsaini407",
    designation: "Retail Operations Manager",
    phone: "9988776655",
    email: "amit.retail@sainicollection.com",
    location: "Gurgaon, Haryana, India",
    initials: "AS",
    colorClass: "bg-amber-500 text-white",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
    resume: {
      personalInfo: {
        name: "Amit Saini",
        email: "amit.retail@sainicollection.com",
        phone: "9988776655",
        location: "Gurgaon, Haryana, India",
        jobTitle: "Senior Retail Operations Manager & Supply Chain Director",
        website: "https://sainicollection.com",
        summary: "Results-oriented Senior Retail Operations Manager with 8+ years of experience directing multi-store retail logistics, inventory control systems, sales expansion strategies, and store staffing teams. Proven expertise in increasing retail store revenues by 40% year-over-year, reducing logistics shrinkage costs by 20%, and implementing automated POS checkout infrastructure."
      },
      skills: ["Retail Store Management", "Supply Chain Optimization", "Inventory Control Systems", "POS Billing Systems", "Sales Forecasting", "P&L Management", "Team Leadership", "Omnichannel Retail"],
      education: [
        {
          institution: "Management Development Institute (MDI) Gurgaon",
          degree: "Post Graduation - Post Graduate Diploma in Management (PGDM / MBA)",
          fieldOfStudy: "Retail Management & Supply Chain Operations",
          startDate: "2017",
          endDate: "2019",
          grade: "First Class with Distinction (85.6%)",
          description: "Elite 2-year management degree covering Retail Store Analytics, Supply Chain Logistics, Consumer Behavior, Brand Management, and Financial Management."
        },
        {
          institution: "Kurukshetra University",
          degree: "Graduation - Bachelor of Business Administration (BBA)",
          fieldOfStudy: "Business Administration & Marketing",
          startDate: "2014",
          endDate: "2017",
          grade: "Top 5% in University (83.0%)",
          description: "Core coursework in Business Management, Principles of Marketing, Business Mathematics, Accounting, Organizational Behavior, and Human Resource Management."
        },
        {
          institution: "Indian Institute of Material Management (IIMM)",
          degree: "Executive Diploma",
          fieldOfStudy: "Supply Chain Management & Warehouse Logistics",
          startDate: "2019",
          endDate: "2020",
          grade: "Passed with Honors",
          description: "Specialized diploma covering inventory forecasting models, warehouse space optimization, vendor negotiation, and freight logistics."
        }
      ],
      experience: [
        {
          company: "Saini Collection Retail Hubs",
          position: "Senior Operations & Retail Director",
          startDate: "2019",
          endDate: "Present",
          description: "• Managed operations across 6 flagship retail boutique stores in NCR, overseeing 40+ sales staff and achieving 35% annual revenue growth.\n• Overhauled supply chain logistics routes and vendor agreements, reducing annual warehousing and transport overheads by $120K.\n• Implemented unified Point-of-Sale (POS) barcode terminals, cutting average customer checkout wait times by 45%."
        },
        {
          company: "Reliance Retail India",
          position: "Assistant Store Manager",
          startDate: "2017",
          endDate: "2019",
          description: "• Supervised daily inventory audits, merchandise visual displays, and staff scheduling for a 15,000 sq. ft. department store.\n• Formulated local promotional campaigns that increased weekend store footfall by 28%."
        },
        {
          company: "Metro Cash & Carry",
          position: "Operations Management Trainee",
          startDate: "2016",
          endDate: "2017",
          description: "• Conducted inventory stock checks, loss prevention audits, and supplier delivery reconciliations."
        }
      ],
      projects: [
        {
          name: "Saini Smart Retail POS & Inventory Integration",
          role: "Operations Project Director",
          link: "https://sainicollection.com/pos-launch",
          description: "Successfully configured localized Point-Of-Sale terminal automation connected to central cloud inventory servers, reducing stock mismatch errors to near zero."
        },
        {
          name: "Omnichannel Order Fulfillment System",
          role: "Lead Logistics Strategist",
          link: "https://sainicollection.com/omnichannel",
          description: "Integrated online e-commerce website orders with local retail store inventory, enabling same-day store pickup and local home delivery."
        },
        {
          name: "Retail Floor Optimization Project",
          role: "Operations Expert",
          link: "https://sainicollection.com/floor-plan",
          description: "Redesigned store layouts based on customer heatmaps, resulting in a 20% increase in high-margin merchandise impulse purchases."
        }
      ],
      certifications: [
        {
          name: "Certified Supply Chain Professional (CSCP)",
          issuer: "APICS / Association for Supply Chain Management",
          date: "Oct 2023",
          url: "https://ascm.org"
        },
        {
          name: "Project Management Professional (PMP)",
          issuer: "Project Management Institute (PMI)",
          date: "May 2022",
          url: "https://pmi.org"
        },
        {
          name: "Lean Six Sigma Green Belt Certification",
          issuer: "TÜV SÜD South Asia",
          date: "Jan 2021",
          url: "https://tuvsud.com"
        }
      ]
    }
  },
  {
    name: "Sanya Malhotra",
    username: "sanyamalhotra456",
    designation: "High School English Educator",
    phone: "9001122334",
    email: "sanya.m@education.res",
    location: "Chandigarh, Punjab, India",
    initials: "SM",
    colorClass: "bg-teal-500 text-white",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop",
    resume: {
      personalInfo: {
        name: "Sanya Malhotra",
        email: "sanya.m@education.res",
        phone: "9001122334",
        location: "Chandigarh, Punjab, India",
        jobTitle: "Senior English Educator & Curriculum Designer",
        website: "https://sanyateaches.edu",
        summary: "Dedicated, inspiring Senior High School English Educator with 6+ years of academic teaching experience, curriculum design, and student counseling. Expert in teaching English Literature, Advanced Grammar, Creative Writing, and Public Speaking. Passionate about leveraging digital e-learning platforms, interactive literary workshops, and holistic assessment frameworks to empower students to excel academically and articulate effectively."
      },
      skills: ["English Literature", "Curriculum Design", "Classroom Leadership", "Digital E-Learning Tools", "Student Counseling", "Public Speaking & Debating", "Creative Writing Workshops", "Educational Assessment"],
      education: [
        {
          institution: "Panjab University Department of English",
          degree: "Post Graduation - Master of Arts (M.A.)",
          fieldOfStudy: "English Literature & Linguistics",
          startDate: "2018",
          endDate: "2020",
          grade: "First Class with Distinction (86.0%)",
          description: "Gold Medalist. Specialized in World Literature, Critical Theory, Phonetics, and Modern Pedagogy. Authored master's dissertation on modern literary teaching methodologies."
        },
        {
          institution: "Lady Shri Ram College for Women (LSR), Delhi University",
          degree: "Graduation - Bachelor of Education (B.Ed) & B.A.",
          fieldOfStudy: "English Literature & Education Pedagogy",
          startDate: "2014",
          endDate: "2018",
          grade: "Top 3 Rank in Department (88.2%)",
          description: "Comprehensive 4-year integrated degree covering Educational Psychology, Classroom Management, Student Assessment, Literature History, and Child Development."
        },
        {
          institution: "National Institute of Educational Planning",
          degree: "Postgraduate Diploma",
          fieldOfStudy: "Modern Educational Technology & E-Learning",
          startDate: "2020",
          endDate: "2021",
          grade: "Grade A",
          description: "Specialized diploma in designing hybrid digital classroom modules, remote learning tools, and interactive video-based literature curriculums."
        }
      ],
      experience: [
        {
          company: "St. Stephens Senior Secondary School",
          position: "Senior Educator & Head of Department",
          startDate: "2020",
          endDate: "Present",
          description: "• Instructed Senior High School classes of 45+ students in English Literature and Advanced Rhetoric, achieving a 100% board exam pass rate with 85% of students scoring distinction.\n• Designed and published a modernized digital English literature curriculum incorporating interactive video modules and online discussion forums.\n• Founded the school debating club and coached students to winning titles in 5 regional debate competitions."
        },
        {
          company: "Chandigarh International Public School",
          position: "High School English Teacher",
          startDate: "2018",
          endDate: "2020",
          description: "• Conducted interactive reading circles, creative writing workshops, and poetry recitals for high school students.\n• Prepared comprehensive lesson plans and individual student progress report cards."
        },
        {
          company: "Delhi Literacy Project",
          position: "Volunteer Education Officer",
          startDate: "2017",
          endDate: "2018",
          description: "• Organized English literacy and reading drives for under-resourced community schools."
        }
      ],
      projects: [
        {
          name: "Malhotra Digital Literary Magazine",
          role: "Editor-In-Chief & Founder",
          link: "https://sanyateaches.edu/magazine",
          description: "Created the school's first online digital publication showcasing student poetry, essays, and short stories, reaching over 5,000 monthly readers."
        },
        {
          name: "E-Learn English Literature Portal",
          role: "Curriculum Creator",
          link: "https://sanyateaches.edu/portal",
          description: "Built an interactive study portal providing free downloadable literature study guides, sample essays, and quiz modules for high school students."
        },
        {
          name: "Youth Orators Public Speaking Workshop",
          role: "Lead Workshop Trainer",
          link: "https://sanyateaches.edu/orators",
          description: "Organized a 6-week public speaking course that trained 120+ high school students in persuasive speech writing and debate techniques."
        }
      ],
      certifications: [
        {
          name: "Central Teacher Eligibility Test (CTET) – Paper II Certified",
          issuer: "Central Board of Secondary Education (CBSE)",
          date: "Dec 2020",
          url: "https://ctet.nic.in"
        },
        {
          name: "TESOL / TEFL Master Certification (150 Hours)",
          issuer: "International TEFL Academy",
          date: "Mar 2021",
          url: "https://teflacademy.com"
        },
        {
          name: "Cambridge English Teaching Framework Specialist",
          issuer: "Cambridge Assessment English",
          date: "Nov 2022",
          url: "https://cambridgeenglish.org"
        }
      ]
    }
  }
];

interface LandingPageProps {
  onGetStarted: (templateId?: 'classic' | 'modern' | 'tech' | 'executive') => void;
  onLogin: () => void;
  onSignUp: () => void;
  onViewAllCreators: (initialSearch?: string) => void;
  isLoggedIn?: boolean;
  onGoToDashboard?: () => void;
  onViewPortfolio?: (user: PortfolioUser) => void;
  onSelectTemplate?: (templateId: 'classic' | 'modern' | 'tech' | 'executive') => void;
}

export default function LandingPage({ 
  onGetStarted, 
  onLogin, 
  onSignUp, 
  onViewAllCreators,
  isLoggedIn = false,
  onGoToDashboard,
  onViewPortfolio,
  onSelectTemplate
}: LandingPageProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showAll, setShowAll] = React.useState(false);
  const [activeUserResume, setActiveUserResume] = React.useState<PortfolioUser | null>(null);
  const [previewTemplateModal, setPreviewTemplateModal] = React.useState<'classic' | 'modern' | 'tech' | 'executive' | null>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const resultsSectionRef = React.useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 340; // Approx card width + gap
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const filteredUsers = PORTFOLIO_USERS.filter(user => {
    const q = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(q) ||
      user.designation.toLowerCase().includes(q) ||
      user.location.toLowerCase().includes(q) ||
      user.username.toLowerCase().includes(q) ||
      user.resume.skills.some(skill => skill.toLowerCase().includes(q))
    );
  });
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. STICKY GLASSMORPHIC NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
            <svg className="w-5.5 h-5.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">
            Resu<span className="text-blue-600">Builder</span> Pro
          </span>
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#templates" className="hover:text-blue-600 transition-colors">ATS Templates</a>
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
          <a href="#reviews" className="hover:text-blue-600 transition-colors">Success Stories</a>
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <button 
              onClick={onGoToDashboard}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Go to Dashboard</span>
              <ArrowRight size={13} />
            </button>
          ) : (
            <>
              <button 
                onClick={onLogin}
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                Sign In
              </button>
              <button 
                onClick={onSignUp}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Create Free Account
              </button>
            </>
          )}
        </div>
      </nav>

      {/* PORTFOLIO SHOWCASE BANNER SECTION (EDGE-TO-EDGE) */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-24 px-6 text-center shadow-xl border-b border-slate-900">
        {/* Background Image representation of resume builder */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={resumeShowcaseBg} 
            alt="Resume Builder Background" 
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-slate-950/50"></div>
        </div>
        
        {/* Foreground Content */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">
            <Sparkles size={11} className="text-blue-400" />
            <span>Verified User Portfolios</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]" id="portfolio-showcase-title">
            Professional Portfolio Hub
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-medium">
            Explore authentic portfolios and resumes crafted by our diverse community of users. See how professionals from all industries—from retail, healthcare, and education to finance and engineering—are building their success. Filter by skills or location to find inspiration.
          </p>
        </div>
      </section>

      {/* PORTFOLIO SHOWCASE GRID/SLIDER SECTION */}
      <section ref={resultsSectionRef} className="py-20 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Search bar inside container */}
          <div className="max-w-xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
              <input 
                type="text"
                placeholder="Search by name, skills, location, or designation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onViewAllCreators(searchQuery);
                  }
                }}
                className="w-full pl-12 pr-28 py-3.5 bg-white border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:border-slate-300 transition-all"
                id="portfolio-search-input"
              />
              <div className="absolute right-2 top-1.5 flex items-center gap-1.5">
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => {
                    onViewAllCreators(searchQuery);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full transition-colors shadow-sm cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Rendering the results */}
          {showAll || searchQuery ? (
            /* GRID VIEW OF FILTERED RESULTS */
            <div className="space-y-10 animate-fade-in">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Showing {filteredUsers.length} creators
                </p>
                <button 
                  onClick={() => {
                    setShowAll(false);
                    setSearchQuery('');
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>← Back to Slider</span>
                </button>
              </div>

              {filteredUsers.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 mx-auto">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">No portfolios found</h3>
                    <p className="text-xs text-slate-500 mt-1">Try modifying your keyphrases or resetting search.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setShowAll(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredUsers.map((user) => (
                    <div 
                      key={user.username} 
                      className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-slate-200 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-5">
                        {/* Card Header */}
                        <div className="flex items-center gap-4">
                          {user.avatarUrl ? (
                            <img 
                              src={user.avatarUrl} 
                              alt={user.name} 
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 rounded-full border border-slate-100 object-cover shadow-sm shrink-0" 
                            />
                          ) : (
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shadow-sm shrink-0 ${user.colorClass}`}>
                              {user.initials}
                            </div>
                          )}
                          <div className="min-w-0">
                            <h3 className="font-extrabold text-slate-900 text-sm truncate capitalize leading-tight">
                              {user.name}
                            </h3>
                            <div className="mt-1">
                              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full inline-block">
                                @{user.username.replace(/^@/, '')}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1.5 font-semibold capitalize truncate">
                              <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{user.designation}</span>
                            </p>
                          </div>
                        </div>

                        <hr className="border-slate-100" />

                        {/* Card Details */}
                        <div className="space-y-2 text-slate-600 text-xs font-medium">
                          <p className="flex items-center gap-2.5">
                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{user.phone}</span>
                          </p>
                          <p className="flex items-center gap-2.5 truncate">
                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{user.email}</span>
                          </p>
                          <p className="flex items-center gap-2.5 truncate">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{user.location}</span>
                          </p>
                        </div>
                      </div>

                      {/* Card Action */}
                      <button 
                        onClick={() => onViewPortfolio ? onViewPortfolio(user) : setActiveUserResume(user)}
                        className="w-full mt-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all cursor-pointer text-center"
                      >
                        View Portfolio
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* SLIDER VIEW WITH Programmatic Arrows */
            <div className="space-y-8">
              <div className="relative">
                {/* Horizontal slider container */}
                <div 
                  ref={sliderRef}
                  className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
                >
                  {PORTFOLIO_USERS.map((user) => (
                    <div 
                      key={user.username} 
                      className="snap-start shrink-0 w-[290px] sm:w-[320px] bg-white border border-slate-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-5">
                        {/* Card Header */}
                        <div className="flex items-center gap-4">
                          {user.avatarUrl ? (
                            <img 
                              src={user.avatarUrl} 
                              alt={user.name} 
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 rounded-full border border-slate-100 object-cover shadow-sm shrink-0" 
                            />
                          ) : (
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shadow-sm shrink-0 ${user.colorClass}`}>
                              {user.initials}
                            </div>
                          )}
                          <div className="min-w-0">
                            <h3 className="font-extrabold text-slate-900 text-sm truncate capitalize leading-tight">
                              {user.name}
                            </h3>
                            <div className="mt-1">
                              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full inline-block">
                                @{user.username.replace(/^@/, '')}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1.5 font-semibold capitalize truncate">
                              <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{user.designation}</span>
                            </p>
                          </div>
                        </div>

                        <hr className="border-slate-100" />

                        {/* Card Details */}
                        <div className="space-y-2 text-slate-600 text-xs font-medium">
                          <p className="flex items-center gap-2.5">
                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{user.phone}</span>
                          </p>
                          <p className="flex items-center gap-2.5 truncate">
                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{user.email}</span>
                          </p>
                          <p className="flex items-center gap-2.5 truncate">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{user.location}</span>
                          </p>
                        </div>
                      </div>

                      {/* Card Action */}
                      <button 
                        onClick={() => onViewPortfolio ? onViewPortfolio(user) : setActiveUserResume(user)}
                        className="w-full mt-6 py-2.5 bg-[#2582C4] hover:bg-[#1D6FA8] text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all cursor-pointer text-center"
                      >
                        View Portfolio
                      </button>
                    </div>
                  ))}
                </div>

                {/* Left/Right navigation buttons */}
                <button 
                  onClick={() => scrollSlider('left')}
                  className="absolute left-2 top-[45%] -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 shadow-md transition-all z-10 cursor-pointer hidden md:flex"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scrollSlider('right')}
                  className="absolute right-2 top-[45%] -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 shadow-md transition-all z-10 cursor-pointer hidden md:flex"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* View All Button below slider */}
              <div className="text-center pt-4">
                <button 
                  onClick={() => onViewAllCreators()}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>View All Creators</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* IMMERSIVE PORTFOLIO RESUME DIALOG MODAL */}
      {activeUserResume && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm capitalize">{activeUserResume.name}'s Verified CV</h3>
                  <p className="text-[10px] text-slate-400">Compiled via ResuBuilder Pro</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveUserResume(null)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50 text-slate-800">
              
              {/* ATS Document Canvas Sheet (Simulated print page) */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-10 shadow-md space-y-6 max-w-3xl mx-auto font-sans text-slate-900">
                
                {/* CV Primary Header Block */}
                <div className="border-b-2 border-blue-900 pb-5 space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                    {activeUserResume.resume.personalInfo.name}
                  </h2>
                  <p className="text-sm font-bold text-blue-700 uppercase tracking-widest">
                    {activeUserResume.resume.personalInfo.jobTitle}
                  </p>
                  
                  {/* Contact row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {activeUserResume.resume.personalInfo.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {activeUserResume.resume.personalInfo.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {activeUserResume.resume.personalInfo.location}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-blue-600">
                      <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                      <a href={activeUserResume.resume.personalInfo.website} target="_blank" rel="noreferrer" className="hover:underline">
                        Portfolio Link
                      </a>
                    </span>
                  </div>
                </div>

                {/* Summary Section */}
                <div className="space-y-2">
                  <h3 className="text-xs font-black text-blue-900 uppercase tracking-wider">Professional Profile</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {activeUserResume.resume.personalInfo.summary}
                  </p>
                </div>

                {/* Skills section */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-black text-blue-900 uppercase tracking-wider">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {activeUserResume.resume.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-2.5 py-1 bg-slate-100 text-slate-800 text-[10px] sm:text-xs rounded font-semibold border border-slate-200/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Work Experience */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-blue-900 uppercase tracking-wider">Professional Experience</h3>
                  <div className="space-y-4">
                    {activeUserResume.resume.experience.map((exp, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between items-start text-xs sm:text-sm">
                          <div>
                            <span className="font-extrabold text-slate-900">{exp.position}</span>
                            <span className="text-slate-400"> @ </span>
                            <span className="font-bold text-blue-700">{exp.company}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education section */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-blue-900 uppercase tracking-wider">Academic Education</h3>
                  <div className="space-y-4">
                    {activeUserResume.resume.education.map((edu, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between items-start text-xs sm:text-sm">
                          <div>
                            <span className="font-extrabold text-slate-900">{edu.degree}</span>
                            <span className="text-slate-400"> — </span>
                            <span className="font-bold text-slate-700">{edu.institution}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">{edu.startDate} - {edu.endDate}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects section */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-blue-900 uppercase tracking-wider">Featured Projects</h3>
                  <div className="space-y-4">
                    {activeUserResume.resume.projects.map((proj, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between items-start text-xs sm:text-sm">
                          <div>
                            <span className="font-extrabold text-slate-900">{proj.name}</span>
                            <span className="text-slate-400"> ({proj.role})</span>
                          </div>
                          <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] text-blue-600 hover:underline font-bold">
                            View Project
                          </a>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Action Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-3 justify-between items-center sticky bottom-0 z-20">
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Format verified as 100% Recruiter & ATS Compliant</span>
              </div>
              <div className="flex gap-2.5 w-full sm:w-auto">
                <a 
                  href={`mailto:${activeUserResume.email}?subject=Inquiry%20from%20ResuBuilder%20Portfolio`}
                  className="grow sm:grow-0 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer text-center inline-flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Creator</span>
                </a>
                <button 
                  onClick={() => setActiveUserResume(null)}
                  className="grow sm:grow-0 px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                >
                  Close Preview
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. CORE BENEFITS GRID (Bento Grid Style) */}
      <section id="features" className="py-20 px-6 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              A comprehensive toolkit for serious professionals
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We took out the design guesswork and embedded recruiters' expectations straight into the system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/70 hover:border-blue-400/50 hover:shadow-xs transition-all flex flex-col gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <Zap size={20} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-wider">Interactive Live Canvas</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Toggle templates, color palettes, and margin balances. Watch your content compile instantly to a perfect A4 physical print.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/70 hover:border-blue-400/50 hover:shadow-xs transition-all flex flex-col gap-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                <Sparkles size={20} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-wider">AI-Powered ATS Scan</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our embedded AI analyzes your experience logs, grades your keywords, assesses grammar, and suggests high-impact revisions.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/70 hover:border-blue-400/50 hover:shadow-xs transition-all flex flex-col gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <ShieldCheck size={20} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-wider">No Broken Layouts</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Automatic, intelligent page-breaking prevents orphan bullet points, cutoff sentences, and asymmetrical margins.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/70 hover:border-blue-400/50 hover:shadow-xs transition-all flex flex-col gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                <Award size={20} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-wider">Tailored Themes</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Whether Classic Corporate Navy, Technical Emerald, or Executive Teal, matches industry standards with flawless legibility.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/70 hover:border-blue-400/50 hover:shadow-xs transition-all flex flex-col gap-4">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600">
                <Layers size={20} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-wider">Save & Share Electronically</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deploy your CV online securely. Generate an instant viewable link to share with recruiters or link in applications.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200/70 hover:border-blue-400/50 hover:shadow-xs transition-all flex flex-col gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                <BookOpen size={20} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-wider">100% Free Export</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No payroll gates. No watermark constraints. No bait-and-switches. Export as professional PDF using standard printer tools.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. TEMPLATE PREVIEW CARDS */}
      <section id="templates" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Recruiter-tested document layouts
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Selected layouts render identically in preview, editor, and final PDF export. Select any template to start customizing instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Template 1: Classic Harvard (Default) */}
            <div 
              onClick={() => onSelectTemplate ? onSelectTemplate('classic') : onGetStarted('classic')}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs flex flex-col gap-3 group hover:border-blue-600 hover:shadow-xl transition-all cursor-pointer relative"
            >
              <div className="aspect-[3/4] w-full bg-slate-100/60 rounded-xl overflow-hidden border border-slate-200/80 group-hover:border-blue-300 transition-all select-none relative flex justify-center bg-white">
                <div className="w-[210mm] origin-top transform scale-[0.27] sm:scale-[0.25] md:scale-[0.27] pointer-events-none shrink-0 pt-1">
                  <ResumePreview data={sampleClassicHarvardData} />
                </div>

                {/* Interactive Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2 p-3 z-10 rounded-xl">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectTemplate) {
                        onSelectTemplate('classic');
                      } else {
                        onGetStarted('classic');
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] px-3.5 py-2 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center gap-1.5 cursor-pointer w-full justify-center"
                  >
                    <span>Use Classic Harvard</span>
                    <ArrowRight size={13} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewTemplateModal('classic');
                    }}
                    className="bg-white/95 hover:bg-white text-slate-800 font-bold text-[10px] px-3 py-1.5 rounded-lg shadow-md transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Eye size={12} className="text-blue-600" />
                    <span>Quick Preview</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">Classic Harvard</h4>
                    <span className="text-[9px] font-extrabold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">DEFAULT</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">Traditional Harvard Georgia layout with centered headers.</p>
                </div>
                <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 shrink-0">100% ATS</span>
              </div>
            </div>

            {/* Template 2: Modern Slate */}
            <div 
              onClick={() => onSelectTemplate ? onSelectTemplate('modern') : onGetStarted('modern')}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-3xs flex flex-col gap-3 group hover:border-blue-600 hover:shadow-xl transition-all cursor-pointer relative"
            >
              <div className="aspect-[3/4] w-full bg-slate-100/60 rounded-xl overflow-hidden border border-slate-200/80 group-hover:border-blue-300 transition-all select-none relative flex justify-center bg-white">
                <div className="w-[210mm] origin-top transform scale-[0.27] sm:scale-[0.25] md:scale-[0.27] pointer-events-none shrink-0 pt-1">
                  <ResumePreview data={sampleModernSlateData} />
                </div>

                {/* Interactive Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2 p-3 z-10 rounded-xl">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectTemplate) {
                        onSelectTemplate('modern');
                      } else {
                        onGetStarted('modern');
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] px-3.5 py-2 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center gap-1.5 cursor-pointer w-full justify-center"
                  >
                    <span>Use Modern Slate</span>
                    <ArrowRight size={13} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewTemplateModal('modern');
                    }}
                    className="bg-white/95 hover:bg-white text-slate-800 font-bold text-[10px] px-3 py-1.5 rounded-lg shadow-md transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Eye size={12} className="text-blue-600" />
                    <span>Quick Preview</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">Modern Slate</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">Clean sans-serif fonts with spacious layout.</p>
                </div>
                <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 shrink-0">Clean</span>
              </div>
            </div>

            {/* Template 3: Technical Minimalist */}
            <div 
              onClick={() => onSelectTemplate ? onSelectTemplate('tech') : onGetStarted('tech')}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-3xs flex flex-col gap-3 group hover:border-blue-600 hover:shadow-xl transition-all cursor-pointer relative"
            >
              <div className="aspect-[3/4] w-full bg-slate-100/60 rounded-xl overflow-hidden border border-slate-200/80 group-hover:border-blue-300 transition-all select-none relative flex justify-center bg-white">
                <div className="w-[210mm] origin-top transform scale-[0.27] sm:scale-[0.25] md:scale-[0.27] pointer-events-none shrink-0 pt-1">
                  <ResumePreview data={sampleTechMinimalistData} />
                </div>

                {/* Interactive Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2 p-3 z-10 rounded-xl">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectTemplate) {
                        onSelectTemplate('tech');
                      } else {
                        onGetStarted('tech');
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] px-3.5 py-2 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center gap-1.5 cursor-pointer w-full justify-center"
                  >
                    <span>Use Technical Minimalist</span>
                    <ArrowRight size={13} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewTemplateModal('tech');
                    }}
                    className="bg-white/95 hover:bg-white text-slate-800 font-bold text-[10px] px-3 py-1.5 rounded-lg shadow-md transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Eye size={12} className="text-blue-600" />
                    <span>Quick Preview</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">Technical Minimalist</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">Monospaced font accents & code block headers.</p>
                </div>
                <span className="text-[9px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100 shrink-0">Eng/Dev</span>
              </div>
            </div>

            {/* Template 4: Executive Luxury */}
            <div 
              onClick={() => onSelectTemplate ? onSelectTemplate('executive') : onGetStarted('executive')}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-3xs flex flex-col gap-3 group hover:border-blue-600 hover:shadow-xl transition-all cursor-pointer relative"
            >
              <div className="aspect-[3/4] w-full bg-slate-100/60 rounded-xl overflow-hidden border border-slate-200/80 group-hover:border-blue-300 transition-all select-none relative flex justify-center bg-white">
                <div className="w-[210mm] origin-top transform scale-[0.27] sm:scale-[0.25] md:scale-[0.27] pointer-events-none shrink-0 pt-1">
                  <ResumePreview data={sampleExecutiveLuxuryData} />
                </div>

                {/* Interactive Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2 p-3 z-10 rounded-xl">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectTemplate) {
                        onSelectTemplate('executive');
                      } else {
                        onGetStarted('executive');
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] px-3.5 py-2 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center gap-1.5 cursor-pointer w-full justify-center"
                  >
                    <span>Use Executive Luxury</span>
                    <ArrowRight size={13} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewTemplateModal('executive');
                    }}
                    className="bg-white/95 hover:bg-white text-slate-800 font-bold text-[10px] px-3 py-1.5 rounded-lg shadow-md transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Eye size={12} className="text-blue-600" />
                    <span>Quick Preview</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">Executive Luxury</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">Executive header banner with balanced serif text.</p>
                </div>
                <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 shrink-0">Leadership</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-6 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Create a recruiter-ready CV in 3 steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Our streamlined framework gets you ready to apply in under 10 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Visual connector line */}
            <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-0.5 bg-slate-100 -z-10"></div>
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white font-black text-sm rounded-full flex items-center justify-center shadow-lg shadow-blue-500/10">1</div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-950 uppercase tracking-wider">Fill & Customize</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your core contact details, educational background, certifications, and project links. Choose your brand theme.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white font-black text-sm rounded-full flex items-center justify-center shadow-lg shadow-blue-500/10">2</div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-950 uppercase tracking-wider">AI Audit & Optimize</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Run our embedded AI scanner. Instantly detect poor descriptors, weak action verbs, and load relevant keywords.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white font-black text-sm rounded-full flex items-center justify-center shadow-lg shadow-blue-500/10">3</div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-950 uppercase tracking-wider">Download & Send</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Save your draft online for sharing, or print to PDF with browser controls to receive a perfect, 100% compliant PDF sheet.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section id="reviews" className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Approved by real job seekers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Here is how candidates secured offers at top tech organizations using ResuBuilder Pro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Review 1 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between gap-5 shadow-3xs">
              <p className="text-xs text-slate-600 italic leading-relaxed">
                "The live canvas with strict print CSS is genius. Every other resume maker online tries to lock you into a subscription or messes up the formatting on download. I compiled mine, downloaded it cleanly with zero margins, and landed an offer at Stripe!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 font-extrabold text-[11px] flex items-center justify-center">SM</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Siddharth Mehta</h4>
                  <p className="text-[10px] text-slate-400">Software Engineer @ Stripe</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between gap-5 shadow-3xs">
              <p className="text-xs text-slate-600 italic leading-relaxed">
                "The AI ATS Audit flagged several weak bullet points and suggested specific dynamic keywords that matched the job listing exactly. My interview response rate went from practically zero to four calls in a single week!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-extrabold text-[11px] flex items-center justify-center">LR</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Lauren Russo</h4>
                  <p className="text-[10px] text-slate-400">Senior Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION */}
      <section className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 pointer-events-none"></div>
        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Ready to bypass the recruiter filters?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Create a secure account to save unlimited drafts, run full AI diagnostic audits, and access all layouts without paywalls.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
            {isLoggedIn ? (
              <button
                onClick={onGoToDashboard}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Go to My Workspace Dashboard</span>
                <ArrowRight size={13} />
              </button>
            ) : (
              <>
                <button
                  onClick={onSignUp}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Get Started for Free
                </button>
                <button
                  onClick={onLogin}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg border border-slate-700 transition-all cursor-pointer"
                >
                  Sign In to Existing Draft
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-900 text-xs text-center">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-black text-xs">CV</span>
            </div>
            <span className="font-bold text-sm tracking-tight text-white">ResuBuilder Pro</span>
          </div>
          <p>© {new Date().getFullYear()} ResuBuilder Pro. Designed with architectural layout precision.</p>
          <div className="flex gap-4 font-semibold">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>

      {/* TEMPLATE PREVIEW ENLARGED MODAL */}
      {previewTemplateModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full flex flex-col max-h-[90vh] overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <span>
                      {previewTemplateModal === 'classic' && 'Classic Harvard'}
                      {previewTemplateModal === 'modern' && 'Modern Slate'}
                      {previewTemplateModal === 'tech' && 'Technical Minimalist'}
                      {previewTemplateModal === 'executive' && 'Executive Luxury'}
                    </span>
                    {previewTemplateModal === 'classic' && (
                      <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 uppercase">Default</span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500">Live Renderer View — Exactly as generated in CV Builder & PDF download</p>
                </div>
              </div>
              <button 
                onClick={() => setPreviewTemplateModal(null)}
                className="p-1.5 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-lg transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content - Enlarged Live Document Preview */}
            <div className="p-4 sm:p-6 overflow-y-auto bg-slate-100/80 flex justify-center items-start">
              <div className="w-full bg-white shadow-xl rounded-xl border border-slate-200 p-2 sm:p-4 overflow-x-auto flex justify-center">
                <div className="w-[210mm] min-h-[297mm] origin-top transform scale-[0.65] sm:scale-[0.8] md:scale-[0.85] shrink-0 my-[-15%] sm:my-[-10%] shadow-lg">
                  <ResumePreview 
                    data={
                      previewTemplateModal === 'classic' ? sampleClassicHarvardData :
                      previewTemplateModal === 'modern' ? sampleModernSlateData :
                      previewTemplateModal === 'tech' ? sampleTechMinimalistData :
                      sampleExecutiveLuxuryData
                    } 
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium text-center sm:text-left">Click below to start customizing with this template</span>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setPreviewTemplateModal(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const tpl = previewTemplateModal;
                    setPreviewTemplateModal(null);
                    if (onSelectTemplate) {
                      onSelectTemplate(tpl);
                    } else {
                      onGetStarted(tpl);
                    }
                  }}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Build CV With This Template</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
