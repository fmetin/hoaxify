import React from "react";
import LanguageSelector from "../component/LanguageSelector";
import LoginPage from "../pages/LoginPage";
import UserSignupPage from "../pages/UserSignupPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import TopBar from "../component/TopBar";
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    const {isLoggedIn} = this.props;
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

const mapStateToProps = (store) => {
  const {isLoggedIn } = store;
  return {
      isLoggedIn
  }
}

export default connect(mapStateToProps)(App);
