import React, { useState } from "react";

import { Button, Dropdown } from "@bigbinary/neetoui";
import { Header as NeetoUIHeader } from "@bigbinary/neetoui/layouts";

const Header = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <NeetoUIHeader
      actionBlock={
        <>
          <Dropdown buttonStyle="secondary" label="Columns" />
          <Button
            icon="ri-add-line"
            label="Add New Article"
            onClick={() => history.push("/articles/create")}
          />
        </>
      }
      searchProps={{
        value: searchTerm,
        onChange: e => setSearchTerm(e.target.value),
      }}
    />
  );
};

export default Header;
