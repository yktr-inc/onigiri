const userHandler = require('../handlers/userHandler');

module.exports = [
    {
        method: "GET",
        path: "/users",
        handler: userHandler.users,
        options: {}
    },    
    {
        method: "GET",
        path: "/users/:id/edit",
        handler: userHandler.user,
        options: {}
    },    
    {
        method: "GET",
        path: "/users/:id/:test",
        handler: userHandler.user,
        options: {}
    },
];