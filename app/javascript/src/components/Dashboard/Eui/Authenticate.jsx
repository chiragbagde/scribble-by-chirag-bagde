import React from "react";

import { Typography, Button } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";

import authApi from "apis/auth";

const Authenticate = ({ setIsLoggedIn }) => {
  const handleSubmit = async values => {
    try {
      const response = await authApi.login(values.password);
      if (response.status === 200) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      logger.error(error);
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="my-8 flex justify-center">
      <Formik initialValues={{ password: "" }} onSubmit={handleSubmit}>
        <Form>
          <Typography
            className="text-2xl font-semibold not-italic leading-9"
            style="h3"
          >
            Spinkart is password protected!
          </Typography>
          <Typography
            className="text-2xl font-semibold text-gray-500 "
            style="body3"
          >
            Enter the password to gain access to Spinkart.
          </Typography>
          <Input
            required
            className="my-3"
            label="Password"
            name="password"
            type="password"
          />
          <Button
            className="mr-3"
            label="Continue"
            size="medium"
            style="primary"
            type="submit"
          />
        </Form>
      </Formik>
    </div>
  );
};

export default Authenticate;
