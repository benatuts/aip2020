const express = require('express');
const port = 4000;
const app = express();

let count = 0;

app.get('/api/count', (_req, res) => {
    res.json({ count });
});

app.post('/api/increment', (_req, res) => {
    count++;
    res.json({ count });
});

app.listen(port, () => {
    console.log(`API available at http://localhost:${port}/api`);
});