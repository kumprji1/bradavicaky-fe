import React, { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";

// Hooks
import { useHttp } from "../../hooks/http-hook";

import "./AddProductPage.css";
import { useParams } from "react-router-dom";

const EditProductPage = () => {
  const { sendRequest } = useHttp();
  const history = useHistory();

  const [product, setProduct] = useState();

  const productId = useParams().idProduktu;

  let formInitialValues;
  if (product) {
    formInitialValues = {
      title: product.title,
      photo: product.photo,
      desc: product.desc,
      price: product.price,
      quantity: product.quantity,
    };
  }

  useEffect(() => {
      const fetchProduct = async () => {
        try {
            const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/admin/product/${productId}`
            );
            setProduct(responseData)
          } catch (err) {}      
      }
      fetchProduct()
  }, [sendRequest, productId]);

  const postEditProduct = async (values) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/edit-product/${productId}`,
        "PATCH",
        JSON.stringify(values),
        {
          "content-type": "application/json",
        }
      );
      history.push("/obchod");
    } catch (err) {}
  };

  return (
    <div className="add_product--wrapper">
      <h1 className="add_product--title">Přidání produktu</h1>
      {formInitialValues && <Formik initialValues={formInitialValues} onSubmit={postEditProduct}>
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
            Uložit
          </button>
        </Form>
      </Formik>}
    </div>
  );
};

export default EditProductPage;
