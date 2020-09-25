const CashRegister = require('./CashRegister');
const Logger = require('./devices/Logger');
const Printer = require('./devices/Printer');
const BarcodeScanner = require('./devices/BarcodeScanner');
const BarcodeDatabase = require('./BarcodeDatabase');

async function run() {
    let scanner = new BarcodeScanner();
    let database = new BarcodeDatabase();
    let devices = [new Logger(), new Printer()];
    let register = new CashRegister(scanner, database, devices);
    try {
        await register.processUntilNoBarcodes();
    } finally {
        for (let device of devices)
            await device.close();
        scanner.close();
    }
}

run();