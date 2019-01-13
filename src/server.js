'use strict';


const Core = require('./core');
const Request = require('./request');

const app = {};

exports = module.exports = settings => {

    const core = new Core(settings);
    return new app.Server(core);
};

/**
 * Handling events
 * @type {[type]}
 */
app.Server = class {

    constructor(core) {
        this._core = core;
        this.settings = core.settings;
    }

    strategy() {
        //handling auth
    }

    register(event, func){
      this._core.registerMiddleware({event, func});
    }

};
