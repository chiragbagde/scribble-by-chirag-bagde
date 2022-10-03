import React from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";

export const contactsTableColumnData = () => [
  {
    title: "TITLE",
    dataIndex: "title",
    key: "title",
    width: "25%",
    className: "text-indigo-500",
  },
  {
    title: "DATE",
    dataIndex: "createdAt",
    key: "createdAt",
    width: "20%",
  },
  {
    title: "AUTHOR",
    dataIndex: "author",
    key: "author",
    width: "20%",
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
    width: "20%",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "10%",
  },
  {
    title: "",
    dataIndex: "option",
    key: "option",
    width: "15%",
    render: () => (
      <div className="flex  flex-row  gap-2">
        <Edit size={20} />
        <Delete size={20} />
      </div>
    ),
  },
];
