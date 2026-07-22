import { ResumeData } from './types';

export const initialResumeData: ResumeData = {
  title: 'Senior Software Engineer CV',
  creatorToken: '', // Will be generated in App.tsx using a secure random hash
  templateId: 'classic',
  themeColor: '#1e293b', // Deep Slate Corporate
  sectionOrder: ['summary', 'experiences', 'skills', 'projects', 'educations', 'certifications'],
  personalInfo: {
    name: 'Alex Mercer',
    jobTitle: 'Senior Frontend Architect',
    email: 'alex.mercer@gmail.com',
    phone: '+1 (555) 432-8765',
    location: 'Austin, TX',
    website: 'alexmercer.dev',
    linkedin: 'linkedin.com/in/alexmercer',
    github: 'github.com/alexmercer'
  },
  summary: 'Innovative Senior Frontend Architect with 8+ years of expertise designing, building, and deploying complex enterprise web applications. Highly skilled in client-side optimization, micro-frontend architecture, robust state management systems, and high-fidelity data visualization. Dedicated to creating fully accessible (WCAG 2.1 compliant), lightning-fast user interfaces and mentoring cross-functional product teams to build highly maintainable, modern codebases.',
  experiences: [
    {
      id: 'exp-1',
      company: 'TechFlow Solutions',
      position: 'Senior Frontend Architect',
      startDate: 'Mar 2022',
      endDate: 'Present',
      current: true,
      location: 'Austin, TX',
      description: '- Architected migration of core enterprise product from legacy monolith to a distributed Micro-Frontend framework, leading to a 32% increase in page responsiveness and 45% reduction in initial bundle sizes.&#10;- Designed a comprehensive, responsive, themeable design system using Tailwind CSS and Radix UI adopted by 4 cross-functional product teams, reducing overall product engineering cycle time by 20%.&#10;- Conducted deep performance audits to optimize complex render cycles, achieving an aggregate Google Lighthouse Web Vitals score of 95+ across all core dashboards.&#10;- Mentored and guided 6 junior and mid-level developers on modern TypeScript, state management patterns, and semantic HTML best practices, elevating team velocity and output.'
    },
    {
      id: 'exp-2',
      company: 'AppForge Studios',
      position: 'Staff Frontend Engineer',
      startDate: 'Sep 2019',
      endDate: 'Feb 2022',
      current: false,
      location: 'San Jose, CA',
      description: '- Implemented secure e-commerce checkout pipelines using Stripe, integrating robust local retry states and offloading transactions to backend microservices, resulting in 99.99% successful transactions across 100k+ daily users.&#10;- Developed interactive real-time telemetry streaming dashboards using D3.js, WebSockets, and customized canvas rendering, increasing user session durations by 25%.&#10;- Authored comprehensive unit and integration testing suites using Jest, Mock Service Worker (MSW), and Testing Library, successfully elevating test coverage from 60% to 94%.&#10;- Led accessibility task force to upgrade application components to meet full ADA/Section 508 and WCAG 2.1 AA requirements, avoiding potential legal risks and improving SEO.'
    },
    {
      id: 'exp-3',
      company: 'PixelCraft Technologies',
      position: 'Senior Web Application Developer',
      startDate: 'Jun 2017',
      endDate: 'Aug 2019',
      current: false,
      location: 'Boston, MA',
      description: '- Engineered core features for a collaborative SaaS planner featuring real-time state synchronization, drag-and-drop boards, and offline editing capability powered by Service Workers and IndexDB storage.&#10;- Built modular, reusable UI components utilizing React and Redux Toolkit, decreasing redundancy in the corporate repository by over 35%.&#10;- Collaborated directly with UI/UX designers to translate Figma design tokens into highly responsive layouts using fluid grids, responsive prefixes, and customized media queries.'
    },
    {
      id: 'exp-4',
      company: 'StartupLaunch Labs',
      position: 'Frontend Developer',
      startDate: 'Jun 2015',
      endDate: 'May 2017',
      current: false,
      location: 'Austin, TX',
      description: '- Built and maintained user-facing interfaces for early-stage customer web portals using HTML5, CSS3, and JavaScript, ensuring cross-browser compatibility and rapid response times.&#10;- Managed code assets utilizing Git branching workflows, conducting peer pull request reviews and collaborating during Scrum standups.&#10;- Integrated third-party RESTful APIs for authentication, mapping, and payment gateways, implementing user feedback loops to continuously refine user experience.'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OmniAnalytics Dashboard',
      role: 'Lead Architect',
      startDate: 'Jan 2023',
      endDate: 'Jun 2023',
      url: 'github.com/alexmercer/omnianalytics',
      description: '- Designed an offline-first telemetry reporting canvas utilizing IndexedDB, custom service workers, and synchronous local cache syncing.&#10;- Formatted highly responsive data grids capable of rendering 150,000+ rows smoothly with virtualized scrolling, CSS grids, and window resize listeners.&#10;- Integrated customizable interactive charting widgets using Recharts and Tailwind variables that dynamically adapt to the application theme.'
    },
    {
      id: 'proj-2',
      name: 'CloudSecure Client Portal',
      role: 'Core Frontend Engineer',
      startDate: 'Jul 2021',
      endDate: 'Dec 2021',
      url: 'github.com/alexmercer/cloudsecure',
      description: '- Developed high-security, role-based access control interface with multi-factor authentication flows and secure JWT session management.&#10;- Automated continuous integration/deployment (CI/CD) pipelines using GitHub Actions to verify linting, type-safety, and run unit tests on every pull request.&#10;- Optimized image assets and lazy-loaded routing bundles, shaving 1.8 seconds off the interactive time on 3G mobile devices.'
    },
    {
      id: 'proj-3',
      name: 'AgroTech IoT Dashboard',
      role: 'Independent Contributor',
      startDate: 'Feb 2020',
      endDate: 'Jun 2020',
      url: 'github.com/alexmercer/agrotech',
      description: '- Programmed high-fidelity visualizations utilizing WebGL and D3.js to map soil moisture levels and crop temperature anomalies across extensive geographical coordinates.&#10;- Built customized notification triggers that push real-time browser alerts based on live sensor updates.'
    }
  ],
  skills: [
    {
      id: 'sk-1',
      category: 'Languages',
      list: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3/SASS', 'SQL', 'Python', 'Bash']
    },
    {
      id: 'sk-2',
      category: 'Frameworks & Tools',
      list: ['React', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'Zustand', 'Vite', 'Git', 'Webpack', 'Docker', 'Figma']
    },
    {
      id: 'sk-3',
      category: 'Testing & Quality',
      list: ['Jest', 'React Testing Library', 'Cypress', 'Playwright', 'ESLint', 'Prettier', 'Axe Core']
    },
    {
      id: 'sk-4',
      category: 'Methodologies',
      list: ['Agile/Scrum Sprints', 'Semantic Accessibility (WCAG 2.1 AA)', 'REST & GraphQL APIs', 'Performance Optimization', 'System Architecture']
    }
  ],
  educations: [
    {
      id: 'edu-pg',
      school: 'University of Texas at Austin',
      degree: 'Post Graduation - Master of Science (M.S.)',
      fieldOfStudy: 'Software Engineering & Microservices',
      startDate: 'Sep 2015',
      endDate: 'May 2017',
      current: false,
      grade: '3.91 / 4.0',
      location: 'Austin, TX',
      description: 'Specialized in Advanced Software Systems, Distributed Database Architectures, and Cloud Security. Recipient of Graduate Academic Excellence Award.'
    },
    {
      id: 'edu-ug',
      school: 'University of Texas at Austin',
      degree: 'Graduation - Bachelor of Science (B.S.)',
      fieldOfStudy: 'Computer Science',
      startDate: 'Sep 2011',
      endDate: 'May 2015',
      current: false,
      grade: '3.82 / 4.0',
      location: 'Austin, TX',
      description: 'Graduated with Honors. Specialized coursework in Software Engineering, Database Systems, Human-Computer Interaction, and Agile Software Design.'
    },
    {
      id: 'edu-diploma',
      school: 'Stanford Center for Professional Development',
      degree: 'Postgraduate Diploma',
      fieldOfStudy: 'Advanced Cloud Architecture & DevOps Engineering',
      startDate: 'Sep 2018',
      endDate: 'May 2019',
      current: false,
      grade: 'Pass with Distinction',
      location: 'Stanford, CA (Online)',
      description: 'Completed comprehensive advanced curriculum covering distributed microservice architecture, containerized orchestration, and continuous deployment workflows.'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: 'Nov 2024',
      url: 'credentials.aws/solutions-architect'
    },
    {
      id: 'cert-2',
      name: 'Certified ScrumMaster (CSM)',
      issuer: 'Scrum Alliance',
      date: 'Mar 2023',
      url: 'scrumalliance.org/csm'
    },
    {
      id: 'cert-3',
      name: 'Google UX Design Professional Certificate',
      issuer: 'Coursera / Google',
      date: 'Jan 2021',
      url: 'coursera.org/verify/google-ux-design'
    }
  ]
};
