import React, { useEffect, useState, useContext } from "react";

// Components
import DeliveredProduct from "./DeliveredProduct";

// Hooks
import { useHttp } from "../../../hooks/http-hook";

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

const DeliveredProducts = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttp();

  const [loadedProducts, setLoadedProducts] = useState([]);

  const productsJSX = (products) => {
    return products.map((product) => (
      <DeliveredProduct
        key={product._id + Math.random()}
        _id={product._id}
        title={product.title}
        photo={product.photo}
        quantity={product.quantity}
        price={product.price}
      />
    ));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/pupil/delivered-products/${auth.userId}`,
        "GET",
        null,
        {
          "Content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setLoadedProducts(responseData);
    };

    fetchProducts();
  }, [auth.userId, auth.token]);

  return (
    <ul className="products_page--pupils">
      {loadedProducts && productsJSX(loadedProducts)}
    </ul>
  );
};

export default DeliveredProducts;
