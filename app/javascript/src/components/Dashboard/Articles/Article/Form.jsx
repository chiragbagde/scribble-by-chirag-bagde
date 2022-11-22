import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, Dropdown } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import PageLoader from "components/PageLoader";

import { ARTICLES_FORM_VALIDATION_SCHEMA, STATUS } from "../constants";

const { Menu, MenuItem } = Dropdown;

const Form = ({ history, isEdit, article }) => {
  const [submitted, setSubmitted] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [changeCategory, setChangeCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState("Draft");

  const refetch = async () => await articlesApi.list();

  const handleInitialEdit = categories => {
    if (isEdit) {
      const matchingCategory = categories.map(
        ({ id }) => id === article.category_id
      );
      const matchingId = matchingCategory.indexOf(true);
      setChangeCategory({
        value: categories[matchingId].id,
        label: categories[matchingId].category,
      });
      setLabel(article.status);
    }
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      const category = categories.map(category => ({
        value: category.id,
        label: category.category,
      }));
      handleInitialEdit(categories);
      setCategoryList(category);
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async values => {
    if (values.status === "") values.status = label;
    try {
      if (isEdit) {
        await articlesApi.update(
          {
            ...values,
            category_id: values.category.value,
          },
          values.id
        );
      } else {
        await articlesApi.create({
          ...values,
          category_id: values.category.value,
        });
      }
      await refetch();
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  if (categoryList.length === 0 || loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Formik
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={ARTICLES_FORM_VALIDATION_SCHEMA(categoryList)}
      initialValues={{
        ...article,
        category: changeCategory,
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, dirty }) => (
        <FormikForm className="mx-auto mt-12 max-w-lg space-y-6">
          <div className="flex w-full flex-row space-x-3">
            <Input
              className="w-full flex-grow-0"
              label="Title"
              name="title"
              placeholder="Enter article title."
            />
            <Select
              isSearchable
              className="w-full flex-grow-0"
              label="Category"
              name="category"
              options={categoryList}
              placeholder="Select Category."
            />
          </div>
          <Textarea
            className="w-full flex-grow-0"
            label="Description"
            name="description"
            placeholder="Enter description"
            rows={10}
          />
          <div className="mt-4 flex gap-2">
            <div className="flex">
              <Button
                className="mr-px"
                disabled={!dirty}
                label={label === "Draft" ? "Save Draft" : "Published"}
                name="status"
                size="medium"
                style="primary"
                type="submit"
                onClick={() => setSubmitted(true)}
              />
              <Dropdown>
                <Menu>
                  {STATUS.map((item, idx) => (
                    <MenuItem.Button
                      disabled={isSubmitting}
                      key={idx}
                      value={item}
                      onClick={() => {
                        setFieldValue(
                          "status",
                          item !== "Draft" ? "Published" : "Draft"
                        );
                        setLabel(item);
                      }}
                    >
                      {item}
                    </MenuItem.Button>
                  ))}
                </Menu>
              </Dropdown>
            </div>
            <Button
              disabled={isSubmitting}
              label="Cancel"
              size="large"
              style="text"
              type="reset"
              onClick={() => history.push("/")}
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
