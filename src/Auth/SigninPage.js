import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";

// Hooks
import { useHttp } from "../hooks/http-hook";

// Contexts
import { AuthContext } from "../contexts/AuthContext";

const SigninPage = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttp();

  const formInitialValues = {
    username: "",
    password: "",
  };

  const postLoginHandler = async (values) => {
    // Retrieving user data
    const responseData = await sendRequest(
      "http://localhost:5000/api/auth/login",
      "POST",
      JSON.stringify({
        username: values.username,
        password: values.password,
      }),
      {
        "Content-type": "application/json",
      }
    );

    // Login in client
    auth.login(
      responseData._id,
      responseData.username,
      responseData.name,
      responseData.surname,
      responseData.role,
      responseData.token
    );
  };

  return (
    <div>
      <Formik initialValues={formInitialValues} onSubmit={postLoginHandler}>
        <Form>
          <Field name="username" type="text" placeholder="Uživatelské jméno" />
          <Field name="password" type="password" placeholder="Heslo" />
          <button type="submit">Přihlásit se</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SigninPage;
