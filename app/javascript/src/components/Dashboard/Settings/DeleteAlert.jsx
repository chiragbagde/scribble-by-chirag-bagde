import React, { useState } from "react";

import { Warning } from "neetoicons";
import { Modal, Button, Select, Typography, Callout, Toastr } from "neetoui";

import categoriesApi from "apis/categories";

const DeleteAlert = ({
  categories,
  categoryToBeDeleted,
  onClose,
  setCategoryUpdated,
}) => {
  const [moveToCategory, setMoveToCategory] = useState({
    value: null,
    label: null,
  });

  const handleDelete = async () => {
    try {
      await categoriesApi.destroy(categoryToBeDeleted.id, {
        category: [categoryToBeDeleted.id, moveToCategory.value],
      });
      Toastr.success("Category deleted successfully.");
    } catch (error) {
      logger.error(error);
    }
    setCategoryUpdated(true);
    onClose();
  };

  const handleOpen = () => {
    if (categories.length === 1) {
      handleDelete();

      return false;
    }

    return true;
  };

  const categoryList = categories
    .map(category => ({
      label: category.category,
      value: category.id,
    }))
    .filter(category => category.value !== categoryToBeDeleted.id);

  return (
    <Modal isOpen={handleOpen()} onClose={onClose}>
      <Modal.Header>
        <Typography id="dialog1Title" style="h2">
          Delete Category
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2">
        <Typography className="mb-3" style="h5">
          {`You are permanently deleting category ${categoryToBeDeleted.category}. This action cannot be undone.`}
        </Typography>
        <Callout className="mb-3" icon={Warning} style="danger">
          {`Category ${categoryToBeDeleted.category} has ${categoryToBeDeleted.assigned_articles.length} articles. Before this category can be deleted, these
          articles needs to be moved to another category`}
        </Callout>
        <Select
          isSearchable
          required
          label="Select a category"
          name="category"
          options={categoryList}
          placeholder="Select Category"
          onChange={e => setMoveToCategory(e)}
        />
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button
          label="Proceed"
          style="danger"
          type="submit"
          onClick={handleDelete}
        />
        <Button label="Cancel" style="text" type="cancel" onClick={onClose} />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAlert;
