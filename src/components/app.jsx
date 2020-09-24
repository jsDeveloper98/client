import React from "react";
import "../styles/app.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "../routes";
import { useAuth } from "../hooks/auth";
import { AuthContext } from "../contexts/auth";
import BootstrapNavbar from "../reusable-components/nav-bar";

const App = () => {
  const { login, logout, token, userId } = useAuth();
  const isAuthentiacted = !!token;
  const routes = useRoutes(isAuthentiacted);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        userId,
        isAuthentiacted,
      }}
    >
      <Router>
        {isAuthentiacted && <BootstrapNavbar />}
        {routes}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
