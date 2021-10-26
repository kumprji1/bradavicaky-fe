import { Fragment, useContext } from "react";
import { NavLink, Link } from "react-router-dom";

// Contexts
import { AuthContext } from "../../../contexts/AuthContext";

// Utils
import { Role } from "../../../utils/roles";

const Navbar = () => {
  const auth = useContext(AuthContext);

  const adminLinks = (
    <Fragment>
      <NavLink to="/registrace-zaka">Registrace žáka</NavLink>
    </Fragment>
  );

  const pupilsLinks = (
    <Fragment>
      <NavLink to="/random-user-link">Random user link</NavLink>
    </Fragment>
  );

  // No nav at all for un-auth users
  if (!auth.token) return null;

  return (
    <nav>
      <ul>
        {/* Non-auth nav items */}
        {!auth.token && <NavLink to="/prihlaseni">Přihlášení</NavLink>}

        {/* Admins nav items */}
        {auth.role === Role.ADMIN && adminLinks}

        {/* Pupils nav items */}
        {auth.role === Role.PUPIL && pupilsLinks}

        {/* Auth nav items */}
        {auth.token && (
          <Link to="/prihlaseni" onClick={auth.logout}>
            Odhlásit se
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
