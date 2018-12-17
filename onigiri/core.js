'use strict';

const http = require('http');


const Server = require('./server');
const Request = require('./request');
const Router = require('./router');
const Logger = require('./logger');
const Response = require('./response');

const app = {};


/**
 * Declaration of all needed methods and classes
 * @type {[type]}
 */
exports = module.exports = app.Core = class  {
    
    constructor (settings) {

        this.dir = process.cwd();

        this.router = new Router();
        this.request = new Request();
        this.response = new Response();
        this.logger = new Logger();
        
        this.settings = settings;
        this.server = this._init();
        

        this._debug();
        this._initServerListener();
    }

    _init(){

        const server = http.createServer();

        server.listen(this.settings.port);

        this.settings.debug.trace && this.logger.trace(this.settings,'run');

        return server;
    }

    _initServerListener(){

        this.server.on('request', (req, res) => { 

            this._dispatchRequest(req, res);
        
        });
    
    }

    _dispatchRequest(req, res) {

        this.router._matchRoute(req);

        res.write('test');
        res.end();
    }

    _debug(){

      if(this.settings.debug){
        
        if(this.settings.debug.trace){          

          this.server.on('request', (req, res) => {
            this.logger.trace(req,'req');
          });        
        
        }

      }

    }

    _registerEvent(){

    }
};