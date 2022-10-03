import React from "react";

import { Container } from "@bigbinary/neetoui/layouts";

import Header from "./Header";
import SideBar from "./SideBar";
import Table from "./Table";

const Articles = () => (
  <div className="flex">
    <SideBar />
    <Container>
      <Header />
      <Table />
    </Container>
  </div>
);

export default Articles;
