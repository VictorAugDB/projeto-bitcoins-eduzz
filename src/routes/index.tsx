import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Deposit from '../pages/Deposit';
import BuyBitCoins from '../pages/BuyBitCoins';
import SellBitCoins from '../pages/SellBitCoins';
import Extract from '../pages/Extract';
import Navbar from '../components/Navbar';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => (
  <>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Navbar />
    <Switch>
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/deposit" component={Deposit} isPrivate />
      <Route path="/buy" component={BuyBitCoins} isPrivate />
      <Route path="/sell" component={SellBitCoins} isPrivate />
      <Route path="/extract" component={Extract} isPrivate />
    </Switch>
  </>
);

export default Routes;
