import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./MyProfile.module.css";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GiteIcon from "@mui/icons-material/Gite";
import AuthContext from "../../context/Authentication";
import avatar from "../../assets/casualPhotos/profileImg2.png";
import banner from "../../assets/casualPhotos/nobanner.png";
import PostDelete from "../../components/PostDelete/PostDelete";
import BookmarksContext from "../../context/Bookmarks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LikesModaling from "../../components/LikesModaling/LikesModaling";

function MyProfile() {
  const navigate = useNavigate();
  const [posts, setPost] = useState([]);
  const [showComments, setShowComments] = useState(true);
  const [loading, setLoading] = useState(false);
  console.log(posts);

  const { auth, lastLogins } = useContext(AuthContext);
  let userSelfID = lastLogins?.id;

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(null);
  const [removing, setRemoving] = useState(null);
  const [likes, setLikes] = useState(null);
  const [likeModal, setLikeModal] = useState(null);
  const [modalingLikes, setModalingLikes] = useState(null);

  useEffect(() => {
    setLoading(true);
    const asyncFunc = async () => {
      try {
        const response = await fetch(
          `https://retoolapi.dev/Brjzmm/users/${userSelfID}`
        );
        const resData = await response.json();
        setUser(resData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    asyncFunc();
  }, [auth, userSelfID, setLoading]);

  useEffect(() => {
    const gettingPost = async () => {
      try {
        const response = await fetch("https://retoolapi.dev/d2cIkX/posts");
        const resData = await response.json();
        const userPosts = resData.filter((post) => post.user === userSelfID);
        const reverseData = userPosts.reverse();
        setPost(reverseData);
      } catch (error) {
        console.log(error);
      }
    };
    gettingPost();
  }, [userSelfID]);

  useEffect(() => {
    const gettingComments = async () => {
      const response = await fetch(`https://retoolapi.dev/bOqEUT/comments`);
      const resData = await response.json();
      setComments(resData);
    };

    gettingComments();
  }, []);

  useEffect(() => {
    const gettingLikes = async () => {
      const response = await fetch(`https://retoolapi.dev/QGgnh3/likes`);
      const resData = await response.json();
      setLikes(resData);
      setModalingLikes(resData);
    };
    gettingLikes();
  }, []);

  const [imageStates, setImageStates] = useState([]);

  useEffect(() => {
    if (posts) {
      const initialImageStates = Array(posts.length).fill(1);
      setImageStates(initialImageStates);
    }
  }, [posts]);

  const updateImageState = (postIndex, newImage) => {
    const newImageStates = [...imageStates];
    newImageStates[postIndex] = newImage;
    setImageStates(newImageStates);
  };

  function formatTimeAgo(dateData) {
    const now = new Date();
    const postDate = new Date(
      dateData.year,
      dateData.month,
      dateData.day,
      dateData.hour,
      dateData.minutes,
      dateData.seconds
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

  let DeletingContent = () => {
    return (
      <PostDelete
        setPost={setPost}
        removing={removing}
        setRemoving={setRemoving}
      />
    );
  };

  const onDeleteHandler = (id) => {
    setRemoving(id);
  };

  const onCancelHandler = () => {
    setRemoving(null);
  };

  const { bookmarks, setBookmarks } = useContext(BookmarksContext);

  const bookmarksHandler = (data) => {
    const control = bookmarks.find(
      (bookmark) =>
        bookmark.post === data && bookmark.user === lastLogins.nickName
    );

    if (control) {
      setBookmarks((prev) => prev.filter((item) => item !== control));
    } else {
      setBookmarks((prev) => [
        { user: lastLogins.nickName, post: data },
        ...prev,
      ]);
    }
  };

  const commentHandler = () => {
    setShowComments((prev) => !prev);
  };

  let LikeModalContent = () => {
    return <LikesModaling likes={modalingLikes} setLikeModal={setLikeModal} />;
  };

  console.log(likes);

  const likeModalHandler = (id) => {
    setModalingLikes(likes);
    setModalingLikes((prev) =>
      prev.filter((like) => like.postID.toString() === id)
    );
    setLikeModal(true);
  };

  const cancelLikeModalHandler = () => {
    setLikeModal(false);
  };

  console.log(likes);

  return (
    <div className={classes.main}>
      {loading ? (
        <div className={classes.loadingContent}>
          <div className={classes.bigLoading}></div>
        </div>
      ) : (
        <div className={classes.mainContent}>
          <div className={classes.photoSide}>
            <Link to={user?.id?.toString()} className={classes.editProfile}>
              Edit Profile <EditIcon />
            </Link>
            {user?.banner ? (
              <img
                src={user?.banner}
                className={classes.bannerPhoto}
                alt="banner"
              />
            ) : (
              <img
                src={banner}
                alt="banner"
                className={`${classes.bannerPhoto} ${
                  !user?.banner && classes.bannerPhotoDefault
                }`}
              />
            )}
            {user?.pp ? (
              <img
                src={user?.pp}
                className={`${classes.pp} ${
                  user?.gender === "male" && classes.ppMale
                } ${user?.gender === "female" && classes.ppFemale} ${
                  user?.gender === "other" && classes.ppOther
                }`}
                alt="pp"
              />
            ) : (
              <img
                src={avatar}
                className={`${classes.pp} ${
                  user?.gender === "male" && classes.ppMale
                } ${user?.gender === "female" && classes.ppFemale} ${
                  user?.gender === "other" && classes.ppOther
                }`}
                alt="pp"
              />
            )}
          </div>
          <div className={classes.infoSide}>
            <div className={classes.topInfo}>
              <h3 className={classes.name}>
                {user?.firstName} {user?.lastName}
              </h3>
              <p className={classes.nickName}>@{user?.nickName}</p>
            </div>
            <div className={classes.otherInfos}>
              <p>
                <GiteIcon />
                Town is{" "}
                {user?.town ? (
                  <strong className={classes.townSide}>{user?.town}</strong>
                ) : (
                  <strong>-</strong>
                )}
              </p>
              <p>
                <CalendarMonthIcon />
                Birth<strong> {user?.birth}</strong>
              </p>
              <p>
                <LocationCityIcon />
                Living in{" "}
                {user?.living ? (
                  <strong className={classes.townSide}>{user?.living}</strong>
                ) : (
                  <strong>-</strong>
                )}
              </p>
            </div>
          </div>
          <div className={classes.lastVisits}></div>
          {posts?.length === 0 ? (
            <div>
              <h3 className={classes.noPostText}>No post yet...</h3>
            </div>
          ) : (
            <div className={classes.list}>
              {posts?.map((data, index) => (
                <div key={index} className={classes.card}>
                  <div className={classes.contentLeft}>
                    <div className={classes.cardTop}>
                      <div className={classes.ppSide}>
                        <img
                          className={classes.ppSelf}
                          src={data?.pp || avatar}
                          alt={data?.nickName}
                        />
                      </div>

                      <div>
                        <div className={classes.info}>
                          <strong>@{data?.nickName} </strong> {data?.duration}{" "}
                          <span className={classes.dot}>•</span>{" "}
                          {formatTimeAgo(data?.date)}{" "}
                          <span className={classes.dot}>•</span> at{" "}
                          {data?.place} ({data?.city}, {data?.country})
                          <div className={classes.country}></div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.imgs}>
                      {imageStates[index] === 1 && (
                        <img
                          src={data?.mainPhoto}
                          className={classes.imgSelf}
                          alt={data?.nickName}
                        />
                      )}
                      {imageStates[index] === 2 && (
                        <img
                          src={data?.secondPhoto}
                          alt={data?.nickName}
                          className={classes.imgSelf}
                        />
                      )}
                      {imageStates[index] === 3 && (
                        <img
                          src={data?.thirdPhoto}
                          alt={data?.nickName}
                          className={classes.imgSelf}
                        />
                      )}
                      <div className={classes.buttonSide}>
                        <button
                          className={`${classes.buttonSelf} ${
                            imageStates[index] === 1
                              ? classes.activeBtn
                              : undefined
                          }`}
                          onClick={() => updateImageState(index, 1)}
                        >
                          1
                        </button>
                        <button
                          className={`${classes.buttonSelf} ${
                            imageStates[index] === 2
                              ? classes.activeBtn
                              : undefined
                          }`}
                          onClick={() => updateImageState(index, 2)}
                        >
                          2
                        </button>
                        <button
                          className={`${classes.buttonSelf} ${
                            imageStates[index] === 3
                              ? classes.activeBtn
                              : undefined
                          }`}
                          onClick={() => updateImageState(index, 3)}
                        >
                          3
                        </button>
                      </div>
                    </div>
                    <div className={classes.likes}>
                      <div>
                        <span className={`${classes.likeBtn}`}>
                          <FavoriteIcon />{" "}
                          {
                            likes?.filter((like) => like.postID === data?.id)
                              .length
                          }{" "}
                        </span>
                        <p
                          onClick={() => likeModalHandler(data?.id)}
                          className={classes.likeList}
                        >
                          (See all likes)
                        </p>
                      </div>
                      <div className={classes.likesRight}>
                        <Link
                          to={`${data?.id}/editPlace`}
                          className={classes.editIcon}
                        >
                          <EditIcon />
                        </Link>
                        <div className={classes.deleteIcon}>
                          <DeleteIcon
                            onClick={() => onDeleteHandler(data?.id)}
                          />
                        </div>
                        <div
                          className={`${classes.bookmarkBtn} ${
                            bookmarks.some(
                              (bookmark) =>
                                bookmark.post === data?.id &&
                                bookmark.user === lastLogins.nickName
                            )
                              ? classes.bookmarked
                              : undefined
                          }`}
                          onClick={() => bookmarksHandler(data?.id)}
                        >
                          <BookmarkIcon />
                        </div>
                      </div>
                    </div>
                    <div className={classes.explanation}>
                      <p>
                        <strong>
                          {data?.firstName} {data?.lastName} says:{" "}
                        </strong>
                        {data?.description}
                      </p>
                    </div>
                  </div>
                  <div>
                    {comments?.filter((comment) => comment?.postID === data?.id)
                      .length === 0 && (
                      <div className={classes.commentInfo}>
                        There is no comment!
                      </div>
                    )}
                    {comments?.filter((comment) => comment?.postID === data?.id)
                      .length > 0 && (
                      <div>
                        {showComments ? (
                          <p
                            className={classes.commentInfo}
                            onClick={commentHandler}
                          >
                            Close comments...
                          </p>
                        ) : (
                          <div
                            className={classes.commentInfo}
                            onClick={commentHandler}
                          >
                            See other (
                            {
                              comments?.filter(
                                (comment) => comment?.postID === data?.id
                              ).length
                            }
                            ){" "}
                            {comments?.filter(
                              (comment) => comment?.postID === data?.id
                            ).length === 1 && "comment"}
                            {comments?.filter(
                              (comment) => comment?.postID === data?.id
                            ).length > 1 && " comments"}
                          </div>
                        )}
                      </div>
                    )}
                    {showComments && (
                      <ul className={classes.comments}>
                        {comments?.map(
                          (comment) =>
                            comment?.postID === data?.id && (
                              <li className={classes.eachComment}>
                                <div className={classes.imgSide}>
                                  <img
                                    src={comment?.commenterPP || avatar}
                                    className={classes.commentPP}
                                    alt="pp"
                                  />
                                  @{comment.commenter}
                                </div>
                                {comment.comment}
                              </li>
                            )
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
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
      {removing &&
        ReactDOM.createPortal(
          <div onClick={onCancelHandler} className={classes.background}></div>,
          document.getElementById("background")
        )}
      {removing &&
        ReactDOM.createPortal(
          <DeletingContent />,
          document.getElementById("postdelete")
        )}
    </div>
  );
}

export default MyProfile;
