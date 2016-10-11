import React, { Component } from 'react';
import { Router, browserHistory, RouterContext} from 'react-router';
import App from '../framework/app/App';
import route from './route';
let routes = {
   path: '/',
    component: App,
       indexRoute: {
           getComponent: (location, cb) => {
               require.ensure([], (require) => {
                   cb(null, require('./home/Home'));
               });
           },
       },
       childRoutes: route,
};

class Routes extends Component {

   componentWillMount() {
     browserHistory.listen((data) => {
          console.log(data);
     });
   }

   render() {
       return <Router routes={routes} history={browserHistory} />;
   }
}

export default Routes;