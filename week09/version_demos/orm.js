/*
 * This module is a helper to declare a Sequelize model
 * and instantiate (or load) a single instance of that model
 */
const Sequelize = require('sequelize');

// Connect to the local PostgreSQL server
const sequelize = new Sequelize(
    'postgres',  // Database name
    null,        // Username
    null,        // Password
    {dialect: 'postgres', host: 'localhost'}
);

// A very simple message (string) wrapper
const Message = sequelize.define(
    'message',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        message: Sequelize.TEXT
    }, {
        version: true // Enable optimistic locking/versioning
    }
);

async function init() {
    // Ensure the database schema is valid
    await sequelize.sync();
    
    // Get the first message or create a new one if empty
    const results = await Message.findOrCreate({where: {}, defaults: {message: 'Hello, world!'}});

    // Update the exported instance
    module.exports.instance = results[0];
    console.log('Database initialized');
    console.log('instance = ', results[0]);
    console.log();
}

// Automatically initialize on module load
init();

module.exports = {
    Message,
    init,
    instance: null // automatically updated when init() completes
};
