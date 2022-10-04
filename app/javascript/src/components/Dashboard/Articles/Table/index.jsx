import React from "react";

import { Table as NeetoUITable, Pagination } from "@bigbinary/neetoui";

import { contactsTableColumnData } from "./utils";

const Table = ({ handleDelete, data }) => (
  <>
    <NeetoUITable
      allowRowClick
      columnData={contactsTableColumnData(handleDelete)}
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
