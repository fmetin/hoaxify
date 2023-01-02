import React from "react";
import LanguageSelector from "../component/LanguageSelector";
import LoginPage from "../pages/LoginPage";
import UserSignupPage from "../pages/UserSignupPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import TopBar from "../component/TopBar";
import { Authentication } from "../shared/AuthenticationContext";

class App extends React.Component {
  static contextType = Authentication;
  state = {
    isLoggedIn: false,
    username: undefined
  }

  onLoginSuccess = (username) => {
    this.setState({
      username,
      isLoggedIn: true
    })
  }

  onLogoutSuccess = () => {
    this.setState({
      username: undefined,
      isLoggedIn: false
    })
  }
  render() {
    const isLoggedIn = this.context.state.isLoggedIn;
    const username = undefined;
    // const { isLoggedIn, username } = this.state;
    return (
      <div>
        <Router>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {
              !isLoggedIn && <Route path="/login" component={LoginPage} />}
            <Route path="/signup" component={UserSignupPage} />
            <Route path="/user/:username" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
        <LanguageSelector />
      </div>
    );
  };

}

export default App;
