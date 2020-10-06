const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
app.use(bodyParser.json());

// ------------------------------------------------
// Database connection and initialization
// ------------------------------------------------

// In this version, we're just using an "in-memory" database
let lookupMap = {};

// Create schema and initialize a lookup map with a random key-value mapping
function initialize() {
    for (let key=0; key<10000; key++) {
        let randomValue = Math.floor(Math.random() * 10000);
        lookupMap[key] = randomValue;
    }
}

// ------------------------------------------------
// Public API
// ------------------------------------------------

// Helper to perform a lookup of the lookup mapping table by key
function getMapping(key) {
    let value = lookupMap[key];
    if (value !== undefined)
        return value;
    else
        throw new Error('Key not found in database');
}

// GET /api/random, returns the mapping of a randomly generated key
app.get('/api/random', async (req, res) => {
    // Generate an insecure random number 0-9999.
    let key = Math.floor(Math.random() * 10000);
    let value = getMapping(key);
    res.json({ key, value });
});

// ------------------------------------------------
// Start serving
// ------------------------------------------------

initialize();

app.listen(
    port, 
    () => console.log(`The API is ready on http://localhost:${port}/api/`)
);