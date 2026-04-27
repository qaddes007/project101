// api/login.js
// POST /api/login — Admin authentication, returns signed JWT token
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body || {};

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Admin username is fixed; password hash is stored in env var for security
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!ADMIN_PASSWORD_HASH || !JWT_SECRET) {
        console.error('[login] Missing ADMIN_PASSWORD_HASH or JWT_SECRET env variables.');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const usernameMatch = username === ADMIN_USERNAME;
        const passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

        if (!usernameMatch || !passwordMatch) {
            // Same error message for both — avoid username enumeration
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Sign a JWT valid for 8 hours
        const token = jwt.sign(
            { admin: true, user: ADMIN_USERNAME },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        return res.status(200).json({ success: true, token });
    } catch (err) {
        console.error('[login] Error:', err.message);
        return res.status(500).json({ error: 'Authentication error' });
    }
};
