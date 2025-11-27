import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface BannerData {
  id: number;
  image: string;
  link: string;
  isActive: number;
}

const HeaderBannerAdmin = () => {
  const [banner, setBanner] = useState<BannerData | null>(null);
  const [link, setLink] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const res = await fetch('/api/header-banner');
      if (res.ok) {
        const data = await res.json();
        setBanner(data);
        setLink(data.link);
        setPreviewUrl(`/images/banners/${data.image}`);
      } else if (res.status === 404) {
        // No active banner found, this is okay
        setBanner(null);
        console.log('No active banner found');
      } else {
        console.error('Error fetching banner:', await res.text());
      }
    } catch (error) {
      console.error('Error fetching banner:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !link) {
      setMessage({ type: 'error', text: 'Please select an image and enter a link' });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('link', link);

    try {
      const res = await fetch('/api/header-banner', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Banner uploaded successfully!' });
        await fetchBanner();
        setSelectedFile(null);
      } else {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        setMessage({ type: 'error', text: errorData.error || 'Failed to upload banner' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Error uploading banner' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async () => {
    if (!banner) return;

    try {
      const res = await fetch('/api/header-banner', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: banner.id, isActive: banner.isActive === 1 ? 0 : 1 }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Banner status updated!' });
        fetchBanner();
      } else {
        setMessage({ type: 'error', text: 'Failed to update status' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating status' });
    }
  };

  return (
    <AdminLayout title="Header Banner Management">
      <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
        {message && (
          <Alert severity={message.type} sx={{ mb: 3 }} onClose={() => setMessage(null)}>
            {message.text}
          </Alert>
        )}

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Upload New Banner
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Recommended size: 468px × 60px
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
            >
              Select Image
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
            {selectedFile && (
              <Typography variant="body2" color="text.secondary">
                Selected: {selectedFile.name}
              </Typography>
            )}
          </Box>

          <TextField
            fullWidth
            label="Link URL"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={loading || !selectedFile || !link}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Upload Banner'}
          </Button>
        </Paper>

        {banner && (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Current Banner
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={banner.isActive === 1}
                  onChange={handleToggleActive}
                  color="primary"
                />
              }
              label={banner.isActive === 1 ? 'Active' : 'Inactive'}
              sx={{ mb: 3 }}
            />

            {previewUrl && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <img
                  src={previewUrl}
                  alt="Banner Preview"
                  style={{ maxWidth: '100%', border: '1px solid #ddd', borderRadius: '4px' }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Link: {banner.link}
                </Typography>
              </Box>
            )}
          </Paper>
        )}
      </Box>
    </AdminLayout>
  );
};

export default HeaderBannerAdmin;
