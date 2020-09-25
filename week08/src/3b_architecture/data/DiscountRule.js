const { formatCurrency, formatStringForPrinter } = require('../formatting');

// A discount offer
// Arbitrary formulas are supported (this.rule) and may depend on the current total
class DiscountRule {
    constructor(name, description, rule) {
        this.name = name;
        this.description = description;
        this.rule = rule;
    }

    // Compute the total discount of this rule, to the nearest cent
    getAmount(totalBefore) {
        return Math.round(this.rule(totalBefore));
    }

    // Log the discount and new total to the laser printer
    toPrinterMessage(amount, totalAfter) {
        return `${formatStringForPrinter(this.description)}\t${formatCurrency(amount)}\t${formatCurrency(totalAfter)}`;
    }
    
    // Log the name of the discount to the internal log file
    toLogMessage(_amount, _totalAfter) {
        return `DISCOUNT ${this.name}\n`;
    }
}

module.exports = DiscountRule;
