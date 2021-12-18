import React, { useContext } from "react";

// Hooks
import { useHttp } from "../../../hooks/http-hook";

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

const OrderedProduct = (props) => {
  const { sendRequest } = useHttp();
  const auth = useContext(AuthContext)
  const refundProductHandler = async (productId) => {
    // const responseData = await sendRequest(
    //   `${process.env.REACT_APP_BACKEND_URL}/api/pupil/refund-product/${productId}`,
    //   "POST",
    //   null,
    //   { "Content-type": "application/json",
    //     Authorization: 'Bearer ' + auth.token }
    // );
  };

  return (
    <li key={props._id + Math.random()} className="product--wrapper">
      <div className="product--title">{props.title}</div>
      <div className="product_img--wrapper">
        <img src={props.photo} alt={props.title} />
      </div>
      <div className="product_buy--wrapper">
        {/* <button className="button-submit" disabled={false} onClick={() => refundProductHandler(props._id.toString())}>
          Vrátit 
        </button> */}
      </div>
    </li>
  );
};

export default OrderedProduct;
