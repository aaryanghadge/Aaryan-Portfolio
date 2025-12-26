// Some dev environments (editor/TS) may not have the optional packages installed.
// Use ts-ignore so the editor doesn't raise "Cannot find module" until you install deps.
// @ts-ignore
import nodemailer from 'nodemailer';
// @ts-ignore
import sgMail from '@sendgrid/mail';
// @ts-ignore
import { createClient } from '@supabase/supabase-js';

// NOTE: This file is intended to be deployed as a serverless function (Vercel, Netlify functions, etc.).
// Environment variables required:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL, FROM_EMAIL (optional)

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, email, phone, message, website } = req.body || {};

    // Honeypot check - if filled, treat as spam (return success to avoid tipping off bots)
    if (website) {
      console.warn('Honeypot triggered, ignoring submission');
      res.status(200).json({ ok: true });
      return;
    }

    if (!name || !email || !message) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const sendgridKey = process.env.SENDGRID_API_KEY;
    const to = process.env.TO_EMAIL;
    const from = process.env.FROM_EMAIL || process.env.SMTP_USER || `no-reply@${process.env.VERCEL_URL || 'example.com'}`;

    const mailText = `New contact form submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\n\nMessage:\n${message}\n\nSent from: ${req.headers['user-agent'] || 'unknown'}`;

    // If Supabase is configured, save the message first
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
        await supabase.from('messages').insert([{ name, email, phone: phone || null, message }]);
      } catch (dbErr) {
        console.error('Supabase insert error', dbErr);
        // continue — we still attempt to send email if configured
      }
    }

    // Prefer SendGrid if API key present
    if (sendgridKey) {
      try {
        sgMail.setApiKey(sendgridKey);
        const msg: any = {
          to,
          from,
          subject: `Portfolio contact form — ${name}`,
          text: mailText,
          html: `<pre style="font-family:inherit;white-space:pre-wrap">${mailText}</pre>`,
        };
        await sgMail.send(msg);
        res.status(200).json({ ok: true });
        return;
      } catch (sgErr) {
        console.error('SendGrid send error, falling back to SMTP', sgErr);
        // continue to SMTP fallback
      }
    }

    // SMTP fallback using Nodemailer
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass || !to) {
      console.error('Missing email configuration:', { host, user, to });
      res.status(500).json({ error: 'Email not configured' });
      return;
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: from,
      to,
      subject: `Portfolio contact form — ${name}`,
      text: mailText,
      html: `<pre style="font-family:inherit;white-space:pre-wrap">${mailText}</pre>`,
    });

    res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('Error sending email', err);
    // In local development you can enable DEBUG_EMAIL=true to return error details
    if (process.env.DEBUG_EMAIL === 'true') {
      res.status(500).json({ error: 'Failed to send email', details: err?.message || String(err) });
    } else {
      res.status(500).json({ error: 'Failed to send email' });
    }
  }
}
