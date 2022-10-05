import React, { useState } from "react";

import { Button, ActionDropdown } from "@bigbinary/neetoui";
import { Input, Textarea, Select } from "@bigbinary/neetoui/formik";
import { Formik, Form as FormikForm } from "formik";

import articlesApi from "apis/articles";

import {
  CATEGORIES,
  ARTICLES_FORM_VALIDATION_SCHEMA,
  STATUS,
} from "../constants";

const { Menu, MenuItem } = ActionDropdown;

const Form = ({ article, history }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async values => {
    const arr = values.categories.map(({ label }) => label);
    try {
      setSubmitted(true);
      await articlesApi.create({
        ...values,
        categories: arr,
      });
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Formik
      initialValues={article}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={ARTICLES_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <FormikForm className="mx-auto mt-12 max-w-lg space-y-6">
          <div className="flex w-full flex-row space-x-3">
            <Input
              required
              className="w-full flex-grow-0"
              label="Title"
              name="title"
              placeholder="Enter article title."
            />
            <Select
              isMulti
              isSearchable
              required
              className="w-full flex-grow-0"
              label="Category"
              name="categories"
              options={CATEGORIES}
              placeholder="Select Category."
            />
          </div>
          <Textarea
            required
            className="w-full flex-grow-0"
            label="Description"
            name="description"
            placeholder="Enter description"
            rows={10}
          />
          <ActionDropdown label="Save Draft">
            <Menu>
              {STATUS.map((item, idx) => (
                <MenuItem.Button
                  disabled={isSubmitting}
                  key={idx}
                  value={item}
                  onClick={() => {
                    values.status = item;
                    handleSubmit(values);
                  }}
                >
                  {item}
                </MenuItem.Button>
              ))}
            </Menu>
          </ActionDropdown>
          <Button
            disabled={isSubmitting}
            label="Cancel"
            size="large"
            style="text"
            type="submit"
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
