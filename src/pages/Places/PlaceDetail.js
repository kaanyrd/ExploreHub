import React from "react";
import { useParams } from "react-router-dom";

function PlaceDetail() {
  const params = useParams();

  return (
    <div>
      <h1>PlaceDetail.js</h1>
      <h3>{params.placesId}</h3>
    </div>
  );
}

export default PlaceDetail;
