exports.handle = (req, res, routes) => {
  let matchedRoute;

  for (const routeEnv in routes) {
    const current = require(`../demo/routes/${routeEnv}`);
    
    const matchedRoutes = current.filter(route => matchRoutes(route.path, req.url));
    matchedRoute = matchedRoutes.find(route => route.method === req.method);

    if (matchedRoute) {
      break;
    }
  }

  if (matchedRoute !== undefined) {
    console.log('200');
    console.log(matchedRoute);
  } else {
    console.log('404');
  }
};

const matchRoutes = (route, url) => {
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
