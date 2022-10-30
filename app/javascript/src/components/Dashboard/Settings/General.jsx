import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { Check, Close } from "neetoicons";
import { Typography, Checkbox, Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";

import organisationsApi from "apis/organisations";
import PageLoader from "components/PageLoader";
import { deleteFromLocalStorage, setToLocalStorage } from "utils/storage";

import { REGEXP } from "./constants";

const General = ({ status, setStatus }) => {
  const [loading, setLoading] = useState(true);
  const [organisation, setOrganisation] = useState({});
  const [visible, setVisible] = useState("visible");
  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);
  const [validate, setValidate] = useState(false);
  const [checkLength, setCheckLength] = useState(false);
  const [checkPasswordRegex, setCheckPasswordRegex] = useState(false);

  const handleClick = () => {
    setChecked(!checked);
    setValidate(false);
    if (!checked) {
      deleteFromLocalStorage();
    } else {
      setToLocalStorage({
        authToken: organisation.authentication_token,
      });
    }
  };

  const fetchUser = async () => {
    try {
      const {
        data: { organisations },
      } = await organisationsApi.fetch();
      setOrganisation(organisations);
      setStatus(organisations.status === "checked");
      setChecked(organisations.status === "checked");
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleDisabled = () => {
    setIsDisabled(!isDisabled);
    if (isDisabled) {
      setVisible("invisible");
    } else {
      setVisible("visible");
    }
  };

  const updateEntries = values => {
    const currentStatus = checked ? "checked" : "unchecked";
    const password = values.password;
    const siteName = values.siteName;
    let updateEntries = {};
    if (password === "******") {
      updateEntries = { status: currentStatus, site_name: siteName };
    } else {
      updateEntries = { status: currentStatus, password, site_name: siteName };
    }
    let validateEntry = null;
    if (
      siteName !== organisation["site_name"] ||
      currentStatus !== organisation["status"]
    ) {
      validateEntry = true;
    }

    if (
      siteName === organisation["site_name"] &&
      currentStatus === organisation["status"] &&
      password === "******"
    ) {
      validateEntry = false;
    }

    return { updateEntries, validateEntry };
  };

  const validatePassword = password => {
    if (password === "******" || !checked) {
      setValidate(false);

      return false;
    }
    setValidate(true);
    password.length >= 6 ? setCheckLength(true) : setCheckLength(false);
    REGEXP.test(password)
      ? setCheckPasswordRegex(true)
      : setCheckPasswordRegex(false);
    if (password.length >= 6 && REGEXP.test(password)) return true;

    return false;
  };

  const handleSubmit = async values => {
    const checkPassword = validatePassword(values.password);
    const obj = updateEntries(values);
    try {
      if (obj.validateEntry || checkPassword) {
        await organisationsApi.update(obj.updateEntries);
        Toastr.success("Settings updated Successfully");
      } else {
        Toastr.warning("Please update the values with valid checks");
      }
      setStatus(!status);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [status]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="justify between mx-auto flex w-1/3 flex-col space-y-6 py-6">
      <Formik
        initialValues={{
          password: "******",
          siteName: organisation["site_name"],
        }}
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
            checked={checked}
            className="my-6"
            id="checkbox_name"
            label="Password Protect Knowledge Base"
            onChange={() => {}}
            onClick={handleClick}
          />
          {checked && (
            <span className="my-3 flex">
              <Input
                className="w-45"
                disabled={isDisabled}
                label="Password"
                name="password"
                type="password"
              />
              <Button
                className={`mx-2 my-6 md:${visible}`}
                label="Change Password"
                size="small"
                style="primary"
                onClick={handleDisabled}
              />
            </span>
          )}
          {validate && (
            <>
              <span className="flex">
                {checkLength ? (
                  <Check color="green" size={24} />
                ) : (
                  <Close color="red" size={24} />
                )}
                <Typography className=" ml-2" style="body2">
                  Have at least 6 characters
                </Typography>
              </span>
              <span className="flex">
                {checkPasswordRegex ? (
                  <Check color="green" size={24} />
                ) : (
                  <Close color="red" size={24} />
                )}
                <Typography className=" ml-2" style="body2">
                  Include at least 1 letter and 1 number
                </Typography>
              </span>
            </>
          )}
          <Button
            className="mr-3 mt-2"
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
