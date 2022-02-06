import React, { useContext, useState } from "react";
import { useHistory } from "react-router";

import ErrorModal from "../../shared/components/Error/ErrorModal";

import { AuthContext } from "../../contexts/AuthContext";
import { useHttp } from "../../hooks/http-hook";

const AddQuestionPage = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, error, clearError } = useHttp();
  const history = useHistory();

  const [text, setText] = useState("");

  const addQuestionHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/add-question`,
        "POST",
        JSON.stringify({
          text: text,
        }),
        {
          "content-type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/editovat-otazku/" + response.question._id);
    } catch (err) {}
  };

  return (
    <div className="add_product--wrapper">
      <h1 className="add_product--title">Položení otázky</h1>
      <form className="column" onSubmit={addQuestionHandler}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-input"
          name="text"
          type="text"
          placeholder="Otázka"
        />
        <button className="button-submit" type="submit">
          Odeslat
        </button>
      </form>
      {error && <ErrorModal error={error} onClear={clearError} />}
    </div>
  );
};

export default AddQuestionPage;
