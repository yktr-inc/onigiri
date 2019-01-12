'use strict';

const app = {};

const glob = require('glob');
const path = require('path');


exports = module.exports = app.Router = class  {

    constructor () {
        this.routes = this._buildRoutesTree();
    }

    _buildRoutesTree() {
        return glob.sync('./routes/*.js').map(file => require(path.resolve(file))).flat(1);
    }

    _matchRoute(req) {

        const { url, method } = req;

        const matchedRoute = this.routes.find(route => this._routeMatcher(route.path,url));

        if(matchedRoute){
            if(matchedRoute.method !== method){
                return false;
            }else{
                return matchedRoute;
            }
            return false;

        }

        return false;

    }

    _routeMatcher(route, url) {

        const explodedRoute = route.split('/');
        const explodedUrl = url.split('/');

        explodedRoute.shift();
        explodedUrl.shift();

        for (let i = 0; i < explodedUrl.length; i += 1) {

            // if (typeof explodedRoute[i] === 'undefined') {
            //   break;
            // }

            if (explodedUrl.length !== explodedRoute.length) {
                break;
            }

            if (explodedRoute[i] !== explodedUrl[i]) {
                if (explodedRoute[i].slice(0, 1) !== ':') {
                    break;
                }
            }

            if (i + 1 === explodedUrl.length) {
                return true;
            }
        }
        return false;
    }

};
