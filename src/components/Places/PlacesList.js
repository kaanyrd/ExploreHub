import React from "react";
import classes from "./PlacesList.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

function PlacesList({ data }) {
  return (
    <div>
      {data?.length === 0 && (
        <h3 className={classes.infoText}>No post yet...</h3>
      )}
      <div className={classes.list}>
        {data?.map((item) => (
          <Link key={item?.id} to={item?.id}>
            <div className={classes.item}>
              <div className={classes.cardTopInfo}>
                <div>
                  <div>
                    <p className={classes.location}>
                      <LocationOnIcon />
                      {item?.city}, {item?.country}
                    </p>
                  </div>
                </div>
              </div>
              <div className={classes.imgs}>
                <img
                  className={classes.imgsSelf}
                  src={item?.mainPhoto}
                  alt="icon"
                />
                <div className={classes.ppImgSide}>
                  <img
                    className={classes.ppImgSelf}
                    src={item?.pp}
                    alt="icon"
                  />
                  <small>
                    <strong className={classes.nickName}>
                      @{item?.nickName} at {item?.place}
                    </strong>
                    <span className={classes.dot}>•</span>{" "}
                    <small className={classes.durat}>1d ago</small>
                  </small>
                </div>
                <div className={classes.imgInfo}></div>
              </div>
              <div className={classes.description}>
                <strong>
                  {item.firstName} {item.lastName} says...
                </strong>
                <p>{item?.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PlacesList;
