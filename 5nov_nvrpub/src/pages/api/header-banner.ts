import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/utils/db';
import formidable, { File as FormidableFile } from 'formidable';
import fs from 'fs';
import path from 'path';
import { IncomingMessage } from 'http';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface BannerData {
  id: number;
  image: string;
  link: string;
  isActive: number;
}

// Helper function to parse body manually
async function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const [result]: any = await query(
        'SELECT * FROM header_banner WHERE is_active = 1 LIMIT 1'
      );
      
      if (result.length > 0) {
        res.status(200).json({
          id: result[0].id,
          image: result[0].image,
          link: result[0].link,
          isActive: result[0].is_active,
        });
      } else {
        res.status(404).json({ message: 'No active banner found' });
      }
    } catch (error) {
      console.error('Error fetching banner:', error);
      res.status(500).json({ error: 'Failed to fetch banner' });
    }
  } else if (req.method === 'PUT') {
    // Parse body for PUT requests
    try {
      const body = await parseBody(req);
      const { id, isActive } = body;

      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }

      await query('UPDATE header_banner SET is_active = ? WHERE id = ?', [isActive, id]);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).json({ error: 'Failed to update banner' });
    }
  } else if (req.method === 'POST') {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/images/banners'),
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public/images/banners');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parse error:', err);
        return res.status(500).json({ error: 'Failed to parse form data' });
      }

      const file = Array.isArray(files.image) ? files.image[0] : files.image;
      const link = Array.isArray(fields.link) ? fields.link[0] : fields.link;

      if (!file || !link) {
        return res.status(400).json({ error: 'Image and link are required' });
      }

      try {
        // Generate unique filename
        const timestamp = Date.now();
        const ext = path.extname(file.originalFilename || '.jpg');
        const newFilename = `banner-${timestamp}${ext}`;
        const newPath = path.join(uploadDir, newFilename);

        // Move file to new location with new name
        fs.renameSync(file.filepath, newPath);

        // Deactivate all existing banners
        await query('UPDATE header_banner SET is_active = 0');

        // Insert new banner
        await query(
          'INSERT INTO header_banner (image, link, is_active) VALUES (?, ?, 1)',
          [newFilename, link]
        );

        res.status(200).json({ success: true, filename: newFilename });
      } catch (error) {
        console.error('Error saving banner:', error);
        res.status(500).json({ error: 'Failed to save banner' });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      await query('UPDATE header_banner SET is_active = 0');
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting banner:', error);
      res.status(500).json({ error: 'Failed to delete banner' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
