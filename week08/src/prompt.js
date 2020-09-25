/*
* A promise-based console line reader.
*
* Alternative modules (prompt/prompt-promise) 
* have more features than required and do not play well with stdin.
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// We are interested in complete lines
rl.on('line', line => {
    toDeliver.push(line);
    deliver();
});

// A queue of complete lines ready for delivery
const toDeliver = [];

// A queue of callbacks waiting for a complete line
const waiting = [];

// Deliver any pending lines to waiting callbacks
function deliver() {
    // Process any pending lines that we can
    while (waiting.length > 0 && toDeliver.length > 0) {
        let callback = waiting.shift();
        let line = toDeliver.shift();
        callback(line);
    }
    // Try to prevent our input buffer from being overloaded if there is too much input
    if (waiting.length === 0)
        rl.pause();
    else
        rl.resume();
}

// Display a prompt on standard out
// then wait for a line of user input
function ask(text) {
    return new Promise((resolve) => {
        if (text && text.length > 0)
            process.stdout.write(text);
        waiting.push(resolve);
        deliver();
    });
};

// Close the terminal (i.e., to allow node to shutdown)
function close() {
    rl.close();
};

module.exports = { ask, close };