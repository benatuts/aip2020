const express = require('express');
var escapeHtml = require('escape-html');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

let text = 'Once upon a time...';
let version = 0;

// Build an editor page with a textbox, and old value and an optional error message
function makeForm(oldText, newText, version, isError) {
    let message = '';
    if (isError)
        message = `<p style="color: #800; font-weight: bold;">
                       While you were making changes, another user edited the same document.
                       If you click save again, then you will overwrite their changes.
                   </p>`;

    return (
        `<!DOCTYPE html><title>Shared Editor</title>
        <h1>Shared Editor</h1>
        <form action="/update" method="POST">
        ${message}
        <p>Old Value:</p>
        <p style="white-space: pre-wrap; background: #eee;">${escapeHtml(oldText)}</p>
        <p>Enter a New Value:</p>
        <textarea name="text" style="width: 100%;" rows="10">${escapeHtml(newText)}</textarea>
        <input type="submit" value="Save Changes">
        <input type="hidden" name="version" value="${version}">
        </form>`
    );
}

app.get('/', (req, res) => {
    // Show the current value of the edited text
    res.send(makeForm(text, text, version, false));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.post('/update', (req, res) => {
    // Check the version matches
    let submittedVersion = Number(req.body.version);
    let newText = String(req.body.text);

    if (version === submittedVersion) {
        text = newText;
        version++; 

        // Redirect back to the root page to show the updated form
        res.redirect('/');

    } else {
        // Send the form again with the latest version
        res.send(makeForm(text, newText, version, true));
    }
});

app.listen(port, () => console.log(`The shared editor is running on http://localhost:${port}/`));
