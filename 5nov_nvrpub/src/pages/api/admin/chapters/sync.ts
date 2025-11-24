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
        const errors: string[] = []

        for (const dirName of directories) {
            try {
                const dirPath = path.join(booksDir, dirName)
                const files = fs.readdirSync(dirPath)
                const jsonFile = files.find(file => file.endsWith('.json'))

                if (!jsonFile) {
                    continue
                }

                const jsonPath = path.join(dirPath, jsonFile)
                const fileContent = fs.readFileSync(jsonPath, 'utf-8')
                const bookData = JSON.parse(fileContent)

                const isbn = bookData.print_isbn || bookData.electronic_isbn || dirName

                // Get book_id from DB
                const [bookResult] = await query<any[]>('SELECT id FROM books WHERE isbn = ?', [isbn])

                if (!bookResult || bookResult.length === 0) {
                    console.warn(`Book not found in DB for ISBN: ${isbn}`)
                    continue
                }

                const bookId = (bookResult[0] as any).id
                const chapters = bookData.chapters || []

                for (const chapter of chapters) {
                    // Skip if no chapter title (some might be empty placeholders)
                    if (!chapter['chapter-title']) continue

                    const chapterNumber = chapter['chapter-number'] || ''
                    const chapterTitle = chapter['chapter-title']
                    const sequenceNumber = chapter['chapter-sequence'] || 0
                    const doi = chapter['chapter-doi'] || ''
                    const firstPage = chapter['chapter-fpage'] || ''
                    const lastPage = chapter['chapter-lpage'] || ''
                    const keywords = chapter['chapter-keyword'] || ''
                    const description = chapter['chapter-abstract'] || ''
                    // Default access type
                    const accessType = 'Paid'

                    const [result] = await query<any>(
                        `INSERT INTO chapters (
                    book_id, book_isbn, chapter_number, sequence_number, chapter_title, doi,
                    first_page, last_page, access_type, keywords, description, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')
                ON DUPLICATE KEY UPDATE
                    sequence_number = VALUES(sequence_number),
                    chapter_title = VALUES(chapter_title),
                    doi = VALUES(doi),
                    first_page = VALUES(first_page),
                    last_page = VALUES(last_page),
                    keywords = VALUES(keywords),
                    description = VALUES(description),
                    status = 'Active',
                    updated_date = NOW()`,
                        [
                            bookId, isbn, chapterNumber, sequenceNumber, chapterTitle, doi,
                            firstPage, lastPage, accessType, keywords, description
                        ]
                    )

                    const affectedRows = (result as any).affectedRows
                    if (affectedRows === 1) addedCount++
                    else if (affectedRows === 2) updatedCount++
                }

                // Process Cases
                const cases = bookData.cases || []
                // Start sequence for cases after the last chapter sequence
                let caseSequenceStart = 1000
                if (chapters.length > 0) {
                    const lastChapterSeq = Math.max(...chapters.map((c: any) => parseInt(c['chapter-sequence']) || 0))
                    caseSequenceStart = lastChapterSeq + 100
                }

                for (let i = 0; i < cases.length; i++) {
                    const caseItem = cases[i]
                    if (!caseItem.case_title) continue

                    const chapterNumber = caseItem.case_id || `Case-${i + 1}`
                    const chapterTitle = caseItem.case_title
                    const sequenceNumber = caseSequenceStart + i
                    const doi = '' // Cases might not have DOI in this JSON structure
                    const firstPage = caseItem.fpage || ''
                    const lastPage = caseItem.lpage || ''
                    const keywords = caseItem.case_keywords || ''
                    const description = '' // No abstract/description for cases in JSON
                    const accessType = 'Paid'

                    const [result] = await query<any>(
                        `INSERT INTO chapters (
                            book_id, book_isbn, chapter_number, sequence_number, chapter_title, doi,
                            first_page, last_page, access_type, keywords, description, status
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')
                        ON DUPLICATE KEY UPDATE
                            sequence_number = VALUES(sequence_number),
                            chapter_title = VALUES(chapter_title),
                            doi = VALUES(doi),
                            first_page = VALUES(first_page),
                            last_page = VALUES(last_page),
                            keywords = VALUES(keywords),
                            description = VALUES(description),
                            status = 'Active',
                            updated_date = NOW()`,
                        [
                            bookId, isbn, chapterNumber, sequenceNumber, chapterTitle, doi,
                            firstPage, lastPage, accessType, keywords, description
                        ]
                    )

                    const affectedRows = (result as any).affectedRows
                    if (affectedRows === 1) addedCount++
                    else if (affectedRows === 2) updatedCount++
                }

            } catch (err: any) {
                console.error(`Error processing chapters for ${dirName}:`, err)
                errorCount++
                errors.push(`${dirName}: ${err.message}`)
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Chapters sync completed',
            stats: {
                added: addedCount,
                updated: updatedCount,
                errors: errorCount,
                errorDetails: errors
            }
        })

    } catch (error: any) {
        console.error('Chapters Sync Error:', error)
        return res.status(500).json({ success: false, message: error.message })
    }
}
