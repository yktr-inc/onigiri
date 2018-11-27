const indexHandler = require('../handlers/indexHandler');

module.exports = [
    {
        method: "GET",
        path: "/",
        handler: indexHandler.index,
        options: {}
    },       
    {
        method: "POST",
        path: "/",
        handler: indexHandler.index,
        options: {}
    },    
    {
        method: "GET",
        path: "/index/{id}",
        handler: indexHandler.index,
        options: {}
    },
];