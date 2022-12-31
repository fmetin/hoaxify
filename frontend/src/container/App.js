import React from "react";
import ApiProgress from "../shared/ApiProgress";
import UserSignupPage from "../pages/UserSignupPage";
import LanguageSelector from "../component/LanguageSelector";
import LoginPage from "../pages/LoginPage";

function App() {
  return (
    <div className="row">
      <div className="col">
        <ApiProgress path="/v1/create-user">
          <UserSignupPage />
        </ApiProgress>
      </div>
      <div className="col">
        <ApiProgress path="/v1/auth">
          <LoginPage />
        </ApiProgress>
      </div>
      <LanguageSelector />
    </div>
  );
}

export default App;
