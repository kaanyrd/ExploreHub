import React from "react";
import { Link } from "react-router-dom";

function SideBarOpened() {
  return (
    <div>
      <h1>SideBarOpened.js</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/places">Places</Link>
        </li>
      </ul>
      <form>
        <div>
          <label>Country</label>
          <input type="text" />
        </div>
        <div>
          <label>City</label>
          <input type="text" />
        </div>
        <div>
          <label>Tags</label>
          <input type="text" />
        </div>
        <button>Search</button>
      </form>
    </div>
  );
}

export default SideBarOpened;
