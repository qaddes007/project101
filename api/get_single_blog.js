// api/get_single_blog.js
// GET /api/get_single_blog?id=<id> — Returns a single blog post (public endpoint)
const { getDb } = require('./lib/db');

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const id = req.query.id;
    if (!id) {
        return res.status(400).json({ error: 'Missing id parameter' });
    }

    try {
        const sql = getDb();
        const rows = await sql`
            SELECT id, title, category, read_time AS "readTime", image, excerpt, content, created_at
            FROM blogs
            WHERE id = ${id}
            LIMIT 1
        `;

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        return res.status(200).json(rows[0]);
    } catch (err) {
        console.error('[get_single_blog] Error:', err.message);
        return res.status(500).json({ error: 'Database error' });
    }
};
