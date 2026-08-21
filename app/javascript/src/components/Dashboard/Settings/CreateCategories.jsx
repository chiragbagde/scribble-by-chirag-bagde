import React from "react";

import { Formik, Form } from "formik";
import { Check } from "neetoicons";
import { Input } from "neetoui/formik";

import categoriesApi from "apis/categories";

import { CATEGORY_VALIDATION_SCHEMA } from "./constants";

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
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    createCategory && (
      <Formik
        initialValues={{ category: "" }}
        validationSchema={CATEGORY_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        <Form>
          <Input
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
