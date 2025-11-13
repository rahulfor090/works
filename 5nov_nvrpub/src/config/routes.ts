// Base paths
export const ROUTE_PATHS = {
  // Public routes
  HOME: '/',
  NOT_FOUND: '/404',
  
  // Auth routes
  AUTH: {
    BASE: '/auth',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },
  
  // Admin routes
  ADMIN: {
    BASE: '/admin',
    DASHBOARD: '/dashboard',
    CONTENTS: '/contents',
    CONTENT_TYPES: '/content-types',
    COURSES: '/courses',
    HOMEPAGE_SLIDES: '/homepage-slides',
    MENU_MANAGEMENT: '/menu-management',
    SETTINGS: '/settings',
    SLIDERS: '/sliders',
    SPECIALTIES: '/specialties',
    SUBCATEGORIES: '/subcategories',
    SUBJECT_CATEGORIES: '/subject-categories',
    TESTIMONIALS: '/testimonials',
  },
  
  // Payment routes
  PAYMENT: {
    BASE: '/payment',
    START: '/start',
    SUCCESS: '/success',
    FAILURE: '/failure',
    PENDING: '/pending'
  },
  
  // Content routes
  CONTENT: {
    BASE: '/content',
    DETAIL: '/[id]',
  },
  
  // API routes (for reference)
  API: {
    BASE: '/api',
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      VERIFY: '/auth/verify',
    },
    // Add other API routes as needed
  },
} as const;

// Helper function to build full paths
const buildPath = (...segments: string[]): string => {
  return segments.join('').replace(/\/+/g, '/');
};

// Page metadata and configurations
export const PAGE_CONFIGS = {
  // Auth pages
  [ROUTE_PATHS.AUTH.LOGIN]: {
    title: 'Login',
    description: 'Sign in to your account',
    // Add more metadata as needed
  },
  [ROUTE_PATHS.AUTH.REGISTER]: {
    title: 'Register',
    description: 'Create a new account',
  },
  
  // Admin pages
  [buildPath(ROUTE_PATHS.ADMIN.BASE, ROUTE_PATHS.ADMIN.DASHBOARD)]: {
    title: 'Admin Dashboard',
    description: 'Administration panel',
  },
  [buildPath(ROUTE_PATHS.ADMIN.BASE, ROUTE_PATHS.ADMIN.CONTENTS)]: {
    title: 'Manage Contents',
    description: 'Manage your content',
  },
  // Add more page configs as needed
} as const;

// Export full route paths with type safety
export const ROUTES = {
  // Public routes
  HOME: ROUTE_PATHS.HOME,
  NOT_FOUND: ROUTE_PATHS.NOT_FOUND,
  
  // Auth routes
  AUTH: {
    LOGIN: ROUTE_PATHS.AUTH.LOGIN,
    REGISTER: ROUTE_PATHS.AUTH.REGISTER,
    FORGOT_PASSWORD: ROUTE_PATHS.AUTH.FORGOT_PASSWORD,
    RESET_PASSWORD: ROUTE_PATHS.AUTH.RESET_PASSWORD,
  },
  
  // Admin routes
  ADMIN: {
    DASHBOARD: buildPath(ROUTE_PATHS.ADMIN.BASE, ROUTE_PATHS.ADMIN.DASHBOARD),
    CONTENTS: buildPath(ROUTE_PATHS.ADMIN.BASE, ROUTE_PATHS.ADMIN.CONTENTS),
    CONTENT_TYPES: buildPath(ROUTE_PATHS.ADMIN.BASE, ROUTE_PATHS.ADMIN.CONTENT_TYPES),
    COURSES: buildPath(ROUTE_PATHS.ADMIN.BASE, ROUTE_PATHS.ADMIN.COURSES),
    HOMEPAGE_SLIDES: buildPath(ROUTE_PATHS.ADMIN.BASE, ROUTE_PATHS.ADMIN.HOMEPAGE_SLIDES),
    MENU_MANAGEMENT: buildPath(ROUTE_PATHS.ADMIN.BASE, ROUTE_PATHS.ADMIN.MENU_MANAGEMENT),
    SETTINGS: buildPath(ROUTE_PATHS.ADMIN.BASE, ROUTE_PATHS.ADMIN.SETTINGS),
    SLIDERS: buildPath(ROUTE_PATHS.ADMIN.BASE, ROUTE_PATHS.ADMIN.SLIDERS),
    SPECIALTIES: buildPath(ROUTE_PATHS.ADMIN.BASE, ROUTE_PATHS.ADMIN.SPECIALTIES),
    SUBCATEGORIES: buildPath(ROUTE_PATHS.ADMIN.BASE, ROUTE_PATHS.ADMIN.SUBCATEGORIES),
    SUBJECT_CATEGORIES: buildPath(ROUTE_PATHS.ADMIN.BASE, ROUTE_PATHS.ADMIN.SUBJECT_CATEGORIES),
    TESTIMONIALS: buildPath(ROUTE_PATHS.ADMIN.BASE, ROUTE_PATHS.ADMIN.TESTIMONIALS),
  },
  
  // Payment routes
  PAYMENT: {
    BASE: ROUTE_PATHS.PAYMENT.BASE,
    START: buildPath(ROUTE_PATHS.PAYMENT.BASE, ROUTE_PATHS.PAYMENT.START),
    SUCCESS: buildPath(ROUTE_PATHS.PAYMENT.BASE, ROUTE_PATHS.PAYMENT.SUCCESS),
    FAILURE: buildPath(ROUTE_PATHS.PAYMENT.BASE, ROUTE_PATHS.PAYMENT.FAILURE),
    PENDING: buildPath(ROUTE_PATHS.PAYMENT.BASE, ROUTE_PATHS.PAYMENT.PENDING),
  },
  
  
  CONTENT: {
    BASE: ROUTE_PATHS.CONTENT.BASE,
    DETAIL: (id: string | number) => 
      `${ROUTE_PATHS.CONTENT.BASE}/${id}`,
  },
  
  // Helper to get page configuration
  getPageConfig: (path: string) => {
    return PAGE_CONFIGS[path as keyof typeof PAGE_CONFIGS] || {
      title: 'Page not found',
      description: 'The page you are looking for does not exist.',
    };
  },
} as const;
