import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import General from "./General";
import ManageCategories from "./ManageCategories";
import Redirections from "./Redirections";
import SideMenu from "./SideMenu";

const Settings = ({ history, status, setStatus }) => (
  <div className="flex">
    <SideMenu history={history} />
    <Switch>
      <Redirect exact from="/settings" to="/settings/general" />
      <Route
        exact
        path="/settings/general"
        render={props => (
          <General {...props} setStatus={setStatus} status={status} />
        )}
      />
      <Route exact component={Redirections} path="/settings/redirections" />
      <Route
        exact
        component={ManageCategories}
        path="/settings/managecategories"
      />
    </Switch>
  </div>
);

export default Settings;
