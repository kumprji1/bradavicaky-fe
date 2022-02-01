import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";

// Hooks
import { useHttp } from "../../hooks/http-hook";

import { AuthContext } from "../../contexts/AuthContext";

import "./Events_AdminView.css";

const Events_AdminView = () => {
  const auth = useContext(AuthContext)
  const [loadedEvents, setloadedEvents] = useState([]);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let events = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/events`
        );
        setloadedEvents(events);
      } catch (err) {}
    };
    fetchEvents();
  }, []);

  const deleteEventHandler = async (id) => {
    try {
      const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/admin/event/${id}`,
      'DELETE',
      null,
      {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      })
    } catch (err) {
    }
    setloadedEvents(loadedEvents.filter(e => e._id !== id))
  }

  const eventsJSX = (events) => {
    console.log(events);
    return events.map((event) => (
      <li key={event._id} className="events_page--event column">
        <div className="events_page--event_upper-wrapper column">
          <div className="events_page--event__title">{event.title}</div>
          <div className="events_page--event__date"><i>{dayjs(event.date).format('DD. MM. YYYY')}</i></div>
        </div>
        <div className="events_page--event__desc">
            {event.description}
        </div>
        <div className="events_page--event__buttons">
            <button className="small-button button-edit">
                Upravit
            </button>
            <button className="small-button button-delete" onClick={() => deleteEventHandler(event._id)}>
                Odstranit
            </button>
        </div>
      </li>
    ));
  };

  return (
    <div className="custom-page--wrapper">
      <h1 className="custom-page--title">Události</h1>
      <Link className="custom-page--create_link" to="/pridat-udalost">
        Přidat událost
      </Link>
      <ul className="custom-page--events">
        {loadedEvents && eventsJSX(loadedEvents)}
      </ul>
    </div>
  );
};

export default Events_AdminView;
