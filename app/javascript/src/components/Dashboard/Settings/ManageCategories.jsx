import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { Delete, Edit, Reorder, Plus } from "neetoicons";
import { Typography, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";
import PageLoader from "components/PageLoader";

import CreateCategories from "./CreateCategories";
import DeleteAlert from "./DeleteAlert";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [createCategory, setCreateCategory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [showId, setShowId] = useState(0);
  const [categoryUpdated, setCategoryUpdated] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [categoryToBeDeleted, setCategoryToBeDeleted] = useState([]);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
    setCategoryUpdated(false);
  };

  const handleSubmit = async values => {
    try {
      setCategoryUpdated(true);
      await categoriesApi.update({ ...values }, showId);
      Toastr.success("Category updated successfully.");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
    setShowInput(false);
  };

  const handleUpdatePosition = async (position, id) => {
    try {
      await categoriesApi.updatePosition(position, id);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleOnDragEnd = result => {
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCategories(items);
    handleUpdatePosition(result.destination.index + 1, reorderedItem.id);
  };

  const handleDelete = category => {
    setShowDeleteAlert(true);
    setCategoryToBeDeleted(category);
  };

  useEffect(() => {
    fetchCategories();
  }, [categoryUpdated]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto my-6 w-1/3">
      <Typography style="h3">Manage Categories</Typography>
      <Typography className="mt-1 text-gray-600" style="body1">
        Create and configure the categories inside your scribble.
      </Typography>
      <div className="my-6 flex text-indigo-500">
        <Plus size={20} onClick={() => setCreateCategory(!createCategory)} />
        <Typography className="ml-1" style="h4">
          Add New Category
        </Typography>
      </div>
      <CreateCategories
        createCategory={createCategory}
        fetchCategories={fetchCategories}
        length={categories.length}
        setCreateCategory={setCreateCategory}
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="categories">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {categories.map((category, index) => (
                <Draggable
                  draggableId={String(category.id)}
                  index={index}
                  key={category.id}
                >
                  {provided => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border-b my-6 flex justify-between border-solid pb-3 tracking-tight"
                      ref={provided.innerRef}
                    >
                      {showInput && showId === category.id ? (
                        <Formik
                          initialValues={{ category: "" }}
                          onSubmit={handleSubmit}
                        >
                          <Form>
                            <Input
                              className="w-64"
                              name="category"
                              placeholder={category.category}
                            />
                          </Form>
                        </Formik>
                      ) : (
                        <div className="flex">
                          <Reorder color="gray" size={20} />
                          <Typography className="ml-3" style="h4">
                            {category.category}
                          </Typography>
                        </div>
                      )}
                      <div className="flex">
                        <Edit
                          className="ml-3"
                          color="gray"
                          size={20}
                          onClick={() => {
                            setShowInput(!showInput);
                            setShowId(category.id);
                          }}
                        />
                        <Delete
                          color="gray"
                          size={20}
                          onClick={() => handleDelete(category)}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {showDeleteAlert && (
        <DeleteAlert
          categories={categories}
          categoryToBeDeleted={categoryToBeDeleted}
          setCategoryUpdated={setCategoryUpdated}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
    </div>
  );
};

export default ManageCategories;
