const assert = require('assert');
const CashRegister = require('../src/3a_architecture/CashRegister');
const BarcodeDatabase = require('../src/3a_architecture/BarcodeDatabase');

// Helper for mocking
const ERROR = () => { throw new Error(); }

// A very simple mocking helper
// makeMock({foo: null}).foo() returns null
// makeMock({foo: [1,2,3]]}).foo() returns 1, then 2 then 3
// makeMock({foo: [1,2,() => 3]]}).foo() returns 1, then 2 then 3
function makeMock(mappings, parent) {
    let mock = {};

    // "Inherit" all the properties of the optional parent mock
    if (parent)
        mock = {...parent};
    
    for (let key in mappings) {
        let value = mappings[key];

        // A list of values is consumed once for each call
        if (Array.isArray(value))
            mock[key] = (...params) => { 
                let result = value.shift();
                // Functions in the list are invoked as callbacks
                if (typeof result === 'function')
                    return result(...params);
                
                // Values are returned as-is
                else
                    return result;
            };

        // A function is assumed to be an implementation
        else if (typeof value === 'function')
            mock[key] = value;
        
        // A value is used as a return value
        else
            mock[key] = () => { return value; };
    }
    return mock;
}

describe('CashRegister', () => {
    let emptyDB = makeMock({
        findProduct: null,
        findDiscountRule: null,
    });

    let sampleDB = new BarcodeDatabase();

    let nullOutput = makeMock({
        buy: undefined,
        discount: undefined,
        invalid: undefined,
        end: undefined,
        close: undefined
    });

    describe('processUntilNoBarcodes', () => {
        it('should exit on first blank', async () => {
            let register = new CashRegister(
                makeMock({
                    scan: [null, ERROR], // First scan is empty, any subsequent scans are errors
                    close: undefined
                }),
                emptyDB,
                [
                    nullOutput
                ]
            );
            // The promise should resolve
            await register.processUntilNoBarcodes();
        });

        it('should keep scanning after one blank', (done) => {
            let register = new CashRegister(
                makeMock({
                    // The system should call scan again, if it's only seen one empty scan
                    scan: ['1', null, () => done()],
                    close: undefined
                }),
                emptyDB,
                [
                    nullOutput
                ]
            );
            register.processUntilNoBarcodes();
        });

        it('should exit after two blanks', async () => {
            let register = new CashRegister(
                makeMock({
                    scan: ['1', null, null, ERROR],
                    close: undefined
                }),
                emptyDB,
                [
                    nullOutput
                ]
            );
            await register.processUntilNoBarcodes();
        });

        it('should keep scanning after one blank, until two blanks', async () => {
            let register = new CashRegister(
                makeMock({
                    scan: ['1', null, '1', null, null, ERROR],
                    close: undefined
                }),
                emptyDB,
                [
                    nullOutput
                ]
            );
            await register.processUntilNoBarcodes();
        });

        it('should stay zero with an empty database', async () => {
            let register = new CashRegister(
                makeMock({
                    scan: ['1', '2', '3', null, null, ERROR],
                    close: undefined
                }),
                emptyDB,
                [
                    makeMock({
                        end: total => assert.strictEqual(total, 0.0)
                    }, nullOutput)
                ]
            );
            await register.processUntilNoBarcodes();
        });

        it('should total 3 chocolates ($5.00), 1 pasta ($3.50) and $5 off to $13.50', async () => {
            let register = new CashRegister(
                makeMock({
                    scan: ['1', '1', '1', '2', '7', null, null, ERROR],
                    close: undefined
                }),
                sampleDB,
                [
                    makeMock({
                        end: total => assert.strictEqual(total, 1350)
                    }, nullOutput)
                ]
            );
            await register.processUntilNoBarcodes();
        });

        it('should reset the total to zero after a blank scan', async () => {
            let register = new CashRegister(
                makeMock({
                    scan: ['1', '1', null, '2', null, null, ERROR],
                    close: undefined
                }),
                sampleDB,
                [
                    makeMock({
                        end: [total => assert.strictEqual(total, 1000), total => assert.strictEqual(total, 350)]
                    }, nullOutput)
                ]
            );
            await register.processUntilNoBarcodes();
        });
    });
});