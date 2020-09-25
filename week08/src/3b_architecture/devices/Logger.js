const fs = require('fs').promises;

// Logs transaction histories to the local filesystem 
class Logger {

    constructor() {
        this.log = null;
    }

    // Write a line to the log file
    // the file is open lazily
    async write(message) {
        if (!this.log)
            this.log = await fs.open('log.txt', 'a');
        await this.log.write(message);
    }

    async close() {
        if (this.log) {
            await this.log.close();
            this.log = null;
        }
    }

}

module.exports = Logger;