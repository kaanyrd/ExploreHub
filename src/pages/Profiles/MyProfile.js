import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./MyProfile.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
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

function MyProfile() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);
  const [posts, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [removing, setRemoving] = useState(null);

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
    const asyncFunc = async () => {
      try {
        const response = await fetch(
          "https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/users.json"
        );
        const responseData = await response.json();
        let arrData = [];
        for (let key in responseData) {
          arrData.push({
            id: key,
            ...responseData[key],
          });
        }
        const user = arrData.find((user) => user.token.toString() === auth);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunc();
  }, [auth]);

  useEffect(() => {
    const gettingPost = async () => {
      try {
        const response = await fetch(
          "https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/posts.json"
        );
        const resData = await response.json();
        let arrData = [];
        for (let key in resData) {
          arrData.push({
            id: key,
            ...resData[key],
          });
        }
        const userPosts = arrData.filter((post) => post.user === auth);
        const reverseData = userPosts.reverse();
        setPost(reverseData);
      } catch (error) {
        console.log(error);
      }
    };
    gettingPost();
  }, [auth]);

  const [imageStates, setImageStates] = useState([]);

  // POST CHANGE PHOTO
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
    return <PostDelete removing={removing} setRemoving={setRemoving} />;
  };

  const onDeleteHandler = (id) => {
    setRemoving(id);
  };

  const onCancelHandler = () => {
    setRemoving(null);
  };

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.photoSide}>
          <Link to={auth.toString()} className={classes.editProfile}>
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
              <div key={data?.id} className={classes.card}>
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
                        <span className={classes.dot}>•</span> at {data?.place}{" "}
                        ({data?.city}, {data?.country})
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
                      <span
                        onClick={likeHandler}
                        className={`${classes.likeBtn} ${
                          liked && classes.liked
                        }`}
                      >
                        <FavoriteIcon />
                      </span>
                      <p>{data?.likes}</p>
                    </div>
                    <div className={classes.likesRight}>
                      <Link
                        to={`${data?.id}/editPlace`}
                        className={classes.editIcon}
                      >
                        <EditIcon />
                      </Link>
                      <div className={classes.deleteIcon}>
                        <DeleteIcon onClick={() => onDeleteHandler(data?.id)} />
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
                  {!data?.comments && (
                    <p className={classes.commentInfo}>
                      There is no comment...
                    </p>
                  )}
                  {data?.comments?.length > 0 && showComments ? (
                    <div>
                      <p
                        className={classes.commentInfo}
                        onClick={commentHandler}
                      >
                        Close comments...
                      </p>
                      <ul className={classes.comments}>
                        {data?.comments.map((comment) => (
                          <li key={comment?.id}>
                            <strong>@{comment?.nickname}:</strong>{" "}
                            {comment?.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    data?.comments?.length > 0 && (
                      <p
                        onClick={commentHandler}
                        className={classes.commentInfo}
                      >
                        {`See other ${data?.comments?.length} ${
                          data?.comments?.length === 1
                            ? "comment..."
                            : "comments..."
                        }`}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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
