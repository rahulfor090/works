// Medical Learning Platform Mock Data

export const heroData = {
  title: "Empowering Medical Minds.",
  subtitle: "Access world-class medical resources, journals, and mentorship from leading healthcare professionals.",
  backgroundImage: "https://images.unsplash.com/photo-1657244358898-d9e110504fd8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwRE5BJTIwbW9sZWN1bGVzfGVufDB8fHx8MTc2MzAyODI4Mnww&ixlib=rb-4.1.0&q=85"
};

export interface IntroCard {
  id: number;
  icon: string;
  color: string;
  title: string;
  description: string;
}

export const introCards: IntroCard[] = [
  {
    id: 1,
    icon: "Dna",
    color: "#0056B3",
    title: "Smart, Structured Learning",
    description: "Curated books, journals, videos, and clinical cases built for deep medical understanding."
  },
  {
    id: 2,
    icon: "Network",
    color: "#009688",
    title: "Latest in Health Science",
    description: "Always-current research, reviews, and evidence-based resources at your fingertips."
  },
  {
    id: 3,
    icon: "Stethoscope",
    color: "#FF7043",
    title: "Mentorship That Matters",
    description: "Learn directly from top specialists with global teaching experience."
  }
];

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export const stats: Stat[] = [
  { label: "Books", value: 8, suffix: "+" },
  { label: "Videos", value: 3, suffix: "+" },
  { label: "Journals", value: 5, suffix: "+" },
  { label: "Cases", value: 1, suffix: "+" }
];

export interface Journal {
  id: number;
  title: string;
  image: string;
  category: string;
  issueDate: string;
  readTime: string;
}

export const journals: Journal[] = [
  {
    id: 1,
    title: "Advanced Biochemistry and Molecular Biology",
    image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYm9va3N8ZW58MHx8fHwxNzYzMDI4Mjk5fDA&ixlib=rb-4.1.0&q=85",
    category: "Biochemistry",
    issueDate: "March 2025",
    readTime: "45 min"
  },
  {
    id: 2,
    title: "Clinical Cardiology: Diagnosis and Treatment",
    image: "https://images.unsplash.com/photo-1723310936625-bc0e76a05189?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxtZWRpY2FsJTIwYm9va3N8ZW58MHx8fHwxNzYzMDI4Mjk5fDA&ixlib=rb-4.1.0&q=85",
    category: "Cardiology",
    issueDate: "February 2025",
    readTime: "60 min"
  },
  {
    id: 3,
    title: "Modern Nursing Practices and Patient Care",
    image: "https://images.unsplash.com/photo-1651804810223-6997a7d3fe7c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxtZWRpY2FsJTIwYm9va3N8ZW58MHx8fHwxNzYzMDI4Mjk5fDA&ixlib=rb-4.1.0&q=85",
    category: "Nursing",
    issueDate: "January 2025",
    readTime: "35 min"
  },
  {
    id: 4,
    title: "Essentials of Internal Medicine",
    image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg",
    category: "Medicine",
    issueDate: "December 2024",
    readTime: "50 min"
  }
];

export interface NewRelease {
  id: number;
  title: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  rating: number;
  reviews: number;
}

export const newReleases: NewRelease[] = [
  {
    id: 1,
    title: "Textbook of Biochemistry with Clinical Correlations",
    author: "Dr. Sarah Mitchell",
    category: "Biochemistry",
    tags: ["Metabolism", "Enzymology", "Clinical"],
    image: "https://images.unsplash.com/photo-1674897506953-2b586496c53c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwRE5BJTIwbW9sZWN1bGVzfGVufDB8fHx8MTc2MzAyODI4Mnww&ixlib=rb-4.1.0&q=85",
    rating: 4.8,
    reviews: 245
  },
  {
    id: 2,
    title: "Comprehensive Cardiology: A Clinical Approach",
    author: "Dr. James Anderson",
    category: "Cardiology",
    tags: ["Heart Disease", "ECG", "Interventional"],
    image: "https://images.pexels.com/photos/7722871/pexels-photo-7722871.jpeg",
    rating: 4.9,
    reviews: 312
  },
  {
    id: 3,
    title: "Advanced Nursing: Theory and Practice",
    author: "Dr. Emily Roberts",
    category: "Nursing",
    tags: ["Critical Care", "Patient Safety", "Ethics"],
    image: "https://images.pexels.com/photos/25626587/pexels-photo-25626587.jpeg",
    rating: 4.7,
    reviews: 198
  },
  {
    id: 4,
    title: "Oral and Maxillofacial Surgery Essentials",
    author: "Dr. Michael Chen",
    category: "Dentistry",
    tags: ["Surgical", "Implants", "Trauma"],
    image: "https://images.unsplash.com/photo-1700832082200-af7deeb63d9b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxzdGV0aG9zY29wZSUyMG1lZGljYWx8ZW58MHx8fHwxNzYzMDI4MzE4fDA&ixlib=rb-4.1.0&q=85",
    rating: 4.6,
    reviews: 167
  },
  {
    id: 5,
    title: "Clinical Medicine: Diagnostic Strategies",
    author: "Dr. Patricia Williams",
    category: "Medicine",
    tags: ["Diagnosis", "Treatment", "Evidence-Based"],
    image: "https://images.unsplash.com/photo-1700832082152-0416a3ee5e60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxzdGV0aG9zY29wZSUyMG1lZGljYWx8ZW58MHx8fDE3NjMwMjgzMTh8MA&ixlib=rb-4.1.0&q=85",
    rating: 4.9,
    reviews: 421
  },
  {
    id: 6,
    title: "Fundamentals of Pharmacology",
    author: "Dr. Robert Taylor",
    category: "Medicine",
    tags: ["Drug Therapy", "Pharmacokinetics", "Toxicology"],
    image: "https://images.unsplash.com/photo-1655913197756-fbcf99b273cb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxzdGV0aG9zY29wZSUyMG1lZGljYWx8ZW58MHx8fHwxNzYzMDI4MzE4fDA&ixlib=rb-4.1.0&q=85",
    rating: 4.8,
    reviews: 289
  }
];

