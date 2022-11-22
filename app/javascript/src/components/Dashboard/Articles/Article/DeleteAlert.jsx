import React from "react";

import { Alert } from "neetoui";

const DeleteAlert = ({ onClose, id, destroyArticle, title }) => {
  const handleDelete = () => {
    destroyArticle(id);
    onClose();
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
