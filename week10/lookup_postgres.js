const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
app.use(bodyParser.json());

// ------------------------------------------------
// Database connection and initialization
// ------------------------------------------------

// Establish connection to PostgreSQL database
const { Pool } = require('pg');
const pool = new Pool({
    database: 'postgres'
});

// Create schema and initialize a lookup map with a random key-value mapping
async function initialize() {
    // Define lookup_map table
    await pool.query(
        `create table if not exists lookup_map(
            key numeric,
            value numeric
        )`
    );

    // Clear the table and populate if it does not have 10,000 rows
    let length = await pool.query('select count(*) as count from lookup_map');
    if (length && length.rowCount === 1 && length.rows[0].count != 10000) {
        console.log('Clearing lookup_map');
        await pool.query('delete from lookup_map')

        // Add 10,000 random mappings
        console.log('Inserting 10,000 rows into lookup_map table');
        let lastMessage = Date.now();
        for (let key=0; key<10000; key++) {
            let randomValue = Math.floor(Math.random() * 10000);
            await pool.query({
                text: 'insert into lookup_map (key, value) values ($1, $2)', 
                values: [key, randomValue]
            });
            if (Date.now() - lastMessage > 1000) {
                console.log(key, 'rows processed');
                lastMessage = Date.now();
            }
        }
        console.log('Inserts complete, now analyzing table');

        // Clean and analyze the Postgres table
        await pool.query(
            `vacuum analyze lookup_map`
        );

        console.log('Database is ready');
    }
}

// ------------------------------------------------
// Public API
// ------------------------------------------------

// Helper to perform a lookup of the lookup mapping table by key
async function getMapping(key) {
    let result = await pool.query({
        text: 'select value from lookup_map where key = $1',
        values: [key]
    });
    if (result && result.rowCount === 1)
        return result.rows[0].value;
    else
        throw new Error('Key not found in database');
}

// GET /api/random, returns the mapping of a randomly generated key
app.get('/api/random', async (req, res) => {
    // Generate an insecure random number 0-9999.
    let key = Math.floor(Math.random() * 10000);
    let value = await getMapping(key);
    res.json({ key, value });
});

// ------------------------------------------------
// Start serving
// ------------------------------------------------

initialize().then(() =>
    app.listen(
        port, 
        () => console.log(`The API is ready on http://localhost:${port}/api/`)
    )
);
