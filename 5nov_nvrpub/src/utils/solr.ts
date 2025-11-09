// Lightweight Solr client utilities
// Configuration via env: SOLR_HOST, SOLR_PORT, SOLR_CORE, SOLR_PROTOCOL
// Use CommonJS require due to module export shape of solr-client
// eslint-disable-next-line @typescript-eslint/no-var-requires
const solr = require('solr-client')

let _client: any = null

export function getSolrClient() {
  if (_client) return _client
  const host = process.env.SOLR_HOST || 'localhost'
  const port = Number(process.env.SOLR_PORT || 8983)
  const core = process.env.SOLR_CORE || 'jaypee'
  const protocol = process.env.SOLR_PROTOCOL || 'http'
  _client = solr.createClient({ host, port, core, protocol })
  _client.autoCommit = false
  return _client
}

export async function addDocuments(docs: any[]): Promise<void> {
  const client = getSolrClient()
  await new Promise<void>((resolve, reject) => {
    client.add(docs, (err: any, data: any) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

export async function commit(): Promise<void> {
  const client = getSolrClient()
  await new Promise<void>((resolve, reject) => {
    client.commit((err: any) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

export async function deleteByQuery(queryStr: string): Promise<void> {
  const client = getSolrClient()
  await new Promise<void>((resolve, reject) => {
    client.deleteByQuery(queryStr, (err: any) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

export async function search(q: string, opts: { start?: number; rows?: number; type?: string } = {}) {
  const client = getSolrClient()
  const query = client.query()
    .q(q || '*:*')
    .start(opts.start ?? 0)
    .rows(opts.rows ?? 25)

  if (opts.type && opts.type !== 'all') {
    query.matchFilter('type', opts.type)
  }

  return await new Promise<any>((resolve, reject) => {
    client.search(query, (err: any, result: any) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
