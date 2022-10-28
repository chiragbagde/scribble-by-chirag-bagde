import React from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";

import CategoriesApi from "apis/categories";

const CreateCategories = ({
  fetchCategories,
  length,
  createCategory,
  setCreateCategory,
}) => {
  const handleSubmit = async values => {
    try {
      await CategoriesApi.create({ category: values.category, order: length });
      setCreateCategory(!createCategory);
      fetchCategories();
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
            placeholder="Enabling 2FA"
            suffix={<Check />}
          />
        </Form>
      </Formik>
    )
  );
};

export default CreateCategories;
