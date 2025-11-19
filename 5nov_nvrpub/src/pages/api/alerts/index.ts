import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { userid, email, alertname, alerttype, value } = req.body || {}
      if (!email) return res.status(400).json({ success: false, message: 'email is required' })
      await query(`
        CREATE TABLE IF NOT EXISTS alerts (
          id INT NOT NULL AUTO_INCREMENT,
          userid INT DEFAULT NULL,
          email VARCHAR(250) DEFAULT NULL,
          alertname VARCHAR(250) DEFAULT NULL,
          alerttype VARCHAR(250) DEFAULT NULL,
          value LONGTEXT,
          subscribed_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
          last_alert_datetime TIMESTAMP NULL DEFAULT NULL,
          PRIMARY KEY (id),
          UNIQUE KEY uniq_email_alertname (email, alertname)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `)
      try {
        await query(`ALTER TABLE alerts ADD UNIQUE KEY uniq_user_email_type (userid, email, alerttype)`)
      } catch {}
      const [result]: any = await query(
        `INSERT INTO alerts (userid, email, alertname, alerttype, value) VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE alerttype = VALUES(alerttype), value = VALUES(value)`,
        [userid ?? null, String(email), alertname ?? null, alerttype ?? null, String(value ?? '')]
      )
      return res.status(201).json({ success: true, id: (result.insertId || null) })
    }
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ success: false, message: e?.message || 'Server error' })
  }
}
