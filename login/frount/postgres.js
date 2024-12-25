const { Pool } = require('pg');
// PostgreSQL configuration
const pool = new Pool({
    user: 'postgres',        // Your PostgreSQL username
    host: 'localhost',       // Hostname (use IP for remote)
    database: 'postgres',  // Database name
    password: '1234567890',  // Your PostgreSQL password
    port: 5432,              // PostgreSQL port
});
// Test the connection
pool.connect((err, client, release) => {
    if (err) 
    {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL');
    release(); // Release the client back to the pool
});

// Export the pool for use in other modules
module.exports = pool;