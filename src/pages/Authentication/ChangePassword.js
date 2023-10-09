import React from "react";
import { Link } from "react-router-dom";

function ChangePassword() {
  return (
    <div>
      <h1>ChangePassword.js</h1>
      <form>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>Nickname</label>
          <input type="text" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <button>Change Password</button>

        <Link to="/login">Go Back</Link>
      </form>
    </div>
  );
}

export default ChangePassword;
