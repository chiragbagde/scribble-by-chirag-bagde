import React, { useEffect, useState } from "react";

import { Delete, Edit, Reorder } from "@bigbinary/neeto-icons";
import { Typography, Toastr } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import CategoriesApi from "apis/categories";
import PageLoader from "components/PageLoader";

import CreateCategories from "./CreateCategories";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [showId, setShowId] = useState(0);
  const [orderUpdated, setOrderUpdated] = useState(false);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await CategoriesApi.list();
      setCategories(categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
    setOrderUpdated(false);
  };

  const handleSubmit = async values => {
    try {
      await CategoriesApi.update({ ...values }, showId);
      Toastr.success("Category updated successfully.");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
    await fetchCategories();
    setShowInput(false);
  };

  const handle_update_two = async (positions, reorderedItem) => {
    try {
      await CategoriesApi.update_two(positions, reorderedItem.id);
      setOrderUpdated(true);
    } catch (error) {
      logger.error(error);
      setLoading(false);
      setOrderUpdated(false);
    }
  };

  const handleOnDragEnd = result => {
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const positions = items.map(({ id }) => id);
    setCategories(items);
    handle_update_two(positions, reorderedItem);
  };

  const handleDelete = async id => {
    try {
      await CategoriesApi.destroy(id);
      Toastr.success("Category deleted successfully.");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
    await fetchCategories();
    setShowInput(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [orderUpdated]);

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
      <CreateCategories
        fetchCategories={fetchCategories}
        length={categories.length}
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="categories">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {categories.map(({ category, id }, index) => (
                <Draggable draggableId={String(id)} index={index} key={id}>
                  {provided => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border-b my-6 flex justify-between border-solid pb-3 tracking-tight"
                      ref={provided.innerRef}
                    >
                      {showInput && showId === id ? (
                        <Formik
                          initialValues={{ category: "" }}
                          onSubmit={handleSubmit}
                        >
                          <Form>
                            <Input
                              className="w-64"
                              name="category"
                              placeholder={category}
                            />
                          </Form>
                        </Formik>
                      ) : (
                        <div className="flex">
                          <Reorder color="gray" size={20} />
                          <Typography className="ml-3" style="h4">
                            {category}
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
                            setShowId(id);
                          }}
                        />
                        <Delete
                          color="gray"
                          size={20}
                          onClick={() => handleDelete(id)}
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
    </div>
  );
};

export default ManageCategories;
