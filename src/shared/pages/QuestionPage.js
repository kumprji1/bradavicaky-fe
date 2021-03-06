import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useHttp } from "../../hooks/http-hook";
import { Role } from "../../utils/roles";

import ErrorModal from '../../shared/components/Error/ErrorModal'

import "./QuestionPage.css";

const QuestionPage = () => {
  const { sendRequest, error, clearError } = useHttp();
  const auth = useContext(AuthContext);
  const questionId = useParams().idOtazky;

  const [loadedQuestion, setLoadedQuestion] = useState([]);
  const [loadedAnswers, setLoadedAnswers] = useState([]);
  const [loadedVotes, setLoadedVotes] = useState([]);

  const [canVote, setCanVote] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
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
      } catch (err) {}
    };

    fetchQuestion();
  }, [auth.token, questionId]);

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

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/votes-of-question/${questionId}`,
          "GET",
          null,
          {
            "Content-type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        // Finds if user already voted earlier
        let foundPupilsVote = responseData.filter(
          (v) => v.pupilId === auth.userId && v.questionId === questionId
        );
        if (foundPupilsVote.length === 0) {
          setCanVote(true);
        }
        setLoadedVotes(responseData);
      } catch (err) {}
    };

    fetchVotes();
  }, [auth.token, questionId, canVote]);

  const postVote = async (answerId) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/pupil/add-vote`,
        "POST",
        JSON.stringify({
          questionId: questionId,
          answerId: answerId,
          pupilId: auth.userId,
        }),
        {
          "content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setCanVote(false);
    } catch (err) {}
  };

  const answerJSX = (answers) => {
    return answers.map((a) => (
      <div className="questions_page--question column">
        <div className="question__link" key={a._id}>
          <div className="row question_answers_votes">
            <div className="questions_page--question__text">{a.text}</div>
            {canVote && auth.role === Role.PUPIL && (
              <button
                className="small-button button-save"
                onClick={() => postVote(a._id)}
              >
                Hlasovat
              </button>
            )}
            <div className="question_page--votes">
              {loadedVotes.filter((an) => an.answerId === a._id).length} hlas??
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="custom-page--wrapper">
      <h1 className="custom-page--title">Ot??zka</h1>
      <div className="column">
        <div className="questions_page--question__text">
          {loadedQuestion.text}
        </div>
        <h1 className="question-page--answers-title">Odpov??di:</h1>
        {loadedAnswers && answerJSX(loadedAnswers)}
      </div>
      {error && <ErrorModal error={error} onClear={clearError}/>}
    </div>
  );
};

export default QuestionPage;
