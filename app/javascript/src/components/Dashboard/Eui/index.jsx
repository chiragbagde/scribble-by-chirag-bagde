import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { either, isEmpty, isNil } from "ramda";

import { getFromLocalStorage } from "utils/storage";

import Authenticate from "./Authenticate";
import SideMenu from "./SideMenu";

const Eui = ({ history }) => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <>
      <Typography
        className="border-text-gray-400 border-b flex justify-center border-solid bg-white py-3"
        style="h3"
      >
        Spinkart
      </Typography>
      {isLoggedIn ? (
        <SideMenu history={history} />
      ) : (
        <Authenticate history={history} />
      )}
    </>
  );
};

export default Eui;
