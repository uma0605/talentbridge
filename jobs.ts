export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  skills: string[];
  logo: string;
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $160k',
    posted: '2 days ago',
    description: 'We are looking for an experienced Frontend Developer to join our growing team and help build the next generation of web applications.',
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with modern CSS frameworks',
      'Excellent problem-solving abilities',
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    logo: 'https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'DesignHub',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$90k - $130k',
    posted: '1 day ago',
    description: 'Join our design team to create beautiful, user-centered products that millions of people use every day.',
    requirements: [
      '3+ years of product design experience',
      'Proficiency in Figma',
      'Strong portfolio showcasing UX process',
      'Excellent communication skills',
    ],
    skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
    logo: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130k - $175k',
    posted: '3 days ago',
    description: 'Build scalable backend systems that power our data processing platform serving enterprise clients.',
    requirements: [
      '4+ years of backend development',
      'Experience with Node.js or Python',
      'Knowledge of distributed systems',
      'Database design expertise',
    ],
    skills: ['Node.js', 'Python', 'PostgreSQL', 'AWS'],
    logo: 'https://images.pexels.com/photos/3182740/pexels-photo-3182740.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '4',
    title: 'Marketing Intern',
    company: 'GrowthLab',
    location: 'Austin, TX',
    type: 'Internship',
    salary: '$25/hour',
    posted: '5 days ago',
    description: 'Great opportunity for students to gain hands-on marketing experience at a fast-growing startup.',
    requirements: [
      'Currently pursuing a degree in Marketing',
      'Strong writing skills',
      'Familiarity with social media platforms',
      'Creative mindset',
    ],
    skills: ['Social Media', 'Content Writing', 'Analytics', 'SEO'],
    logo: 'https://images.pexels.com/photo-3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudNine Solutions',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$140k - $180k',
    posted: '1 week ago',
    description: 'Lead our infrastructure automation efforts and ensure high availability of our cloud services.',
    requirements: [
      '5+ years of DevOps experience',
      'Expert in Kubernetes and Docker',
      'Experience with CI/CD pipelines',
      'Strong scripting skills',
    ],
    skills: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    logo: 'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'AI Analytics',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$125k - $165k',
    posted: '4 days ago',
    description: 'Apply machine learning to solve complex business problems and deliver actionable insights.',
    requirements: [
      'MS/PhD in relevant field',
      'Strong Python programming',
      'Experience with ML frameworks',
      'Statistical analysis background',
    ],
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
    logo: 'https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  employees: string;
  website: string;
  description: string;
  openJobs: number;
  logo: string;
}

export const companies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Inc.',
    industry: 'Technology',
    location: 'San Francisco, CA',
    employees: '10,000+',
    website: 'techcorp.com',
    description: 'A leading technology company building innovative solutions for enterprise clients worldwide.',
    openJobs: 45,
    logo: 'https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '2',
    name: 'DesignHub',
    industry: 'Design & Creative',
    location: 'New York, NY',
    employees: '500-1000',
    website: 'designhub.io',
    description: 'Award-winning design agency helping brands create memorable digital experiences.',
    openJobs: 12,
    logo: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: '3',
    name: 'DataFlow Systems',
    industry: 'Data & Analytics',
    location: 'Remote',
    employees: '1000-5000',
    website: 'dataflow.com',
    description: 'Empowering businesses with real-time data processing and analytics solutions.',
    openJobs: 28,
    logo: 'https://images.pexels.com/photos/3182740/pexels-photo-3182740.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];
