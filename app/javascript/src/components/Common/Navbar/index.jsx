import React from "react";

import { Button, Typography } from "neetoui";
import { useHistory } from "react-router-dom";

import NavItem from "./NavItem";

const NavBar = () => {
  const history = useHistory();

  return (
    <nav className="shadow border-b border-solid bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
              <div
                className="mr-3 inline-flex items-center px-1 pt-1
                      text-sm font-semibold leading-5 focus:text-indigo-500"
              >
                <Typography style="h4" weight="bold">
                  Srcibble
                </Typography>
              </div>
              <NavItem name="Articles" path="/" />
              <NavItem name="Settings" path="/settings/" />
            </div>
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
