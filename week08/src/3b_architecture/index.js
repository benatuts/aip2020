const CashRegister = require('./CashRegister');
const BarcodeScanner = require('./devices/BarcodeScanner');
const Printer = require('./devices/Printer');
const Logger = require('./devices/Logger');

async function run() {
    let scanner = new BarcodeScanner();
    let printer = new Printer();
    let logger = new Logger();
    let register = new CashRegister(scanner, printer, logger);
    try {
        await register.processUntilNoBarcodes();
    } finally {
        await printer.close();
        await logger.close();
        scanner.close();
    }
}

run();