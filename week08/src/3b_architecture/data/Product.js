const { formatCurrency, formatStringForPrinter } = require('../formatting');

// A simple named product with a fixed unit price
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    // The amount is simply the product price
    getAmount(_totalBefore) {
        return this.price;
    }

    // Show the product, amount and total on the laser printer
    toPrinterMessage(amount, totalAfter) {
        return `${formatStringForPrinter(this.name)}\t${formatCurrency(amount)}\t${formatCurrency(totalAfter)}`;
    }
    
    // Log the product and amount to the internal log files
    toLogMessage(amount, _totalAfter) {
        return `BUY ${this.name} ${formatCurrency(amount)}\n`;
    }
}

module.exports = Product;