import React from "react";
import MainNavigation from "../../components/MainNavigation/MainNavigation";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const goHomeHandler = () => {
    navigate("/");
  };

  return (
    <div>
      <MainNavigation />
      <hr />
      <h2>An error has occured</h2>
      <button onClick={goHomeHandler}>Go Home</button>
    </div>
  );
}

export default Error;
