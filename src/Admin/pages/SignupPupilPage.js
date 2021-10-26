import React from "react";
import { Formik, Form, Field } from "formik";

// Hooks
import { useHttp } from '../../hooks/http-hook'

const SignupPupilPage = () => {
    const { sendRequest } = useHttp();

    const formInitialValues = {
      username: "",
      name: "",
      surname: "",
      password: "",
      rePassword: "",
    };
    const postRegisterHandler = async (values) => {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/register-pupil`,
        "POST",
        JSON.stringify(values),
        {
            'content-type': 'application/json'
        }
      );
    };
  
    return (
      <div>
        <p>Registrace žáka</p>
        <Formik initialValues={formInitialValues} onSubmit={postRegisterHandler}>
          <Form>
            <Field name="username" type="text" placeholder="Uživatelské jméno"/>
            <Field name="name" type="text" placeholder="Jméno" />
            <Field name="surname" type="text" placeholder="Příjmení" />
            <Field name="password" type="password" placeholder="Heslo" />
            <Field name="rePassword" type="password" placeholder=" Heslo znovu" />
            <button type="submit">Registrace</button>
          </Form>
        </Formik>
      </div>
    );
  }

export default SignupPupilPage
