import { Code, Database, Server, Wrench, Bot, Globe, CreditCard, ShoppingCart, Monitor } from 'lucide-react';
import {
  SiHtml5,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiFlask,
  SiLaravel,
  SiSharp,
  SiPython,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiMongodb,
  SiPostman,
  SiAndroidstudio,
  SiGithub,
  SiFlutter
} from 'react-icons/si';
import { DiMsqlServer } from "react-icons/di";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { BiLogoVisualStudio } from "react-icons/bi";
import { ComponentType } from 'react';

// Tech stack icon mapping
export const techStackIcons: Record<string, { icon: ComponentType<{ className?: string; style?: React.CSSProperties }> | string; color: string; iconType?: 'component' | 'image' }> = {
  // Frontend
  'HTML': { icon: SiHtml5, color: '#E34F26' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'React': { icon: SiReact, color: '#61DAFB' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'Next.js': { icon: SiNextdotjs, color: '#000000' },
  'Flask': { icon: SiFlask, color: '#000000' },
  'Bootstrap': { icon: Code, color: '#7952B3' },

  // Backend
  'Laravel': { icon: SiLaravel, color: '#FF2D20' },
  'C#': { icon: SiSharp, color: '#239120' },
  'Python': { icon: SiPython, color: '#3776AB' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'PHP': { icon: SiPhp, color: '#777BB4' },

  // Database
  'PostgreSQL': { icon: SiPostgresql, color: '#336791' },
  'MySQL': { icon: SiMysql, color: '#4479A1' },
  'SQLite': { icon: SiSqlite, color: '#003B57' },
  'SQL Server': { icon: DiMsqlServer, color: '#CC2927' },
  'MongoDB': { icon: SiMongodb, color: '#47A248' },

  // Development Tools & Frameworks
  'Android Studio': { icon: SiAndroidstudio, color: '#3DDC84' },
  'FlutterFlow': { icon: SiFlutter, color: '#02569B' },
  'Github': { icon: SiGithub, color: '#181717' },
  'mabl': { icon: AiOutlineCodeSandbox, color: '#746EDC' },
  'Postman': { icon: SiPostman, color: '#FF6C37' },
  'Visual Studio Code': { icon: BiLogoVisualStudio, color: '#007ACC' },
  'Tkinter': { icon: Code, color: '#3776AB' },
  'WinForms': { icon: Code, color: '#239120' },
  '.NET Framework': { icon: Code, color: '#239120' },

  // Technologies & Concepts
  'Responsive Design': { icon: Monitor, color: '#06B6D4' },
  'Clerk Auth': { icon: '/clerk-icon.png', color: '#8B5CF6', iconType: 'image' },
  'Gemini AI': { icon: '/gemini-icon.png', color: '#4285F4', iconType: 'image' },
  'Vector Embeddings': { icon: Database, color: '#4285F4' },
  'Chatbot Integration': { icon: Bot, color: '#4285F4' },
  'Analytics Dashboard': { icon: Monitor, color: '#10B981' },
  'Payment Gateway APIs': { icon: CreditCard, color: '#10B981' },
  'Real-time Updates': { icon: Globe, color: '#F59E0B' },
  'Payment APIs': { icon: CreditCard, color: '#10B981' },
  'Order Tracking': { icon: Monitor, color: '#8B5CF6' },
  'API Integration': { icon: Server, color: '#6B7280' },
  'Order Management': { icon: ShoppingCart, color: '#F59E0B' },
  'Kitchen Workflow': { icon: Monitor, color: '#EF4444' },
  'Custom GUI': { icon: Monitor, color: '#6B7280' },
  'Static SPA': { icon: Globe, color: '#06B6D4' },

  // Study Technologies
  'COBOL': { icon: Code, color: '#6B7280' },
  'Mainframe': { icon: Server, color: '#6B7280' },
  'Legacy Systems': { icon: Database, color: '#6B7280' },
  'Data Structures': { icon: Code, color: '#3776AB' },
  'Algorithms': { icon: Code, color: '#3776AB' },
  'OOP': { icon: Code, color: '#3776AB' },
  'C': { icon: Code, color: '#A8B9CC' },
  'Memory Management': { icon: Server, color: '#A8B9CC' },
  'System Programming': { icon: Server, color: '#A8B9CC' }
};

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  category: 'web' | 'desktop' | 'study';
  deploymentStatus?: 'deployed' | 'in-development' | 'not-deployed';
  featured?: boolean;
  icon: ComponentType<{ className?: string }> | string;
  iconType?: 'component' | 'image';
}

export interface Technology {
  name: string;
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

export interface Skill {
  category: string;
  icon: ComponentType<{ className?: string }>;
  technologies: Technology[];
}

// Helper function to get tech stack with icons
export const getTechStackWithIcons = (techStack: string[]) => {
  return techStack.map(tech => ({
    name: tech,
    icon: techStackIcons[tech]?.icon || Code,
    color: techStackIcons[tech]?.color || '#6B7280',
    iconType: techStackIcons[tech]?.iconType || 'component'
  }));
};

export const skills: Skill[] = [
  {
    category: 'Frontend',
    icon: Code,
    technologies: [
      { name: 'Flask', icon: SiFlask, color: '#000000' },
      { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' }
    ]
  },
  {
    category: 'Backend',
    icon: Server,
    technologies: [
      { name: 'C#', icon: SiSharp, color: '#239120' },
      { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'PHP', icon: SiPhp, color: '#777BB4' },
      { name: 'Python', icon: SiPython, color: '#3776AB' }
    ]
  },
  {
    category: 'Database',
    icon: Database,
    technologies: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'SQL Server', icon: DiMsqlServer, color: '#CC2927' },
      { name: 'SQLite', icon: SiSqlite, color: '#003B57' }
    ]
  },
  {
    category: 'DevTools',
    icon: Wrench,
    technologies: [
      { name: 'Android Studio', icon: SiAndroidstudio, color: '#3DDC84' },
      { name: 'FlutterFlow', icon: SiFlutter, color: '#02569B' },
      { name: 'Github', icon: SiGithub, color: '#181717' },
      { name: 'mabl', icon: AiOutlineCodeSandbox, color: '#746EDC' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'Visual Studio Code', icon: BiLogoVisualStudio, color: '#007ACC' }
    ]
  }
];

export const projects: Project[] = [
  {
    id: 'e-wastewise',
    title: 'E-WasteWise',
    description: 'A comprehensive informational platform educating users about electronic waste in the Philippines. Features e-waste definitions, categories, interactive counter, disposal site locator, and proper disposal guidelines tailored for Filipino consumers.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    demoUrl: 'https://e-wastewise.vercel.app/',
    category: 'web',
    deploymentStatus: 'in-development',
    featured: true,
    icon: '/ewastewise.webp', // Using your existing image
    iconType: 'image'
  },
  {
    id: 'sis-faculty',
    title: 'SJSFI - SIS (Faculty Portal)',
    description: 'Comprehensive faculty portal for Saint Joseph School of Fairview Inc. enabling registrars to process face-to-face enrollments, manage student data with document/image uploads, handle PSGC integration, and maintain payment records.',
    techStack: ['Clerk Auth', 'Next.js', 'PostgreSQL', 'React', 'Tailwind CSS', 'TypeScript'],
    demoUrl: 'https://sjsfi-enrollment.vercel.app/',
    category: 'web',
    deploymentStatus: 'deployed',
    featured: true,
    icon: '/school-logo.webp', // Using your existing image
    iconType: 'image'
  },
  {
    id: 'sis-student',
    title: 'SJSFI - SIS (Student Portal)',
    description: 'Student-focused portal allowing students to view grades, class schedules, receive notifications from teachers, and access academic information. Built with modern authentication and responsive design.',
    techStack: ['Clerk Auth', 'Next.js', 'PostgreSQL', 'React', 'Tailwind CSS', 'TypeScript'],
    demoUrl: 'https://sjsfi-sis.vercel.app/',
    category: 'web',
    deploymentStatus: 'deployed',
    featured: true,
    icon: '/school-logo.webp', // Using your existing image
    iconType: 'image'
  },
  {
    id: 'academic-website-admin',
    title: 'SJSFI - Content Management & AI Admin',
    description: 'Advanced admin portal for school content management featuring news/notices publishing, school information updates, and AI chatbot fine-tuning with vector embeddings to reduce faculty workload in answering student queries.',
    techStack: ['Clerk Auth', 'Gemini AI', 'Next.js', 'PostgreSQL', 'React', 'Tailwind CSS', 'TypeScript'],
    demoUrl: 'https://admin-sjsfi.vercel.app/',
    category: 'web',
    deploymentStatus: 'deployed',
    featured: true,
    icon: '/school-logo.webp', // Using your existing image
    iconType: 'image'
  },
  {
    id: 'academic-website',
    title: 'Saint Joseph School of Fairview Inc.',
    description: 'Proposed official school website featuring intelligent AI chatbot integration for student queries, comprehensive school information, and modern responsive design. Currently awaiting institutional approval.',
    techStack: ['Chatbot Integration', 'Next.js', 'PostgreSQL', 'React', 'Tailwind CSS', 'TypeScript'],
    demoUrl: 'https://sjsfi.vercel.app/',
    category: 'web',
    deploymentStatus: 'deployed',
    icon: '/school-logo.webp', // Using your existing image
    iconType: 'image'
  },
  {
    id: 'magandang-buhay',
    title: 'Magandang Buhay - Philippine Literature Platform',
    description: 'Interactive learning platform for Philippine Literature covering Panitikan, Nobela, Epiko, Maikling Kwento, and more. Features post-story quizzes with analytics for teachers/researchers and gamified learning experiences for junior high students.',
    techStack: ['Clerk Auth', 'Next.js', 'Node.js', 'PostgreSQL', 'React', 'Tailwind CSS', 'TypeScript'],
    demoUrl: 'https://magandang-buhay.vercel.app/',
    category: 'web',
    deploymentStatus: 'deployed',
    featured: true,
    icon: '/magandang-buhay-rbg.png', // Using your existing image
    iconType: 'image'
  },
  {
    id: 'pos-system',
    title: 'Restaurant Point-of-Sale System',
    description: 'Full-featured restaurant POS system with GCash/PayMaya/bank card integration, comprehensive inventory management, real-time sales analytics, reporting dashboard, and seamless integration with ordering and kitchen systems.',
    techStack: ['Bootstrap', 'JavaScript', 'Laravel', 'MySQL', 'Payment Gateway APIs', 'PHP'],
    category: 'web',
    deploymentStatus: 'not-deployed',
    icon: '/Caffeinated Logo.png', // Using your existing image
    iconType: 'image'
  },
  {
    id: 'oos-system',
    title: 'Online Ordering System',
    description: 'Customer-facing online ordering platform with online payment processing, refund management, dynamic menu customization, order tracking via unique codes, and real-time order status updates integrated with POS system.',
    techStack: ['Bootstrap', 'JavaScript', 'Laravel', 'MySQL', 'Payment APIs', 'PHP'],
    category: 'web',
    deploymentStatus: 'not-deployed',
    icon: '/Caffeinated Logo.png', // Using your existing image
    iconType: 'image'
  },
  {
    id: 'kds-system',
    title: 'Kitchen Display System',
    description: 'Digital kitchen management system optimizing workflow with real-time order reception from POS, intelligent order prioritization, preparation time tracking, and kitchen staff coordination for efficient food service operations.',
    techStack: ['JavaScript', 'Laravel', 'MySQL', 'PHP'],
    category: 'web',
    deploymentStatus: 'not-deployed',
    icon: '/Caffeinated Logo.png', // Using your existing image
    iconType: 'image'
  },
  {
    id: 'vehicle-rental',
    title: 'Vehicle Renting Management System',
    description: 'Desktop application for managing vehicle rental operations with comprehensive booking and inventory management.',
    techStack: ['Custom GUI', 'Python', 'SQLite', 'Tkinter'],
    category: 'desktop',
    icon: '/tblogo-removebg-preview.png', // Using your existing image
    iconType: 'image'
  },
  {
    id: 'hotel-management',
    title: 'Hotel Management System',
    description: 'Windows Forms application for hotel operations including room management, reservations, and guest services.',
    techStack: ['.NET Framework', 'C#', 'SQLite', 'WinForms'],
    category: 'desktop',
    icon: '/White and Gold Simple Classic Hotel Logo (6) 1.png', // Using your existing image
    iconType: 'image'
  },
  {
    id: 'cobol-study',
    title: 'Case Study in COBOL',
    description: 'Academic project exploring legacy system programming and mainframe development using COBOL.',
    techStack: ['COBOL', 'Legacy Systems', 'Mainframe'],
    category: 'study',
    icon: Code
  },
  {
    id: 'python-study',
    title: 'Case Study in Python',
    description: 'Comprehensive Python programming case study covering data structures, algorithms, and application development.',
    techStack: ['Algorithms', 'Data Structures', 'OOP', 'Python'],
    category: 'study',
    icon: Code
  },
  {
    id: 'c-study',
    title: 'Case Study in C',
    description: 'Low-level programming case study focusing on memory management, system programming, and performance optimization.',
    techStack: ['Algorithms', 'C', 'Memory Management', 'System Programming'],
    category: 'study',
    icon: Code
  }
];
