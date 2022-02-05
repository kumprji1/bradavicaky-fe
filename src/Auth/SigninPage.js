import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";

// Hooks
import { useHttp } from "../hooks/http-hook";

// Contexts
import { AuthContext } from "../contexts/AuthContext";

// Utils
import { Role } from "../utils/roles";

import "./SigninPage.css";
import Spinner from "../shared/components/Spinner/Spinner";

const SigninPage = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error } = useHttp();
  const history = useHistory();

  const formInitialValues = {
    username: "",
    password: "",
  };

  const postLoginHandler = async (values) => {
    let responseData;
    try {
      // Retrieving user data
      responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        "POST",
        JSON.stringify({
          username: values.username,
          password: values.password,
        }),
        {
          "Content-type": "application/json",
        }
      );
    } catch (err) {}

    // Login in client
    auth.login(
      responseData._id,
      responseData.username,
      responseData.name,
      responseData.surname,
      responseData.role,
      responseData.token
    );

    // Redirect for pupil and teacher(admin)
    if (responseData.role === Role.PUPIL) history.push("/odmeny");
    else history.push("/");
  };

  return (
    <div className="form--wrapper column">
      <Formik initialValues={formInitialValues} onSubmit={postLoginHandler}>
        <Form className="custom_form">
          <Field
            className="text-input"
            name="username"
            type="text"
            placeholder="Uživatelské jméno"
          />
          <Field
            className="text-input"
            name="password"
            type="password"
            placeholder="Heslo"
          />
          <button className="button-submit" type="submit">
            Alohomora
          </button>
        </Form>
      </Formik>
      <p>{error}</p>
      <div className="spinner--wrapper"> {isLoading && <Spinner />}</div>
    </div>
  );
};

export default SigninPage;
