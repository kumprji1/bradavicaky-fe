import { Fragment, useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

// Utils
import { Role } from "../../../utils/roles";

import "./Navbar.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const auth = useContext(AuthContext);

  const adminLinks = [
    <NavLink
      key="0"
      className="mobile_nav__link"
      to="/registrace-zaka"
      onClick={() => setShow(false)}
    >
      Registrace žáka
    </NavLink>,
        <NavLink
        key="1"
        className="mobile_nav__link"
        to="/"
        onClick={() => setShow(false)}
      >
        Seznam žáků
      </NavLink>,
          <NavLink
          key="2"
          className="mobile_nav__link"
          to="/pridat-produkt"
          onClick={() => setShow(false)}
        >
          Přidat produkt
        </NavLink> ,
        <NavLink
        key="3"
        className="mobile_nav__link"
        to="/odmeny"
        onClick={() => setShow(false)}
      >
        Odměny
      </NavLink>
  ];

  const pupilsLinks = (
    <Fragment>
      <NavLink
        className="mobile_nav__link"
        key="2"
        to="/muj-profil"
        onClick={() => setShow(false)}
      >
        Můj profil
      </NavLink>
      <NavLink
        className="mobile_nav__link"
        key="3"
        to="/odmeny"
        onClick={() => setShow(false)}
      >
        Odměny
      </NavLink>
    </Fragment>
  );

  // No nav at all for un-auth users
  if (!auth.token) return null;

  return (
    <aside
      className={`mobile_nav--wrapper ${show ? "mobile_nav--showed" : ""}`}
    >
      <div
        className="mobile_nav--show_button"
        onClick={() => setShow((show) => !show)}
      >
        MENU
      </div>
      <nav className="mobile_nav">
        <ul className="mobile_nav__links">
          {/* Non-auth nav items */}
          {!auth.token && (
            <NavLink
            key="100"
              className="mobile_nav__link"
              to="/prihlaseni"
              onClick={() => setShow(false)}
            >
              Přihlášení
            </NavLink>
          )}

          {/* Admins nav items */}
          {auth.role === Role.ADMIN && adminLinks}

          {/* Pupils nav items */}
          {auth.role === Role.PUPIL && pupilsLinks}

          {/* Auth nav items */}
          {auth.token && (
            <Link
            key="101"
              className="mobile_nav__link"
              to="/prihlaseni"
              onClick={() => {
                auth.logout();
                setShow(false);
              }}
            >
              Odhlásit se
            </Link>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;
