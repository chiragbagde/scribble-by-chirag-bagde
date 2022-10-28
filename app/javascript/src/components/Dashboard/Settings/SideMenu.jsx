import React from "react";

import { MenuBar } from "neetoui/layouts";

import { MENU_ITEMS } from "./constants";

const SideMenu = ({ history, menu }) => {
  const selectedMenu =
    menu === "Manage%20Categories" ? "Manage Categories" : menu;

  const handleClick = label => {
    const searchTerm =
      label !== "Manage Categories" ? label : "Manage%20Categories";
    history.push({
      pathname: "/settings",
      search: `?tab=${searchTerm}`,
    });
  };

  return (
    <MenuBar showMenu>
      {MENU_ITEMS.map(({ label, description, id }) => (
        <MenuBar.Item
          active={selectedMenu === label}
          description={description}
          key={id}
          label={label}
          onClick={() => handleClick(label)}
        />
      ))}
    </MenuBar>
  );
};

export default SideMenu;
