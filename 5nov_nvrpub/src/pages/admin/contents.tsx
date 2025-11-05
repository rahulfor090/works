import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import ImageUploader from '@/components/common/ImageUploader';
import RichTextEditor from '@/components/common/RichTextEditor';
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
  DialogTitle,
  Rating,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  FormControlLabel,
  Switch
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { Content } from '@/interfaces/content'

const AdminContents = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [open, setOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<Content>({
    title: '',
    coverImage: '',
    description: '',
    author: '',
    detailsHtml: '',
    rating: 0,
    displayOrder: 0,
    contentTypeId: 0,
    subjectcategoryId: 0,
    ishomepage: 0
  });
  
  const [contentTypes, setContentTypes] = useState<{ id: number; title: string }[]>([]);
  const [subjectCategories, setSubjectCategories] = useState<{ id: number; name: string; contentTypeId: number }[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  // Fetch contents from API
  const fetchContents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contents');
      if (response.ok) {
        const data = await response.json();
        setContents(data);
      } else {
        throw new Error('Failed to fetch contents');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contents:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load contents',
        severity: 'error'
      });
      setLoading(false);
    }
  };

  const fetchContentTypes = async () => {
    try {
      const response = await fetch('/api/contenttypes');
      if (response.ok) {
        const data = await response.json();
        const mapped = data.map((ct: any) => ({ 
          id: ct.id, 
          title: ct.title 
        }));
        setContentTypes(mapped);
      } else {
        throw new Error('Failed to fetch content types');
      }
    } catch (err) {
      console.error('Failed to load content types', err);
    }
  };

  const fetchSubjectCategories = async () => {
    try {
      const response = await fetch('/api/subjectcategories');
      if (response.ok) {
        const data = await response.json();
        const mapped = data.map((sc: any) => ({ 
          id: sc.id, 
          name: sc.name, 
          contentTypeId: sc.contentTypeId 
        }));
        setSubjectCategories(mapped);
      } else {
        throw new Error('Failed to fetch subject categories');
      }
    } catch (err) {
      console.error('Failed to load subject categories', err);
    }
  };

  useEffect(() => {
    fetchContents();
    fetchContentTypes();
    fetchSubjectCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        // Update existing content
        const response = await fetch(`/api/contents/${currentContent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: currentContent.title,
            coverImage: currentContent.coverImage,
            description: currentContent.description,
            author: currentContent.author,
            detailsHtml: currentContent.detailsHtml,
            rating: currentContent.rating,
            order: currentContent.displayOrder,
            contentTypeId: currentContent.contentTypeId,
            subjectcategoryId: currentContent.subjectcategoryId,
            ishomepage: currentContent.ishomepage || 0
          }),
        });
        
        if (response.ok) {
          await fetchContents(); // Reload data from server
          setSnackbar({
            open: true,
            message: 'Content updated successfully',
            severity: 'success'
          });
        } else {
          throw new Error('Failed to update content');
        }
      } else {
        // Add new content
        const response = await fetch('/api/contents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: currentContent.title,
            coverImage: currentContent.coverImage,
            description: currentContent.description,
            author: currentContent.author,
            detailsHtml: currentContent.detailsHtml,
            rating: currentContent.rating,
            order: currentContent.displayOrder,
            contentTypeId: currentContent.contentTypeId,
            subjectcategoryId: currentContent.subjectcategoryId,
            ishomepage: currentContent.ishomepage || 0
          }),
        });
        
        if (response.ok) {
          await fetchContents(); // Reload data from server
          setSnackbar({
            open: true,
            message: 'Content created successfully',
            severity: 'success'
          });
        } else {
          throw new Error('Failed to create content');
        }
      }
      handleClose();
    } catch (error) {
      console.error('Error saving content:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save content',
        severity: 'error'
      });
    }
  };

  const handleEdit = (content: Content) => {
    setCurrentContent(content);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    
    try {
      const response = await fetch(`/api/contents/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchContents(); // Reload data from server
        setSnackbar({
          open: true,
          message: 'Content deleted successfully',
          severity: 'success'
        });
      } else {
        throw new Error('Failed to delete content');
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      setSnackbar({
        open: true,
        message: 'Failed to delete content',
        severity: 'error'
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setCurrentContent({
      title: '',
      coverImage: '',
      description: '',
      author: '',
      detailsHtml: '',
      rating: 0,
      displayOrder: 0,
      contentTypeId: 0,
      subjectcategoryId: 0,
      ishomepage: 0
    });
  };

  const handleAdd = () => {
    setCurrentContent({
      title: '',
      coverImage: '',
      description: '',
      author: '',
      detailsHtml: '',
      rating: 0,
      displayOrder: 0,
      contentTypeId: 0,
      subjectcategoryId: 0,
      ishomepage: 0
    });
    setIsEditing(false);
    setOpen(true);
  };

  const getContentTypeName = (id: number) => {
    const contentType = contentTypes.find(ct => ct.id === id);
    return contentType ? contentType.title : 'Unknown';
  };

  const getSubjectCategoryName = (id: number) => {
    const subjectCategory = subjectCategories.find(sc => sc.id === id);
    return subjectCategory ? subjectCategory.name : 'Unknown';
  };

  const getFilteredSubjectCategories = () => {
    return subjectCategories.filter(sc => sc.contentTypeId === currentContent.contentTypeId);
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Contents Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Add Content
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Content Type</TableCell>
                <TableCell>Subject Category</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Display Order</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>{content.id}</TableCell>
                  <TableCell>{content.title}</TableCell>
                  <TableCell>{content.author}</TableCell>
                  <TableCell>{getContentTypeName(content.contentTypeId)}</TableCell>
                  <TableCell>{getSubjectCategoryName(content.subjectcategoryId)}</TableCell>
                  <TableCell>
                    <Rating value={content.rating} readOnly size="small" />
                  </TableCell>
                  <TableCell>{content.displayOrder}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(content)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(content.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            {isEditing ? 'Edit Content' : 'Add New Content'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={currentContent.title}
                  onChange={(e) => setCurrentContent({ ...currentContent, title: e.target.value })}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Author"
                  value={currentContent.author}
                  onChange={(e) => setCurrentContent({ ...currentContent, author: e.target.value })}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <ImageUploader
                  label="Cover Image"
                  value={currentContent.coverImage}
                  onChange={(value) => setCurrentContent({ ...currentContent, coverImage: value })}
                />
              </Grid>

              <Grid item xs={12}>
                <RichTextEditor
                  label="Description"
                  value={currentContent.description}
                  onChange={(value) => setCurrentContent({ ...currentContent, description: value })}
                />
              </Grid>

              <Grid item xs={12}>
                <RichTextEditor
                  label="Details HTML"
                  value={currentContent.detailsHtml}
                  onChange={(value) => setCurrentContent({ ...currentContent, detailsHtml: value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Content Type</InputLabel>
                  <Select
                    value={currentContent.contentTypeId}
                    onChange={(e) => {
                      setCurrentContent({ 
                        ...currentContent, 
                        contentTypeId: e.target.value as number,
                        subjectcategoryId: 0 // Reset subject category when content type changes
                      });
                    }}
                    label="Content Type"
                  >
                    {contentTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Subject Category</InputLabel>
                  <Select
                    value={currentContent.subjectcategoryId}
                    onChange={(e) => setCurrentContent({ ...currentContent, subjectcategoryId: e.target.value as number })}
                    label="Subject Category"
                    disabled={!currentContent.contentTypeId}
                  >
                    {getFilteredSubjectCategories().map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {!currentContent.contentTypeId ? 'Please select a content type first' : ''}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Rating"
                  value={currentContent.rating}
                  onChange={(e) => setCurrentContent({ ...currentContent, rating: parseFloat(e.target.value) || 0 })}
                  inputProps={{ min: 0, max: 5, step: 0.1 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Display Order"
                  value={currentContent.displayOrder}
                  onChange={(e) => setCurrentContent({ ...currentContent, displayOrder: parseInt(e.target.value) || 0 })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentContent.ishomepage === 1}
                      onChange={(e) => setCurrentContent({ ...currentContent, ishomepage: e.target.checked ? 1 : 0 })}
                    />
                  }
                  label="Show on Homepage"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
};

export default AdminContents;