export interface Specialty {
  id: number;
  name: string;
  icon: string;
  description: string;
  gradient: string;
}

export const specialties: Specialty[] = [
  {
    id: 1,
    name: "Biochemistry",
    icon: "FlaskConical",
    description: "Master molecular mechanisms and metabolic pathways",
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 2,
    name: "Cardiology",
    icon: "Heart",
    description: "Cardiovascular medicine and interventional techniques",
    gradient: "from-red-500/10 to-pink-500/10"
  },
  {
    id: 3,
    name: "Nursing",
    icon: "UserRound",
    description: "Evidence-based nursing practice and patient care",
    gradient: "from-green-500/10 to-emerald-500/10"
  },
  {
    id: 4,
    name: "Dentistry",
    icon: "SmilePlus",
    description: "Oral health, surgery, and restorative procedures",
    gradient: "from-purple-500/10 to-violet-500/10"
  },
  {
    id: 5,
    name: "Medicine",
    icon: "Pill",
    description: "Comprehensive internal medicine and diagnostics",
    gradient: "from-orange-500/10 to-amber-500/10"
  },
  {
    id: 6,
    name: "Surgery",
    icon: "Scissors",
    description: "Surgical techniques and perioperative management",
    gradient: "from-teal-500/10 to-cyan-500/10"
  },
  {
    id: 7,
    name: "Pediatrics",
    icon: "Baby",
    description: "Child health, development, and pediatric care",
    gradient: "from-yellow-500/10 to-orange-500/10"
  },
  {
    id: 8,
    name: "Radiology",
    icon: "ScanLine",
    description: "Medical imaging and diagnostic radiology",
    gradient: "from-indigo-500/10 to-blue-500/10"
  },
  {
    id: 9,
    name: "Pharmacology",
    icon: "Syringe",
    description: "Drug mechanisms, therapeutics, and toxicology",
    gradient: "from-fuchsia-500/10 to-pink-500/10"
  }
];

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  hospital: string;
  image: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Jennifer Martinez",
    role: "Chief of Cardiology",
    hospital: "Johns Hopkins Hospital",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjMwMjgyOTR8MA&ixlib=rb-4.1.0&q=85",
    quote: "The curated content and clinical cases on this platform have revolutionized how I teach my residents. It's an invaluable resource for modern medical education.",
    rating: 5
  },
  {
    id: 2,
    name: "Dr. David Thompson",
    role: "Professor of Internal Medicine",
    hospital: "Mayo Clinic",
    image: "https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxkb2N0b3IlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjMwMjgyOTR8MA&ixlib=rb-4.1.0&q=85",
    quote: "Finally, a platform that combines evidence-based medicine with practical clinical applications. My students love the interactive format and up-to-date research.",
    rating: 5
  },
  {
    id: 3,
    name: "Dr. Sophia Lee",
    role: "Head of Surgical Education",
    hospital: "Cleveland Clinic",
    image: "https://images.unsplash.com/photo-1642541724244-83d49288a86b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxkb2N0b3IlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjMwMjgyOTR8MA&ixlib=rb-4.1.0&q=85",
    quote: "The quality of surgical videos and step-by-step case studies is outstanding. This platform has become an essential tool in our training program.",
    rating: 5
  }
];

export interface Mentor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  rating: number;
  students: number;
  courses: number;
}

export const mentors: Mentor[] = [
  {
    id: 1,
    name: "Dr. Michael Roberts",
    specialty: "Cardiovascular Surgery",
    experience: "25+ years",
    image: "https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxkb2N0b3IlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjMwMjgyOTR8MA&ixlib=rb-4.1.0&q=85",
    rating: 4.9,
    students: 1250,
    courses: 12
  },
  {
    id: 2,
    name: "Dr. Lisa Anderson",
    specialty: "Neurology & Neuroscience",
    experience: "18+ years",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjMwMjgyOTR8MA&ixlib=rb-4.1.0&q=85",
    rating: 5.0,
    students: 2100,
    courses: 15
  },
  {
    id: 3,
    name: "Dr. James Wilson",
    specialty: "Pediatric Medicine",
    experience: "20+ years",
    image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg",
    rating: 4.8,
    students: 890,
    courses: 8
  },
  {
    id: 4,
    name: "Dr. Rachel Kim",
    specialty: "Oncology & Research",
    experience: "22+ years",
    image: "https://images.unsplash.com/photo-1642541724244-83d49288a86b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxkb2N0b3IlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjMwMjgyOTR8MA&ixlib=rb-4.1.0&q=85",
    rating: 4.9,
    students: 1560,
    courses: 10
  }
];

export interface MentorStat {
  label: string;
  value: number;
  suffix: string;
}

export const mentorStats: MentorStat[] = [
  { label: "Students", value: 50000, suffix: "+" },
  { label: "Rating", value: 4.9, suffix: "" },
  { label: "Success Rate", value: 95, suffix: "%" }
];

export const categories = ["All", "Biochemistry", "Cardiology", "Nursing", "Dentistry", "Medicine"];


