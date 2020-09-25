const assert = require('assert');
const {  formatCurrency, formatStringForPrinter } = require('../src/3a_architecture/formatting');

describe('formatting', () => {
    describe('formatCurrency', () => {
        it('should render 0 as "    0.00"', () => {
            assert.strictEqual('    0.00', formatCurrency(0));
        });

        it('should render -0 as "    0.00"', () => {
            assert.strictEqual('    0.00', formatCurrency(-0));
        });

        it('should render 1234 as "   12.34"', () => {
            assert.strictEqual('   12.34', formatCurrency(1234));
        });

        it('should render 1234567 as "12345.67" (no padding)', () => {
            assert.strictEqual('12345.67', formatCurrency(1234567));
        });

        it('should render 12345678 as "123456.78" (padding is over-saturated)', () => {
            assert.strictEqual('123456.78', formatCurrency(12345678));
        });

        it('should render -1234 as "  -12.34"', () => {
            assert.strictEqual('  -12.34', formatCurrency(-1234));
        });
    
        it('should render -1234567 as "-12345.67" (padding is over-saturated)', () => {
            assert.strictEqual('-12345.67', formatCurrency(-1234567));
        });
    });

    describe('formatStringForPrinter', () => {
        it('should format short strings to equal lengths', () => {
            const a = formatStringForPrinter('');
            const b = formatStringForPrinter('a');
            const c = formatStringForPrinter('aaaa');
            const d = formatStringForPrinter('aaaaaaaaaa');
            assert.strictEqual(a.length, b.length);
            assert.strictEqual(a.length, c.length);
            assert.strictEqual(a.length, d.length);
        });

        it('should not alter long strings', () => {
            const longText = 'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf';
            assert.strictEqual(longText, formatStringForPrinter(longText));
        });
    });
});