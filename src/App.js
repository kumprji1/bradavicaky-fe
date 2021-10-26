import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/auth-hook";

// Contexts
import { AuthContext } from "./contexts/AuthContext";

// Pages
import SigninPage from "./Auth/SigninPage";
import SignupAdminPage from "./Auth/SignupAdminPage";
import SignupPupilPage from "./Admin/pages/SignupPupilPage";

// Components
import Navbar from "./shared/components/Navbar/Navbar";

import "./App.css";

function App() {
  const auth = useAuth();
  return (
    <AuthContext.Provider
    value = {auth}
    >
      <div className="app">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/registrace-admina" component={SignupAdminPage} />
            <Route path="/registrace-zaka" component={SignupPupilPage} />
            <Route path="/prihlaseni" component={SigninPage} />
            <Route path="/" component={SigninPage} />
          </Switch>
        </Router>
      </div>
     </AuthContext.Provider>
  );
}

export default App;