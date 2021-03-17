import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Form from './Form';
import Redirect from './Redirect';
import Delete from './Delete'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/a">
          <Redirect/>
        </Route>
        <Route path="/remove">
          <Delete/>
        </Route>
        <Route path="/">
          <Form />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

