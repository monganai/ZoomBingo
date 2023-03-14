const { createLogger, format, transports } = require('winston');

const LOGGER = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.json(),
    transports: [
    new transports.Console(),
    ],
    });

    module.exports = {
        LOGGER:LOGGER
        }