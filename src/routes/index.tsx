import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';

const Routes: React.FC = () => (
  <>
    <Route path="/signin" component={SignIn} />
  </>
);

export default Routes;
