/*
 * Entry point of Assignment #1 API app
 */

const http = require('http');
const url = require('url');

const config = require('./config');
const reader = require('./requestReader');
const utils = require('./utility');
const helloHandler = require('./handlers/hello');

// Routing table definition, each item key consist of method and path.
const routes = {
    'get:hello': helloHandler
};

// General request handler performing basic parsing,
// route selection and fallback to 404 if no routes was matched.
const requestHandler = function (request, response) {

    const parsedUrl = url.parse(request.url, true);
    const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const query = parsedUrl.query;

    const {method, headers} = request;

    reader.readAll(request, 'utf-8', function (body) {

        const signature = `${method}:${path}`;
        const defaultHandler = (_, __, ___, send) => send(404);
        const handler = utils.getCaseInsensitiveOrDefault(routes, signature, defaultHandler);

        handler(headers, query, body, sendResponse);

        function sendResponse(statusCode, payload) {

            statusCode = utils.getNumberOrDefault(statusCode, 200);
            payload = utils.getObjectOrDefault(payload, {});

            const serializedPayload = JSON.stringify(payload);

            response.setHeader('content-type', 'application/json');
            response.writeHead(statusCode);
            response.end(serializedPayload);

            console.log(`${signature} => ${statusCode}, ${serializedPayload.length} bytes`);
        }
    });
};

// Create HTTP server and start listening.
http
    .createServer(requestHandler)
    .listen(
        config.port,
        () => console.log(`Listening on port ${config.port} and uses ${config.name} environment.`));
