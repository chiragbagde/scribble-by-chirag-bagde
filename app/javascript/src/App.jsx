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
import RedirectionsApi from "apis/redirections";
import { initializeLogger } from "common/logger";

import NavBar from "./components/Common/Navbar";
import Dashboard from "./components/Dashboard";
import { Create, Edit } from "./components/Dashboard/Articles/Article";
import Eui from "./components/Dashboard/Eui";
import Settings from "./components/Dashboard/Settings";

const App = () => {
  const [redirections, setRedirections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const history = useHistory();

  const fetchRedirections = async () => {
    try {
      const {
        data: { redirections },
      } = await RedirectionsApi.list();
      setRedirections(redirections);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
    fetchRedirections();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <ToastContainer />
      <Route
        exact
        component={NavBar}
        path={["/", "/articles/*", "/settings"]}
      />
      <Switch history={history}>
        {redirections.map(({ old_url, new_url, id }) => (
          <Route exact from={`/${old_url}`} key={id}>
            <Redirect
              to={{ pathname: `/${new_url}`, state: { status: 301 } }}
            />
          </Route>
        ))}
        <Route
          exact
          path="/settings"
          render={props => (
            <Settings {...props} setStatus={setStatus} status={status} />
          )}
        />
        <Route exact component={Create} path="/articles/create" />
        <Route exact component={Edit} path="/articles/:id/edit" />
        <Route exact component={Eui} path="/public/*" />
        <Route exact component={Dashboard} history={history} path="/" />
        {/* <Redirect from="/settings" to="/settings/" /> */}
        <Redirect from="/public" to="/public/" />
      </Switch>
    </Router>
  );
};

export default App;
