import React from "react";

import { MenuBar } from "@bigbinary/neetoui/layouts";

const SideBar = () => (
  <MenuBar showMenu title="Articles">
    <MenuBar.Item
      active
      description="Page Title, Brand Name & Meta Description "
      label="General"
    />
    <MenuBar.Item
      description="Create & configure redirection rules"
      label="Redirection"
    />
    <MenuBar.Item
      description="Edit and Reorder KB Structure"
      label="Manage Categories"
    />
  </MenuBar>
);

export default SideBar;
