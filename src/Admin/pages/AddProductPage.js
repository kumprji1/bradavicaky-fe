import React, { useContext } from "react";

import { Formik, Form, Field } from "formik";
import { useHistory } from 'react-router-dom'

import ErrorModal from "../../shared/components/Error/ErrorModal";

// Hooks
import { useHttp } from '../../hooks/http-hook'

import { AuthContext } from "../../contexts/AuthContext";

import "./AddProductPage.css";

const AddProductPage = () => {
  const auth = useContext(AuthContext);
    const { sendRequest, error, clearError } = useHttp()
    const history = useHistory();

  const formInitialValues = {
    title: "",
    photo: "",
    desc: "",
    price: "",
    quantity: "",
  };

  const postAddProduct = async (values) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/add-product`,
        "POST",
        JSON.stringify(values),
        {
          "content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push('/obchod')
    } catch (err) {}
  };

  return (
    <div className="add_product--wrapper">
      <h1 className="add_product--title">Přidání produktu</h1>
      <Formik initialValues={formInitialValues} onSubmit={postAddProduct}>
        <Form className="custom_form">
          <Field
            className="text-input"
            name="title"
            type="text"
            placeholder="Název"
          />
          <Field
            className="text-input"
            name="photo"
            type="text"
            placeholder="Foto"
          />
          <Field
            className="text-input"
            name="desc"
            type="text"
            placeholder="Popis"
          />
          <Field
            className="text-input"
            name="price"
            type="text"
            placeholder="Cena"
          />
          <Field
            className="text-input"
            name="quantity"
            type="text"
            placeholder="Počet"
          />
          <button className="button-submit" type="submit">
            Přidat
          </button>
        </Form>
      </Formik>
      {error && <ErrorModal error={error} onClear={clearError} />}
    </div>
  );
};

export default AddProductPage;
