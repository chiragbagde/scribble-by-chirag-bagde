import React from "react";

import { Alert, Toastr } from "@bigbinary/neetoui";

const DeleteAlert = ({ onClose, slug, destroyArticle, title }) => {
  const handleDelete = () => {
    destroyArticle(slug);
    onClose();
    Toastr.success("Article is deleted successfully.");
  };

  return (
    <Alert
      isOpen
      message={`Are you sure you want to continue deleting ${title}? This cannot be undone.`}
      title="Delete Article"
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
