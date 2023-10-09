import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>Login.js</h1>
      <form>
        <div>
          <label>e-mail</label>
          <input type="email" />
        </div>
        <div>
          <label>password</label>
          <input type="password" />
        </div>
        <button>Log-in</button>
      </form>
      <h3>Do you forget your password? </h3>
      <Link to="/changepassword">Change Password</Link>
      <h2>You don't have an account?</h2>
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default Login;
