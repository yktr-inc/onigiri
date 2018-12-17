const Client = require('../client/userClient');

module.exports = {
    index: Client.getUser(1),
    delete: 'Mon handler delete',
};