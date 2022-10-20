import React, { useEffect, useState } from "react";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  useHistory,
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
        <Route exact component={Settings} path="/settings/*" />
        <Route exact component={Create} path="/articles/create" />
        <Route exact component={Edit} path="/articles/:slug/edit" />
        <Route exact component={Eui} path="/public/*" />
        <Route component={Dashboard} history={history} path="/" />
      </Switch>
    </Router>
  );
};

export default App;
