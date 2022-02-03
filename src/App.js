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
import Market_PupilView from "./Pupil/pages/Market_PupilView";
import Market_AdminView from "./Admin/pages/Market_AdminView";
import HomePupilsPage from "./Pupil/pages/HomePupilsPage";
import OrdersToDeliverPage from "./Admin/pages/OrdersToDeliverPage";
import Events_AdminView from "./Admin/pages/Events_AdminView";
import AddEventPage from "./Admin/pages/AddEventPage";
import Events_PupilView from "./Pupil/pages/Events_PupilView";
import QuestionsPage_AdminView from "./Admin/pages/QuestionsPage_AdminView";
import AddQuestionPage from "./Admin/pages/AddQuestionPage";
import EditQuestionPage from "./Admin/pages/EditQuestionPage";
import QuestionPage from "./shared/pages/QuestionPage";

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

            {/* Shared routes */}
            {auth.token && <Route path="/otazky" component={QuestionsPage_AdminView} />}
            {auth.token && <Route path="/otazka/:idOtazky" component={QuestionPage} />}

            {/* Admin routes */}
            {auth.role === Role.ADMIN && <Route path="/registrace-zaka" component={SignupPupilPage} />}
            {auth.role === Role.ADMIN && <Route path="/pridat-produkt" component={AddProductPage} />}
            {auth.role === Role.ADMIN && <Route path="/obchod" component={Market_AdminView} />}
            {auth.role === Role.ADMIN && <Route path="/objednavky" component={OrdersToDeliverPage} />}
            {auth.role === Role.ADMIN && <Route path="/udalosti" component={Events_AdminView} />}
            {auth.role === Role.ADMIN && <Route path="/pridat-udalost" component={AddEventPage} />}
            {auth.role === Role.ADMIN && <Route path="/pridat-otazku" component={AddQuestionPage} />}
            {auth.role === Role.ADMIN && <Route path="/editovat-otazku/:idOtazky" component={EditQuestionPage} />}
            {auth.role === Role.ADMIN && <Route path="/" component={PupilsPage} />}

            {/* Pupil routes */}
            {auth.role === Role.PUPIL && <Route path="/obchod" component={Market_PupilView} />}
            {auth.role === Role.PUPIL && <Route path="/udalosti" component={Events_PupilView} />}
            {auth.role === Role.PUPIL && <Route path="/" component={HomePupilsPage} />}
           
            {/* no-Auth routes */}
            {!auth.token && <Route path="/prihlaseni" component={SigninPage} />}
            {!auth.token && <Route path="/" component={SigninPage} />}

            {/* <Route path="/" component={SigninPage} /> */}
          </Switch>
        </Router>
      </div>
     </AuthContext.Provider>
  );
}

export default App;
