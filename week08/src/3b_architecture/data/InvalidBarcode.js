// This class is an error object -- it is used to represent barcodes that are not in the database
class InvalidBarcode {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    // Errors have no effect on the total
    getAmount(_totalBefore) {
        return 0;
    }

    // Show an error on the laser printer
    toPrinterMessage(_amount, _totalAfter) {
        return 'Invalid barcode';
    }
    
    // Report an error to the internal logs
    toLogMessage(_amount, _totalAfter) {
        return 'ERROR Invalid barcode\n';
    }
}

module.exports = InvalidBarcode;