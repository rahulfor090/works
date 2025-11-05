import React, { useRef, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';

// This is a simple rich text editor component
// In a real application, you would integrate a full-featured editor like TinyMCE, CKEditor, or Quill
interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  minHeight?: string | number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  label = 'Content',
  minHeight = '200px'
}) => {
  // In a real implementation, you would initialize the editor here
  // For this demo, we'll use a contentEditable div as a simple editor
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the editor content is updated when value prop changes
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      // Add null check and ensure DOM element exists before accessing properties
      try {
        if (editorRef.current && typeof editorRef.current.innerHTML !== 'undefined') {
          editorRef.current.innerHTML = value;
        }
      } catch (error) {
        console.warn('Error updating editor content:', error);
      }
    }
  }, [value]);

  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML;
    onChange(content);
  };

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      {label && (
        <Typography variant="subtitle1" gutterBottom>
          {label}
        </Typography>
      )}
      <Paper 
        elevation={0}
        sx={{
          border: '1px solid #ccc',
          borderRadius: 1,
          overflow: 'hidden',
          mb: 1
        }}
      >
        <Box
          sx={{
            padding: 2,
            minHeight,
            '&:focus-within': {
              borderColor: 'primary.main',
              boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
            },
            backgroundColor: 'white',
          }}
        >
          <div
            ref={editorRef}
            contentEditable
            dangerouslySetInnerHTML={{ __html: value }}
            onInput={handleChange}
            style={{
              minHeight: 'calc(100% - 10px)',
              outline: 'none',
              width: '100%',
              padding: '8px',
            }}
          />
        </Box>
      </Paper>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
        You can format text using HTML tags. In a real application, toolbar buttons would be provided.
      </Typography>
    </Box>
  );
};

export default RichTextEditor;