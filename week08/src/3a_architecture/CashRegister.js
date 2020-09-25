
// The states of a state machine
// START      -> (scan barcode)  -> PURCHASING
// START      -> (blank barcode) -> EXIT
// PURCHASING -> (scan barcode)  -> PURCHASING
// PURCHASING -> (blank barcode) -> FINISHED
// FINISHED   -> (scan barcode)  -> PURCHASING
// FINISHED   -> (blank barcode) -> EXIT
const START = 'start';
const PURCHASING = 'purchasing';
const FINISHED = 'finished';
const EXIT = 'exit';

// This class contains the top-level of the cash register
// It scans barcodes, updates the total and outputs to connected devices
class CashRegister {

    constructor(scanner, database, outputDevices) {
        this.total = 0;
        this.scanner = scanner;
        this.database = database;
        this.outputDevices = outputDevices;
    }

    // Keeps processing barcodes until an empty transaction is encountered
    // (i.e., until two blank scans)
    async processUntilNoBarcodes() {
        let state = START;
        // Use a state machine to keep track of the current transaction or whether we should exit
        while (state !== EXIT) {
            let barcode = await this.scanner.scan();
            switch (state) {
                case START:
                case FINISHED:
                    {
                        if (barcode) {
                            await this.processOneBarcode(barcode);
                            state = PURCHASING;
                        } else {
                            state = EXIT;
                        }
                        break;
                    }
                case PURCHASING:
                    {
                        if (barcode) {
                            await this.processOneBarcode(barcode);
                        } else {
                            await this.end();
                            state = FINISHED;
                        }
                        break;
                    }
                case EXIT:
                    {
                        // this should not occur
                        break;
                    }
            }
        }
    }

    // For one barcode: add or update the total, and output the results
    async processOneBarcode(barcode) {
        let product = this.database.findProduct(barcode);
        let discountRule = this.database.findDiscountRule(barcode);
        if (product) {
            this.total += product.price;
            for (let device of this.outputDevices)
                await device.buy(product, this.total);
        } else if (discountRule) {
            let discount = discountRule.rule(this.total);
            discount = Math.round(discount);
            this.total += discount;
            for (let device of this.outputDevices)
                await device.discount(discountRule, discount, this.total);
        } else {
            for (let device of this.outputDevices)
                await device.invalid();
        }
    }

    // Print the end of the current transaction, and reset to 0 for the next customer
    async end() {
        for (let device of this.outputDevices)
            await device.end(this.total);
        this.total = 0;
    }

}

module.exports = CashRegister;