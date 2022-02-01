import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

// Hooks
import { useHttp } from "../../hooks/http-hook";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

import "./Market_AdminView.css";

const Market_AdminView = () => {
  const { sendRequest } = useHttp();
  const auth = useContext(AuthContext);

  const [loadedProducts, setLoadedProducts] = useState([]);

  const productsJSX = (products) => {
    return products.map((product) => (
      <li key={product._id} className="product--wrapper">
        <div className="product--title">{product.title}</div>
        <div className="product_img--wrapper">
          <img src={product.photo} alt={product.title} />
        </div>
        <div className="product--quantity">
          Ve sklepení: <span className="bold">{product.quantity}</span> ks
        </div>
        <div className="product--price">
          Cena: <span className="bold">{product.price}</span>
        </div>
        <div className="product_buttons--wrapper">
          <button className="small-button button-edit"> Upravit</button>
          <button className="small-button button-delete"> Odstranit</button>
        </div>
      </li>
    ));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/products`,
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
  }, []);

  return (
    <div className="custom-page--wrapper">
      <h1 className="custom-page--title">Obchod</h1>
      <Link to="pridat-produkt" className="custom-page--create_link">Přidat produkt</Link>
      <ul className="products_page--pupils">
        {loadedProducts && productsJSX(loadedProducts)}
      </ul>
    </div>
  );
};

export default Market_AdminView;
