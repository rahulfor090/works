import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method Not Allowed' })
    }

    const { subjectcategoryId, contentTitle, contentUrl } = req.body || {}
    if (!subjectcategoryId) return res.status(400).json({ success: false, message: 'subjectcategoryId is required' })

    const [rows]: any = await query(
      `SELECT email FROM alert_category_subscriptions WHERE categoryId = ?`,
      [Number(subjectcategoryId)]
    )
    const emails: string[] = (rows || []).map((r: any) => r.email).filter(Boolean)

    if (!emails.length) {
      return res.status(200).json({ success: true, message: 'No subscribers for category' })
    }

    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 0)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

    if (host && port && user && pass) {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.createTransport({ host, port, auth: { user, pass } })

      const info = await transporter.sendMail({
        from: `Jaypee Digital Alerts <${user}>`,
        bcc: emails,
        subject: `New content in your category: ${contentTitle ?? 'Update'}`,
        html: `
          <p>New content has been added to your subscribed category.</p>
          ${contentTitle ? `<p><strong>${contentTitle}</strong></p>` : ''}
          ${contentUrl ? `<p><a href="${contentUrl}">View content</a></p>` : ''}
        `,
      })

      await query(
        `UPDATE alert_category_subscriptions SET last_alert_datetime = NOW() WHERE categoryId = ?`,
        [Number(subjectcategoryId)]
      )

      return res.status(200).json({ success: true, message: 'Emails sent', meta: { messageId: info.messageId } })
    } else {
      await query(
        `UPDATE alert_category_subscriptions SET last_alert_datetime = NOW() WHERE categoryId = ?`,
        [Number(subjectcategoryId)]
      )
      return res.status(200).json({ success: true, message: 'SMTP not configured; updated last alert timestamp' })
    }
  } catch (e: any) {
    return res.status(500).json({ success: false, message: e?.message || 'Server error' })
  }
}
