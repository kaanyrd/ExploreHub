import React, { useContext, useEffect, useState } from "react";
import classes from "./PlaceDetail.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import avatar from "../../assets/casualPhotos/avatar5.jpeg";
import AuthContext from "../../context/Authentication";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

function PlaceDetail() {
  const params = useParams();
  const { auth } = useContext(AuthContext);
  const postId = params.placesId;
  const [post, setPost] = useState(null);
  const [image, setImage] = useState(1);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(true);

  const firstPhotoHandler = () => {
    setImage(1);
  };
  const secondPhotoHandler = () => {
    setImage(2);
  };
  const thirdPhotoHandler = () => {
    setImage(3);
  };

  const likeHandler = () => {
    setLiked((prev) => !prev);
  };

  const bookmarkHandler = () => {
    setBookmarked((prev) => !prev);
  };

  const commentHandler = () => {
    setShowComments((prev) => !prev);
  };

  useEffect(() => {
    const gettingData = async () => {
      try {
        const response = await fetch(
          `https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/posts/${postId}.json`
        );
        const responseData = await response.json();
        setPost(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    gettingData();
  }, [postId]);

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

  return (
    <div className={classes.main}>
      <Link className={classes.backButton} to=".." relative="path">
        <ArrowBackIcon fontSize="large" className={classes.backLink} />
      </Link>
      <div className={classes.mainContent}></div>
      <div className={classes.list}>
        <div key={post?.id} className={classes.card}>
          <div className={classes.contentLeft}>
            <div className={classes.cardTop}>
              <div className={classes.ppSide}>
                <img
                  className={classes.ppSelf}
                  src={post?.pp || avatar}
                  alt={post?.nickName}
                />
              </div>

              <div>
                <div className={classes.info}>
                  <strong>@{post?.nickName}</strong>{" "}
                  <span className={classes.dot}>•</span>{" "}
                  {formatTimeAgo(post?.date)}{" "}
                  <span className={classes.dot}>•</span> at {post?.place} (
                  {post?.city}, {post?.country})
                  <div className={classes.country}></div>
                </div>
              </div>
            </div>
            <div className={classes.imgs}>
              {image === 1 && (
                <img
                  src={post?.mainPhoto}
                  className={classes.imgSelf}
                  alt={post?.nickName}
                />
              )}
              {image === 2 && (
                <img
                  src={post?.secondPhoto}
                  className={classes.imgSelf}
                  alt={post?.nickName}
                />
              )}
              {image === 3 && (
                <img
                  src={post?.thirdPhoto}
                  className={classes.imgSelf}
                  alt={post?.nickName}
                />
              )}
              <div className={classes.buttonSide}>
                <button
                  className={`${classes.buttonSelf} ${
                    image === 1 ? classes.activeBtn : undefined
                  }`}
                  onClick={firstPhotoHandler}
                >
                  1
                </button>
                <button
                  className={`${classes.buttonSelf} ${
                    image === 2 ? classes.activeBtn : undefined
                  }`}
                  onClick={secondPhotoHandler}
                >
                  2
                </button>
                <button
                  className={`${classes.buttonSelf} ${
                    image === 3 ? classes.activeBtn : undefined
                  }`}
                  onClick={thirdPhotoHandler}
                >
                  3
                </button>
              </div>
            </div>
            <div className={classes.likes}>
              <div>
                {!auth ? (
                  <div>
                    <span onClick={likeHandler} className={classes.likeBtn}>
                      <FavoriteIcon />
                    </span>
                    <p>?</p>
                  </div>
                ) : (
                  <div>
                    <span
                      onClick={likeHandler}
                      className={`${classes.likeBtn} ${liked && classes.liked}`}
                    >
                      <FavoriteIcon />
                    </span>
                    <p>{auth ? post?.likes : "?"}</p>
                  </div>
                )}
              </div>
              {auth && (
                <div className={classes.likesRight}>
                  <div className={classes.commentIcon}>
                    <InsertCommentIcon />
                  </div>
                  <div
                    className={`${classes.bookmarkBtn} ${
                      bookmarked && classes.bookmarked
                    }`}
                    onClick={bookmarkHandler}
                  >
                    <BookmarkIcon />
                  </div>
                </div>
              )}
            </div>
            <div className={classes.explanation}>
              <p>
                <strong>
                  {post?.firstName} {post?.lastName} says:{" "}
                </strong>
                {post?.description}
              </p>
            </div>
          </div>
          {auth ? (
            <div>
              {!post?.comments && (
                <p className={classes.commentInfo}>There is no comment...</p>
              )}
              {post?.comments?.length > 0 && showComments ? (
                <div>
                  <p className={classes.commentInfo} onClick={commentHandler}>
                    Close comments...
                  </p>
                  <ul className={classes.comments}>
                    {post?.comments.map((comment) => (
                      <li key={comment.id}>
                        <strong>@{comment?.nickname}:</strong>{" "}
                        {comment?.message}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                post?.comments?.length > 0 && (
                  <p onClick={commentHandler} className={classes.commentInfo}>
                    {`See other ${post?.comments.length} ${
                      post?.comments?.length === 1
                        ? "comment..."
                        : "comments..."
                    }`}
                  </p>
                )
              )}
            </div>
          ) : (
            <div className={classes.loginInfo}>
              <ReportProblemIcon
                className={classes.errorIcon}
                fontSize="large"
              />
              <h4>You must login to see comments</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaceDetail;
