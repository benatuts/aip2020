const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const port = 4000;
const app = express();

const COUNTER_NOT_FOUND = 'COUNTER_NOT_FOUND';
const DATABASE_ERROR = 'DATABASE_ERROR';

let db = null;
const url = 'mongodb://localhost:27017';

// Initialize the database connection
// and ensure that there is a primary counter (counter id 1)
async function initialize() {
    // Connect to the database
    let client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    db = client.db('counterDB');

    // Ensure that the database contains a primary counter on each start
    await db.collection('counters').updateOne(
        { id: 1 }, 
        { $setOnInsert: { id: 1, count: 0 }}, 
        { upsert: true }
    );
}


// Retreive the current value of the primary counter (counter id 1)
// { success: true, count: ... } on success
// { success: false, error: ... } on error, with either a COUNTER_NOT_FOUND error or a DATABASE_ERROR
app.get('/api/count', async (_req, res) => {
    try {
        let result = await db.collection('counters').findOne(
            { id: 1 }
        );
        if (result) {
            res.json({ count: result.count, success: true });
        } else {
            res.json({ success: false, error: COUNTER_NOT_FOUND });
        }
    } catch (e) {
        console.error(e);
        res.json({ success: false, error: DATABASE_ERROR });
    }
});

// Increments and returns the current value of the primary counter (counter id 1)
// { success: true, count: ... } on success
// { success: false, error: ... } on error, with either a COUNTER_NOT_FOUND error or a DATABASE_ERROR
app.post('/api/increment', async (_req, res) => {
    try {
        let result = await db.collection('counters').findOneAndUpdate(
            { id: 1}, 
            { $inc: { count: 1}},
            { returnOriginal: false }
        );
        if (result.value) {
            res.json({ count: result.value.count, success: true });
        } else {
            res.json({ success: false, error: COUNTER_NOT_FOUND });
        }
    } catch (e) {
        console.error(e);
        res.json({ success: false, error: DATABASE_ERROR });
    }
});

// Initialize and start the server
async function start() {
    await initialize();
    app.listen(port, () => {
        console.log(`API available at http://localhost:${port}/api`);
    });
}

start();
