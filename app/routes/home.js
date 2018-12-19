const indexHandler = require('../handlers/indexHandler');

module.exports = [
    {
        method: "GET",
        path: "/",
        handler: indexHandler.index,
        options: {
            auth: false,
        }
    },       
    {
        method: "GET",
        path: "/api",
        handler: indexHandler.apiResponse,
        options: {
            auth: true,
        }
    },    
    {
        method: "GET",
        path: "/index/:id",
        handler: indexHandler.index,
        options: {},
    },
];