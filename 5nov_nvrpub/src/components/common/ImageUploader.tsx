import React, { useState, useRef } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  allowUrl?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Image',
  allowUrl = true
}) => {
  const [useUrl, setUseUrl] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange(url);
    setPreviewUrl(url);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local preview URL
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
      
      try {
        // Upload the file to the server
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const result = await response.json();
          // Use the server-returned URL
          onChange(result.url);
          console.log('File uploaded successfully:', result.filename);
        } else {
          console.error('Upload failed:', response.statusText);
          // Fallback to placeholder path if upload fails
          onChange(`/images/${file.name}`);
        }
      } catch (error) {
        console.error('Upload error:', error);
        // Fallback to placeholder path if upload fails
        onChange(`/images/${file.name}`);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const toggleMode = () => {
    setUseUrl(!useUrl);
    // Reset the value when switching modes
    if (!useUrl) {
      onChange('');
      setPreviewUrl('');
    }
  };

  return (
    <Box>
      {allowUrl && (
        <Button 
          variant="text" 
          onClick={toggleMode} 
          sx={{ mb: 1 }}
        >
          {useUrl ? 'Switch to file upload' : 'Switch to URL input'}
        </Button>
      )}
      
      {useUrl && allowUrl ? (
        <TextField
          fullWidth
          label={`${label} URL`}
          value={value}
          onChange={handleUrlChange}
          placeholder="Enter image URL"
          variant="outlined"
          size="small"
        />
      ) : (
        <Box>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            onClick={handleButtonClick}
            fullWidth
          >
            Upload {label}
          </Button>
          {value && !value.startsWith('http') && (
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Selected file: {value.split('/').pop()}
            </Typography>
          )}
        </Box>
      )}
      
      {previewUrl && (
        <Paper 
          sx={{ 
            mt: 2, 
            p: 1, 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            width: '100%',
            overflow: 'hidden'
          }}
        >
          {previewUrl.startsWith('http') || previewUrl.startsWith('blob:') || previewUrl.startsWith('/') ? (
            <img 
              src={previewUrl} 
              alt="Preview" 
              style={{ 
                maxHeight: '100%', 
                maxWidth: '100%', 
                objectFit: 'contain' 
              }} 
            />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImageIcon color="disabled" />
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                Preview not available
              </Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default ImageUploader;