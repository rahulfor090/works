import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { 
  Box, 
  Button, 
  TextField, 
  Paper, 
  Grid, 
  Typography, 
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

// Define slider interface
interface Slider {
  id?: number;
  title: string;
  highlightedWord: string;
  subtitle: string;
  image: string;
  buttons: Array<{
    label: string;
    variant: 'contained' | 'outlined';
    icon?: boolean;
    scrollTo: string;
  }>;
  displayOrder: number;
  isActive?: boolean;
}

const AdminSliders = () => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [open, setOpen] = useState(false);
  const [currentSlider, setCurrentSlider] = useState<Slider>({
    title: '',
    highlightedWord: '',
    subtitle: '',
    image: '',
    buttons: [
      { label: 'Medicine', variant: 'contained' as const, scrollTo: 'popular-course' },
      { label: 'Dentistry', variant: 'contained' as const, scrollTo: 'popular-course' },
      { label: 'Nursing', variant: 'contained' as const, scrollTo: 'popular-course' },
      { label: 'Watch Video', variant: 'outlined' as const, icon: true, scrollTo: 'video-section' }
    ],
    displayOrder: 0,
    isActive: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('/api/slides');
        if (response.ok) {
          const data = await response.json();
          setSliders(data);
        } else {
          console.error('Failed to fetch slides:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchSlides();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentSlider({ 
      title: '', 
      highlightedWord: '', 
      subtitle: '', 
      image: '', 
      buttons: [
        { label: 'Medicine', variant: 'contained' as const, scrollTo: 'popular-course' },
        { label: 'Dentistry', variant: 'contained' as const, scrollTo: 'popular-course' },
        { label: 'Nursing', variant: 'contained' as const, scrollTo: 'popular-course' },
        { label: 'Watch Video', variant: 'outlined' as const, icon: true, scrollTo: 'video-section' }
      ],
      displayOrder: 0,
      isActive: true
    });
    setIsEditing(false);
    setSelectedFile(null);
    setImagePreview('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentSlider(prev => ({
      ...prev,
      [name]: name === 'displayOrder' ? parseInt(value) || 0 : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      let imagePath = currentSlider.image;

      // Upload image if a new file is selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const uploadResponse = await fetch('/api/upload/slider-image', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          imagePath = uploadResult.filename; // Just store the filename
        } else {
          console.error('Failed to upload image');
          return;
        }
      }

      const sliderData = {
        ...currentSlider,
        image: imagePath
      };

      if (isEditing && currentSlider.id) {
        // Update existing slider
        const response = await fetch(`/api/slides/${currentSlider.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sliderData),
        });

        if (response.ok) {
          setSliders(prev => 
            prev.map(slider => 
              slider.id === currentSlider.id ? { ...sliderData, id: currentSlider.id } : slider
            )
          );
        } else {
          console.error('Failed to update slider');
        }
      } else {
        // Add new slider
        const response = await fetch('/api/slides', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sliderData),
        });

        if (response.ok) {
          const result = await response.json();
          setSliders(prev => [...prev, { ...sliderData, id: result.id }]);
        } else {
          console.error('Failed to create slider');
        }
      }
      handleClose();
    } catch (error) {
      console.error('Error submitting slider:', error);
    }
  };

  const handleEdit = (slider: Slider) => {
    setCurrentSlider(slider);
    setIsEditing(true);
    setImagePreview(slider.image ? `/images/sliders/${slider.image}` : '');
    setOpen(true);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    
    try {
      const response = await fetch(`/api/slides/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSliders(prev => prev.filter(slider => slider.id !== id));
      } else {
        console.error('Failed to delete slider');
      }
    } catch (error) {
      console.error('Error deleting slider:', error);
    }
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleOpen}
          sx={{ mb: 2 }}
        >
          Add New Slider
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
                <TableRow>
                  <TableCell>Order</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Highlighted Word</TableCell>
                  <TableCell>Subtitle</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              {sliders.map((slider, index) => (
                <TableRow key={slider.id || `slider-${index}`}>
                  <TableCell>{slider.displayOrder}</TableCell>
                  <TableCell>{slider.title}</TableCell>
                  <TableCell>{slider.highlightedWord}</TableCell>
                  <TableCell>{slider.subtitle}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {slider.image && (
                        <Box
                          component="img"
                          src={`/images/sliders/${slider.image}`}
                          alt="Slider preview"
                          sx={{
                            width: 60,
                            height: 40,
                            objectFit: 'cover',
                            borderRadius: 1,
                            border: '1px solid #ddd'
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                      <Typography variant="caption" sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {slider.image || 'No image'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(slider)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(slider.id)} size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Slider' : 'Add New Slider'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                fullWidth
                value={currentSlider.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="highlightedWord"
                label="Highlighted Word"
                fullWidth
                value={currentSlider.highlightedWord}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="subtitle"
                label="Subtitle"
                fullWidth
                value={currentSlider.subtitle}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Slider Image
              </Typography>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mb: 2 }}
              >
                Upload an Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              
              {imagePreview && (
                <Box
                  sx={{
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    p: 2,
                    backgroundColor: '#f5f5f5'
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              )}
              
              {selectedFile && (
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Selected file: {selectedFile.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="displayOrder"
                label="Display Order"
                type="number"
                fullWidth
                value={currentSlider.displayOrder}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AdminSliders.getLayout = (page: React.ReactElement) => <AdminLayout title="Manage Sliders" breadcrumbs={[{ label: 'Sliders' }]}>{page}</AdminLayout>;

export default AdminSliders;