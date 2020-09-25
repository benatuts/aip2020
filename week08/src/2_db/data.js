const products = {
    1: {name: 'Chocolate bar', price: 5.00},
    2: {name: 'Pasta',         price: 3.50},
    3: {name: 'Banana',        price: 2.20},
    4: {name: 'Donut',         price: 3.95},
    5: {name: 'Orange',        price: 1.00}
};

const discountRules = {
    6: {name: 'TENPERCENT', description: 'Ten percent off',  rule: total => -total*0.1},
    7: {name: 'FIVEOFF',    description: 'Five dollars off', rule: _total => -5.00},
    8: {name: 'BULKBUY',    description: 'Bulk buy',         rule: total => total > 20 ? -total*0.2 : 0.00}
};

function findProduct(barcode) {
    return products[barcode];
}

function findDiscountRule(barcode) {
    return discountRules[barcode];
}

module.exports = { findProduct, findDiscountRule };