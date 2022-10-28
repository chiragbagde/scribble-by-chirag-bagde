import React, { useState } from "react";

import { Button, Checkbox, Dropdown } from "neetoui";
import { Header as NeetoUIHeader } from "neetoui/layouts";

import articlesApi from "apis/articles";

import { FILTERING_OPTIONS } from "./constants";

const { Menu, MenuItem } = Dropdown;

const Header = ({
  history,
  searchTerm,
  setSearchTerm,
  columns,
  setColumns,
  setFilteredArticles,
}) => {
  const [checked, setChecked] = useState(
    Array(FILTERING_OPTIONS.length).fill(true)
  );

  const handleClick = async () => {
    const newChecked = FILTERING_OPTIONS.map(option =>
      columns.includes(option)
    );
    setChecked(newChecked);
  };

  const handleSearchTerm = async (e, searchTerm) => {
    try {
      if (e.key === "Enter") {
        const {
          data: { articles },
        } = await articlesApi.filter({ title: searchTerm });
        setFilteredArticles(articles);
      }
    } catch (error) {
      logger.error(error);
    }
  };

  const handleColumns = async (column, idx) => {
    let updated_columns = [];
    if (checked[idx]) {
      updated_columns = columns.filter(option => option !== column);
    } else {
      updated_columns = Array.from(columns);
      updated_columns.push(column);
    }
    setColumns(updated_columns);
  };

  return (
    <NeetoUIHeader
      actionBlock={
        <>
          <Dropdown
            buttonStyle="secondary"
            label="Columns"
            onClick={handleClick}
          >
            <Menu>
              {FILTERING_OPTIONS.map((item, idx) => (
                <MenuItem.Button
                  key={idx}
                  prefix={
                    <Checkbox
                      checked={checked[idx]}
                      id={idx}
                      onChange={() => {}}
                      onClick={() => handleColumns(item, idx)}
                    />
                  }
                >
                  {item}
                </MenuItem.Button>
              ))}
            </Menu>
          </Dropdown>
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
        onKeyDown: e => handleSearchTerm(e, searchTerm),
        placeholder: "Search for Title and press Enter",
      }}
    />
  );
};

export default Header;
