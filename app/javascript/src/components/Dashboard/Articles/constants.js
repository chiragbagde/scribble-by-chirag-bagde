import * as yup from "yup";

export const ARTICLES_FORM_INITIAL_FORM_VALUES = {
  title: "",
  description: "",
  category: {
    value: "",
    label: "",
  },
  status: "",
};

export const REGEXP = /^/;

export const MENU_ITEMS = ["All", "Draft", "Published"];

export const FILTERING_OPTIONS = ["status", "author", "created", "category"];

export const ARTICLES_FORM_VALIDATION_SCHEMA = CATEGORIES =>
  yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .matches(/^[a-zA-Z0-9]+$/, "Title must be alphanumeric"),
    description: yup.string().required("Description is required"),
    category: yup
      .object()
      .nullable()
      .shape({
        label: yup.string().oneOf(CATEGORIES.map(category => category.label)),
        value: yup.string().oneOf(CATEGORIES.map(category => category.value)),
      })
      .required("Please select a Category"),
  });

export const STATUS = ["Draft", "Published"];
