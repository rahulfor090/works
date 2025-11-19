import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method Not Allowed' })
    }

    const { email, frequency, categories, keywordAlerts, authorAlerts } = req.body || {}
    if (!email || !String(email).includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email is required' })
    }

    await query(`
      CREATE TABLE IF NOT EXISTS alert_category_subscriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        categoryId INT NOT NULL,
        frequency ENUM('Immediate','Daily','Weekly') DEFAULT 'Weekly',
        subscribed_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        last_alert_datetime TIMESTAMP NULL DEFAULT NULL,
        UNIQUE KEY uniq_email_category (email, categoryId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `)

    await query(`
      CREATE TABLE IF NOT EXISTS alert_term_subscriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        type ENUM('Keyword','Author') NOT NULL,
        term VARCHAR(255) NOT NULL,
        frequency ENUM('Immediate','Daily','Weekly') DEFAULT 'Weekly',
        subscribed_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        last_alert_datetime TIMESTAMP NULL DEFAULT NULL,
        UNIQUE KEY uniq_email_type_term (email, type, term)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `)

    const freq = ['Immediate','Daily','Weekly'].includes(frequency) ? frequency : 'Weekly'

    if (Array.isArray(categories)) {
      for (const id of categories) {
        await query(
          `INSERT INTO alert_category_subscriptions (email, categoryId, frequency, subscribed_date)
           VALUES (?, ?, ?, NOW())
           ON DUPLICATE KEY UPDATE frequency = VALUES(frequency)`,
          [email, Number(id), freq]
        )
      }
    }

    const upsertTerms = async (type: 'Keyword'|'Author', terms?: string[]) => {
      if (!Array.isArray(terms)) return
      for (const t of terms) {
        const term = String(t).trim()
        if (!term) continue
        await query(
          `INSERT INTO alert_term_subscriptions (email, type, term, frequency, subscribed_date)
           VALUES (?, ?, ?, ?, NOW())
           ON DUPLICATE KEY UPDATE frequency = VALUES(frequency)`,
          [email, type, term, freq]
        )
      }
    }

    await upsertTerms('Keyword', keywordAlerts)
    await upsertTerms('Author', authorAlerts)

    return res.status(200).json({ success: true })
  } catch (e: any) {
    return res.status(500).json({ success: false, message: e?.message || 'Server error' })
  }
}
