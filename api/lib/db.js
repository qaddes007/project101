// api/lib/db.js
// Shared Neon PostgreSQL connection for all serverless functions
const { neon } = require('@neondatabase/serverless');

/**
 * Returns a tagged-template Neon SQL client.
 * Usage: const sql = getDb(); const rows = await sql`SELECT * FROM blogs`;
 */
function getDb() {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set.');
    }
    return neon(process.env.DATABASE_URL);
}

module.exports = { getDb };
