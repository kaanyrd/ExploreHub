import React, { useState } from "react";
import classes from "./MyProfile.module.css";
import pp from "../../assets/casualPhotos/icardi.jpg";
import banner from "../../assets/casualPhotos/banner.jpg";
import p1 from "../../assets/casualPhotos/muslera1.PNG";
import p2 from "../../assets/casualPhotos/muslera2.PNG";
import p3 from "../../assets/casualPhotos/muslera3.PNG";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GiteIcon from "@mui/icons-material/Gite";

const DUMMY_DATA = [
  {
    id: "p1",
    duration: "3h ago",
    firstName: "Mauro",
    lastName: "Icardi",
    explanation:
      "What a paradox of life that in the 𝐓𝐞𝐚𝐭𝐫𝐨 𝐝𝐞 𝐥𝐨𝐬 𝐒𝐮𝐞𝐧̃𝐨𝐬, I would become 𝐏𝐞𝐬𝐚𝐝𝐢𝐥𝐥 𝐚.𝐒𝐮𝐞𝐧̃𝐚. Only those who dream learn to fly. Especially this was very imported before Turkish Leauge. Now the target is top of the Turkish League 📸📸",
    nickName: "mauroicardi",
    country: "England",
    city: "Manchester",
    place: "Old Trafford",
    likes: 12,
    comments: [
      // FIXME YORUMLARDA TARİH OLSUN
      { id: "c1", nickname: "kaanyrd", message: "Great won 🔥🔥🔥" },
      { id: "c2", nickname: "muslera", message: "What a game!" },
      { id: "c3", nickname: "ltorreira34", message: "On fire..." },
      { id: "c4", nickname: "fanriziorom", message: "You deserved!" },
      { id: "c5", nickname: "wilfiriedzaha", message: "We did it 🦾🦾" },
      { id: "c6", nickname: "drmertens", message: "Nice shot bro 😎" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
    ],
    pp: pp,
    photos: { 1: p1, 2: p2, 3: p3 },
  },
  {
    id: "p2",
    duration: "3h ago",
    firstName: "Mauro",
    lastName: "Icardi",
    town: "Argentina",
    birthOfDate: "19/03/1993",
    living: "Istanbul",
    explanation:
      "What a paradox of life that in the 𝐓𝐞𝐚𝐭𝐫𝐨 𝐝𝐞 𝐥𝐨𝐬 𝐒𝐮𝐞𝐧̃𝐨𝐬, I would become 𝐏𝐞𝐬𝐚𝐝𝐢𝐥𝐥 𝐚.𝐒𝐮𝐞𝐧̃𝐚. Only those who dream learn to fly.",
    nickName: "mauroicardi",
    country: "England",
    city: "Manchester",
    place: "Old Trafford",
    likes: 12,
    comments: [
      // FIXME YORUMLARDA TARİH OLSUN
      { id: "c1", nickname: "kaanyrd", message: "Great won 🔥🔥🔥" },
      { id: "c2", nickname: "muslera", message: "What a game!" },
      { id: "c3", nickname: "ltorreira34", message: "On fire..." },
      { id: "c4", nickname: "fanriziorom", message: "You deserved!" },
      { id: "c5", nickname: "wilfiriedzaha", message: "We did it 🦾🦾" },
      { id: "c6", nickname: "drmertens", message: "Nice shot bro 😎" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
      { id: "c7", nickname: "kakturkoglu", message: "This is Gala 🤓" },
    ],
    pp: pp,
    photos: { 1: p1, 2: p2, 3: p3 },
  },
];

function MyProfile() {
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

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
        <div className={classes.photoSide}>
          <Link to={DUMMY_DATA[0].id} className={classes.editProfile}>
            Edit Profile <EditIcon />
          </Link>
          <img src={banner} className={classes.bannerPhoto} alt="banner" />
          <img src={pp} className={classes.pp} alt="banner" />
        </div>
        <div className={classes.infoSide}>
          <div className={classes.topInfo}>
            <h3 className={classes.name}>Mauro Icardi</h3>
            <p className={classes.nickName}>(@mauroicardi)</p>
          </div>
          <div className={classes.otherInfos}>
            <p>
              <GiteIcon />
              Town is <strong> Argentina</strong>
            </p>
            <p>
              <CalendarMonthIcon />
              Birth<strong> 19/03/1993 (30)</strong>
            </p>
            <p>
              <LocationCityIcon />
              Living in <strong> Istanbul</strong>
            </p>
          </div>
        </div>
        <div className={classes.lastVisits}>
          <h4>Active Tags: </h4>
          <p>#Old Trafford, Manchester</p>
          <p>#Antalya, Turkey</p>
          <p>#Munichen, Deutschland</p>
        </div>
        {DUMMY_DATA.length === 0 && (
          <div>
            <h3>No post yet...</h3>
          </div>
        )}
        <div className={classes.list}>
          {DUMMY_DATA.map((data) => (
            <div key={data.id} className={classes.card}>
              <div className={classes.contentLeft}>
                <div className={classes.cardTop}>
                  <div className={classes.ppSide}>
                    <img
                      className={classes.ppSelf}
                      src={data.pp}
                      alt={data.nickName}
                    />
                  </div>

                  <div>
                    <div className={classes.info}>
                      <strong>@{data.nickName}</strong>{" "}
                      <span className={classes.dot}>•</span> {data.duration}{" "}
                      <span className={classes.dot}>•</span> at {data.place} (
                      {data.city}, {data.country})
                      <div className={classes.country}></div>
                    </div>
                  </div>
                </div>
                <div className={classes.imgs}>
                  <img
                    src={data.photos[image]}
                    className={classes.imgSelf}
                    alt={data.nickName}
                  />
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
                    <span
                      onClick={likeHandler}
                      className={`${classes.likeBtn} ${liked && classes.liked}`}
                    >
                      <FavoriteIcon />
                    </span>
                    <p>{data.likes}</p>
                  </div>
                  <div className={classes.likesRight}>
                    <Link
                      // to="editplace"
                      className={classes.editIcon}
                    >
                      <EditIcon />
                    </Link>
                    <div className={classes.deleteIcon}>
                      <DeleteIcon />
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
                      {data.firstName} {data.lastName} says:{" "}
                    </strong>
                    {data.explanation}
                  </p>
                </div>
              </div>
              <div>
                {data.comments.length === 0 && (
                  <p className={classes.commentInfo}>There is no comment...</p>
                )}
                {data.comments.length > 0 && showComments ? (
                  <div>
                    <p className={classes.commentInfo} onClick={commentHandler}>
                      Close comments...
                    </p>
                    <ul className={classes.comments}>
                      {data.comments.map((comment) => (
                        <li key={comment.id}>
                          <strong>@{comment.nickname}:</strong>{" "}
                          {comment.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  data.comments.length > 0 && (
                    <p onClick={commentHandler} className={classes.commentInfo}>
                      {`See other ${data.comments.length} ${
                        data.comments.length === 1
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
      </div>
    </div>
  );
}

export default MyProfile;
