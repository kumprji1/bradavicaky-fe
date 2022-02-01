import React, { useState, useEffect, useContext } from "react";

// Components
import AvaibleProducts from "../components/AvaibleProducts/AvaibleProducts";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

// Hooks
import { useHttp } from "../../hooks/http-hook";

import "./Market_PupilView.css";

const Market_PupilView = () => {

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttp();

  // Loaded points of pupil by username
  const [points, setPoints] = useState(0)

  useEffect(() => {
    const fetchPupilsPoints = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/pupil/points/${auth.username}`,
        'GET',
        null,
        {
          "Content-Type": "application/json",
        }
      );
      setPoints(responseData.points)
    };
    fetchPupilsPoints()
  }, [auth.username]);

  return (
    <div className="custom-page--wrapper">
      <h1 className="custom-page--title">Dostupné odměny</h1>
      <p className="pupils_market--points">Máte {points} bradavičáků</p>
      <AvaibleProducts points={points}/>
    </div>
  );
};

export default Market_PupilView;
