import React, { useState } from "react";

import { MenuBar } from "@bigbinary/neetoui/layouts";
import { useParams } from "react-router-dom";

import { MENU_ITEMS } from "./constants";

const SideMenu = ({ history }) => {
  const [active, setActive] = useState(null);
  const paramsUrl = useParams()[0];

  const handleClick = (url, id) => {
    history.push(url);
    setActive(id);
  };

  return (
    <MenuBar showMenu>
      {MENU_ITEMS.map(({ label, description, url, id, value }) => (
        <MenuBar.Item
          active={active === id || paramsUrl === value}
          description={description}
          key={id}
          label={label}
          onClick={() => handleClick(url, id)}
        />
      ))}
    </MenuBar>
  );
};

export default SideMenu;
