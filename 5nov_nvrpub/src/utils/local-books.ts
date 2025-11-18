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
    const bookDirs = dirents.filter(isDirectory).map((entry) => entry.name)

    const books: LocalBookRecord[] = []

    for (const dir of bookDirs) {
      const metadataPath = path.join(BOOKS_DIR, dir, 'metadata.json')
      try {
        const metadataRaw = await readFile(metadataPath, 'utf-8')
        const metadata = JSON.parse(metadataRaw) as BookMetadata
        const bookInfo = metadata?.Book
        if (!bookInfo) continue

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

        const coverCandidates = [
          path.join(BOOKS_DIR, dir, '3D_Cover', `${isbn}.png`),
          path.join(BOOKS_DIR, dir, '3D_Cover', `${dir}.png`)
        ]
        let coverImage = DEFAULT_COVER
        for (const candidate of coverCandidates) {
          if (await exists(candidate)) {
            coverImage = toPublicUrl(candidate)
            break
          }
        }

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

        const bookRecord: LocalBookRecord = {
          id: books.length + 1,
          isbn,
          print_isbn: printIsbn,
          title: bookInfo['Book-Title'] ?? `Book ${isbn}`,
          author,
          coverImage,
          description: bookInfo['Book-Abstract']?.trim() ?? '',
          keywords,
          createdAt,
          contenttype: 'books'
        }

        books.push(bookRecord)
      } catch {
        continue
      }
    }

    return books.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  } catch {
    return []
  }
}
