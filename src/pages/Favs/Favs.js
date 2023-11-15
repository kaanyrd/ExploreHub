import React, { useContext, useEffect, useState } from "react";
import classes from "./Favs.module.css";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AuthContext from "../../context/Authentication";
import { Link, useNavigate } from "react-router-dom";
import BookmarksContext from "../../context/Bookmarks";
import avatar from "../../assets/casualPhotos/profileImg2.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Favs() {
  const navigate = useNavigate();
  const { auth, lastLogins } = useContext(AuthContext);
  const [bookmark, setBookmark] = useState([]);
  const { bookmarks } = useContext(BookmarksContext);
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const filteredData = bookmarks.filter(
      (item) => item.user === lastLogins.nickName
    );
    setBookmark(filteredData);
  }, [bookmarks, lastLogins]);

  useEffect(() => {
    const gettingData = async () => {
      for (let i = 0; i < bookmark.length; i++) {
        const postId = bookmark[i].post;
        const response = await fetch(
          `https://retoolapi.dev/d2cIkX/posts/${bookmark[i].post}`
        );
        const resData = await response.json();
        setPosts((prev) => [...prev, { resData, postId }]);
      }
    };
    if (bookmark.length > 0 && posts.length === 0) {
      gettingData();
    }
  }, [bookmark, posts.length]);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [navigate, auth]);

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

  console.log(posts);

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.title}>
          <BookmarksIcon fontSize="large" />
          <h3>Your Bookmarks...</h3>
        </div>
        {bookmark?.length === 0 && <p>No Bookmark Yet...</p>}
        {bookmark?.length > 0 && (
          <ul className={classes.list}>
            {posts?.map((post) => (
              <Link to={`/places/${post?.postId}`} key={post?.postId}>
                <div className={classes.item}>
                  <div className={classes.cardTopInfo}>
                    <div>
                      <div>
                        <p className={classes.location}>
                          <LocationOnIcon />
                          {post?.resData?.city}, {post?.resData?.country}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={classes.imgs}>
                    {index === 1 && (
                      <img
                        className={classes.imgsSelf}
                        src={post?.resData?.mainPhoto}
                        alt="img"
                      />
                    )}
                    {index === 2 && (
                      <img
                        src={post?.resData?.secondPhoto}
                        className={classes.imgsSelf}
                        alt="img"
                      />
                    )}
                    {index === 3 && (
                      <img
                        src={post?.resData?.thirdPhoto}
                        alt="img"
                        className={classes.imgsSelf}
                      />
                    )}
                    <div className={classes.ppImgSide}>
                      <img
                        className={classes.ppImgSelf}
                        src={post?.resData?.pp || avatar}
                        alt="icon"
                      />
                      <small>
                        <strong className={classes.nickName}>
                          @{post?.resData?.nickName} at {post?.resData?.place}
                        </strong>
                        <span className={classes.dot}>•</span>{" "}
                        <small className={classes.durat}>
                          {formatTimeAgo(post?.resData?.date)}
                        </small>
                      </small>
                    </div>
                    <div className={classes.imgInfo}></div>
                  </div>
                  <div className={classes.description}>
                    <strong>
                      {post?.resData?.firstName} {post?.resData?.lastName}{" "}
                      says...
                    </strong>
                    <p>{post?.resData?.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Favs;
