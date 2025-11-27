const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function syncChapters() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'anshpandey@18072006',
      database: 'jaypeedigi'
    });

    console.log('Connected to database');

    const booksDir = path.join(process.cwd(), 'public', 'books');
    
    if (!fs.existsSync(booksDir)) {
      console.error('Books directory not found');
      return;
    }

    const directories = fs.readdirSync(booksDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    let addedCount = 0;
    let updatedCount = 0;
    let errorCount = 0;

    for (const dirName of directories) {
      try {
        const dirPath = path.join(booksDir, dirName);
        const files = fs.readdirSync(dirPath);
        const jsonFile = files.find(file => file.endsWith('.json'));

        if (!jsonFile) {
          continue;
        }

        const jsonPath = path.join(dirPath, jsonFile);
        const fileContent = fs.readFileSync(jsonPath, 'utf-8');
        const bookData = JSON.parse(fileContent);

        const isbn = bookData.print_isbn || bookData.electronic_isbn || dirName;
        
        // Get book_id from DB
        const [bookResult] = await connection.execute('SELECT id FROM books WHERE isbn = ?', [isbn]);
        
        if (!bookResult || bookResult.length === 0) {
            console.warn(`Book not found in DB for ISBN: ${isbn}`);
            continue;
        }
        
        const bookId = bookResult[0].id;
        const chapters = bookData.chapters || [];

        console.log(`Processing ${chapters.length} chapters for book ${isbn}`);

        for (const chapter of chapters) {
            if (!chapter['chapter-title']) continue;

            const chapterNumber = chapter['chapter-number'] || '';
            const chapterTitle = chapter['chapter-title'];
            const sequenceNumber = chapter['chapter-sequence'] || 0;
            const doi = chapter['chapter-doi'] || '';
            const firstPage = chapter['chapter-fpage'] || '';
            const lastPage = chapter['chapter-lpage'] || '';
            const keywords = chapter['chapter-keyword'] || '';
            const description = chapter['chapter-abstract'] || '';
            const pdfUrl = chapter['chapter-pdf'] || '';
            const accessType = 'Paid';

            const [result] = await connection.execute(
                `INSERT INTO chapters (
                    book_id, book_isbn, chapter_number, sequence_number, chapter_title, doi,
                    first_page, last_page, access_type, keywords, description, pdf_url, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')
                ON DUPLICATE KEY UPDATE
                    sequence_number = VALUES(sequence_number),
                    chapter_title = VALUES(chapter_title),
                    doi = VALUES(doi),
                    first_page = VALUES(first_page),
                    last_page = VALUES(last_page),
                    keywords = VALUES(keywords),
                    description = VALUES(description),
                    pdf_url = VALUES(pdf_url),
                    status = 'Active',
                    updated_date = NOW()`,
                [
                    bookId, isbn, chapterNumber, sequenceNumber, chapterTitle, doi,
                    firstPage, lastPage, accessType, keywords, description, pdfUrl
                ]
            );

            if (result.affectedRows === 1) addedCount++;
            else if (result.affectedRows === 2) updatedCount++;
        }

        // Process Cases
        const cases = bookData.cases || [];
        console.log(`Processing ${cases.length} cases for book ${isbn}`);
        
        let caseSequenceStart = 1000;
        if (chapters.length > 0) {
             const lastChapterSeq = Math.max(...chapters.map(c => parseInt(c['chapter-sequence']) || 0));
             caseSequenceStart = lastChapterSeq + 100;
        }

        for (let i = 0; i < cases.length; i++) {
            const caseItem = cases[i];
            if (!caseItem.case_title) continue;

            const chapterNumber = caseItem.case_id || `Case-${i+1}`;
            const chapterTitle = caseItem.case_title;
            const sequenceNumber = caseSequenceStart + i;
            const doi = '';
            const firstPage = caseItem.fpage || '';
            const lastPage = caseItem.lpage || '';
            const keywords = caseItem.case_keywords || '';
            const description = '';
            const pdfUrl = '';
            const accessType = 'Paid';

            const [result] = await connection.execute(
                `INSERT INTO chapters (
                    book_id, book_isbn, chapter_number, sequence_number, chapter_title, doi,
                    first_page, last_page, access_type, keywords, description, pdf_url, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')
                ON DUPLICATE KEY UPDATE
                    sequence_number = VALUES(sequence_number),
                    chapter_title = VALUES(chapter_title),
                    doi = VALUES(doi),
                    first_page = VALUES(first_page),
                    last_page = VALUES(last_page),
                    keywords = VALUES(keywords),
                    description = VALUES(description),
                    pdf_url = VALUES(pdf_url),
                    status = 'Active',
                    updated_date = NOW()`,
                [
                    bookId, isbn, chapterNumber, sequenceNumber, chapterTitle, doi,
                    firstPage, lastPage, accessType, keywords, description, pdfUrl
                ]
            );

            if (result.affectedRows === 1) addedCount++;
            else if (result.affectedRows === 2) updatedCount++;
        }

      } catch (err) {
        console.error(`Error processing chapters for ${dirName}:`, err.message);
        errorCount++;
      }
    }

    console.log(`Chapters Sync completed. Added: ${addedCount}, Updated: ${updatedCount}, Errors: ${errorCount}`);

  } catch (error) {
    console.error('Chapters Sync Error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

syncChapters();
