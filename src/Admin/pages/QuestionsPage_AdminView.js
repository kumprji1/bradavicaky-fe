import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useHttp } from "../../hooks/http-hook";

import { Role } from "../../utils/roles";

import "./Questions_AdminView.css";

const QuestionsPage_AdminView = () => {
  const { sendRequest } = useHttp();
  const auth = useContext(AuthContext);

  const [loadedQuestions, setLoadedQuestions] = useState();

  useEffect(() => {
    const fetchQuestions = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/questions`,
        "GET",
        null,
        {
          "Content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setLoadedQuestions(responseData);
    };

    fetchQuestions();
  }, [auth.token]);

  const deleteQuestionHandler = async (id) => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/question/${id}`,
        "DELETE",
        null,
        {
          "content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setLoadedQuestions(loadedQuestions.filter((q) => q._id !== id));
    } catch (err) {}
  };

  const questionsJSX = (questions) => {
    return questions.map((question) => (
      <div className="questions_page--question column">
        <Link
          className="question__link"
          to={`/otazka/${question._id}`}
          key={question._id}
        >
          <div className="row">
            <div className="questions_page--question__text">
              {question.text}
            </div>
          </div>
        </Link>
        <div className="row">
          {auth.role === Role.ADMIN && (
            <Link
              className="small-button button-edit"
              to={`/editovat-otazku/${question._id}`}
            >
              Upravit
            </Link>
          )}
          {auth.role === Role.ADMIN && (
            <button
              className="small-button button-delete"
              onClick={() => deleteQuestionHandler(question._id)}
            >
              Odebrat
            </button>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="custom-page--wrapper">
      <h1 className="custom-page--title">Otázky</h1>
      {auth.role === Role.ADMIN && (
        <Link className="custom-page--create_link" to="/pridat-otazku">
          Přidat otázku
        </Link>
      )}
      {loadedQuestions && questionsJSX(loadedQuestions)}
    </div>
  );
};

export default QuestionsPage_AdminView;
