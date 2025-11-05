import React from 'react';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import HomeIcon from '@mui/icons-material/Home';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminBreadcrumbsProps {
  items?: BreadcrumbItem[];
}

const AdminBreadcrumbs: React.FC<AdminBreadcrumbsProps> = ({ items = [] }) => {
  const router = useRouter();
  
  // Default breadcrumb items
  const defaultItems: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/admin' }
  ];
  
  // Combine default items with provided items
  const breadcrumbItems = [...defaultItems, ...items];

  return (
    <Box sx={{ mb: 3, mt: 1 }}>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return isLast ? (
            <Typography key={index} color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
              {index === 0 && <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />}
              {item.label}
            </Typography>
          ) : (
            <Link
              key={index}
              component={NextLink}
              href={item.href || '#'}
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {index === 0 && <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />}
              {item.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default AdminBreadcrumbs;