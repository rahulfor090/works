import React, { FC, useState } from 'react'
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material'
import { Search as SearchIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { useRouter } from 'next/router'

interface SearchBarProps {
  onSearch?: (searchTerm: string, contentType: string) => void
}

const contentTypes = [
  { value: 'all', label: 'All' },
  { value: 'journals', label: 'Journal' },
  { value: 'books', label: 'Book' },
  { value: 'videos', label: 'Video' },
  { value: 'cases', label: 'Case' },
  { value: 'mcqs', label: 'MCQ' },
]

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const router = useRouter()

  const handleTypeChange = (event: SelectChangeEvent) => {
    const newType = event.target.value
    setSelectedType(newType)
    if (onSearch) {
      onSearch(searchTerm, newType)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value
    setSearchTerm(newSearchTerm)
    if (onSearch) {
      onSearch(newSearchTerm, selectedType)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Navigate to search results page or filter current page
      if (selectedType === 'all') {
        router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
      } else {
        router.push(`/search?q=${encodeURIComponent(searchTerm)}&type=${selectedType}`)
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        maxWidth: 500,
        width: '100%',
        mx: { xs: 2, md: 4 },
      }}
    >
      {/* Content Type Dropdown */}
      <FormControl sx={{ minWidth: 120 }}>
        <Select
          value={selectedType}
          onChange={handleTypeChange}
          displayEmpty
          variant="standard"
          disableUnderline
          IconComponent={ExpandMoreIcon}
          sx={{
            pl: 2,
            pr: 1,
            py: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'primary.main',
            '& .MuiSelect-select': {
              paddingRight: '24px !important',
            },
            '& .MuiSelect-icon': {
              color: 'primary.main',
              right: 4,
            },
            '&:before, &:after': {
              display: 'none',
            },
          }}
        >
          {contentTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Divider */}
      <Box
        sx={{
          width: 1,
          height: 32,
          backgroundColor: 'divider',
          mx: 1,
        }}
      />

      {/* Search Input */}
      <TextField
        placeholder="Explore here..."
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        variant="standard"
        fullWidth
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon
                sx={{
                  color: 'text.secondary',
                  cursor: 'pointer',
                  mr: 1,
                }}
                onClick={handleSearch}
              />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputBase-input': {
            py: 1.5,
            px: 2,
            fontSize: '0.875rem',
            '&::placeholder': {
              color: 'text.secondary',
              opacity: 1,
            },
          },
        }}
      />
    </Box>
  )
}

export default SearchBar