const IndexHandler = require('handler/IndexHandler');

modules.exports = [
    {
        method: "GET",
        path: "/",
        handler: IndexHandler.index,
        options: {}
    },    
    {
        method: "GET",
        path: "/index/{id}",
        handler: IndexHandler.index,
        options: {}
    },
];