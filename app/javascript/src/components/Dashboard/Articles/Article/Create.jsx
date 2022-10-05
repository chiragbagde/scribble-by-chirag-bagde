import React from "react";

import Form from "./Form";

import { ARTICLES_FORM_INITIAL_FORM_VALUES } from "../constants";

const Create = ({ history }) => (
  <Form article={ARTICLES_FORM_INITIAL_FORM_VALUES} history={history} />
);

export default Create;
