'use strict';

const app = {};

const glob = require('glob');
const path = require('path');


exports = module.exports = app.Router = class  {

    constructor (workingDir) {
        this.routes = this._buildRoutesTree(workingDir);
        this.url = null;
    }

    _buildRoutesTree(workingDir) {
        return glob.sync(`${workingDir}/routes/*.js`).map(file => require(path.resolve(file))).flat(1);
    }

    _matchRoute(req) {

        const { url, method } = req;

        this.url = this._getExplodedUrl(url);

        const matchedRoute = this.routes.find(route => this._routeMatcher(route.path));

        if(matchedRoute){
            if(matchedRoute.method !== method){
                return false;
            }else{
                const params = this._getUriParams(matchedRoute.path);
                return { route: matchedRoute, params: params };
            }
            return false;

        }

        return false;

    }
    _getUriParams(routeUrl){

        const explodedRoute = this._getExplodedRoute(routeUrl);
        const explodedUrl = this.url;

        const params = {};

        explodedRoute.forEach(
            (part, index)=> {
                if(part.slice(0, 1) === ':'){
                    params[part.substring(1)] = explodedUrl[index];
                }
            }
        );
        return params;
    }

    _getExplodedUrl(url){

        url = ( url.slice(-1) === '/' && url.length > 1 ) ? url.slice(0, -1) : url;

        const explodedUrl = url.split('?')[0].split('/');

        explodedUrl.shift();

        return explodedUrl;
    }

    _getExplodedRoute(route){

        const explodedRoute = route.split('/');

        explodedRoute.shift();

        return explodedRoute;
    }

    _routeMatcher(route) {

        const explodedRoute = this._getExplodedRoute(route);
        const explodedUrl = this.url;

        for (let i = 0; i < explodedUrl.length; i += 1) {

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
