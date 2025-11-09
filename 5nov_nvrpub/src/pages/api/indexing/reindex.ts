import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'
import { addDocuments, commit, deleteByQuery } from '@/utils/solr'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })

  try {
    // Ensure metadata tables exist (decoupled from legacy schemas)
    await query(`
      CREATE TABLE IF NOT EXISTS book_metadata (
        id INT AUTO_INCREMENT PRIMARY KEY,
        isbn VARCHAR(64) NULL,
        print_isbn VARCHAR(64) NULL,
        title VARCHAR(512) NOT NULL,
        author VARCHAR(256) NULL,
        coverImage VARCHAR(1024) NULL,
        description TEXT NULL,
        keywords TEXT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_isbn (isbn),
        KEY idx_print_isbn (print_isbn)
      )
    `)
    await query(`
      CREATE TABLE IF NOT EXISTS chapter_metadata (
        id INT AUTO_INCREMENT PRIMARY KEY,
        book_isbn VARCHAR(64) NULL,
        book_print_isbn VARCHAR(64) NULL,
        book_title VARCHAR(512) NULL,
        title VARCHAR(512) NOT NULL,
        number INT NULL,
        slug VARCHAR(1024) NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        KEY idx_book_isbn (book_isbn),
        KEY idx_book_print_isbn (book_print_isbn)
      )
    `)

    const [books]: any = await query(
      'SELECT id, isbn, print_isbn, title, author, coverImage, description, keywords FROM book_metadata ORDER BY id ASC'
    )

    const [chapters]: any = await query(
      `SELECT id, book_isbn, book_print_isbn, book_title, title AS chapterTitle, number AS chapterNumber, slug
         FROM chapter_metadata ORDER BY id ASC`
    )

    // Clear previous index for safety (optional)
    await deleteByQuery('*:*')

    const bookDocs = (books || []).map((b: any) => ({
      id: `book-${b.id}`,
      type: 'book',
      book_id: b.id,
      title: b.title,
      author: b.author || '',
      isbn: b.isbn || '',
      print_isbn: b.print_isbn || '',
      coverImage: b.coverImage || '',
      description: b.description || '',
      keywords: b.keywords || '',
    }))

    const chapterDocs = (chapters || []).map((c: any) => ({
      id: `chapter-${c.id}`,
      type: 'chapter',
      chapter_id: c.id,
      book_isbn: c.book_isbn || '',
      book_print_isbn: c.book_print_isbn || '',
      bookTitle: c.book_title || '',
      chapterTitle: c.chapterTitle,
      chapterNumber: c.chapterNumber ?? null,
      slug: c.slug || '',
    }))

    await addDocuments(bookDocs)
    await addDocuments(chapterDocs)
    await commit()

    return res.status(200).json({ message: 'Reindex completed', stats: { books: bookDocs.length, chapters: chapterDocs.length } })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Indexing error' })
  }
}
