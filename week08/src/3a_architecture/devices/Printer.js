const { formatCurrency, formatStringForPrinter } = require('../formatting');
const OutputDevice = require('./OutputDevice');

// The laser-printed receipt generator
// This class neatly formats columns and currency for user-friendly output
class Printer extends OutputDevice {

    // The customer has purchased a product
    async buy(product, total) {
        console.log(`${formatStringForPrinter(product.name)}\t${formatCurrency(product.price)}\t${formatCurrency(total)}`);
    }

    // The customer has scanned a discount coupon
    async discount(discountRule, discount, total) {
        console.log(`${formatStringForPrinter(discountRule.description)}\t${formatCurrency(discount)}\t${formatCurrency(total)}`);
    }

    // The customer has scanned an invalid barcode
    async invalid() {
        console.log('Invalid barcode');
    }

    // The customer has completed the transaction (so the total payable should be shown)
    async end(total) {
        console.log(`${formatStringForPrinter('Total transaction:')}\t${formatCurrency(total)}`);
    }

    async close() {
        // do nothing
    }

}

module.exports = Printer;