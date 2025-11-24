import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'
import fs from 'fs'
import path from 'path'
import { ResultSetHeader } from 'mysql2'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET' && req.method !== 'POST') {
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` })
    }

    try {
        const booksDir = path.join(process.cwd(), 'public', 'books')

        if (!fs.existsSync(booksDir)) {
            return res.status(404).json({ success: false, message: 'Books directory not found' })
        }

        const directories = fs.readdirSync(booksDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)

        let addedCount = 0
        let updatedCount = 0
        let errorCount = 0
        const processedIsbns: string[] = []
        const errors: string[] = []

        for (const dirName of directories) {
            try {
                const dirPath = path.join(booksDir, dirName)
                const files = fs.readdirSync(dirPath)
                const jsonFile = files.find(file => file.endsWith('.json'))

                if (!jsonFile) {
                    console.warn(`No JSON file found in ${dirName}`)
                    continue
                }

                const jsonPath = path.join(dirPath, jsonFile)
                const fileContent = fs.readFileSync(jsonPath, 'utf-8')
                const bookData = JSON.parse(fileContent)

                // Extract fields based on the JSON structure we saw
                const isbn = bookData.print_isbn || bookData.electronic_isbn || dirName
                const title = bookData.book_title

                if (!isbn || !title) {
                    console.warn(`Missing ISBN or Title in ${dirName}`)
                    continue
                }

                processedIsbns.push(isbn)

                // Map JSON fields to DB columns
                const subtitle = bookData.book_sub_title || ''
                const doi = bookData.book_doi || ''
                const edition = bookData.edition || ''
                const bookType = bookData['book-type'] || ''

                // Check if book exists to decide if we increment added or updated
                const [existing] = await query<any[]>('SELECT id FROM books WHERE isbn = ?', [isbn])
                const isUpdate = existing.length > 0

                // Prepare values
                const categoryId = null
                const subjectIds = ''
                const society = ''
                const accessType = 'Paid'
                const bookContentType = 'Book'
                const publishingYear = bookData.copyright_year || new Date().getFullYear()
                const publishStatus = 'Live'
                const noOfChapters = parseInt(bookData.total_chapter) || 0
                const noOfPages = bookData['total-page'] || 0
                const noOfVolumes = 0
                const featured = false
                const downloadEnable = false
                const rating = 0
                const coverImage = `/books/${dirName}/cover.jpg`
                const overview = bookData.book_abstract || ''
                const supplementaryInfo = ''

                // Clean up chapter count string if needed
                let cleanChapterCount = 0
                if (typeof bookData.total_chapter === 'string') {
                    const match = bookData.total_chapter.match(/(\d+)/)
                    if (match) cleanChapterCount = parseInt(match[1])
                } else if (typeof bookData.total_chapter === 'number') {
                    cleanChapterCount = bookData.total_chapter
                }

                await query(
                    `INSERT INTO books (
            isbn, book_title, book_subtitle, doi, category_id, subject_ids, society, access_type, book_content_type,
            edition, book_type, book_bisac, publishing_year, publish_status,
            no_of_chapters, no_of_pages, no_of_volumes, featured, download_enable,
            rating, book_cover_image, book_overview, supplementary_information, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')
          ON DUPLICATE KEY UPDATE
            book_title = VALUES(book_title),
            book_subtitle = VALUES(book_subtitle),
            doi = VALUES(doi),
            edition = VALUES(edition),
            book_type = VALUES(book_type),
            publishing_year = VALUES(publishing_year),
            no_of_chapters = VALUES(no_of_chapters),
            no_of_pages = VALUES(no_of_pages),
            book_overview = VALUES(book_overview),
            status = 'Active',
            updated_date = NOW()`,
                    [
                        isbn, title, subtitle, doi, categoryId, subjectIds, society, accessType, bookContentType,
                        edition, bookType, '', publishingYear, publishStatus,
                        cleanChapterCount, noOfPages, noOfVolumes, featured, downloadEnable,
                        rating, coverImage, overview, supplementaryInfo
                    ]
                )

                if (isUpdate) updatedCount++
                else addedCount++

            } catch (err: any) {
                console.error(`Error processing ${dirName}:`, err)
                errorCount++
                errors.push(`${dirName}: ${err.message}`)
            }
        }

        // Handle deletions
        let deletedCount = 0
        if (processedIsbns.length > 0) {
            const placeholders = processedIsbns.map(() => '?').join(',')

            const [deleteResult] = await query<ResultSetHeader>(
                `UPDATE books SET status = 'Deleted' 
             WHERE isbn NOT IN (${placeholders}) 
             AND status != 'Deleted'`,
                processedIsbns
            )
            // Fix for lint error: cast to unknown then ResultSetHeader to access affectedRows
            deletedCount = (deleteResult as unknown as ResultSetHeader).affectedRows
        }

        return res.status(200).json({
            success: true,
            message: 'Sync completed',
            stats: {
                added: addedCount,
                updated: updatedCount,
                deleted: deletedCount,
                errors: errorCount,
                errorDetails: errors
            }
        })

    } catch (error: any) {
        console.error('Sync Error:', error)
        return res.status(500).json({ success: false, message: error.message })
    }
}
