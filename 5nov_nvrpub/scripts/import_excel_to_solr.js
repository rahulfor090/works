// Import book metadata from an Excel .xls file into Solr
// Usage: npm run import:book9788184484175

const path = require('path')
const fs = require('fs')
const xlsx = require('xlsx')
const solr = require('solr-client')

function getSolrClient() {
  const host = process.env.SOLR_HOST || 'localhost'
  const port = Number(process.env.SOLR_PORT || 8983)
  const core = process.env.SOLR_CORE || 'jaypee'
  const protocol = process.env.SOLR_PROTOCOL || 'http'
  const client = solr.createClient({ host, port, core, protocol })
  client.autoCommit = false
  return client
}

function normalizeField(name) {
  if (!name || typeof name !== 'string') return name
  return name
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .toLowerCase()
}

async function run() {
  // Source Excel file path specified by the user
  const excelPath = path.join(
    process.cwd(),
    'public',
    'books',
    '9788184484175',
    'Metadata',
    'Metadata Sheet-title_8_titles.xlsx'
  )

  if (!fs.existsSync(excelPath)) {
    console.error('Excel file not found:', excelPath)
    process.exit(1)
  }

  console.log('Reading Excel:', excelPath)
  const wb = xlsx.readFile(excelPath)
  const sheetName = wb.SheetNames[0]
  if (!sheetName) {
    console.error('No sheets found in Excel file')
    process.exit(1)
  }

  const sheet = wb.Sheets[sheetName]
  const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' })
  console.log(`Parsed ${rows.length} row(s) from sheet: ${sheetName}`)

  // Prepare Solr docs
  const isbn = '9788184484175'
  const docs = rows.map((row, idx) => {
    const doc = {
      id: `book-${isbn}-row-${idx + 1}`,
      type: 'book',
      isbn,
    }
    for (const [key, value] of Object.entries(row)) {
      const field = normalizeField(key)
      if (!field) continue
      doc[field] = value
    }
    return doc
  })

  if (docs.length === 0) {
    console.warn('No rows to index; exiting early')
    return
  }

  const client = getSolrClient()
  console.log(`Indexing ${docs.length} document(s) into Solr core '${client.options.core}' in batches...`)

  const batchSize = 50
  for (let i = 0; i < docs.length; i += batchSize) {
    const batch = docs.slice(i, i + batchSize)
    console.log(`Adding batch ${i / batchSize + 1} (${batch.length} docs) ...`)
    try {
      await new Promise((resolve, reject) => {
        client.add(batch, (err, data) => {
          if (err) return reject(err)
          resolve(data)
        })
      })
      await new Promise((resolve, reject) => {
        client.commit((err) => {
          if (err) return reject(err)
          resolve(null)
        })
      })
      console.log(`Batch ${i / batchSize + 1} committed.`)
    } catch (err) {
      console.error('Error indexing batch:', err?.message || err)
      process.exit(1)
    }
  }
  
  console.log('Done.')
}

run()
