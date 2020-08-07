# Some other approaches

- Create a single function that alternates between ping/pong, rather than two separate files
- Serve a HTML file using `sendFile`, rather than generating the HTML from inside code
- Handle GET and POST separately (instead of using `app.all`) so that GET requests do not change the state (idempotent)
- Use a template engine such as EJS, PUG or Mustache
