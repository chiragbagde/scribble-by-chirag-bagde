import React from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";

import { formatDateAndTime } from "../utils";

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
    dataIndex: "created_at",
    key: "created_at",
    width: "20%",
    render: created_at => (
      <div className="flex  flex-row  gap-2">
        {formatDateAndTime(created_at)}
      </div>
    ),
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
