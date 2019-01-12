const Client = require('../client/userClient');

module.exports = {
    index(res, req) {

      const user = Client.getUser();

      return {
        view: 'index',
        params: {
          user: user
        }
      };

    },
    apiResponse(res, req) {

      const user = Client.getUser();

      return {
        view: 'index',
        params: {
          user: user
        }
      };

    }
};
