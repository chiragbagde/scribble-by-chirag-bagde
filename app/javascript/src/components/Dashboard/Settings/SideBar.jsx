import React from "react";

import { MenuBar } from "@bigbinary/neetoui/layouts";

const SideBar = ({ history }) => (
  <MenuBar showMenu title="Articles">
    <MenuBar.Item
      active
      description="Page Title, Brand Name & Meta Description "
      label="General"
    />
    <MenuBar.Item
      description="Create & configure redirection rules"
      label="Redirection"
      onClick={() => history.push("/settings/redirections")}
    />
    <MenuBar.Item
      description="Edit and Reorder KB Structure"
      label="Manage Categories"
    />
  </MenuBar>
);

export default SideBar;
