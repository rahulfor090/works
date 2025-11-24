import { Dirent } from 'fs'
import { readFile, readdir, stat } from 'fs/promises'
import path from 'path'

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const BOOKS_DIR = path.join(PUBLIC_DIR, 'books')
const DEFAULT_COVER = '/images/courses/JMEDS_Cover.jpeg'

const isDirectory = (dirent: Dirent): boolean => dirent.isDirectory()

const toPublicUrl = (absolutePath: string): string => {
  const relative = path.relative(PUBLIC_DIR, absolutePath)
  return `/${relative.split(path.sep).join('/')}`
}

const exists = async (filePath: string): Promise<boolean> => {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

interface BookMetadata {
  Book?: Record<string, string | undefined>
}

export interface LocalBookRecord {
  id: number
  isbn: string
  print_isbn?: string
  title: string
  author: string
  coverImage: string
  description?: string
  keywords?: string
  createdAt: string
  contenttype: 'books'
}

export async function loadLocalBooks(): Promise<LocalBookRecord[]> {
  try {
    const dirents = await readdir(BOOKS_DIR, { withFileTypes: true })
    // Filter out directories starting with underscore
    const bookDirs = dirents
      .filter(isDirectory)
      .map((entry) => entry.name)
      .filter((name) => !name.startsWith('_'))

    const books: LocalBookRecord[] = []

    for (const dir of bookDirs) {
      // Read JSON file named after the ISBN (folder name)
      const jsonPath = path.join(BOOKS_DIR, dir, `${dir}.json`)
      try {
        const jsonRaw = await readFile(jsonPath, 'utf-8')
        const bookData = JSON.parse(jsonRaw)

        const isbn = bookData.print_isbn || dir
        const title = bookData.book_title || `Book ${isbn}`
        const author = bookData.book_author_name || 'Unknown Author'
        const description = bookData.book_abstract?.trim() || ''
        const keywords = bookData.book_keywords || ''

        // Look for cover image in the book folder root
        const coverImagePath = path.join(BOOKS_DIR, dir, `${dir}.png`)
        let coverImage = DEFAULT_COVER
        if (await exists(coverImagePath)) {
          coverImage = toPublicUrl(coverImagePath)
        }

        const createdAtYear = bookData.copyright_year
        const createdAt = createdAtYear
          ? new Date(`${createdAtYear}-01-01T00:00:00Z`).toISOString()
          : new Date().toISOString()

        const bookRecord: LocalBookRecord = {
          id: books.length + 1,
          isbn,
          print_isbn: isbn,
          title,
          author,
          coverImage,
          description,
          keywords,
          createdAt,
          contenttype: 'books'
        }

        books.push(bookRecord)
      } catch (error) {
        // Skip books with missing or invalid JSON files
        console.warn(`Failed to load book from ${dir}:`, error)
        continue
      }
    }

    return books.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  } catch {
    return []
  }
}