import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, ActionDropdown, Toastr } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import PageLoader from "components/PageLoader";

import { ARTICLES_FORM_VALIDATION_SCHEMA, STATUS } from "../constants";

const { Menu, MenuItem } = ActionDropdown;

const Form = ({ history, isEdit, article }) => {
  const [submitted, setSubmitted] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [changeCategory, setChangeCategory] = useState({
    value: "",
    label: "",
  });
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const refetch = async () => await articlesApi.list();

  function handleStatus(values, item) {
    values.status = item;
    setSubmitted(true);
    handleSubmit(values);
  }

  const handleInitialEdit = categories => {
    if (isEdit) {
      const matchingCategory = categories.map(
        ({ id }) => id === article.assigned_category_id
      );
      const matchingId = matchingCategory.indexOf(true);
      setChangeCategory({
        value: matchingId,
        label: categories[matchingId].category,
      });
      setCategoryId(matchingId);
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
      setCategoriesList(category);
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async values => {
    try {
      if (isEdit) {
        await articlesApi.update(
          {
            ...values,
            author: "Oliver Smith",
            assigned_category_id: changeCategory.value,
          },
          values.id
        );
        Toastr.success("Article updated successfully.");
      } else {
        await articlesApi.create({
          ...values,
          assigned_category_id: changeCategory.value,
          author: "Oliver Smith",
        });
        Toastr.success("Article created successfully.");
      }
      refetch();
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Formik
      initialValues={article}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={ARTICLES_FORM_VALIDATION_SCHEMA(categoriesList)}
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
              isSearchable
              required
              className="w-full flex-grow-0"
              label="Category"
              name="category"
              options={categoriesList}
              placeholder="Select Category."
              value={
                (changeCategory.value && changeCategory) ||
                categoriesList[categoryId]
              }
              onChange={e =>
                setChangeCategory({
                  value: e.value,
                  label: e.label,
                })
              }
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
          <ActionDropdown label={isEdit ? "Update" : "Save Draft"}>
            <Menu>
              {STATUS.map((item, idx) => (
                <MenuItem.Button
                  disabled={isSubmitting}
                  key={idx}
                  value={item}
                  onClick={() => handleStatus(values, item)}
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
            type="reset"
            onClick={() => history.push("/")}
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
