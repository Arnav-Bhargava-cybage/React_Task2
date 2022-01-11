import "./Components/RegistrationForm";
import RegistrationForm from "./Components/RegistrationForm";
import SignInForm from "./Components/SignInForm";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Switch } from "react-router";
import ForgotPassword from "./Components/ForgotPassword";
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={RegistrationForm} />
          <Route path="/SignInForm" exact={true} component={SignInForm} />
          <Route
            path="/ForgotPassword"
            exact={true}
            component={ForgotPassword}
          />
          <Route path="/Home" exact={true} component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
