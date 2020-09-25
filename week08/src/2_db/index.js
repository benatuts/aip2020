const fs = require('fs').promises;
const prompt = require('../prompt');
const { findProduct, findDiscountRule } = require('./data');
const data = require('./data');

async function run() {
    let log = await fs.open('log.txt', 'a');    
    try {
        let total = 0;
        let isRunning = true;
        while (isRunning) {
            let barcode = await prompt.ask('scan> ');
            barcode = barcode.trim();
            if (barcode === '') {
                if (total === 0)
                    isRunning = false;
                else {
                    await log.write('END\n');
                    console.log(`Total transaction:\t${total}`);
                    total = 0;
                }
            } else {
                let product = findProduct(barcode);
                let discountRule = findDiscountRule(barcode);
                if (product) {
                    await log.write(`BUY ${product.name} ${product.price}\n`);
                    total += product.price;
                    console.log(`${product.name}\t${product.price}\t${total}`);
                } else if (discountRule) {
                    await log.write(`DISCOUNT ${discountRule.name}\n`);
                    let discount = discountRule.rule(total);
                    total += discount;
                    console.log(`${discountRule.description}\t${discount}\t${total}`);
                } else {
                    await log.write('ERROR Invalid barcode\n');
                    console.log('Invalid barcode');
                }
            }
        }
    } finally {
        await log.close();
        prompt.close();
    }
}

run();