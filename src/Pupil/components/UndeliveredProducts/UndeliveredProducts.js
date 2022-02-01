import React, { useEffect, useState, useContext } from "react";

// Components
import UndeliveredProduct from "./UndeliveredProduct";

// Hooks
import { useHttp } from "../../../hooks/http-hook";

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

const UndeliveredProducts = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttp();

  const [loadedProducts, setLoadedProducts] = useState([]);

  const productsJSX = (products) => {
    return products.map((product) => (
      <UndeliveredProduct
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
    if (!auth.token) return
    const fetchProducts = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/pupil/undelivered-orders/${auth.userId}`,
        "GET",
        null,
        {
          "Content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      // Setting only product info from orders
      setLoadedProducts(responseData.map(o => o.productId));
    };

    fetchProducts();
  }, [auth.userId, auth.token]);

  return (
    <ul className="products_page--pupils row">
      {loadedProducts && productsJSX(loadedProducts)}
    </ul>
  );
};

export default UndeliveredProducts;
