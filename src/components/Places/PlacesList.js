import React from "react";
import classes from "./PlacesList.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

function PlacesList({ data }) {
  return (
    <div>
      {data.map((item) => (
        <Link to={item.id}>
          <div
            className={classes.item}
            style={{ border: "1px solid red", marginTop: "10px" }}
          >
            <div className={classes.cardTopInfo}>
              <div>
                <div>
                  <p className={classes.location}>
                    <LocationOnIcon />
                    {item.city}, {item.country}
                  </p>
                </div>
              </div>
              <div>
                <p>
                  <span className={classes.dot}>•</span>{" "}
                  <small>{item.duration}</small>
                </p>
              </div>
            </div>
            <div className={classes.imgs}>
              <img className={classes.imgsSelf} src={item.p1} alt="icon" />
              <div className={classes.ppImgSide}>
                <img className={classes.ppImgSelf} src={item.pp} alt="icon" />
                <small>
                  <strong className={classes.nickName}>
                    @{item.nickName} at {item.place}
                  </strong>
                </small>
              </div>
              <div className={classes.imgInfo}></div>
            </div>
            <div className={classes.description}>
              <strong>
                {item.firstName} {item.lastName} says...
              </strong>
              <p>{item.explanation}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PlacesList;
