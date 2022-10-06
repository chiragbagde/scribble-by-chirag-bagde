import React from "react";

import { Alert, Toastr } from "@bigbinary/neetoui";

const DeleteAlert = ({ onClose, slug, destroyArticle, title }) => (
  <Alert
    isOpen
    message={`Are you sure you want to continue deleting ${title}? This cannot be undone.`}
    title="Delete Contact"
    onSubmit={() => {
      destroyArticle(slug);
      onClose();
      Toastr.success("Article is deleted successfully.");
    }}
  />
);

export default DeleteAlert;
