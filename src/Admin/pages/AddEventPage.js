import React, { useState } from "react";

// DatePicker
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cs from "date-fns/locale/cs";

// Hooks
import { useHttp } from "../../hooks/http-hook";

import "./AddProductPage.css";

registerLocale("cs", cs);

const AddEventPage = () => {
    const { sendRequest } = useHttp();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());

  const postAddEvent = async (e) => {
      e.preventDefault()
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/add-event`,
        "POST",
        JSON.stringify({
            title: title,
            description: description,
            date: date
        }),
        {
          "content-type": "application/json",
        }
      );
    } catch (err) {}
  };

  return (
    <div className="add_product--wrapper">
      <h1 className="add_product--title">Přidání produktu</h1>
      <form className="column" onSubmit={postAddEvent}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="text-input"
          name="title"
          type="text"
          placeholder="Název"
        />
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="text-input"
          name="description"
          type="text"
          placeholder="Popis"
        />
        <DatePicker className="datePicker" selected={date} onChange={(date) => setDate(date)} locale="cs"/>
        <button className="button-submit" type="submit">
          Odeslat
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
