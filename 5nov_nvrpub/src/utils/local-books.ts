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

interface LegacyBookMetadata {
  print_isbn?: string
  book_title?: string
  book_author_name?: string
  book_abstract?: string
  book_keywords?: string
  copyright_year?: number
  'book-author'?: Array<{
    firstname?: string
    surname?: string
  }>
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
    const bookDirs = dirents.filter(isDirectory).map((entry) => entry.name)

    const books: LocalBookRecord[] = []

    for (const dir of bookDirs) {
      let bookRecord: LocalBookRecord | null = null

      // Try standard metadata.json
      const metadataPath = path.join(BOOKS_DIR, dir, 'metadata.json')
      if (await exists(metadataPath)) {
        try {
          const metadataRaw = await readFile(metadataPath, 'utf-8')
          const metadata = JSON.parse(metadataRaw) as BookMetadata
          const bookInfo = metadata?.Book
          if (bookInfo) {
            const isbn = (bookInfo['Print-ISBN'] ?? dir).toString().trim()
            const printIsbn = (bookInfo['Print-ISBN'] ?? isbn).toString().trim()
            const fallbackAuthor = [bookInfo['Author-1-First-Name'], bookInfo['Author-1-Last-Name']]
              .filter((part): part is string => typeof part === 'string' && part.trim().length > 0)
              .join(' ')
              .trim()
            const author =
              bookInfo['Book-Author-(Last-Name,-First-Name,-Middle-Name)'] ||
              fallbackAuthor ||
              'Editorial Team'

            const keywordsRaw = (bookInfo['Book-Keywords'] ?? '').toString()
            const keywords = keywordsRaw
              .split(',')
              .map((keyword) => keyword.trim())
              .filter((keyword) => keyword.length > 0)
              .join(', ')

            const createdAtYear = bookInfo['Copy-Right-Year-(Publish-Year)'] ?? bookInfo['Copy-right-year']
            const createdAt = createdAtYear
              ? new Date(`${createdAtYear}-01-01T00:00:00Z`).toISOString()
              : new Date().toISOString()

            bookRecord = {
              id: books.length + 1,
              isbn,
              print_isbn: printIsbn,
              title: bookInfo['Book-Title'] ?? `Book ${isbn}`,
              author,
              coverImage: DEFAULT_COVER, // Will be updated below
              description: bookInfo['Book-Abstract']?.trim() ?? '',
              keywords,
              createdAt,
              contenttype: 'books'
            }
          }
        } catch (e) {
          // Ignore error and try next method
        }
      }

      // Try legacy [isbn].json
      if (!bookRecord) {
        const legacyPath = path.join(BOOKS_DIR, dir, `${dir}.json`)
        if (await exists(legacyPath)) {
          try {
            const metadataRaw = await readFile(legacyPath, 'utf-8')
            const metadata = JSON.parse(metadataRaw) as LegacyBookMetadata

            const isbn = (metadata.print_isbn ?? dir).toString().trim()
            const author = metadata.book_author_name ||
              (metadata['book-author']?.[0] ? `${metadata['book-author'][0].firstname} ${metadata['book-author'][0].surname}` : 'Editorial Team')

            const createdAt = metadata.copyright_year
              ? new Date(`${metadata.copyright_year}-01-01T00:00:00Z`).toISOString()
              : new Date().toISOString()

            bookRecord = {
              id: books.length + 1,
              isbn,
              print_isbn: isbn,
              title: metadata.book_title ?? `Book ${isbn}`,
              author,
              coverImage: DEFAULT_COVER, // Will be updated below
              description: metadata.book_abstract?.trim() ?? '',
              keywords: metadata.book_keywords,
              createdAt,
              contenttype: 'books'
            }
          } catch (e) {
            // Ignore error
          }
        }
      }

      if (bookRecord) {
        // Resolve cover image
        const coverCandidates = [
          path.join(BOOKS_DIR, dir, '3D_Cover', `${bookRecord.isbn}.png`),
          path.join(BOOKS_DIR, dir, '3D_Cover', `${dir}.png`),
          path.join(BOOKS_DIR, dir, `${dir}.png`) // Added support for root level image
        ]

        for (const candidate of coverCandidates) {
          if (await exists(candidate)) {
            bookRecord.coverImage = toPublicUrl(candidate)
            break
          }
        }

        books.push(bookRecord)
      }
    }

    return books.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  } catch {
    return []
  }
}
