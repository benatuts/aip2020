const fs = require('fs').promises;
const prompt = require('../prompt');

async function run() {
    let l = await fs.open('log.txt', 'a');    
    try {
        let tot = 0;
        let ok = true;
        while (ok) {
            let dat = await prompt.ask('scan> ');
            dat = dat.trim();
    
            if (dat === '') {
                if (tot === 0)
                    ok = false;
                else {
                    await l.write('END\n');
                    console.log(`Total transaction:\t${tot}`);
                    tot = 0;
                }
            } else if (dat === '1') {
                await l.write('BUY Chocolate bar 5.00\n');
                tot += 5.00;
                console.log(`Chocolate bar     \t5.00\t${tot}`);
            } else if (dat === '6') {
                await l.write('DISCOUNT TENPERCENT\n');
                let discount = -tot * 0.1;
                tot += discount;
                console.log(`Ten percent off   \t${discount}\t${tot}`);
    } else if (dat === '7') {
await l.write('DISCOUNT FIVEOFF\n');
tot += -5.00;
console.log(`Five dollars off  \t-5.00\t${tot}`);
    } else if (dat === '2') {
        await l.write('BUY Pasta 3.50\n');
        tot += 3.50;
        console.log(`Pasta             \t3.50\t${tot}`);
            } else if (dat === '4') {
                await l.write('BUY Donut 3.95\n');
                tot += 3.95;
                console.log(`Donut             \t3.95\t${tot}`);
            } else if (dat === '5') {
                await l.write('BUY Orange 1.00\n');
                tot += 1.00;
                console.log(`Orange            \t1.00\t${tot}`);
            } else if (dat === '3') {
                await l.write('BUY Banana 2.20\n');
                tot += 2.20;
                console.log(`Banana            \t2.20\t${tot}`);        
            } else if (dat === '8') {
                await l.write('DISCOUNT BULKBUY\n');
                if (tot > 20.00) {
                    let disc = -tot * 0.2;
                    tot += disc;
                    console.log(`Bulk buy          \t${disc}\t${tot}`);
                } else {
                    console.log(`Bulk buy          \t0.00\t${tot}`);
                }
            } else {
                await l.write('ERROR Invalid barcode\n');
                console.log('Invalid barcode');
            }
        }
    } finally {
        await l.close();
        prompt.close();
    }
}

run();