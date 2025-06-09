export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  category: 'web' | 'desktop' | 'study';
}

export const projects: Project[] = [
  {
    id: 'e-wastewise',
    title: 'E-WasteWise',
    description: 'An informational single-page application that educates users about electronic waste, its impact, and proper disposal practices.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Static SPA'],
    category: 'web'
  },
  {
    id: 'sis',
    title: 'SJSFI-SIS',
    description: 'A comprehensive Student Information System with academic management features, built with modern web technologies.',
    techStack: ['React', 'Next.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
    category: 'web'
  },
  {
    id: 'academic-website',
    title: 'Saint Joseph School of Fairview - Academic Website',
    description: 'Official academic website for Saint Joseph School of Fairview, providing information and resources for students and parents.',
    techStack: ['React', 'Next.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'Gemini AI'],
    category: 'web'
  },
  {
    id: 'magandang-buhay',
    title: 'Magandang Buhay',
    description: 'Collaborative research platform designed to facilitate academic research and knowledge sharing among users.',
    techStack: ['React', 'Next.js', 'PostgreSQL', 'Node.js', 'TypeScript'],
    category: 'web'
  }, {
    id: 'pos-system',
    title: 'Point-of-Sale System (POS)',
    description: 'Core restaurant POS system handling transactions, inventory, and sales management with seamless integration capabilities.',
    techStack: ['Laravel', 'MySQL', 'PHP', 'Bootstrap', 'JavaScript'],
    category: 'web'
  },
  {
    id: 'oos-system',
    title: 'Online Ordering System (OOS)',
    description: 'Customer-facing online ordering platform that integrates with POS system for unified order management and processing.',
    techStack: ['Laravel', 'MySQL', 'PHP', 'Bootstrap', 'JavaScript', 'API Integration'],
    category: 'web'
  },
  {
    id: 'kds-system',
    title: 'Kitchen Display System (KDS)',
    description: 'Digital kitchen management system receiving orders from POS, optimizing kitchen workflow and order preparation tracking.',
    techStack: ['Laravel', 'MySQL', 'PHP', 'Real-time Updates', 'JavaScript'],
    category: 'web'
  },
  {
    id: 'vehicle-rental',
    title: 'Vehicle Renting Management System',
    description: 'Desktop application for managing vehicle rental operations with comprehensive booking and inventory management.',
    techStack: ['Python', 'Tkinter', 'SQLite', 'Custom GUI'],
    category: 'desktop'
  },
  {
    id: 'hotel-management',
    title: 'Hotel Management System',
    description: 'Windows Forms application for hotel operations including room management, reservations, and guest services.',
    techStack: ['C#', 'WinForms', 'SQLite', '.NET Framework'],
    category: 'desktop'
  },
  {
    id: 'cobol-study',
    title: 'Case Study in COBOL',
    description: 'Academic project exploring legacy system programming and mainframe development using COBOL.',
    techStack: ['COBOL', 'Mainframe', 'Legacy Systems'],
    category: 'study'
  },
  {
    id: 'python-study',
    title: 'Case Study in Python',
    description: 'Comprehensive Python programming case study covering data structures, algorithms, and application development.',
    techStack: ['Python', 'Data Structures', 'Algorithms', 'OOP'],
    category: 'study'
  },
  {
    id: 'c-study',
    title: 'Case Study in C',
    description: 'Low-level programming case study focusing on memory management, system programming, and performance optimization.',
    techStack: ['C', 'Memory Management', 'System Programming', 'Algorithms'],
    category: 'study'
  }
];
