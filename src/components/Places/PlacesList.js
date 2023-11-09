import React, { useContext, useEffect, useState } from "react";
import classes from "./PlacesList.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import avatar from "../../assets/casualPhotos/profileImg2.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchingContext from "../../context/Searching";

function PlacesList({ data }) {
  const { searching, setSearching } = useContext(SearchingContext);

  console.log(searching);

  const POSTS_PER_PAGE = 6;
  const [activeTags, setActiveTags] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [index, setIndex] = useState(1);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const removeSearchingHandler = () => {
    setSearching("");
  };

  const [currentPage, setCurrentPage] = useState(1);

  // const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  // const endIndex = startIndex + POSTS_PER_PAGE;

  // const filteredPosts =
  //   searching !== ""
  //     ? filteredData?.filter(
  //         (item) =>
  //           item?.firstName?.toLowerCase().includes(searching.toLowerCase()) ||
  //           item?.lastName?.toLowerCase().includes(searching.toLowerCase()) ||
  //           item?.nickName?.toLowerCase().includes(searching.toLowerCase()) ||
  //           item?.description
  //             ?.toLowerCase()
  //             .includes(searching.toLowerCase()) ||
  //           item?.place?.toLowerCase().includes(searching.toLowerCase()) ||
  //           item?.country?.toLowerCase().includes(searching.toLowerCase()) ||
  //           item?.city?.toLowerCase().includes(searching.toLowerCase())
  //       )
  //     : filteredData;

  // const visiblePosts = filteredPosts?.slice(startIndex, endIndex);

  // ...

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  // ...
  useEffect(() => {
    setFilteredData(data);
    setCurrentPage(1); // Sayfa numarasını sıfırla
  }, [data, searching]);

  // const filteredPosts =
  //   searching !== ""
  //     ? data?.filter(
  //         (item) =>
  //           item?.firstName?.toLowerCase().includes(searching.toLowerCase()) ||
  //           item?.lastName?.toLowerCase().includes(searching.toLowerCase()) ||
  //           item?.nickName?.toLowerCase().includes(searching.toLowerCase()) ||
  //           item?.description
  //             ?.toLowerCase()
  //             .includes(searching.toLowerCase()) ||
  //           item?.place?.toLowerCase().includes(searching.toLowerCase()) ||
  //           item?.country?.toLowerCase().includes(searching.toLowerCase()) ||
  //           item?.city?.toLowerCase().includes(searching.toLowerCase())
  //       )
  //     : data;

  // const visiblePosts = filteredPosts?.slice(startIndex, endIndex);

  const filteredPosts =
    searching !== ""
      ? filteredData?.filter(
          (item) =>
            item?.firstName?.toLowerCase().includes(searching.toLowerCase()) ||
            item?.lastName?.toLowerCase().includes(searching.toLowerCase()) ||
            item?.nickName?.toLowerCase().includes(searching.toLowerCase()) ||
            item?.description
              ?.toLowerCase()
              .includes(searching.toLowerCase()) ||
            item?.place?.toLowerCase().includes(searching.toLowerCase()) ||
            item?.country?.toLowerCase().includes(searching.toLowerCase()) ||
            item?.city?.toLowerCase().includes(searching.toLowerCase())
        )
      : activeTags !== null
      ? filteredData?.filter((item) => item.place === activeTags)
      : filteredData;

  const totalPosts = filteredPosts?.length || 0;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const visiblePosts = filteredPosts?.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const nextPage = () => {
    if (startIndex + POSTS_PER_PAGE < filteredData?.length) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const onTagChangeHandler = (e) => {
    setActiveTags(e);
    const filtered = data.filter((post) => post.place === e);
    setFilteredData(filtered);
    setCurrentPage(1);
  };
  const onAllTagHandler = () => {
    setActiveTags(null);
    setFilteredData(data);
    setCurrentPage(1);
  };

  function formatTimeAgo(dateData) {
    const now = new Date();
    const postDate = new Date(
      dateData?.year,
      dateData?.month,
      dateData?.day,
      dateData?.hour,
      dateData?.minutes,
      dateData?.seconds
    );
    const timeDifference = now - postDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 1) {
      return `${minutes}m ago`;
    } else if (minutes === 1) {
      return `1m ago`;
    } else {
      return `${seconds}s ago`;
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index === 1) {
        setIndex(2);
      } else if (index === 2) {
        setIndex(3);
      } else {
        setIndex(1);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div>
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
      {filteredData?.length === 0 && (
        <h3 className={classes.infoText}>No post yet...</h3>
      )}
      {searching && (
        <p className={classes.searching}>
          Searhing for: <strong>"{searching}"</strong>
          <button
            className={classes.searcingCancelBtn}
            onClick={removeSearchingHandler}
          >
            X
          </button>
        </p>
      )}
      <div className={classes.list}>
        {visiblePosts?.map((item) => (
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
                {index === 1 && (
                  <img
                    className={classes.imgsSelf}
                    src={item?.mainPhoto}
                    alt="img"
                  />
                )}
                {index === 2 && (
                  <img
                    src={item?.secondPhoto}
                    className={classes.imgsSelf}
                    alt="img"
                  />
                )}
                {index === 3 && (
                  <img
                    src={item?.thirdPhoto}
                    alt="img"
                    className={classes.imgsSelf}
                  />
                )}
                <div className={classes.ppImgSide}>
                  <img
                    className={classes.ppImgSelf}
                    src={item?.pp || avatar}
                    alt="icon"
                  />
                  <small>
                    <strong className={classes.nickName}>
                      @{item?.nickName} at {item?.place}
                    </strong>
                    <span className={classes.dot}>•</span>{" "}
                    <small className={classes.durat}>
                      {formatTimeAgo(item?.date)}
                    </small>
                  </small>
                </div>
                <div className={classes.imgInfo}></div>
              </div>
              <div className={classes.description}>
                <strong>
                  {item?.firstName} {item?.lastName} says...
                </strong>
                <p>{item?.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {visiblePosts?.length > 0 && (
        <div className={classes.pagination}>
          {
            // <div className={classes.pageNumbers}>
            //   <button className={classes.prevBtn} onClick={() => prevPage()}>
            //     <ArrowBackIosIcon fontSize="small" />
            //   </button>
            //   {filteredData?.length > 0 &&
            //     Array(Math.ceil(filteredData?.length / POSTS_PER_PAGE))
            //       .fill(0)
            //       .map((_, index) => (
            //         <button
            //           key={index}
            //           onClick={() => goToPage(index + 1)}
            //           className={
            //             currentPage === index + 1
            //               ? classes.activePage
            //               : classes.inactivePage
            //           }
            //         >
            //           {index + 1}
            //         </button>
            //       ))}
            //   <button className={classes.nextBtn} onClick={() => nextPage()}>
            //     <ArrowForwardIosIcon fontSize="small" />
            //   </button>
            // </div>
            <div className={classes.pageNumbers}>
              <button className={classes.prevBtn} onClick={() => prevPage()}>
                <ArrowBackIosIcon fontSize="small" />
              </button>
              {Array(totalPages)
                .fill(0)
                .map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    className={
                      currentPage === index + 1
                        ? classes.activePage
                        : classes.inactivePage
                    }
                  >
                    {index + 1}
                  </button>
                ))}
              <button className={classes.nextBtn} onClick={() => nextPage()}>
                <ArrowForwardIosIcon fontSize="small" />
              </button>
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default PlacesList;
