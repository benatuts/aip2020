// A generic interface for logging cash register events
class OutputDevice {

    async buy(_product, _total) {
        throw new Error('Not implemented');
    }

    async discount(_discountRule, _discount, _total) {
        throw new Error('Not implemented');
    }

    async invalid() {
        throw new Error('Not implemented');
    }

    async end(total) {
        throw new Error('Not implemented');
    }

    async close() {
        throw new Error('Not implemented');
    }

}

module.exports = OutputDevice;