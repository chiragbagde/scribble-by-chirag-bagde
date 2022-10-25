import React, { useEffect, useState } from "react";

import { Typography, Button } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";

import authApi from "apis/auth";
import PageLoader from "components/PageLoader";
import { setToLocalStorage } from "utils/storage";

const Authenticate = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [siteName, setSiteName] = useState("");

  const fetchSiteTitle = async () => {
    try {
      const {
        data: { users },
      } = await authApi.fetchUserDetails();
      setSiteName(users[0]["site_name"]);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async values => {
    try {
      const response = await authApi.login({
        password: values.password,
        site_name: siteName,
      });
      setToLocalStorage({
        authToken: response.data.authentication_token,
      });
      history.push("/public");
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchSiteTitle();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

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