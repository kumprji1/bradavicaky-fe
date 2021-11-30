import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/auth-hook";

// Contexts
import { AuthContext } from "./contexts/AuthContext";

// Pages
import SigninPage from "./Auth/SigninPage";
import SignupAdminPage from "./Auth/SignupAdminPage";
import SignupPupilPage from "./Admin/pages/SignupPupilPage";
import PupilsPage from "./Admin/pages/PupilsPage";
import AddProductPage from "./Admin/pages/AddProductPage";
import ProductsPage from "./Admin/pages/ProductsPage";

// Components
import Navbar from "./shared/components/Navbar/Navbar";

// Utils 
import { Role } from "./utils/roles";

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
            {auth.role === Role.ADMIN && <Route path="/registrace-zaka" component={SignupPupilPage} />}
            {auth.role === Role.ADMIN && <Route path="/pridat-produkt" component={AddProductPage} />}
            {auth.token && <Route path="/odmeny" component={ProductsPage} />}
            {auth.role === Role.ADMIN && <Route path="/" component={PupilsPage} />}
            {!auth.token &&<Route path="/prihlaseni" component={SigninPage} />}
            {!auth.token &&<Route path="/" component={SigninPage} />}
            {/* <Route path="/" component={SigninPage} /> */}
          </Switch>
        </Router>
      </div>
     </AuthContext.Provider>
  );
}

export default App;
