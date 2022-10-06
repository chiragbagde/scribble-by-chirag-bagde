import React from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";

import { formatDateAndTime } from "../utils";

export const contactsTableColumnData = history => [
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
    dataIndex: "categories",
    key: "category",
    width: "20%",
    render: categories => categories.join(","),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "10%",
  },
  {
    title: "",
    key: "slug",
    width: "15%",
    render: ({ ...props }) => (
      <div className="flex  flex-row  gap-2">
        <Edit
          size={20}
          onClick={() =>
            history.push({
              pathname: `/articles/${props.slug}/edit`,
              state: { article: props },
            })
          }
        />
        <Delete size={20} />
      </div>
    ),
  },
];
