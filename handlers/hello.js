/*
 * Simple HTTP request handler which just produces hello message.
 */

var utils = require('../utility');

const handler = function (headers, query, data, callback) {

    const name = utils.getCaseInsensitive(query, 'name');

    callback(200, {message: `Hello ${name || 'World'}!`});
};

module.exports = handler;