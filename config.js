/*
 * Configuration provider for API app.
 */

const configurations = {};

configurations.dev = {
    name: 'Dev',
    port: 3000
};

const environment = (process.env.NODE_ENV || '').toLowerCase();
const configuration = configurations[environment] || configurations.dev;

module.exports = configuration;
