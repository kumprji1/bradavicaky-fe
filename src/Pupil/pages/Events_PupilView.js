import React, { useEffect, useState } from "react";

import dayjs from "dayjs";

// Hooks
import { useHttp } from "../../hooks/http-hook";


// import "./Events_AdminView.css";

const Events_PupilView = () => {
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
      </li>
    ));
  };

  return (
    <div className="custom-page--wrapper">
      <h1 className="custom-page--title">Události</h1>
      <ul className="custom-page--events">
        {loadedEvents && eventsJSX(loadedEvents)}
      </ul>
    </div>
  );
};

export default Events_PupilView;
