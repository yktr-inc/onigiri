'use strict';

const app = {};

const glob = require('glob');
const path = require('path');
 

exports = module.exports = app.Router = class  {
  
    constructor () {
      this.routes = this._buildRoutesTree();
    }

    _buildRoutesTree() {
      return glob.sync('./routes/*.js').map(file => require(path.resolve(file)));
    }

    _matchRoute(req) {

      let matchedRoute;

      matchedRoute = this.routes.some(routeEnv => {

        const matchedRoutes = routeEnv.filter(route => this._routeMatcher(route.path, req.url));
        matchedRoute = matchedRoutes.find(route => route.method === req.method);

        return matchedRoute;

      });

      if (matchedRoute !== undefined) {
        console.log('200');
        console.log(matchedRoute);
      } else {
        console.log('404');
      }

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
    };

};