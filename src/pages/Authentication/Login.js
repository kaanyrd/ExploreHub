import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>Login.js</h1>
      <h2>
        You don't have an account? <Link to="/signup">Signup</Link>
      </h2>
    </div>
  );
}

export default Login;
