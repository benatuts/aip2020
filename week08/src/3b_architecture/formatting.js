const DOLLARS_LENGTH = 5;
const PRINTER_STRING_LENGTH = 18;

// Formats whole cents into a currency format
// i.e., 1234 ->  '   12.34'
//    1234567 ->  '12345.67'
//   12345678 -> '123456.78' (overflow is ignored)
function formatCurrency(cents) {
    // Ensure we are only dealing in whole cents
    cents = Math.round(cents);
    // Is it positive or negative?
    const sign = cents >= 0 ? '' : '-';
    // Get the whole dollars and cents
    cents = Math.abs(cents);
    const dollars = Math.trunc(cents / 100);
    let remainder = cents % 100;

    // Pad into the format: "    0.00"/"   -0.00"
    return (sign + dollars).padStart(DOLLARS_LENGTH, ' ') + '.' + String(remainder).padStart(2, '0');
}

// Pads strings to a constant length for output on a laser printer
// Long strings are returned as-is
function formatStringForPrinter(text) {
    return text.padEnd(PRINTER_STRING_LENGTH, ' ');
}

module.exports = { formatCurrency, formatStringForPrinter };
