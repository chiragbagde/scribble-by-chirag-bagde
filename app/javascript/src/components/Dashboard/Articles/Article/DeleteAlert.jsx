import React from "react";

import { Alert, Toastr } from "neetoui";

const DeleteAlert = ({ onClose, id, destroyArticle, title }) => {
  const handleDelete = () => {
    destroyArticle(id);
    onClose();
    Toastr.success("Article is deleted successfully.");
  };

  return (
    <Alert
      isOpen
      message={`Are you sure you want to continue deleting this ${title}? This cannot be undone.`}
      title="Delete Article"
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
