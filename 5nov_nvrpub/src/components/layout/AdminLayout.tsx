import React, { ReactNode, useState } from 'react';
import Head from 'next/head';
import { Box, AppBar, Toolbar, Typography, Container, CssBaseline, Button, IconButton, Avatar, Tooltip, Menu, MenuItem } from '@mui/material';
import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

// Create a separate theme for admin panel
const adminTheme = createTheme({
  palette: {
    primary: {
      main: '#268bbb',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          boxShadow: '0 4px 6px rgba(26, 35, 126, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
  title = 'Admin Panel',
  breadcrumbs = []
}: AdminLayoutProps) => {
  const router = useRouter();
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const links = [
    { label: 'Sliders', href: '/admin/sliders' },
    { label: 'Contents', href: '/admin/contents' },
    { label: 'Content Types', href: '/admin/contenttypes' },
    { label: 'Subject Categories', href: '/admin/subjectcategories' },
    { label: 'Testimonials', href: '/admin/testimonials' },
    { label: '⭐ Mentor Ratings', href: '/admin/ratings' },
    { label: '👨‍⚕️ Mentors', href: '/admin/mentors' },
  ];

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <Head>
        <title>{title} - Jaypee Digital</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mr: 3 }}>
              <a href="/admin">
              <img src="/images/nvr-logo.jpg"></img>
              </a>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
              {links.map((link) => (
                <Box
                  key={link.href}
                  component={NextLink}
                  href={link.href}
                  sx={{ 
                    color: 'white', 
                    textDecoration: 'none', 
                    fontWeight: 'bold',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  {link.label}
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button onClick={handleLogout} color="inherit" sx={{ mr: 1 }}>
                Logout
              </Button>
              <Tooltip title="Account settings">
                <IconButton onClick={handleProfileOpen} size="small" sx={{ ml: 1 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
                </IconButton>
              </Tooltip>
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
            </Box>
          </Toolbar>
        </AppBar>
        
        <Box component="main" sx={{ 
          flexGrow: 1, 
          backgroundColor: 'background.default',
          minHeight: 'calc(100vh - 64px)',
          py: 4
        }}>
          <Container>
            <AdminBreadcrumbs items={breadcrumbs} />
            {title && title !== 'Admin Panel' && (
              <Typography variant="h4" component="h1" gutterBottom>
                {title}
              </Typography>
            )}
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;
