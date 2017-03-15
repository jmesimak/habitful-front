/**
 * Created by jjoonia on 07/03/2017.
 */

import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import Entry from './Entry';
import HabitView from './HabitView';
import NoMatch from './NoMatch';
import Login from './Login'
import Front from './Front'
import Register from './Register'
import HabitListDaily from './HabitListDaily'
import HabitListWeekly from './HabitListWeekly'
import HabitListMonthly from './HabitListMonthly'

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Front} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Register} />
    <Route path="/habits" component={App}>
      <Route path="new" component={Entry} />
      <Route path="daily" component={HabitListDaily} />
      <Route path="weekly" component={HabitListWeekly} />
      <Route path="monthly" component={HabitListMonthly} />
      <Route path=":id" component={HabitView} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
);

export default Routes;