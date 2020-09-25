const products = {
    1: {name: 'Chocolate bar', price: 500},
    2: {name: 'Pasta',         price: 350},
    3: {name: 'Banana',        price: 220},
    4: {name: 'Donut',         price: 395},
    5: {name: 'Orange',        price: 100}
};

const discountRules = {
    6: {name: 'TENPERCENT', description: 'Ten percent off',  rule: total => -total*0.1},
    7: {name: 'FIVEOFF',    description: 'Five dollars off', rule: _total => -500},
    8: {name: 'BULKBUY',    description: 'Bulk buy',         rule: total => total > 2000 ? -total*0.2 : 0}
};

// A simple database that maps from barcode strings to product/discount data structures
class BarcodeDatabase {

    // Find the product: {name, price}, corresponding to the barcode
    // Returns undefined if not found
    findProduct(barcode) {
        return products[barcode];
    }
    
    // Find the discount rule: {name, description, rule}, corresponding to the barcode
    // Returns undefined if not found
    findDiscountRule(barcode) {
        return discountRules[barcode];
    }

}

module.exports = BarcodeDatabase;