import React, { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useHttp } from "../../hooks/http-hook";
import CreateAnswer from "./CreateAnswer";

const Answers_AdminView = ({ questionId }) => {
  const { sendRequest } = useHttp();
  const auth = useContext(AuthContext);

  const [loadedAnswers, setLoadedAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/answers-of-question/${questionId}`,
          "GET",
          null,
          {
            "Content-type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        setLoadedAnswers(responseData);
      } catch (err) {}
    };

    fetchAnswers();
  }, [auth.token, questionId]);

  const addAnswerToLocalState = (answer) => {
    setLoadedAnswers((state) => {
      const updatedState = [...state];
      updatedState.push(answer);
      return updatedState;
    });
  };

  const deleteAnswerHandler = async (deletedId) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/answer/${deletedId}`,
        "DELETE",
        null,
        {
          "Content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (error) {}
    setLoadedAnswers((state) => state.filter((a) => a._id !== deletedId));
  };

  const answersJSX = (answers) => {
    return answers.map((answer) => (
      <div className="questions_page--question column">
        <div className="question__link" key={answer._id}>
          <div className="row">
            <div className="questions_page--question__text">{answer.text}</div>
            <button
              className="small-button button-delete"
              onClick={() => deleteAnswerHandler(answer._id)}
            >
              Odebrat
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="column">
      <h2 className="edit-page--answers_title">Odpovědi na otázku</h2>
      {loadedAnswers && answersJSX(loadedAnswers)}
      <h3 className="edit-page--answers_title" type="submit">
        Nová odpověď
      </h3>
      <CreateAnswer
        questionId={questionId}
        addAnswerLocal={addAnswerToLocalState}
      />
    </div>
  );
};

export default Answers_AdminView;
