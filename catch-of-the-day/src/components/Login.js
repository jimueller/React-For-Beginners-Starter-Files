import React from "react";
import PropTypes from "prop-types";
import { AuthProvider } from "../helpers";

const Login = (props) => {
  return (
    <nav className="login">
      <h2>Inventory Login</h2>
      <p>Sign in to manage your store's inventory.</p>
      <button
        className="github"
        onClick={() => props.authenticate(AuthProvider.GITHUB)}
      >
        Login with Github
      </button>
      <button
        className="microsoft"
        onClick={() => props.authenticate(AuthProvider.MICROSOFT)}
      >
        Login with Microsoft
      </button>
      <button
        className="twitter"
        onClick={() => props.authenticate(AuthProvider.TWITTER)}
      >
        Login with Twitter
      </button>
    </nav>
  );
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
