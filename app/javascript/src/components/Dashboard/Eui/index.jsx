import React, { useState } from "react";

import { Typography } from "@bigbinary/neetoui";

import Authenticate from "./Authenticate";
import SideMenu from "./SideMenu";

const Eui = ({ status, history }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Typography
        className="border-text-gray-400 border-b flex justify-center border-solid bg-white py-3"
        style="h3"
      >
        Spinkart
      </Typography>
      {status && !isLoggedIn ? (
        <Authenticate setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <SideMenu history={history} isLoggedIn={isLoggedIn} />
      )}
    </>
  );
};

export default Eui;
