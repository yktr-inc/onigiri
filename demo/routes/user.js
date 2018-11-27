const userHandler = require('../handlers/userHandler');

module.exports = [
    {
        method: "GET",
        path: "/users",
        handler: userHandler.user,
        options: {}
    },
];