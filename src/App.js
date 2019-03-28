import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import AdminLayout from "./Containers/AdminLayout";
import Login from "./Components/Auth";
import PrivateRoute from "./Components/Router/PrivateRoute";

class App extends Component {
  render() {
    return (
      <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <PrivateRoute path="/" name="Home" component={AdminLayout} />
          </Switch>
      </HashRouter>
    );
  }
}

export default App;