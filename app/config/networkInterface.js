import { createNetworkInterface } from 'apollo-client';
import { getAuth0IdToken } from './auth0';

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cizobfftr5l9h0104wgqt0vx5' });

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    getAuth0IdToken().then((authToken) => {
      console.log(`authToken: ${JSON.stringify(authToken)}`);
      if (authToken) {
        req.options.headers.authorization = `Bearer ${authToken}`;
      }
      next();
    });
  },
}]);

export default networkInterface;
