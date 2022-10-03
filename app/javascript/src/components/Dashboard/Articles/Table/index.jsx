import React from "react";

import { Table as NeetoUITable, Pagination } from "@bigbinary/neetoui";

import { contactsTableColumnData } from "./utils";

import { CONTACTS_LIST } from "../constants";

const Table = ({ handleDelete }) => (
  <>
    <NeetoUITable
      allowRowClick
      columnData={contactsTableColumnData(handleDelete)}
      rowData={CONTACTS_LIST}
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
