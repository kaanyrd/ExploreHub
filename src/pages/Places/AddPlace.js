import React from "react";
import classes from "./AddPlace.module.css";

function AddPlace() {
  return (
    <div>
      <h1>AddPlace.js</h1>
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
          <label>date</label>
          <input type="date" />
        </div>
        <div>
          <label>Photo</label>
          <input type="text" />
        </div>
        <div>
          <label>Photo2</label>
          <input type="text" />
        </div>
        <div>
          <label>Photo3</label>
          <input type="text" />
        </div>
        <button>Share</button>
      </form>
    </div>
  );
}

export default AddPlace;
