const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const delay = require('delay');
const process = require('process');

const port = 3000;
const app = express();
app.use(bodyParser.json());

// The administrator's hashed password
const ADMIN_PASSWORD = bcrypt.hashSync('password', 12);

// Get a monotonic time, in seconds, relative to an arbitrary time in the past
function getSeconds() {
    const [ seconds, nanoseconds ] = process.hrtime();
    return seconds + nanoseconds / 1000000000;
}

// ------------------------------------------------
// Public API
// ------------------------------------------------

// A simple aliveness/health check
app.get('/api/ping', (_req, res) => {
    res.json({ result: "pong" });
});

// An aliveness check that takes 0.2 seconds
app.get('/api/slow1', (_req, res) => {
    let start = getSeconds();

    console.log(start);
    let elapsed = 0;
    do {
        elapsed = getSeconds() - start;
    } while (elapsed < 0.200);

    res.json({ success: true });
});

// Another aliveness check that takes 0.2 seconds
app.get('/api/slow2', async (_req, res) => {
    await delay(200);
    res.json({ success: true });
});

// Check the supplied password against the administrator password
app.post('/api/login', (req, res) => {
    let password = String(req.body.password);
    let match = bcrypt.compareSync(password, ADMIN_PASSWORD);
    res.json({ match });
});

// ------------------------------------------------
// Start serving
// ------------------------------------------------
app.listen(
    port, 
    () => console.log(`The API is ready on http://localhost:${port}/api/`)
);