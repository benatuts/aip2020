/*
 * This module is a helper to declare a Mongoose model
 * and instantiate (or load) a single instance of that model
 */
const mongoose = require('mongoose');

// Connect to the local Mongodb server
mongoose.connect('mongodb://localhost:27017/messageDB', { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// A very simple message (string) wrapper
const Message = mongoose.model('message', {
    message: String
});

async function init() {
    // Get a message or create a new one if empty
    const instance = await Message.findOneAndUpdate(
        {},
        { $setOnInsert: { message: 'Hello, world!'}},
        { upsert: true, new: true }
    );

    // Update the exported instance
    module.exports.instance = instance;
    console.log('Databases initialized');
    console.log('instance = ', instance);
    console.log();
}

// Automatically initialize
init();

module.exports = {
    Message,
    init,
    instance: null // automatically updated when init() completes
};
