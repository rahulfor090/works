import React, { ReactNode, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
} from '@mui/material';
import {
  DashboardRounded as DashboardIcon,
  PhotoLibraryRounded as SlidersIcon,
  ArticleRounded as ArticleIcon,
  CategoryRounded as CategoryIcon,
  FolderRounded as FolderIcon,
  ChatRounded as ChatIcon,
  NotificationsNoneRounded as NotificationsIcon,
  LightModeRounded as LightModeIcon,
  DarkModeRounded as DarkModeIcon,
  AddRounded as AddIcon,
} from '@mui/icons-material';
import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';

const linkIcons: Record<string, React.ReactNode> = {
  '/admin': <DashboardIcon fontSize="small" />,
  '/admin/sliders': <SlidersIcon fontSize="small" />,
  '/admin/contents': <ArticleIcon fontSize="small" />,
  '/admin/contenttypes': <CategoryIcon fontSize="small" />,
  '/admin/subjectcategories': <FolderIcon fontSize="small" />,
  '/admin/testimonials': <ChatIcon fontSize="small" />,
};

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
    { label: 'Dashboard', href: '/admin' },
    { label: 'Sliders', href: '/admin/sliders' },
    { label: 'Contents', href: '/admin/contents' },
    { label: 'Content Types', href: '/admin/contenttypes' },
    { label: 'Subject Categories', href: '/admin/subjectcategories' },
    { label: 'Testimonials', href: '/admin/testimonials' },
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

      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Side Navigation (desktop) */}
        <Box
          component="aside"
          sx={{
            width: 260,
            flexShrink: 0,
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            position: 'sticky',
            top: 0,
            height: '100vh',
          }}
        >
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              component="span"
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                backgroundImage: 'url(/images/nvr-logo.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                Admin Panel
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Content Management
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {links.map((link) => {
              const isActive = router.pathname === link.href;
              return (
                <Box
                  key={link.href}
                  component={NextLink}
                  href={link.href}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    color: isActive ? 'primary.main' : 'text.secondary',
                    fontWeight: isActive ? 700 : 500,
                    textDecoration: 'none',
                    bgcolor: isActive ? 'primary.main + "14"' : 'transparent',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'common.white',
                      '& svg': { color: 'common.white' },
                    },
                  }}
                >
                  <Box sx={{ color: isActive ? 'primary.main' : 'text.secondary' }}>
                    {linkIcons[link.href] ?? <DashboardIcon fontSize="small" />}
                  </Box>
                  <Typography variant="body2">{link.label}</Typography>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ p: 3 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              component={NextLink}
              href="/admin/contents"
            >
              New Content
            </Button>
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Header */}
          <Box
            component="header"
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              backdropFilter: 'blur(16px)',
              backgroundColor: 'background.default',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                height: 72,
                px: { xs: 2, md: 4 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Typography variant="h5" fontWeight={700}>
                {title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <IconButton>
                  <NotificationsIcon />
                </IconButton>
                <IconButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                  <LightModeIcon fontSize="small" />
                </IconButton>
                <IconButton sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
                  <DarkModeIcon fontSize="small" />
                </IconButton>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleProfileOpen} size="small">
                    <Avatar sx={{ width: 36, height: 36 }}>A</Avatar>
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
                  <MenuItem component={NextLink} href="/admin/profile">
                    Profile
                  </MenuItem>
                  <MenuItem component={NextLink} href="/admin/settings">
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>

          {/* Main body */}
          <Box component="main" sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 4 } }}>
            <Container maxWidth="xl" disableGutters>
              <AdminBreadcrumbs items={breadcrumbs} />
              <Box sx={{ mt: 2 }}>{children}</Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;
