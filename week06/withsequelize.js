const express = require('express');
const Sequelize = require('sequelize');
const port = 4000;
const app = express();

const COUNTER_NOT_FOUND = 'COUNTER_NOT_FOUND';
const DATABASE_ERROR = 'DATABASE_ERROR';

const sequelize = new Sequelize(
    'postgres',
    null,
    null,
    {dialect: 'postgres', host: 'localhost'}
);

// A table of counters
// Each counter has a distinct id, and the current count value
// (i.e., count increases by one with each call to POST /api/increment)
const Counter = sequelize.define('counter', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    count: Sequelize.INTEGER
});

// Initialize the database connection
// by ensuring the counter table is declared
// and there is a primary counter (counter id 1)
async function initialize() {
    // Ensure the counter table is defined
    await sequelize.sync();

    // Add the primary counter if one does not already exist
    await Counter.findOrCreate({
        where: {
            id: 1
        },
        defaults: {
            id: 1,
            count: 0
        }
    });
}

// Retreive the current value of the primary counter (counter id 1)
// { success: true, count: ... } on success
// { success: false, error: ... } on error, with either a COUNTER_NOT_FOUND error or a DATABASE_ERROR
app.get('/api/count', async (_req, res) => {
    try {
        let result = await Counter.findByPk(1);
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
        let result = await Counter.findByPk(1);
        if (result) {
            result.count++;
            await result.save();
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
