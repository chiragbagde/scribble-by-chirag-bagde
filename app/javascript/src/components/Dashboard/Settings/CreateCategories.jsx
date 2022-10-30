import React from "react";

import { Formik, Form } from "formik";
import { Check } from "neetoicons";
import { Toastr } from "neetoui";
import { Input } from "neetoui/formik";

import categoriesApi from "apis/categories";

const CreateCategories = ({
  fetchCategories,
  length,
  createCategory,
  setCreateCategory,
}) => {
  const handleSubmit = async values => {
    try {
      await categoriesApi.create({ category: values.category, order: length });
      setCreateCategory(!createCategory);
      await fetchCategories();
      Toastr.success("Category created successfully.");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    createCategory && (
      <Formik initialValues={{ category: "" }} onSubmit={handleSubmit}>
        <Form>
          <Input
            className="my-6 h-8 w-64"
            name="category"
            placeholder="Type category and press enter"
            suffix={<Check />}
          />
        </Form>
      </Formik>
    )
  );
};

export default CreateCategories;
