'use strict';

const app = {};

const glob = require('glob');
const path = require('path');


exports = module.exports = app.Router = class  {

    constructor (workingDir) {
        this.routes = this._buildRoutesTree(workingDir);
    }

    _buildRoutesTree(workingDir) {
        return glob.sync(`${workingDir}/routes/*.js`).map(file => require(path.resolve(file))).flat(1);
    }

    _matchRoute(req) {

        const { url, method } = req;

        const matchedRoute = this.routes.find(route => this._routeMatcher(route.path,url));

        if(matchedRoute){
            if(matchedRoute.method !== method){
                return false;
            }else{
                const params = this._getUriParams(matchedRoute.path, url);
                return { route: matchedRoute, params: params };
            }
            return false;

        }

        return false;

    }
    _getUriParams(routeUrl, url){

        const { explodedRoute, explodedUrl } = this._getUrlParts(routeUrl, url);
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

    _getUrlParts(route, url){

        const explodedRoute = route.split('/');
        const explodedUrl = url.split('?')[0].split('/');

        explodedRoute.shift();
        explodedUrl.shift();

        return {explodedRoute: explodedRoute, explodedUrl: explodedUrl};
    }

    _routeMatcher(route, url) {

        const { explodedRoute, explodedUrl } = this._getUrlParts(route, url);

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
