const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
app.use(bodyParser.json());

// ------------------------------------------------
// Database connection and initialization
// ------------------------------------------------

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

// connect() MUST be fulfilled prior to using db
let db = null;

async function connect() {
    let client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    db = client.db('mappingDB');
}

// Create schema and initialize a lookup map with a random key-value mapping
async function initialize() {
    let count = await db.collection('lookupMap').countDocuments({});
    if (count !== 10000) {
        console.log('Clearing lookupMap');
        await db.collection('lookupMap').insertOne({}); // Create one to ensure that .drop() won't fail
        await db.collection('lookupMap').drop();        // Remove existing values

        // Add 10,000 random mappings
        console.log('Inserting 10,000 documents into mappings collection');
        let lastMessage = Date.now();
        for (let key=0; key<10000; key++) {
            let randomValue = Math.floor(Math.random() * 10000);
            await db.collection('lookupMap').insertOne({
                key, value: randomValue
            });
            if (Date.now() - lastMessage > 1000) {
                console.log(key, 'documents processed');
                lastMessage = Date.now();
            }
        }
        console.log('Inserts complete');
        console.log('Database is ready');
    }
}

// ------------------------------------------------
// Public API
// ------------------------------------------------

// Helper to perform a lookup of the lookup mapping table by key
async function getMapping(key) {
    let result = await db.collection('lookupMap').findOne({key});
    if (result)
        return result.value;
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

connect()
.then(() => initialize())
.then(() =>
    app.listen(
        port, 
        () => console.log(`The API is ready on http://localhost:${port}/api/`)
    )
);
