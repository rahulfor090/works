const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function syncBooks() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Smarth@2006',
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
    const processedIsbns = [];

    for (const dirName of directories) {
      try {
        const dirPath = path.join(booksDir, dirName);
        const files = fs.readdirSync(dirPath);
        const jsonFile = files.find(file => file.endsWith('.json'));

        if (!jsonFile) {
          console.warn(`No JSON file found in ${dirName}`);
          continue;
        }

        const jsonPath = path.join(dirPath, jsonFile);
        const fileContent = fs.readFileSync(jsonPath, 'utf-8');
        const bookData = JSON.parse(fileContent);

        const isbn = bookData.print_isbn || bookData.electronic_isbn || dirName;
        const title = bookData.book_title;
        
        if (!isbn || !title) {
           console.warn(`Missing ISBN or Title in ${dirName}`);
           continue;
        }

        processedIsbns.push(isbn);

        const subtitle = bookData.book_sub_title || '';
        const doi = bookData.book_doi || '';
        const edition = bookData.edition || '';
        const bookType = bookData['book-type'] || '';
        
        const [existing] = await connection.execute('SELECT id FROM books WHERE isbn = ?', [isbn]);
        const isUpdate = existing.length > 0;

        const categoryId = null;
        const subjectIds = '';
        const society = '';
        const accessType = 'Paid';
        const bookContentType = 'Book';
        const publishingYear = bookData.copyright_year || new Date().getFullYear();
        const publishStatus = 'Live'; // Using Live
        const noOfChapters = parseInt(bookData.total_chapter) || 0;
        const noOfPages = bookData['total-page'] || 0;
        const noOfVolumes = 0;
        const featured = false;
        const downloadEnable = false;
        const rating = 0;
        const coverImage = `/books/${dirName}/cover.jpg`;
        const overview = bookData.book_abstract || '';
        const supplementaryInfo = '';

        let cleanChapterCount = 0;
        if (typeof bookData.total_chapter === 'string') {
            const match = bookData.total_chapter.match(/(\d+)/);
            if (match) cleanChapterCount = parseInt(match[1]);
        } else if (typeof bookData.total_chapter === 'number') {
            cleanChapterCount = bookData.total_chapter;
        }

        await connection.execute(
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
        );

        if (isUpdate) updatedCount++;
        else addedCount++;
        console.log(`Processed ${dirName}: ${isUpdate ? 'Updated' : 'Added'}`);

      } catch (err) {
        console.error(`Error processing ${dirName}:`, err.message);
        errorCount++;
      }
    }

    // Handle deletions
    if (processedIsbns.length > 0) {
        const placeholders = processedIsbns.map(() => '?').join(',');
        
        const [deleteResult] = await connection.execute(
            `UPDATE books SET status = 'Deleted' 
             WHERE isbn NOT IN (${placeholders}) 
             AND status != 'Deleted'`,
            processedIsbns
        );
        console.log(`Deleted count: ${deleteResult.affectedRows}`);
    }

    console.log(`Sync completed. Added: ${addedCount}, Updated: ${updatedCount}, Errors: ${errorCount}`);

  } catch (error) {
    console.error('Sync Error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

syncBooks();
