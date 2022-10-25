import React, { useEffect, useState } from "react";

import { Check, Close } from "@bigbinary/neeto-icons";
import { Typography, Checkbox, Button } from "@bigbinary/neetoui";
import { Input } from "@bigbinary/neetoui/formik";
import { Formik, Form } from "formik";

import authApi from "apis/auth";
import PageLoader from "components/PageLoader";

const General = ({ status, setStatus }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const handleSubmit = async values => {
    const password = values.password;
    const site_name = values.siteName;
    try {
      await authApi.update({
        site_name,
        password,
        status,
      });
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchUser = async () => {
    try {
      const {
        data: { users },
      } = await authApi.fetchUserDetails();
      setUser(users[0]);
      setStatus(users[0].status === "checked");
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleStatus = async status => {
    setStatus(status);
    const currentStatus = status ? "checked" : "unchecked";
    try {
      await authApi.updateStatus(
        {
          site_name: user.site_name,
          status: currentStatus,
        },
        user.id
      );
    } catch (error) {
      logger.error(error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto my-6">
      <Formik
        initialValues={{ password: "", siteName: "" }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Typography style="h2">General Settings</Typography>
          <Typography className="text-gray-600" style="body2">
            Configure general attributes Of scribble
          </Typography>
          <div className="my-6">
            <Input label="Site Name" name="siteName" />
            <Typography className="text-gray-600" style="body3">
              Customize the site name which is used to show the site name in
            </Typography>
            <Typography className="font-semibold text-gray-700" style="body3">
              Open Graph Tags.{" "}
            </Typography>
          </div>
          <Checkbox
            checked={status}
            className="my-6"
            id="checkbox_name"
            label="Password Protect Knowledge Base"
            onChange={() => handleStatus(!status)}
          />
          <Input
            className="my-3"
            label="Password"
            name="password"
            type="password"
          />
          <span className="flex">
            <Check color="green" size={24} />
            <Typography className=" ml-2" style="body2">
              Have at least 6 characters
            </Typography>
          </span>
          <span className="flex">
            <Close color="red" size={24} />
            <Typography className=" ml-2" style="body2">
              Include at least 1 letter and 1 number
            </Typography>
          </span>
          <Button
            className="mr-3"
            label="Save Changes"
            size="large"
            style="primary"
            type="submit"
          />
          <Button label="Cancel" size="large" style="text" />
        </Form>
      </Formik>
    </div>
  );
};

export default General;
