const Product = require('./Product');
const DiscountRule = require('./DiscountRule');
const InvalidBarcode = require('./InvalidBarcode');

const barcodeLookup = {
    1: new Product('Chocolate bar', 500),
    2: new Product('Pasta',         350),
    3: new Product('Banana',        220),
    4: new Product('Donut',         395),
    5: new Product('Orange',        100),
    6: new DiscountRule('TENPERCENT', 'Ten percent off',   total => -total*0.1),
    7: new DiscountRule('FIVEOFF',    'Five dollars off', _total => -500),
    8: new DiscountRule('BULKBUY',    'Bulk buy',          total => total > 2000 ? -total*0.2 : 0)
};

const invalid = new InvalidBarcode();

// A mapping from barcodes to products, discount rules or an invalid barcode instance
function findBarcode(barcode) {
    if (barcode in barcodeLookup) {
        return barcodeLookup[barcode];
    } else {
        return invalid;
    }
}

module.exports = findBarcode;