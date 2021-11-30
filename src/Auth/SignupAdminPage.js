import React from "react";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";

// Hooks
import { useHttp } from "../hooks/http-hook";

const SignupAdminPage = () => {
  const history = useHistory();
  const { sendRequest } = useHttp();

  const formInitialValues = {
    username: "",
    name: "",
    surname: "",
    password: "",
    rePassword: "",
  };
  const postRegisterHandler = async (values) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/register-admin`,
        "POST",
        JSON.stringify(values),
        {
          "content-type": "application/json",
        }
      );
      history.push("/prihlaseni");
    } catch (error) {}
  };

  return (
    <div>
      <p>Registrace admina</p>
      <Formik initialValues={formInitialValues} onSubmit={postRegisterHandler}>
        <Form>
          <Field name="username" type="text" placeholder="Uživatelské jméno" />
          <Field name="name" type="text" placeholder="Jméno" />
          <Field name="surname" type="text" placeholder="Příjmení" />
          <Field name="password" type="password" placeholder="Heslo" />
          <Field name="rePassword" type="password" placeholder=" Heslo znovu" />
          <button type="submit">Registrace</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignupAdminPage;
