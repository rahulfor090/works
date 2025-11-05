import { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, File } from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), 'public', 'images'),
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
    })

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'images')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const [fields, files] = await form.parse(req)
    
    const file = Array.isArray(files.photo) ? files.photo[0] : files.photo
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.mimetype || '')) {
      // Delete the uploaded file if it's not allowed
      fs.unlinkSync(file.filepath)
      return res.status(400).json({ error: 'Invalid file type. Only images are allowed.' })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.originalFilename || 'photo'
    const extension = path.extname(originalName)
    const newFilename = `testimonial-${timestamp}${extension}`
    const newPath = path.join(uploadDir, newFilename)

    // Move file to final location
    fs.renameSync(file.filepath, newPath)

    // Return the public URL
    const photoUrl = `/images/${newFilename}`
    
    res.status(200).json({ 
      success: true, 
      photoUrl,
      message: 'Photo uploaded successfully' 
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Failed to upload photo' })
  }
}