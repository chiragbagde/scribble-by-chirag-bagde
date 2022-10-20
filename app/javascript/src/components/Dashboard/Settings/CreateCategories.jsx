import React, { useState } from "react";

import { Check, Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";

import CategoriesApi from "apis/categories";

const CreateCategories = ({ fetchCategories, length }) => {
  const [createCategory, setCreateCategory] = useState(false);

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
    <>
      <div className="my-6 flex text-indigo-500">
        <Plus size={20} onClick={() => setCreateCategory(!createCategory)} />
        <Typography className="ml-1" style="h4">
          Add New Category
        </Typography>
      </div>
      {createCategory && (
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
      )}
    </>
  );
};

export default CreateCategories;
