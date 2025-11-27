import React, { ReactNode, useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
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
  Collapse,
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
    primary: { main: '#268bbb' },
    background: { default: '#F9FAFB', paper: '#FFFFFF' },
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

const AdminLayout = ({ children, title = 'Admin Dashboard', breadcrumbs = [] }: AdminLayoutProps) => {
  const router = useRouter();
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [usersOpen, setUsersOpen] = useState(false);
  const [booksOpen, setBooksOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState<{ username: string; email: string; role: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('adminUser');
      if (userStr) {
        try {
          setCurrentUser(JSON.parse(userStr));
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      }
    }
  }, []);

  const handleProfileOpen = (e: React.MouseEvent<HTMLElement>) => setProfileAnchor(e.currentTarget);
  const handleProfileClose = () => setProfileAnchor(null);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });

      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminUser');
      }
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

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
    { label: 'Ads', href: '/admin/ads', icon: <FormatQuoteIcon /> },
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
    { label: 'Chapter', href: '/admin/chapters', icon: <MenuBookOutlinedIcon /> },
  ];

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* TOP BAR */}
        <AppBar position="fixed" sx={{ bgcolor: 'primary.main', zIndex: (t) => t.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              <a href="/admin">
                <img src="/images/nvr-logo.jpg" alt="Logo" style={{ height: '40px' }} />
              </a>
            </Typography>

            {currentUser && (
              <Box sx={{ textAlign: 'right', mr: 2 }}>
                <Typography sx={{ color: 'white', fontWeight: 600 }}>
                  {currentUser.username}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {currentUser.role}
                </Typography>
              </Box>
            )}

            <Tooltip title="Account Settings">
              <IconButton onClick={handleProfileOpen}>
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'white', color: 'primary.main' }}>
                  {getUserInitials()}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Button
              onClick={handleLogout}
              variant="outlined"
              color="inherit"
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.1)' },
              }}
            >
              Logout
            </Button>

            <Menu anchorEl={profileAnchor} open={Boolean(profileAnchor)} onClose={handleProfileClose}>
              <MenuItem component={NextLink} href="/admin/profile">Profile</MenuItem>
              <MenuItem component={NextLink} href="/admin/settings">Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* SIDEBAR */}
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, borderRight: '1px solid #e0e0e0' },
          }}
        >
          <Toolbar />
          <List>

            {/* STATIC ITEMS */}
            {sidebarItems.map((item, index) =>
              item.divider ? (
                <Divider key={'div-' + index} sx={{ my: 1 }} />
              ) : item.href ? (
                <ListItem key={item.href} disablePadding>
                  <ListItemButton
                    component={NextLink}
                    href={item.href}
                    selected={router.pathname === item.href}
                    sx={{ py: 1.5 }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ) : null
            )}

            {/* USERS DROPDOWN */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setUsersOpen(!usersOpen)}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
                {usersOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={usersOpen}>
              <List component="div" disablePadding>
                {userSubmenuItems.map((sub) => (
                  <ListItem disablePadding key={sub.href}>
                    <ListItemButton
                      component={NextLink}
                      href={sub.href}
                      selected={router.pathname === sub.href}
                      sx={{ pl: 6 }}
                    >
                      <ListItemIcon>{sub.icon}</ListItemIcon>
                      <ListItemText primary={sub.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* BOOKS DROPDOWN */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setBooksOpen(!booksOpen)}>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary="Books" />
                {booksOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            <Collapse in={booksOpen}>
              <List component="div" disablePadding>
                {bookSubmenuItems.map((sub) => (
                  <ListItem disablePadding key={sub.href}>
                    <ListItemButton
                      component={NextLink}
                      href={sub.href}
                      selected={router.pathname === sub.href}
                      sx={{ pl: 6 }}
                    >
                      <ListItemIcon>{sub.icon}</ListItemIcon>
                      <ListItemText primary={sub.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

          </List>
        </Drawer>

        {/* MAIN CONTENT */}
        <Box sx={{ flexGrow: 1, p: 3, pt: 10 }}>
          <AdminBreadcrumbs items={breadcrumbs} />

          {title && (
            <Typography variant="h4" sx={{ mb: 3 }}>
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
