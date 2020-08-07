const express = require('express');
const app = express();

// Requests to / are redirected to /ping
app.get('/', (request, response) =>
    response.redirect('/ping')
);

// Use a form to alternate between ping and pong
// app.all is used to handle both GET and POST requests
app.all('/ping', (request, response) =>
    response.send(
        `<!DOCTYPE html>
         <title>Ping?</title>
         <p>Ping?</p>
         <form method="POST" action="/pong">
             <button>Pong!</button>
         </form>`
    )
);
     
// Use a form to alternate between ping and pong
// app.all is used to handle both GET and POST requests
app.all('/pong', (request, response) => 
    response.send(
        `<!DOCTYPE html>
         <title>Ping?</title>
         <p>Pong?</p>
         <form method="POST" action="/ping">
             <button>Ping!</button>
         </form>`
    )
);

// Start Express running on port 3000
app.listen(3000, () => console.log('Running on http://localhost:3000/'));
