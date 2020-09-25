const fs = require('fs').promises;
const prompt = require('../prompt');

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
            } else if (barcode === '1') {
                await log.write('BUY Chocolate bar 5.00\n');
                total += 5.00;
                console.log(`Chocolate bar     \t5.00\t${total}`);
            } else if (barcode === '2') {
                await log.write('BUY Pasta 3.50\n');
                total += 3.50;
                console.log(`Pasta             \t3.50\t${total}`);
            } else if (barcode === '3') {
                await log.write('BUY Banana 2.20\n');
                total += 2.20;
                console.log(`Banana            \t2.20\t${total}`);
            } else if (barcode === '4') {
                await log.write('BUY Donut 3.95\n');
                total += 3.95;
                console.log(`Donut             \t3.95\t${total}`);
            } else if (barcode === '5') {
                await log.write('BUY Orange 1.00\n');
                total += 1.00;
                console.log(`Orange            \t1.00\t${total}`);
            } else if (barcode === '6') {
                await log.write('DISCOUNT TENPERCENT\n');
                let discount = -total * 0.1;
                total += discount;
                console.log(`Ten percent off   \t${discount}\t${total}`);
            } else if (barcode === '7') {
                await log.write('DISCOUNT FIVEOFF\n');
                total += -5.00;
                console.log(`Five dollars off  \t-5.00\t${total}`);
            } else if (barcode === '8') {
                await log.write('DISCOUNT BULKBUY\n');
                if (total > 20.00) {
                    let discount = -total * 0.2;
                    total += discount;
                    console.log(`Bulk buy          \t${discount}\t${total}`);
                } else {
                    console.log(`Bulk buy          \t0.00\t${total}`);
                }
            } else {
                await log.write('ERROR Invalid barcode\n');
                console.log('Invalid barcode');
            }
        }
    } finally {
        await log.close();
        prompt.close();
    }
}

run();