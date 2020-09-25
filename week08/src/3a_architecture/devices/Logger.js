const fs = require('fs').promises;

const { formatCurrency } = require('../formatting');
const OutputDevice = require('./OutputDevice');

// Logs transaction histories to the local filesystem,
// using the system's internal log file format
class Logger extends OutputDevice {

    constructor() {
        super();
        this.log = null;
    }

    // Lazily open the internal log file
    async ensureInitialized() {
        if (!this.log)
            this.log = await fs.open('log.txt', 'a');
    }

    // The customer has scanned a product
    async buy(product, _total) {
        await this.ensureInitialized();
        await this.log.write(`BUY ${product.name} ${formatCurrency(product.price)}\n`);
    }

    // The customer has scanned the barcode of a discount coupon
    async discount(discountRule, _discount, _total) {
        await this.ensureInitialized();
        await this.log.write(`DISCOUNT ${discountRule.name}\n`);
    }

    // The customer has scanned an invalid barcode
    async invalid() {
        await this.ensureInitialized();
        await this.log.write('ERROR Invalid barcode\n');
    }

    // The customer has finished their transaction
    async end(_total) {
        await this.ensureInitialized();
        await this.log.write(`END\n`);
    }

    async close() {
        if (this.log) {
            await this.log.close();
            this.log = null;
        }
    }

}

module.exports = Logger;