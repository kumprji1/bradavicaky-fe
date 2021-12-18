import React from "react";

import { Formik, Form, Field } from "formik";

// Hooks
import { useHttp } from '../../hooks/http-hook'

import "./AddProductPage.css";

const AddProductPage = () => {
    const { sendRequest } = useHttp()

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
        }
      );
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
    </div>
  );
};

export default AddProductPage;
