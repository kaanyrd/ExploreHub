import React, { useEffect, useState } from "react";
import classes from "./PlacesList.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

function PlacesList({ data }) {
  const [photoData, setPhotoData] = useState(1);
  const [photoUsage, setPhotoSelf] = useState(data[0].p1);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (photoData === 1) {
        setPhotoSelf(data[0].p1);
        setPhotoData((prev) => prev + 1);
        return;
      } else if (photoData === 2) {
        setPhotoSelf(data[0].p2);
        setPhotoData((prev) => prev + 1);
        return;
      } else if (photoData === 3) {
        setPhotoSelf(data[0].pp);
        setPhotoData(1);
        return;
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [photoData, photoUsage, data]);

  return (
    <div className={classes.list}>
      {data.map((item) => (
        <Link to={item.id}>
          <div className={classes.item}>
            <div className={classes.cardTopInfo}>
              <div>
                <div>
                  <p className={classes.location}>
                    <LocationOnIcon />
                    {item.city}, {item.country}
                  </p>
                </div>
              </div>
            </div>
            <div className={classes.imgs}>
              <img className={classes.imgsSelf} src={photoUsage} alt="icon" />
              <div className={classes.ppImgSide}>
                <img className={classes.ppImgSelf} src={item.pp} alt="icon" />
                <small>
                  <strong className={classes.nickName}>
                    @{item.nickName} at {item.place}
                  </strong>
                  <span className={classes.dot}>•</span>{" "}
                  <small className={classes.durat}>{item.duration}</small>
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
