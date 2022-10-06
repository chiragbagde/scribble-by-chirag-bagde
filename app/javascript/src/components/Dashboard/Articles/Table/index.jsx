import React from "react";

import { Table as NeetoUITable, Pagination } from "@bigbinary/neetoui";

import { articlesTableColumnData } from "./utils";

const Table = ({ data, history, handleDelete }) => (
  <>
    <NeetoUITable
      allowRowClick
      columnData={articlesTableColumnData(history, handleDelete)}
      rowData={data}
      onRowClick={() => {}}
      onRowSelect={() => {}}
    />
    <br />
    <div className="flex w-full justify-end">
      <br />
      <Pagination count={50} navigate={() => {}} pageNo={3} pageSize={10} />
    </div>
  </>
);

export default Table;
