import React from "react";

import { useLocation } from "react-router-dom";

import General from "./General";
import ManageCategories from "./ManageCategories";
import Redirections from "./Redirections";
import SideMenu from "./SideMenu";

const Settings = ({ history, status, setStatus }) => {
  const location = useLocation();
  const menu = location.search.split("=")[1];
  const selectedSideMenu = location.search === "" ? "General" : menu;
  if (location.search === "") {
    history.push({
      pathname: "/settings",
      search: `?tab=General`,
    });
  }
  const renderComponents = component => {
    switch (component) {
      case "General":
        return <General setStatus={setStatus} status={status} />;
      case "Manage%20Categories":
        return <ManageCategories />;
      case "Redirections":
        return <Redirections />;
    }

    return <General setStatus={setStatus} status={status} />;
  };

  return (
    <div className="flex h-screen w-full">
      <SideMenu history={history} menu={menu} />
      {renderComponents(selectedSideMenu)}
    </div>
  );
};

export default Settings;
