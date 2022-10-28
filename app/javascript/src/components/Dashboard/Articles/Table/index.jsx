import React from "react";

import { Table as NeetoUITable } from "@bigbinary/neetoui";

import { articlesTableColumnData } from "./utils";

const Table = ({ data, history, handleDelete, columns }) => (
  <NeetoUITable
    allowRowClick
    pagination
    columnData={articlesTableColumnData(history, handleDelete, columns)}
    rowData={data}
    onRowClick={() => {}}
    onRowSelect={() => {}}
  />
);

export default Table;
