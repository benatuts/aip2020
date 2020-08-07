const express = require('express');
const session = require('express-session');
const app = express();

// Enable cookie-based sessions
app.use(session({
    secret: 'asdfasdfasdf', // This should be changed and stored in a separate configuration/environment file
    resave: false,
    saveUninitialized: true
}));

// Increase or initialize the counter in the session 
function increment(request) {
    if (request.session.count) {
        request.session.count++;
    } else {
        request.session.count = 1;
    }

    return request.session.count;
}

// Requests to / are redirected to ping
app.get('/', (request, response) =>
    response.redirect('/ping')
);

// Increase the counter and alternate between ping/pong 
app.all('/ping', (request, response) => {
    response.send(
        `<!DOCTYPE html>
         <title>Ping?</title>
         <p>Ping?</p>
         <p>Count: ${increment(request)}</p>
         <form method="POST" action="/pong">
             <button>Pong!</button>
         </form>`
    );
});

// Increase the counter and alternate between ping/pong
app.all('/pong', (request, response) => {
    response.send(
        `<!DOCTYPE html>
         <title>Ping?</title>
         <p>Pong?</p>
         <p>Count: ${increment(request)}</p>
         <form method="POST" action="/ping">
             <button>Ping!</button>
         </form>`
    );
});

// Start Express running on port 3000
app.listen(3000, () => console.log('Running on http://localhost:3000/'));
