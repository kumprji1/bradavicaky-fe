import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useHttp } from "../../hooks/http-hook";
import ErrorModal from "../../shared/components/Error/ErrorModal";

const CreateAnswer = ({ questionId, addAnswerLocal, deleteAnswerLocal }) => {
  const { sendRequest, error, clearError } = useHttp();
  const auth = useContext(AuthContext);

  const [text, setText] = useState("");

  const postCreateAnswerHandler = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/create-answer`,
        "POST",
        JSON.stringify({
          questionId: questionId,
          text: text,
        }),
        {
          "Content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setText("");
      addAnswerLocal(responseData.answer);
    } catch (err) {}
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="column">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-input"
          name="text"
          type="text"
          placeholder="Odpověď"
        />
        <button
          className="small-button button-save"
          type="submit"
          onClick={postCreateAnswerHandler}
        >
          Uložit odpověď
        </button>
      </form>
      {error && <ErrorModal error={error} onClear={clearError} />}
    </div>
  );
};

export default CreateAnswer;
