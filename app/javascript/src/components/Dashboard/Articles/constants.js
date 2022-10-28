import { buildSelectOptions } from "utils";
import * as yup from "yup";

export const ARTICLES_FORM_INITIAL_FORM_VALUES = {
  title: "",
  description: "",
  assigned_category: {
    id: "",
    category: "",
  },
};

export const CATEGORIES = buildSelectOptions([
  "Misc",
  "Getting Started",
  "Security & Privacy",
]);

export const MENU_ITEMS = ["All", "Draft", "Published"];

export const filteringOptions = [
  "title",
  "status",
  "author",
  "created_at",
  "assigned_category_id",
];

export const ARTICLES_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  categories: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().oneOf(CATEGORIES.map(category => category.label)),
        value: yup.string().oneOf(CATEGORIES.map(category => category.value)),
      })
    )
    .min(1, "Please select atleast one category")
    .required("Please select atleast one category"),
});

export const STATUS = ["Draft", "Published"];

export const CONTACTS_LIST = [
  {
    title: "Welcome to Scribble",
    author: "Oliver Smith",
    createdAt: "Jan 1st, 2022",
    category: "Misc",
    status: "draft",
    id: 10,
  },
  {
    title: "Welcome to Scribble as a project",
    author: "Oliver Smith",
    createdAt: "February 1st, 2022",
    category: "Misc",
    status: "Published",
    id: 20,
  },
  {
    title: "Welcome to Scribble",
    author: "Oliver Smith",
    createdAt: "April 4th, 2022",
    category: "MisGetting Started",
    status: "draft",
    id: 30,
  },
  {
    title: "Welcome to Scribble",
    author: "Oliver Smith",
    createdAt: "March 3rd,2022",
    category: "Security & Privacy ",
    status: "Published",
    id: 40,
  },
];
