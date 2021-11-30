import React, { useEffect, useState } from "react";

import { useHttp } from "../../hooks/http-hook";

import "./ProductsPage.css";

const ProductsPage = () => {
  const { sendRequest } = useHttp();

  const [loadedProducts, setLoadedProducts] = useState([]);

  const productsJSX = (products) => {
    return products.map((product) => (
      <li key={product._id} className="product--wrapper">
        <div className="product--title">{product.title}</div>
        <div className="product_img--wrapper">
          <img src={product.photo} alt={product.title} />
        </div>
        <div className="product--quantity">Ve sklepení: <span className="bold">{product.quantity}</span> ks</div>
        <div className="product--price">Cena: <span className="bold">{product.price}</span></div>
        <div className="product_buy--wrapper">
            <button className="button-submit"> Akcio!</button>
        </div>
      </li>
    ));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/products`
      );
      setLoadedProducts(responseData);
    };

    fetchProducts();
  }, []);

  return (
    <div className="custom-page--wrapper">
      <h1 className="custom-page--title">Odměny</h1>
      <ul className="products_page--pupils">
        {loadedProducts && productsJSX(loadedProducts)}
      </ul>
    </div>
  );
};

export default ProductsPage;
