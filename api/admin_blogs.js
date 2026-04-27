// api/admin_blogs.js
// POST /api/admin_blogs — Create or Update a blog post (JWT protected)
// DELETE /api/admin_blogs — Delete a blog post (JWT protected)
const jwt = require('jsonwebtoken');
const { getDb } = require('./lib/db');

// ── Auth Helper ──────────────────────────────────────────────────────────────
function verifyAdmin(req) {
    const authHeader = req.headers['authorization'] || '';
    if (!authHeader.startsWith('Bearer ')) return null;
    const token = authHeader.slice(7);
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
}

// ── Handler ──────────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');

    // CORS preflight
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
        return res.status(200).end();
    }

    // Verify JWT for all state-changing requests
    const decoded = verifyAdmin(req);
    if (!decoded) {
        return res.status(401).json({ error: 'Unauthorized: invalid or missing token' });
    }

    const sql = getDb();

    // ── POST: Create or Update ────────────────────────────────────────────────
    if (req.method === 'POST') {
        const body = req.body || {};
        const id = body.id || ('post-' + Date.now().toString(36));
        const title    = String(body.title    || '').trim();
        const category = String(body.category || '').trim();
        const readTime = parseInt(body.readTime || body.read_time || 0);
        const image    = String(body.image    || '').trim();
        const excerpt  = String(body.excerpt  || '').trim();
        const content  = String(body.content  || '').trim();

        if (!title || !category || !excerpt) {
            return res.status(400).json({ error: 'Title, category, and excerpt are required' });
        }

        try {
            // Check if post already exists
            const existing = await sql`SELECT id FROM blogs WHERE id = ${id}`;

            if (existing.length > 0) {
                // Update
                await sql`
                    UPDATE blogs
                    SET title = ${title}, category = ${category}, read_time = ${readTime},
                        image = ${image}, excerpt = ${excerpt}, content = ${content}
                    WHERE id = ${id}
                `;
            } else {
                // Insert
                await sql`
                    INSERT INTO blogs (id, title, category, read_time, image, excerpt, content)
                    VALUES (${id}, ${title}, ${category}, ${readTime}, ${image}, ${excerpt}, ${content})
                `;
            }

            return res.status(200).json({ success: true, id });
        } catch (err) {
            console.error('[admin_blogs POST] Error:', err.message);
            return res.status(500).json({ error: 'Database operation failed' });
        }
    }

    // ── DELETE: Remove a post ─────────────────────────────────────────────────
    if (req.method === 'DELETE') {
        const body = req.body || {};
        const id = String(body.id || '').trim();

        if (!id) {
            return res.status(400).json({ error: 'Missing post ID' });
        }

        try {
            await sql`DELETE FROM blogs WHERE id = ${id}`;
            return res.status(200).json({ success: true });
        } catch (err) {
            console.error('[admin_blogs DELETE] Error:', err.message);
            return res.status(500).json({ error: 'Database operation failed' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
