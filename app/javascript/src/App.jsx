import React, { useEffect, useState } from "react";

import {
  Route,
  Switch,
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import Dashboard from "./components/Dashboard";
import Create from "./components/Dashboard/Articles/Article/Create";

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
      <Switch history={history}>
        <Route exact component={Create} path="/articles/create" />
        <Route exact component={Dashboard} path="/" />
      </Switch>
    </Router>
  );
};

export default App;
