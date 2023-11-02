import React, { useEffect, useState } from "react";
import classes from "./PlacesList.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

function PlacesList({ data }) {
  const [activeTags, setActiveTags] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const onTagChangeHandler = (e) => {
    setActiveTags(e);
    setFilteredData(data.filter((post) => post.place === e));
  };

  const onAllTagHandler = () => {
    setActiveTags(null);
    setFilteredData(data);
  };

  return (
    <div>
      {
        <div className={classes.lastVisits}>
          {data?.length > 0 ? (
            <div>
              <h4>Active Tags: </h4>
              {data[0] && (
                <p
                  className={`${classes.tagButton} ${
                    activeTags === null && classes.activeTag
                  }`}
                  onClick={onAllTagHandler}
                >
                  # All
                </p>
              )}
              {data[0] && (
                <p
                  className={`${classes.tagButton} ${
                    activeTags === data[0]?.place && classes.activeTag
                  }`}
                  onClick={() => onTagChangeHandler(data[0]?.place)}
                >
                  {" "}
                  #{data[0]?.place}{" "}
                </p>
              )}
              {data[1] && (
                <p
                  className={`${classes.tagButton} ${
                    activeTags === data[1]?.place && classes.activeTag
                  }`}
                  onClick={() => onTagChangeHandler(data[1]?.place)}
                >
                  {" "}
                  #{data[1]?.place}{" "}
                </p>
              )}
              {data[2] && (
                <p
                  className={`${classes.tagButton} ${
                    activeTags === data[2]?.place && classes.activeTag
                  }`}
                  onClick={() => onTagChangeHandler(data[2]?.place)}
                >
                  {" "}
                  #{data[2]?.place}{" "}
                </p>
              )}
              {data[3] && (
                <p
                  className={`${classes.tagButton} ${
                    activeTags === data[3]?.place && classes.activeTag
                  }`}
                  onClick={() => onTagChangeHandler(data[3]?.place)}
                >
                  {" "}
                  #{data[3]?.place}{" "}
                </p>
              )}
              {data[4] && (
                <p
                  className={`${classes.tagButton} ${
                    activeTags === data[4]?.place && classes.activeTag
                  }`}
                  onClick={() => onTagChangeHandler(data[4]?.place)}
                >
                  {" "}
                  #{data[4]?.place}{" "}
                </p>
              )}
              {data[5] && (
                <p
                  className={`${classes.tagButton} ${
                    activeTags === data[5]?.place && classes.activeTag
                  }`}
                  onClick={() => onTagChangeHandler(data[5]?.place)}
                >
                  {" "}
                  #{data[5]?.place}{" "}
                </p>
              )}
              {data[6] && (
                <p
                  className={`${classes.tagButton} ${
                    activeTags === data[6]?.place && classes.activeTag
                  }`}
                  onClick={() => onTagChangeHandler(data[6]?.place)}
                >
                  {" "}
                  #{data[6]?.place}{" "}
                </p>
              )}
            </div>
          ) : (
            <div className={classes.info}>
              <h4>Active Tags: </h4>
              <h4>-</h4>
            </div>
          )}
        </div>
      }
      {data?.length === 0 && (
        <h3 className={classes.infoText}>No post yet...</h3>
      )}
      <div className={classes.list}>
        {filteredData?.map((item) => (
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
