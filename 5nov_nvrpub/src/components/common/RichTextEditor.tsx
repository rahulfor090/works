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
  const isUserTyping = useRef(false);

  useEffect(() => {
    // Only update if user is not actively typing
    if (editorRef.current && !isUserTyping.current && editorRef.current.innerHTML !== value) {
      const selection = window.getSelection();
      const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      const startOffset = range ? range.startOffset : 0;
      const endOffset = range ? range.endOffset : 0;
      
      editorRef.current.innerHTML = value;
      
      // Try to restore cursor position
      if (range && editorRef.current.childNodes.length > 0) {
        try {
          const textNode = editorRef.current.childNodes[0];
          if (textNode) {
            const newRange = document.createRange();
            newRange.setStart(textNode, Math.min(startOffset, textNode.textContent?.length || 0));
            newRange.setEnd(textNode, Math.min(endOffset, textNode.textContent?.length || 0));
            selection?.removeAllRanges();
            selection?.addRange(newRange);
          }
        } catch (error) {
          // Ignore cursor restoration errors
        }
      }
    }
    isUserTyping.current = false;
  }, [value]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    isUserTyping.current = true;
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
            onInput={handleInput}
            suppressContentEditableWarning
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