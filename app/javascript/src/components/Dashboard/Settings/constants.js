import * as yup from "yup";

export const MENU_ITEMS = [
  {
    label: "General",
    url: "/settings/",
    value: "general",
    description: "Page Title, Brand Name & Meta Description",
    id: 1,
  },
  {
    label: "Redirections",
    url: "/settings/redirections",
    value: "redirections",
    description: "Create & configure redirection rules",
    id: 2,
  },
  {
    label: "Manage Categories",
    url: "/settings/managecategories",
    value: "managecategories",
    description: "Edit and Reorder KB Structure",
    id: 3,
  },
];

export const CATEGORY_VALIDATION_SCHEMA = yup.object().shape({
  category: yup
    .string()
    .required("Category is required")
    .matches(
      /^[a-zA-Z_&_ ]*$/,
      "Category must not contain special characters or digits."
    ),
});

export const REGEXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
