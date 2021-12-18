import React, { useEffect, useState } from "react";

// Components
import AvaibleProduct from "./AvaibleProduct";

import { useHttp } from "../../../hooks/http-hook";

import "./AvaibleProducts.css";

const AvaibleProducts = (props) => {
  const { sendRequest } = useHttp();

  const [loadedProducts, setLoadedProducts] = useState([]);

  const productsJSX = (products) => {
    return products.map((product) => (
      <AvaibleProduct
        key={product._id}
        _id={product._id}
        title={product.title}
        photo={product.photo}
        quantity={product.quantity}
        price={product.price}
        notEnoughMoney={props.points < product.price}
      />
    ));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/pupil/avaible-products`
      );
      setLoadedProducts(responseData);
    };

    fetchProducts();
  }, []);

  return (
    <ul className="products_page--pupils">
      {loadedProducts && productsJSX(loadedProducts)}
    </ul>
  );
};

export default AvaibleProducts;
