import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./PlaceDetail.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import avatar from "../../assets/casualPhotos/avatar5.jpeg";
import AuthContext from "../../context/Authentication";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveComment from "../../components/RemoveComment/RemoveComment";
import BookmarksContext from "../../context/Bookmarks";
import LikesModaling from "../../components/LikesModaling/LikesModaling";

function PlaceDetail() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { auth, lastLogins } = useContext(AuthContext);
  const { bookmarks, setBookmarks } = useContext(BookmarksContext);

  const postId = params.placesId;
  const [post, setPost] = useState(null);

  const [image, setImage] = useState(1);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [showComment, setShowComment] = useState(true);
  const [commentSelf, setCommentSelf] = useState("");
  const [commentValid, setCommentValid] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [removeModal, setRemoveModal] = useState(null);
  const [likeModal, setLikeModal] = useState(null);
  const [likes, setLikes] = useState([]);

  const firstPhotoHandler = () => {
    setImage(1);
  };
  const secondPhotoHandler = () => {
    setImage(2);
  };
  const thirdPhotoHandler = () => {
    setImage(3);
  };

  const commentHandler = () => {
    setShowComments((prev) => !prev);
  };

  // GETTING DATA

  useEffect(() => {
    setLoading(true);
    const gettingData = async () => {
      try {
        const response = await fetch(
          `https://retoolapi.dev/d2cIkX/posts/${postId}`
        );
        const comResponse = await fetch(
          `https://retoolapi.dev/bOqEUT/comments`
        );
        const likeResponse = await fetch(`https://retoolapi.dev/QGgnh3/likes`);

        const responseData = await response.json();
        const comResData = await comResponse.json();
        const likeResData = await likeResponse.json();

        let postControl = comResData.filter(
          (comment) => comment?.postID === postId
        );
        let likeControl = likeResData.filter((like) => like.postID === postId);

        setLikes(likeControl);
        setAllComments(postControl.reverse());
        setPost(responseData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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

  const onCommentHandler = (e) => {
    setCommentSelf(e.target.value);
  };

  const showCommentHandler = () => {
    setShowComment((prev) => !prev);
  };

  // COMMENT
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (commentSelf.length === 0) {
      setCommentValid(false);
      return;
    } else {
      setSubmitting(true);
      try {
        let commentKey = Math.random();
        const newComment = {
          id: commentKey,
          commenter: lastLogins?.nickName,
          commenterID: lastLogins?.id,
          commenterPP: lastLogins?.pp,
          comment: commentSelf,
          date: {
            day: day,
            month: month,
            year: year,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
          },
          postID: postId,
        };

        setAllComments((prev) => [
          {
            id: commentKey,
            commenter: lastLogins?.nickName,
            commenterID: lastLogins?.id,
            commenterPP: lastLogins?.pp,
            comment: commentSelf,
            date: {
              day: day,
              month: month,
              year: year,
              hours: hours,
              minutes: minutes,
              seconds: seconds,
            },
            postID: postId,
          },
          ...prev,
        ]);

        const response = await fetch(`https://retoolapi.dev/bOqEUT/comments`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        });
        console.log(response);
        // const resData = await response.json();
        setCommentSelf("");
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  function formatCommentTime(commentDate) {
    if (!commentDate) return "";

    const now = new Date();
    const commentTime = new Date(
      commentDate?.year,
      commentDate?.month,
      commentDate?.day,
      commentDate?.hours,
      commentDate?.minutes,
      commentDate?.seconds
    );

    const timeDifference = now - commentTime;
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
    if (commentSelf.length > 0) {
      setCommentValid(true);
    }
  }, [commentSelf]);

  const removeCommentHandler = (data) => {
    setRemoveModal(data);
  };

  const cancelCommentHandler = () => {
    setRemoveModal(null);
  };

  let RemoveCommentContent = () => {
    return (
      <RemoveComment
        postId={postId}
        setAllComments={setAllComments}
        removeModal={removeModal}
        setRemoveModal={setRemoveModal}
      />
    );
  };

  const bookmarksHandler = () => {
    const bookmarkedPost = params.placesId;

    const control = bookmarks.find(
      (bookmark) =>
        bookmark.post === bookmarkedPost &&
        bookmark.user === lastLogins.nickName
    );

    if (control) {
      setBookmarks((prev) => prev.filter((item) => item !== control));
      setBookmarked(true);
    } else {
      setBookmarks((prev) => [
        { user: lastLogins.nickName, post: bookmarkedPost },
        ...prev,
      ]);
      setBookmarked(false);
    }
  };

  useEffect(() => {
    const bookmarkedPost = params.placesId;
    const control = bookmarks.find(
      (bookmark) =>
        bookmark.post === bookmarkedPost &&
        bookmark.user === lastLogins.nickName
    );
    if (control) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }, [bookmarks, lastLogins.nickName, params.placesId]);

  // LIKING
  const onLikeHandler = async (ID) => {
    let likeID = Math.random();
    const control = likes.find((item) => item?.likerID === lastLogins?.id);
    console.log(control);

    if (control) {
      let lik = control?.id?.toString();

      try {
        setLikes((prev) =>
          prev.filter((item) => item?.likerID !== lastLogins.id)
        );
        const response = await fetch(
          `https://retoolapi.dev/QGgnh3/likes/${lik}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: null,
          }
        );
        const resData = await response.json();
        console.log(resData);
      } catch (error) {
        console.log(error);
      } finally {
      }
    } else {
      try {
        setLikes((prev) => [
          ...prev,
          {
            id: likeID,
            likerID: lastLogins?.id,
            likerPP: lastLogins?.pp,
            likerNickName: lastLogins?.nickName,
            postID: ID,
          },
        ]);
        const response = await fetch(`https://retoolapi.dev/QGgnh3/likes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: likeID,
            likerID: lastLogins?.id,
            likerPP: lastLogins?.pp,
            likerNickName: lastLogins?.nickName,
            postID: ID,
          }),
        });
        const resData = await response.json();
        console.log(resData);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };

  let LikeModalContent = () => {
    return <LikesModaling likes={likes} setLikeModal={setLikeModal} />;
  };

  const likeModalHandler = () => {
    setLikeModal(true);
  };

  const cancelLikeModalHandler = () => {
    setLikeModal(false);
  };

  console.log(likes);

  return (
    <div className={classes.main}>
      {loading ? (
        <div className={classes.bigLoading}></div>
      ) : (
        <div className={classes.mainSecond}>
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
                      onDoubleClick={() => onLikeHandler(post?.id)}
                      src={post?.mainPhoto}
                      className={classes.imgSelf}
                      alt={post?.nickName}
                    />
                  )}
                  {image === 2 && (
                    <img
                      onDoubleClick={() => onLikeHandler(post?.id)}
                      src={post?.secondPhoto}
                      className={classes.imgSelf}
                      alt={post?.nickName}
                    />
                  )}
                  {image === 3 && (
                    <img
                      onDoubleClick={() => onLikeHandler(post?.id)}
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
                        <span className={classes.likeBtn}>
                          <FavoriteIcon />
                        </span>
                        <p>?</p>
                      </div>
                    ) : (
                      <div>
                        <span
                          onClick={() => onLikeHandler(post?.id)}
                          className={`${classes.likeBtn} 
                      ${
                        likes?.find((item) => item?.likerID === lastLogins?.id)
                          ? classes.liked
                          : undefined
                      }
                      `}
                        >
                          <FavoriteIcon />
                        </span>
                        <p
                          onClick={likeModalHandler}
                          className={classes.likeLength}
                        >
                          {auth ? likes.length : "?"} (See all likes)
                        </p>
                      </div>
                    )}
                  </div>
                  {auth && (
                    <div className={classes.likesRight}>
                      <div
                        onClick={showCommentHandler}
                        className={
                          showComment
                            ? classes.commentIcon
                            : classes.commentInactive
                        }
                      >
                        <InsertCommentIcon />
                      </div>
                      <div
                        className={`${classes.bookmarkBtn} ${
                          bookmarked && classes.bookmarked
                        }`}
                        onClick={() => bookmarksHandler()}
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
              <div>
                {auth ? (
                  <div className={classes.dunno}>
                    {showComment && (
                      <form
                        onSubmit={onSubmitHandler}
                        className={classes.commentSide}
                      >
                        <input
                          value={commentSelf}
                          onChange={onCommentHandler}
                          maxLength="65"
                          className={`${classes.commentInput} ${
                            commentValid === false && classes.invalidComment
                          }`}
                          type="text"
                          placeholder="Your comment"
                        />
                        <button
                          className={classes.sendCommentBtn}
                          type="submit"
                        >
                          {submitting ? (
                            <div className={classes.loading}></div>
                          ) : (
                            <SendIcon />
                          )}
                        </button>
                      </form>
                    )}
                    {allComments?.length === 0 && (
                      <div>
                        <p className={classes.commentInfo}>
                          There aren't any comment
                        </p>
                        <ul className={classes.noCommentUnlist}></ul>
                      </div>
                    )}
                    {allComments?.length > 0 && (
                      <div>
                        {showComments && (
                          <p
                            onClick={commentHandler}
                            className={classes.commentInfo}
                          >
                            Close Comments
                          </p>
                        )}
                        {showComments ? (
                          <ul className={classes.commentsList}>
                            {allComments?.map((comment) => (
                              <li
                                className={classes.eachComment}
                                key={comment?.id}
                              >
                                <div className={classes.commenterInfo}>
                                  <img
                                    src={comment.commenterPP || avatar}
                                    alt="pp"
                                    className={classes.commenterPhoto}
                                  />
                                  <strong>
                                    @{comment?.commenter} (
                                    {formatCommentTime(comment?.date)}):
                                  </strong>
                                </div>
                                <p>{comment?.comment}</p>
                                {lastLogins.id === comment.commenterID && (
                                  <DeleteIcon
                                    onClick={() =>
                                      removeCommentHandler(comment?.id)
                                    }
                                    fontSize="small"
                                    className={classes.deleteIcon}
                                  />
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div>
                            <p
                              onClick={commentHandler}
                              className={classes.commentInfo}
                            >
                              See other ({allComments.length}){" "}
                              {allComments.length === 1
                                ? "comment"
                                : "comments"}
                            </p>
                            <div className={classes.unlist}></div>
                          </div>
                        )}
                      </div>
                    )}
                    {showComment && (
                      <form
                        onSubmit={onSubmitHandler}
                        className={classes.bigScreenComment}
                      >
                        <input
                          value={commentSelf}
                          onChange={onCommentHandler}
                          maxLength="65"
                          className={`${classes.commentInput} ${
                            commentValid === false && classes.invalidComment
                          }`}
                          type="text"
                          placeholder="Your comment"
                        />
                        <button
                          className={classes.sendCommentBtn}
                          type="submit"
                        >
                          {submitting ? (
                            <div className={classes.loading}></div>
                          ) : (
                            <SendIcon />
                          )}
                        </button>
                      </form>
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
          {likeModal &&
            ReactDOM.createPortal(
              <div
                onClick={cancelLikeModalHandler}
                className={classes.background}
              ></div>,
              document.getElementById("background")
            )}
          {likeModal &&
            ReactDOM.createPortal(
              <LikeModalContent />,
              document.getElementById("likemodal")
            )}
          {removeModal &&
            ReactDOM.createPortal(
              <div
                onClick={cancelCommentHandler}
                className={classes.background}
              ></div>,
              document.getElementById("background")
            )}
          {removeModal &&
            ReactDOM.createPortal(
              <RemoveCommentContent />,
              document.getElementById("removecomment")
            )}
        </div>
      )}
    </div>
  );
}

export default PlaceDetail;
