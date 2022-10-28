import React, { useState, useEffect } from "react";

import { Button, Checkbox, Dropdown } from "@bigbinary/neetoui";
import { Header as NeetoUIHeader } from "@bigbinary/neetoui/layouts";

import OptionsApi from "apis/options";
import PageLoader from "components/PageLoader";

import { filteringOptions } from "./constants";

const { Menu, MenuItem } = Dropdown;

const Header = ({
  history,
  searchTerm,
  setSearchTerm,
  handleSearch,
  columns,
  setColumns,
}) => {
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(
    Array(filteringOptions.length).fill(true)
  );

  const handleClick = async () => {
    const newChecked = filteringOptions.map(option => columns.includes(option));
    setChecked(newChecked);
  };

  const handleUpdate = async updated_columns => {
    try {
      await OptionsApi.update({ columns: updated_columns }, 1);
    } catch (error) {
      logger.error(error);
      setLoading(false);
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
    setLoading(false);
    await handleUpdate(updated_columns);
  };

  const fetchColumns = async () => {
    try {
      const {
        data: { options },
      } = await OptionsApi.list();
      setColumns(options[0]["columns"]);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

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
              {filteringOptions.map((item, idx) => (
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
        onKeyDown: e => handleSearch(e, searchTerm),
        placeholder: "Search for Title",
      }}
    />
  );
};

export default Header;
