import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useHttp } from "../../hooks/http-hook";

import './TryLuckPage.css'

const TryLuckPage = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttp();
  const [canRoll, setCanRoll] = useState(false);
  const [reward, setReward] = useState();

  // Finds if pupil can roll (so if he hasn'n roll in last 24 hours)
  useState(() => {
    const fetchLastRoll = async () => {
      try {
        let responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/pupil/can-roll/${auth.userId}`,
          "GET",
          null,
          {
            "content-type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        setCanRoll(responseData.canRoll);
      } catch (err) {}
    };
    fetchLastRoll();
  }, [auth.token, auth.userId]);

  const postRoll = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/pupil/roll`,
        "POST",
        null,
        {
          "content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setCanRoll(false)
      setReward(responseData.text)
    } catch (err) {}
  };

  return (
    <div className="custom-page--wrapper">
      <h1 className="custom-page--title">Zkus štěstí ;)</h1>
      <button className="small-button button-save" disabled={!canRoll} onClick={postRoll}>
        Zkusit štěstí
      </button>
      <h2 className="reward">{reward}</h2>
    </div>
  );
};

export default TryLuckPage;
