import React from "react";

import { Button, Typography } from "neetoui";
import { NavLink, useHistory, useLocation } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <nav className="shadow border-b border-solid bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex inline-flex items-center space-x-4 pt-1 text-sm font-semibold">
            <Typography style="h4" weight="bold">
              Scribble
            </Typography>
            <NavLink
              exact
              className={`${location.pathname === "/" && "text-indigo-500"}`}
              to="/"
            >
              Articles
            </NavLink>
            <NavLink
              exact
              to="/settings"
              className={`${
                location.pathname === "/settings" && "text-indigo-500"
              }`}
            >
              Settings
            </NavLink>
          </div>
          <div className="flex items-center justify-end gap-x-4">
            <Button
              label="Preview"
              style="secondary"
              tooltipProps={{
                content: "http://localhost:3000/public/",
                position: "bottom",
              }}
              onClick={() => history.push("/public/")}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
