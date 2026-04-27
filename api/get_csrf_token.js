// api/get_csrf_token.js
// GET /api/get_csrf_token — Returns CSRF token for the session (JWT-verified)
// Note: With JWT auth (Authorization header), CSRF attacks are not possible.
// This endpoint exists for backward compatibility with the admin panel.
const jwt = require('jsonwebtoken');

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

module.exports = async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');

    const decoded = verifyAdmin(req);
    if (!decoded) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Return a CSRF token derived from the JWT for backward compatibility
    // In production with JWT auth, this is not security-critical
    const csrfToken = Buffer.from(decoded.user + Date.now()).toString('base64');
    return res.status(200).json({ csrf_token: csrfToken });
};
