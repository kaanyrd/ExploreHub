import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div>
      <h1>Signup.js</h1>
      <form>
        <div>
          <label>FirstName</label>
          <input type="text" />
        </div>
        <div>
          <label>LastName</label>
          <input type="text" />
        </div>
        <div>
          <label>Nickname</label>
          <input type="text" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" />
        </div>
        <button>Sign-up</button>
      </form>
      <div>
        <p>You have an account ? </p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
