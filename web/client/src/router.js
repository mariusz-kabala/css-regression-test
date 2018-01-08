import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './containers/Home'
import Scenarios from './containers/Scenarios'
import New from './containers/New'
import TestDetails from './containers/TestDetails'
import TestsList from './containers/TestsList'
import AppFrame from './components/AppFrame';
import ProcessDetails from './containers/ProcessDetails';

import './history'

export default function router() {
  return (
    <Router>
      <AppFrame>
        <Route exact path="/" component={ Home } />
        <Route path="/scenarios" component={ Scenarios } />
        <Route path="/new" component={ New } />
        <Route path="/processes/:id" component={ ProcessDetails } />
        <Route path="/tests/:id" component={ TestDetails } />
        <Route exact path="/tests" component={ TestsList } />
      </AppFrame>
    </Router>
  )
}
