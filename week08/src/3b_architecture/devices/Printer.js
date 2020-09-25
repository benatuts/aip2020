// The laser-printed receipt generator
class Printer {

    // Writes a message to the "laser printer"
    async write(message) {
        // I'm assuming the laser printer is connected to the console output
        console.log(message);
    }

    async close() {
        // do nothing
    }

}

module.exports = Printer;