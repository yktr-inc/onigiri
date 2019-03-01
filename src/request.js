'use strict';

const urlModule = require('url');


const app = {};

exports = module.exports = app.Request = class  {

    _header(res){

    }

    _getRequestParams(req) {
        const urlInfos = urlModule.parse(req.url, true);
        return urlInfos;
    }

    _getBody(res){

    }

    _getQuery(req) {

    }

};
