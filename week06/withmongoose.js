const express = require('express');
const mongoose = require('mongoose');
const port = 4000;
const app = express();

const COUNTER_NOT_FOUND = 'COUNTER_NOT_FOUND';
const DATABASE_ERROR = 'DATABASE_ERROR';

mongoose.connect('mongodb://localhost:27017/counterDB', { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// A collection of counters
// Each counter has a distinct id, and the current count value
// (i.e., count increases by one with each call to POST /api/increment)
const Counter = mongoose.model('counter', {
    id: { type: Number, index: true },
    count: Number
});

// Initialize the database
// by ensuring that there is a primary counter (counter id 1)
async function initialize() {
    await Counter.updateOne(
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
        let result = await Counter.findOne(
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
// concurrent modification may also return a DATABASE_ERROR
app.post('/api/increment', async (_req, res) => {
    try {
        let result = await Counter.findOne(
            { id: 1}
        );
        if (result) {
            result.count++;
            // Increase the "version" of the record, to detect concurrent counter modifications
            result.increment();
            result.save();
            res.json({ count: result.count, success: true });
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
