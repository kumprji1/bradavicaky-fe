import React, { useEffect, useState } from "react";

// Hooks
import { useHttp } from "../../hooks/http-hook";

import "./PupilsPage.css";

const PupilsPage = () => {
  const [loadedPupils, setLoadedPupils] = useState([]);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const fetchPupils = async () => {
      try {
        let pupils = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/pupils`
        );
        setLoadedPupils(pupils);
      } catch (err) {}
    };
    fetchPupils();
    console.log("fetchPupils()");
  }, []);

  const addPointsHandler = async (pupilsId, points) => {
    const response = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/admin/add-points`,
      "PATCH",
      JSON.stringify({
        pupilsId,
        points,
      }),
      { "Content-type": "application/json" }
    );
    if (response.msg === "success") {
      setLoadedPupils((pupils) =>
        pupils.map((p) => {
          if (p._id === pupilsId) p.points = response.points;
          return p;
        })
      );
    }
  };

  const removePointsHandler = async (pupilsId, points) => {
    const response = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/admin/remove-points`,
      "PATCH",
      JSON.stringify({
        pupilsId,
        points,
      }),
      { "Content-type": "application/json" }
    );
    if (response.msg === "success") {
      setLoadedPupils((pupils) =>
        pupils.map((p) => {
          if (p._id === pupilsId) p.points = response.points;
          return p;
        })
      );
    }
  };

  const pupilsJSX = (pupils) => {
    console.log(pupils);
    return pupils.map((pupil) => (
      <li key={pupil._id} className="pupils_page--pupil">
        <span className="pupils_page--pupil__name">
          {pupil.name} {pupil.surname}
        </span>
        <div className="pupils_page--pupil--points_wrapper">
          <button
            onClick={() => removePointsHandler(pupil._id, 5)}
            className="pupils_page--pupil__minus--button"
          >
            -
          </button>
          <span className="pupils_page--pupil__points">{pupil.points}</span>
          <button
            onClick={() => addPointsHandler(pupil._id, 5)}
            className="pupils_page--pupil__plus--button"
          >
            +
          </button>
        </div>
      </li>
    ));
  };

  return (
    <div className="pupils_page--wrapper">
      <h1 className="pupils_page--title">Čarodějové</h1>
      <ul className="pupils_page--pupils">
        {loadedPupils && pupilsJSX(loadedPupils)}
      </ul>
    </div>
  );
};

export default PupilsPage;
