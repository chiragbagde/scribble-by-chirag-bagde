import React from "react";

import Articles from "./Articles";

import Navbar from "../Common/Navbar";

const Dashboard = ({ history }) => (
  <>
    <Navbar />
    <Articles history={history} />
  </>
);

export default Dashboard;
