import React, { useState } from "react";
import classes from "./EditPlace.module.css";
import pp from "../../assets/casualPhotos/icardi.jpg";
import p1 from "../../assets/casualPhotos/muslera1.PNG";
import p2 from "../../assets/casualPhotos/muslera2.PNG";
import p3 from "../../assets/casualPhotos/muslera3.PNG";
import { Link } from "react-router-dom";

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
];

function EditPlace() {
  const [image, setImage] = useState(1);

  const [length, setLength] = useState(0);

  const lengthHandler = (e) => {
    setLength(e.target.value.length);
  };
  console.log(length);

  const firstPhotoHandler = () => {
    setImage(1);
  };
  const secondPhotoHandler = () => {
    setImage(2);
  };
  const thirdPhotoHandler = () => {
    setImage(3);
  };

  return (
    <div className={classes.main}>
      <div className={classes.mainContent}>
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
                <div className={classes.explanation}>
                  <p>
                    <strong>
                      {data.firstName} {data.lastName} says:{" "}
                    </strong>
                    {data.explanation}
                  </p>
                </div>
              </div>
              <div className={classes.editSide}>
                <h3 className={classes.editTitle}>Edit Your Post!</h3>
                <div className={classes.divider}></div>
                <div className={classes.formControl}>
                  <div className={classes.length}>
                    <strong>({250 - length})</strong>
                  </div>
                  <textarea
                    onChange={lengthHandler}
                    placeholder="Your description"
                    className={classes.textArea}
                    maxLength={`250 - ${length}`}
                  />
                </div>
                <div className={classes.formControl}>
                  <input placeholder="Photo 1 (as URL)" type="text" />
                </div>
                <div className={classes.formControl}>
                  <input placeholder="Photo 2 (as URL)" type="text" />
                </div>
                <div className={classes.formControl}>
                  <input placeholder="Photo 3 (as URL)" type="text" />
                </div>
                <div className={classes.submitButtons}>
                  <Link to="/">Save</Link>
                  <Link to="/">Cancel</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EditPlace;
