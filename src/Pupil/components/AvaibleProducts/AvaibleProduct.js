import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

// Hooks
import { useHttp } from "../../../hooks/http-hook";

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

import "./AvaibleProduct.css";

const AvaibleProduct = (props) => {
  const { sendRequest } = useHttp();
  const auth = useContext(AuthContext)
  const history = useHistory()

  const buyProductHandler = async (productId) => {
    console.log('Posíláám')
    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/pupil/buy-product/${productId}`,
      "POST",
      null,
      { "Content-type": "application/json",
        Authorization: 'Bearer ' + auth.token }
    );
    console.log('Vráátit na homepage')
      history.push('/')
  };

  return (
    <li key={props._id} className="product--wrapper">
      <div className="product--title">{props.title}</div>
      <div className="product_img--wrapper">
        <img src={props.photo} alt={props.title} />
      </div>
      <div className="product--quantity">
        Ve sklepení: <span className="bold">{props.quantity}</span> ks
      </div>
      <div className="product--price">
        Cena: <span className="bold">{props.price}</span>
      </div>
      <div className="product_buy--wrapper">
        <button className="button-submit" disabled={props.notEnoughMoney} onClick={() => buyProductHandler(props._id.toString())}>
          Akcio!
        </button>
      </div>
    </li>
  );
};

export default AvaibleProduct;
