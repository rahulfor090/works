export const mockData = {
  stats: [
    { id: 1, count: '8+', label: 'Books', icon: 'BookOpen' },
    { id: 2, count: '3+', label: 'Videos', icon: 'Video' },
    { id: 3, count: '5+', label: 'Journals', icon: 'FileText' },
    { id: 4, count: '1+', label: 'Cases', icon: 'Briefcase' }
  ],

  newReleases: [
    {
      id: 1,
      title: 'Journal of Ultrasound in Obstetrics and Gynecology',
      author: 'Asim Kurjak (Croatia)',
      category: 'Cardiology',
      rating: 4.8,
      reviews: 0,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop'
    },
    {
      id: 2,
      title: 'Journal of Clinical Medicine Research',
      author: 'Cervena (USA)',
      category: 'Critical Care',
      rating: 4.9,
      reviews: 0,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop'
    },
    {
      id: 3,
      title: 'Indian Journal of Nursing Sciences',
      author: 'Donald School',
      category: 'Medicine',
      rating: 4.7,
      reviews: 0,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop'
    },
    {
      id: 4,
      title: 'Advanced Biochemistry Quarterly',
      author: 'Dr. Smith (UK)',
      category: 'Biochemistry',
      rating: 4.9,
      reviews: 0,
      image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&h=600&fit=crop'
    }
  ],

  categories: ['All', 'Biochemistry', 'Biotechnology', 'Cardiology', 'Critical Care', 'Dental Materials', 'Medicine'],

  specialities: [
    { id: 1, name: 'Biochemistry', icon: 'Atom', description: 'Explore molecular foundations of life' },
    { id: 2, name: 'Biotechnology', icon: 'Dna', description: 'Innovation in biological sciences' },
    { id: 3, name: 'Cardiology', icon: 'HeartPulse', description: 'Heart and cardiovascular system' },
    { id: 4, name: 'Critical Care', icon: 'Activity', description: 'Intensive care and emergency medicine' },
    { id: 5, name: 'Dental Materials', icon: 'Pill', description: 'Advanced dental science' },
    { id: 6, name: 'Medicine', icon: 'Stethoscope', description: 'General medical practice' },
    { id: 7, name: 'Dentistry', icon: 'Smile', description: 'Oral health and dentistry' },
    { id: 8, name: 'Nursing', icon: 'HeartHandshake', description: 'Patient care excellence' }
  ],

  testimonials: [
    {
      id: 1,
      text: 'It is a very complete and up-to-date platform that could be applied to all levels of Medicine - from undergraduate to postgraduate and continuing medical education.',
      author: 'Dra. Blanca Alicia Chong Martínez',
      position: 'Head of Basic Science and Continuous Medical Education',
      institution: 'Facultad Mexicana de Medicina (ULSA), Mexico',
      rating: 5,
      logo: 'La Salle'
    },
    {
      id: 2,
      text: 'The comprehensive resources and interactive content have transformed how we approach medical education. Highly recommended for medical professionals.',
      author: 'Dr. Rajesh Patel',
      position: 'Professor of Medicine',
      institution: 'AIIMS, New Delhi, India',
      rating: 5,
      logo: 'AIIMS'
    }
  ],

  mentors: [
    {
      id: 1,
      name: 'Dr. Sunita Verma',
      speciality: 'Gynecology',
      experience: '5+ Years',
      rating: 4.8,
      reviews: 120,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      speciality: 'Cardiology',
      experience: '8+ Years',
      rating: 4.9,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      speciality: 'Pediatrics',
      experience: '6+ Years',
      rating: 4.8,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Dr. Amit Singh',
      speciality: 'Neurology',
      experience: '10+ Years',
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop'
    }
  ],

  mentorStats: {
    students: '50K+',
    rating: '4.9',
    successRate: '95%'
  },

  navLinks: [
    { name: 'Books', href: '#books' },
    { name: 'Videos', href: '#videos' },
    { name: 'Journals', href: '#journals' },
    { name: 'Cases', href: '#cases' },
    { name: 'MCQs', href: '#mcqs' },
    { name: 'Reviews', href: '#reviews' }
  ],

  footerLinks: {
    information: ['About us', 'Privacy & Policy', 'Terms & Condition', 'DigiNerve', 'Events'],
    explore: ['Books', 'Videos', 'Journals', 'Cases', 'MCQs', 'Reviews'],
    contact: ['Need Help', 'Contact Us', 'Ask For A Trial', 'E-Alert', 'Careers', 'FAQs']
  },

  companyInfo: {
    address: 'A-12, Sector 60, Noida - 201301 Uttar Pradesh, India',
    phone: '+91-120-4200800',
    email: 'info@jaypeedigi.com'
  }
};
