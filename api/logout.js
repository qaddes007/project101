// api/logout.js
// POST /api/logout — Client-side logout (JWT is stateless; client deletes token from localStorage)
module.exports = async function handler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    // Nothing to invalidate server-side for JWT (stateless auth)
    // The client will remove the token from localStorage
    return res.status(200).json({ success: true });
};
