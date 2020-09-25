const prompt = require('../../prompt');

// A barcode input device
// i.e., this is the interface to the physical barcode scanner
class BarcodeScanner {

    // Returns a promise that resolves when the next barcode is available
    // Returns null if the user indicates that the customer is finished
    async scan() {
        let barcode = await prompt.ask('scan> ');
        let trimmedBarcode = barcode.trim();

        if (trimmedBarcode === '')
            return null;
        else
            return trimmedBarcode;
    }

    async close() {
        prompt.close();
    }

}

module.exports = BarcodeScanner;