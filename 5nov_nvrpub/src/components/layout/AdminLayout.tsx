import React, { ReactNode, useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  CssBaseline, 
  Button, 
  IconButton, 
  Avatar, 
  Tooltip, 
  Menu, 
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse
} from '@mui/material';
import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';
import SubjectIcon from '@mui/icons-material/Subject';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PersonIcon from '@mui/icons-material/Person';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LinkIcon from '@mui/icons-material/Link';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BookIcon from '@mui/icons-material/Book';
import UploadIcon from '@mui/icons-material/Upload';
import ReviewsIcon from '@mui/icons-material/Reviews';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const DRAWER_WIDTH = 260;

const adminTheme = createTheme({
  palette: {
    primary: {
      main: '#268bbb',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

const AdminLayout = ({
  children,
  title = 'Admin Dashboard',
  breadcrumbs = [],
}: AdminLayoutProps) => {
  const router = useRouter();
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [usersOpen, setUsersOpen] = useState(false);
  const [booksOpen, setBooksOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string; email: string; role: string } | null>(null);


  const handleUsersClick = () => {
    setUsersOpen(!usersOpen);
  };

  const handleBooksClick = () => {
    setBooksOpen(!booksOpen);
  };

  useEffect(() => {
    // Load user information from localStorage
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('adminUser');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setCurrentUser(user);
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      }
    }
  }, []);

  const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleLogout = async () => {
    try {

      await fetch('/api/auth/logout', { method: 'POST' });
=======
      authLogout();
      // Clear user information
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminUser');
      }
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };


  const handleOpenCitationWindow = () => {
    router.push('/admin/citation');
=======
  const getUserInitials = () => {
    if (!currentUser) return 'A';
    const name = currentUser.username || currentUser.email;
    return name.substring(0, 2).toUpperCase();
  };

  const sidebarItems = [
    { label: 'Dashboard', href: '/admin', icon: <DashboardIcon /> },
    { label: 'Web API', href: '/admin/webapi', icon: <LinkIcon /> },
    { label: 'Sliders', href: '/admin/sliders', icon: <ViewCarouselIcon /> },
    { label: 'Homepage Slides', href: '/admin/homepage-slides', icon: <ViewCarouselIcon /> },
    { label: 'Contents', href: '/admin/contents', icon: <ArticleIcon /> },
    { label: 'Content Types', href: '/admin/contenttypes', icon: <CategoryIcon /> },
    { label: 'Subject Categories', href: '/admin/subjectcategories', icon: <SubjectIcon /> },
    { label: 'Sub Categories', href: '/admin/subcategories', icon: <SubjectIcon /> },
    { label: 'Specialties', href: '/admin/specialties', icon: <MenuBookIcon /> },
    { label: 'Annual Prices', href: '/admin/annual-prices', icon: <AttachMoneyIcon /> },
    { label: 'Testimonials', href: '/admin/testimonials', icon: <RateReviewIcon /> },
    { label: 'Mentor Ratings', href: '/admin/ratings', icon: <RateReviewIcon /> },
    { label: 'Mentors', href: '/admin/mentors', icon: <PersonIcon /> },
    { label: 'Offers', href: '/admin/offers', icon: <LocalOfferIcon /> },
    { label: 'Menu Management', href: '/admin/menu-management', icon: <MenuBookIcon /> },
  { label: 'Citation', href: '/admin/citation', icon: <FormatQuoteIcon /> },
    { divider: true },
  ];

  const userSubmenuItems = [
    { label: 'Users', href: '/admin/users', icon: <PeopleIcon /> },
    { label: 'Roles', href: '/admin/roles', icon: <SecurityIcon /> },
    { label: 'Role Privileges', href: '/admin/role-privileges', icon: <SecurityIcon /> },
  ];

  const bookSubmenuItems = [
    { label: 'Book', href: '/admin/books', icon: <BookIcon /> },
    { label: 'Book Import', href: '/admin/books/import', icon: <UploadIcon /> },
    { label: 'Book Review', href: '/admin/books/review', icon: <ReviewsIcon /> },
    { label: 'Chapter', href: '/admin/books/chapter', icon: <MenuBookOutlinedIcon /> },
  ];

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Top Header */}
        <AppBar 
          position="fixed" 
          sx={{ 
            bgcolor: 'primary.main',
            zIndex: (theme) => theme.zIndex.drawer + 1
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
              <a href="/admin" style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                  src="/images/nvr-logo.jpg" 
                  alt="Logo" 
                  style={{ height: '40px', objectFit: 'contain' }}
                />
              </a>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {currentUser && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mr: 1 }}>
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, lineHeight: 1.2 }}>
                    {currentUser.username}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.2 }}>
                    {currentUser.role || 'Admin'}
                  </Typography>
                </Box>
              )}
              <Tooltip title="Account settings">
                <IconButton onClick={handleProfileOpen} size="small">
                  <Avatar sx={{ width: 36, height: 36, bgcolor: 'white', color: 'primary.main', fontWeight: 'bold' }}>
                    {getUserInitials()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Button 
                onClick={handleLogout} 
                color="inherit" 
                variant="outlined"
                sx={{ 
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Logout
              </Button>
            </Box>
            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={handleProfileClose}
              onClick={handleProfileClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem component={NextLink} href="/admin/profile">Profile</MenuItem>
              <MenuItem component={NextLink} href="/admin/settings">Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Left Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              bgcolor: '#ffffff',
              borderRight: '1px solid #e0e0e0',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', mt: 1 }}>
            <List>
              {sidebarItems.map((item, index) => {
                if (item.divider) {
                  return <Divider key={`divider-${index}`} sx={{ my: 1 }} />;
                }

                const isActive = router.pathname === item.href;

                const buttonSx = {
                  py: 1.5,
                  px: 2,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                } as const;

                // If item has an href and explicit target _blank, render a normal anchor to open new tab
                if (item.href && (item as any).target === '_blank') {
                  return (
                    <ListItem key={item.href || `item-${index}`} disablePadding>
                      <ListItemButton
                        component="a"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        selected={isActive}
                        sx={buttonSx}
                        onClick={item.onClick}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: '0.875rem',
                            fontWeight: isActive ? 600 : 400,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                }

                // Default behaviour: use NextLink for internal navigation
                return (
                  <ListItem key={item.href || `item-${index}`} disablePadding>
                    <ListItemButton
                      component={item.href ? NextLink : 'div'}
                      href={item.href}
                      onClick={item.onClick}
                      selected={isActive}
                      sx={buttonSx}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: '0.875rem',
                          fontWeight: isActive ? 600 : 400,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
              
              {/* Users Section with Submenu */}
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={handleUsersClick}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Users"
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: 400,
                    }}
                  />
                  {usersOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={usersOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {userSubmenuItems.map((item) => {
                    const isActive = router.pathname === item.href;
                    
                    return (
                      <ListItem key={item.href} disablePadding>
                        <ListItemButton
                          component={NextLink}
                          href={item.href!}
                          selected={isActive}
                          sx={{
                            py: 1.5,
                            pl: 6,
                            pr: 2,
                            '&.Mui-selected': {
                              bgcolor: 'primary.light',
                              color: 'primary.contrastText',
                              '&:hover': {
                                bgcolor: 'primary.main',
                              },
                              '& .MuiListItemIcon-root': {
                                color: 'primary.contrastText',
                              },
                            },
                            '&:hover': {
                              bgcolor: 'action.hover',
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={item.label}
                            primaryTypographyProps={{
                              fontSize: '0.875rem',
                              fontWeight: isActive ? 600 : 400,
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>

              {/* Books Section with Submenu */}
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={handleBooksClick}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Books"
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: 400,
                    }}
                  />
                  {booksOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={booksOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {bookSubmenuItems.map((item) => {
                    const isActive = router.pathname === item.href;
                    
                    return (
                      <ListItem key={item.href} disablePadding>
                        <ListItemButton
                          component={NextLink}
                          href={item.href!}
                          selected={isActive}
                          sx={{
                            py: 1.5,
                            pl: 6,
                            pr: 2,
                            '&.Mui-selected': {
                              bgcolor: 'primary.light',
                              color: 'primary.main',
                              '&:hover': {
                                bgcolor: 'primary.light',
                              },
                              '& .MuiListItemIcon-root': {
                                color: 'primary.main',
                              },
                            },
                            '&:hover': {
                              bgcolor: 'action.hover',
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={item.label}
                            primaryTypographyProps={{
                              fontSize: '0.875rem',
                              fontWeight: isActive ? 600 : 400,
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: 'background.default',
            minHeight: '100vh',
            pt: 10,
            px: 3,
            pb: 4,
          }}
        >
          <AdminBreadcrumbs items={breadcrumbs} />
          {title && title !== 'Admin Panel' && (
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
              {title}
            </Typography>
          )}
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;