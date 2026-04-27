// api/contact.js
// POST /api/contact — Validates and sends contact form email via Resend
const { Resend } = require('resend');

module.exports = async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = req.body || {};

    // ── Input Sanitization ───────────────────────────────────────────────────
    const name    = String(body.name    || '').trim().replace(/<[^>]*>/g, '');
    const email   = String(body.email   || '').trim().toLowerCase();
    const subject = String(body.subject || 'General Inquiry').trim().replace(/<[^>]*>/g, '');
    const message = String(body.message || '').trim().replace(/<[^>]*>/g, '');

    // ── Validation ───────────────────────────────────────────────────────────
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (message.length < 10) {
        return res.status(400).json({ error: 'Message is too short. Please provide more detail.' });
    }

    // ── Send Email via Resend ─────────────────────────────────────────────────
    const RESEND_API_KEY  = process.env.RESEND_API_KEY;
    const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;

    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
        console.error('[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env variables.');
        return res.status(500).json({ error: 'Email service is not configured.' });
    }

    try {
        const resend = new Resend(RESEND_API_KEY);

        await resend.emails.send({
            from: 'BioBoost AI <onboarding@resend.dev>',
            to:   CONTACT_TO_EMAIL,
            reply_to: email,
            subject: `[BioBoost AI Contact] ${subject}`,
            text: [
                'New contact form submission from BioBoost AI',
                '─────────────────────────────────────────────',
                `Name:    ${name}`,
                `Email:   ${email}`,
                `Subject: ${subject}`,
                '',
                'Message:',
                message,
                '─────────────────────────────────────────────',
                'Sent via BioBoost AI Contact Form'
            ].join('\n'),
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #a78bfa;">New Contact Form Submission</h2>
                    <table style="width:100%; border-collapse:collapse;">
                        <tr><td style="padding:8px; font-weight:bold; color:#666;">Name</td><td style="padding:8px;">${escapeHtml(name)}</td></tr>
                        <tr style="background:#f9f9f9;"><td style="padding:8px; font-weight:bold; color:#666;">Email</td><td style="padding:8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
                        <tr><td style="padding:8px; font-weight:bold; color:#666;">Subject</td><td style="padding:8px;">${escapeHtml(subject)}</td></tr>
                        <tr style="background:#f9f9f9;"><td style="padding:8px; font-weight:bold; color:#666; vertical-align:top;">Message</td><td style="padding:8px;">${escapeHtml(message).replace(/\n/g, '<br>')}</td></tr>
                    </table>
                    <p style="color:#999; font-size:12px; margin-top:20px;">Sent via BioBoost AI contact form</p>
                </div>
            `
        });

        return res.status(200).json({ success: 'Thank you for your inquiry. We will get back to you soon.' });
    } catch (err) {
        console.error('[contact] Resend error:', err.message);
        return res.status(500).json({ error: 'Unable to send email. Please try again later.' });
    }
};

// Simple HTML escaper to prevent injection in email body
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
