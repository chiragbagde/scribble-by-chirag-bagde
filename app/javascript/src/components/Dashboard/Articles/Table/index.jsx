import React from "react";

import { Table as NeetoUITable, Pagination } from "@bigbinary/neetoui";

import { contactsTableColumnData } from "./utils";

const Table = ({ data, history }) => (
  <>
    <NeetoUITable
      allowRowClick
      columnData={contactsTableColumnData(history)}
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
