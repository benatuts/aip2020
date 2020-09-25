const { findBarcode } = require("./data/findBarcode");
const { formatCurrency, formatStringForPrinter } = require('./formatting');

// This class contains the top-level of the cash register
// It scans barcodes, updates the total and outputs to connected devices
class CashRegister {

    constructor(scanner, printer, logger) {
        this.total = 0;
        this.scanner = scanner;
        this.printer = printer;
        this.logger = logger;
    }

    // Keeps processing barcodes until an empty transaction is encountered
    // (i.e., until two blank scans)
    async processUntilNoBarcodes() {
        let okayToExit = true;
        while (true) {
            let barcode = await this.scanner.scan();
            if (barcode) {
                await this.processOneBarcode(barcode);
                okayToExit = false;
            } else {
                if (okayToExit)
                    return;
                else {
                    await this.end();
                    okayToExit = true;
                }
            }
        }
    }

    // For one barcode: add or update the total, and output the results
    async processOneBarcode(barcode) {
        let item = findBarcode(barcode);
        let amount = item.getAmount(this.total);
        this.total += amount;

        await this.printer.write(item.toPrinterMessage(amount, this.total));
        await this.logger.write(item.toLogMessage(amount, this.total));
    }

    // Print the end of the current transaction, and reset to 0 for the next customer
    async end() {
        await this.printer.write(`${formatStringForPrinter('Total transaction:')}\t${formatCurrency(this.total)}`);
        await this.logger.write(`END\n`);
        this.total = 0;
    }

}

module.exports = CashRegister;