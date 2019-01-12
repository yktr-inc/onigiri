'use strict';

const fs = require('fs');

const app = {};

exports = module.exports = app.Logger = class  {

    constructor () {

    }

    trace(info,type){
        switch (type) {
        case 'req':
            return this._logDispatchReq(info);
        case 'res':
            return this._logDispatchRes(info);
        case 'handler':
        case 'run':
            return this._logServerRun(info);
        default:
            return null;
        }
    }

    _logDispatchReq(req){
        console.info(`Dispatched request : url: ${req.url}, method: ${req.method}`);
    }    
    _logDispatchRes(req){
        console.info(`Dispatched response : url: ${req.url}, method: ${req.method}`);
    }  

    _logError(error){
        console.log(`An error occured : ${error}`);
    }

    _logServerRun(envSettings){
        const { host, port } = envSettings;
        console.info(`Origami server running on ${host}:${port}`);
    }

    _appendLog(msg, env){
        this._writeLogFile(msg,`var/logs/${env}`);
    }

    _appendHttp(msg, env){
        this._writeLogFile(msg,`var/access/${env}`);
    }

    _writeLogFile(msg, path){
        fs.appendFile(path, msg, err => { if (err) throw err; } );
    }


};