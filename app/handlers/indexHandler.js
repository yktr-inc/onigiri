const Client = require('../client/userClient');

module.exports = {
    index(res, req) {
      
      const user = Client.getUser(1);

      return {
        view: 'index',
        params: { 
          lol: user 
        }
      };

    }
};