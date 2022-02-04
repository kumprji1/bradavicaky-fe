import React, { useEffect, useState, useContext } from "react";
import dayjs from "dayjs";

// Hooks
import { useHttp } from "../../hooks/http-hook";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

import "./OrdersToDeliverPage.css";

const OrdersToDeliverPage = () => {
  const { sendRequest } = useHttp();
  const auth = useContext(AuthContext);

  const [loadedOrders, setLoadedOrders] = useState([]);

  const ordersJSX = (orders) => {
    return orders.map((order) => (
      <li key={order._id} className="order--wrapper">
        <div className="order_pupils-info--wrapper">
          <div className="order--pupils_name">
            {order.pupilId.name} {order.pupilId.surname}
          </div>
          <p className="order--pupils_username">({order.pupilId.username})</p>
          <p>
            <i>objednal/a:</i>
          </p>
          <p>
            <i>{dayjs(order.orderedAt).format("DD. MM. YYYY")}</i>
          </p>
        </div>
        <div className="order_product-info--wrapper">
          <p className="order_product--name">{order.productId.title}</p>
          <div className="order_img--wrapper">
            <img src={order.productId.photo} alt={order.productId.title} />
          </div>
        </div>
        <div className="order_buttons--wrapper">
          <button
            className="button-submit"
            onClick={() => patchDeliverOrder(order._id)}
          >
            {" "}
            Porvrdit doručení
          </button>
        </div>
      </li>
    ));
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/undelivered-orders`,
          "GET",
          null,
          {
            "Content-type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        setLoadedOrders(responseData);
      } catch (err) {}
    };
    fetchOrders();
  }, []);

  const patchDeliverOrder = async (orderId) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/deliver-order/${orderId}`,
        "PATCH",
        null,
        {
          "Content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setLoadedOrders(orders => orders.filter(o => o._id !== orderId))
    } catch (err) {}
  };

  return (
    <div className="custom-page--wrapper">
      <h1 className="custom-page--title">Objednávky</h1>
      <ul className="orders_page--pupils">
        {loadedOrders && ordersJSX(loadedOrders)}
      </ul>
    </div>
  );
};

export default OrdersToDeliverPage;
