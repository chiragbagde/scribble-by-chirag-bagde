import React, { useEffect, useState } from "react";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  useHistory,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import NavBar from "./components/Common/Navbar";
import Dashboard from "./components/Dashboard";
import { Create, Edit } from "./components/Dashboard/Articles/Article";
import Eui from "./components/Dashboard/Eui";
import Settings from "./components/Dashboard/Settings";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const history = useHistory();

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <ToastContainer />
      <NavBar />
      <Switch history={history}>
        <Route
          exact
          path="/settings/*"
          render={props => (
            <Settings {...props} setStatus={setStatus} status={status} />
          )}
        />
        <Route exact component={Create} path="/articles/create" />
        <Route exact component={Edit} path="/articles/:slug/edit" />
        <Route
          exact
          path="/public/*"
          render={props => (
            <Eui {...props} setStatus={setStatus} status={status} />
          )}
        />
        <Route exact component={Dashboard} history={history} path="/" />
        <Redirect from="/settings" to="/settings/" />
        <Redirect from="/public" to="/public/" />
      </Switch>
    </Router>
  );
};

export default App;
