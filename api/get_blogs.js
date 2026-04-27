// api/get_blogs.js
// GET /api/get_blogs — Returns all blog posts (public endpoint)
const { getDb } = require('./lib/db');

module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const sql = getDb();
        const blogs = await sql`
            SELECT id, title, category, read_time AS "readTime", image, excerpt, created_at
            FROM blogs
            ORDER BY created_at DESC
        `;
        return res.status(200).json(blogs);
    } catch (err) {
        console.error('[get_blogs] Error:', err.message);
        return res.status(500).json({ error: 'Failed to fetch blogs' });
    }
};
