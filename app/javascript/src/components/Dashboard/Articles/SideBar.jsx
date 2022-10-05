import React from "react";

import { Settings, Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui";
import { MenuBar } from "@bigbinary/neetoui/layouts";

const SideBar = () => (
  <MenuBar showMenu title="Articles">
    <MenuBar.Block active count={57} label="All" />
    <MenuBar.Block count={16} label="Draft" />
    <MenuBar.Block count={52} label="Published" />
    <MenuBar.SubTitle
      iconProps={[
        {
          icon: Settings,
        },
        {
          icon: Plus,
        },
      ]}
    >
      <Typography
        component="h4"
        style="h5"
        textTransform="uppercase"
        weight="bold"
      >
        CATEGORIES
      </Typography>
    </MenuBar.SubTitle>
    <MenuBar.Block count={10} label="Getting Started" />
    <MenuBar.Block count={10} label="Apps & Integration" />
    <MenuBar.Block count={20} label="Security & Privacy" />
    <MenuBar.Block count={27} label="Misc" />
  </MenuBar>
);

export default SideBar;
