import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Deposit from '../pages/Deposit';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/deposit" component={Deposit} isPrivate />
  </Switch>
);

export default Routes;
