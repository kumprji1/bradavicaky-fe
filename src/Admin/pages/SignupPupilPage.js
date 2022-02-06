import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";

import ErrorModal from "../../shared/components/Error/ErrorModal";

// Hooks
import { useHttp } from "../../hooks/http-hook";

import { AuthContext } from '../../contexts/AuthContext'

const SignupPupilPage = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [responseMsg, setResponseMsg] = useState('');
  const { sendRequest, error, clearError } = useHttp();

  const formInitialValues = {
    username: "",
    name: "",
    surname: "",
    password: "",
    rePassword: "",
    college: "nebelvir",
  };
  const postRegisterHandler = async (values) => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/register-pupil`,
        "POST",
        JSON.stringify(values),
        {
          "content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
        setResponseMsg(response.msg)
        setTimeout(() => history.push('/'), 1200)
    } catch (err) {}
  };
  return (
    <div className="form--wrapper">
      <Formik initialValues={formInitialValues} onSubmit={postRegisterHandler}>
        <Form className="custom_form">
          <Field type="hidden" />
          <Field
            className="text-input"
            name="username"
            type="text"
            placeholder="Uživatelské jméno"
          />
          <Field
            className="text-input"
            name="name"
            type="text"
            placeholder="Jméno"
          />
          <Field
            className="text-input"
            name="surname"
            type="text"
            placeholder="Příjmení"
          />
          <Field
            className="text-input"
            name="password"
            type="password"
            placeholder="Heslo"
          />
          <Field
            className="text-input"
            name="rePassword"
            type="password"
            placeholder=" Heslo znovu"
          />
          <Field as="select" name="college">
            <option value="nebelvír">Nebelvír</option>
            <option value="mrzimor">Mrzimor</option>
            <option value="havraspár">Havraspár</option>
            <option value="zmijozel">Zmijozel</option>
          </Field>
          <button className="button-submit" type="submit">
            Registrace
          </button>
          <p className="responseMsg">{responseMsg}</p>
        </Form>
      </Formik>
      {error && <ErrorModal error={error} onClear={clearError}/>}
    </div>
  );
};

export default SignupPupilPage;
