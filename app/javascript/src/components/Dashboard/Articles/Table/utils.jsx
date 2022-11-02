import React from "react";

import { Edit, Delete } from "neetoicons";

import { formatDateAndTime } from "../utils";

export const articlesTableColumnData = (history, handleDelete, columns) =>
  [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
      width: "25%",
      className: "text-indigo-500",
      render: (title, { assigned_category, slug }) => (
        <span
          onClick={() =>
            slug &&
            history.push(`/public/${assigned_category.category}/${slug}`)
          }
        >
          {title}
        </span>
      ),
    },
    {
      title: "DATE",
      dataIndex: "created_at",
      key: "created",
      width: "20%",
      render: (created_at, { status }) => (
        <div>
          {status === "Draft" ? (
            <span>-</span>
          ) : (
            <span>{formatDateAndTime(created_at)}</span>
          )}
        </div>
      ),
    },
    {
      title: "AUTHOR",
      dataIndex: "author",
      key: "author",
      width: "20%",
      render: author => author.name,
    },
    {
      title: "CATEGORY",
      dataIndex: "assigned_category",
      key: "category",
      width: "20%",
      render: assigned_category => assigned_category.category,
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
                pathname: `/articles/${props.id}/edit`,
                state: { article: props },
              })
            }
          />
          <Delete
            size={20}
            onClick={() => {
              handleDelete(props.id, props.title);
            }}
          />
        </div>
      ),
    },
  ].filter(
    column =>
      columns.includes(column?.key) ||
      column.key === "slug" ||
      column.key === "title"
  );
