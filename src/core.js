'use strict';

const http = require('http');


const Server = require('./server');
const Request = require('./request');
const Router = require('./router');
const Logger = require('./logger');
const Response = require('./response');
const View = require('./view');
const Auth = require('./auth');

const app = {};

exports = module.exports = app.Core = class  {

    constructor (settings) {

        this.dir = process.cwd();

        this.middlewares = {
            request: [],
            response: [],
        };

        this.router = new Router(settings.workingDir);
        this.request = new Request();
        this.response = new Response();
        this.logger = new Logger();
        this.view = new View(settings.template);
        this.auth = new Auth(settings.strategy);

        this.settings = settings;
        this.server = this._init();

        this._initServerListener();

        this._debug();

        this._runMiddlewares();
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
        this.server.on('clientError', (err, socket) => {
            socket.end('HTTP/1.1 400 Bad Request');
        });
    }

    registerMiddleware(middleware){
        this.middlewares[middleware.event].push(middleware.func);
    }

    _dispatchRequest(req, res) {

        const { route, params } = this.router._matchRoute(req);
        if(route){

            this.request._getRequestParams(req);

            if(route.auth){
                this._checkAuth(req, res);
            }
            const handlerRes = route.handler(res, req, params);
            if(!route.api){
                const view = this._renderView(handlerRes, res);
            }else{
                this._writeHeaders(res, route.api.code, route.api.type);
                this._renderApi(handlerRes, res);
            }

        }else{
            this._writeHeaders(res, 404, 'application/json');
            res.write(JSON.stringify({ error: 404 }));
        }

        res.end();


    }

    _renderApi(data, res){
        return res.write(JSON.stringify(data));
    }

    _renderView(handler, res){
        const { view, params } = handler;
        const tpl = this.view.render(view,params);
        return res.write(tpl);
    }

    _writeHeaders(res, code, type){
        res.setHeader('Content-Type', type);
        res.statusCode = code;
    }

    _debug(){

        if(this.settings.debug){

            if(this.settings.debug.trace){

                this.server.on('request', (req, res) => {
                    this.logger.trace(req,'req');
                    if(res.finished){
                        this.logger.trace(req,'res');
                    }
                });

            }

        }

    }

    _runMiddlewares(){
        this.server.on('request', (req, res) => {
            this.middlewares.request.forEach(middleware => middleware(req));
            if(res.finished){
                this.middlewares.response.forEach(middleware => middleware(res));
            }
        });
    }

    _checkAuth(req, res){

    }

    _registerEvent(){

    }
};
