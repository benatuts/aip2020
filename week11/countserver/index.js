const express = require('express');
const path = require('path');
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

// Note: only one of the following is required
// With both, React will be preferred (if built), otherwise it will fallback to Angular
app.use(express.static(path.join(__dirname, '../withreact/build/')));
app.use(express.static(path.join(__dirname, '../withangular/dist/withangular/')));

app.listen(port, () => {
    console.log(`API available at http://localhost:${port}/api`);
});