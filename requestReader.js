/*
 * Encapsulates logic for reading HTTP request payload.
 */

const {StringDecoder} = require('string_decoder');

const wrapper = {
    readAll: function (request, encoding, callback) {

        const decoder = new StringDecoder(encoding);
        let buffer = '';

        request.on('data', data => buffer += decoder.write(data));

        request.on('end', () => {
            buffer += decoder.end();

            callback(buffer);
        });

    }
};

module.exports = wrapper;
