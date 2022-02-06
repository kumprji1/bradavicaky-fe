import React, { useState, useContext, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useHttp } from "../../hooks/http-hook";
import ErrorModal from "../../shared/components/Error/ErrorModal";
import Answers_AdminView from "../components/Answers_AdminView";

const EditQuestionPage = () => {
  const questionId = useParams().idOtazky;

  const { sendRequest, error, clearError } = useHttp();
  const auth = useContext(AuthContext);

  const [loadedQuestion, setLoadedQuestion] = useState();

  useEffect(() => {
    const fetchQuestionData = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/question/${questionId}`,
        "GET",
        null,
        {
          "Content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setLoadedQuestion(responseData);
    };

    fetchQuestionData();
  }, [auth.token]);

  const postEditQuestionText = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/edit-question/${questionId}`,
        "PATCH",
        JSON.stringify({
          text: loadedQuestion.text,
        }),
        {
          "Content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
  };
  return (
    <div className="add_product--wrapper">
      <h1 className="add_product--title">Editace otázky</h1>
      {loadedQuestion && (
        <Fragment>
          <form
            className="column"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              value={loadedQuestion.text}
              onChange={(e) =>
                setLoadedQuestion({ ...loadedQuestion, text: e.target.value })
              }
              className="text-input"
              name="text"
              type="text"
              placeholder="Otázka"
            />
            <button
              className="small-button button-save"
              type="submit"
              onClick={postEditQuestionText}
            >
              Uložit nové znění otázky
            </button>
          </form>
          {error && <ErrorModal error={error} onClear={clearError} />}
          <Answers_AdminView questionId={questionId} />
        </Fragment>
      )}
    </div>
  );
};

export default EditQuestionPage;
