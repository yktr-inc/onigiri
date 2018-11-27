const { unrequire } = require('./utils');

module.exports = {
    handle: (req, res, routes) => {
       
       let matchedRoute;
       let matchedMethod;

       for(var routeEnv in routes){
            
            const current = require(`../demo/routes/${routeEnv}`);
            
            const matchedRoutes = current.filter(route => route.path == req.url);
            matchedRoute = matchedRoutes.find(route => route.method === req.method);

            if(matchedRoute){
                break;
            }
       }

       if(matchedRoute !== undefined){
        console.log('200');
       }else{
        console.log('404');
       }
    },
}
