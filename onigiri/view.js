'use strict';

const app = {};

exports = module.exports = app.View = class  {

  constructor(engine) {
    this._engine = engine;
  }

  render(tpl, data) {
    return this._engine.gateway(tpl, data);
  }

};

