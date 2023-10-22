import React from "react";
import pp from "../../assets/casualPhotos/icardi.jpg";
import p1 from "../../assets/casualPhotos/photo1.PNG";
import p2 from "../../assets/casualPhotos/photo2.PNG";
import PlacesList from "../../components/Places/PlacesList";
import classes from "./Places.module.css";

const DUMMY_DATA = [
  {
    id: "p1",
    duration: "3h ago",
    firstName: "Mauro",
    lastName: "Icardi",
    explanation:
      "What a paradox of life that in the 𝐓𝐞𝐚𝐭𝐫𝐨 𝐝𝐞 𝐥𝐨𝐬 𝐒𝐮𝐞𝐧̃𝐨𝐬, I would become 𝐏𝐞𝐬𝐚𝐝𝐢𝐥𝐥 𝐚.𝐒𝐮𝐞𝐧̃𝐚. Only those who dream learn to fly.",
    // explanation:
    //   "What a paradox of life that in the 𝐓𝐞𝐚𝐭𝐫𝐨 𝐝𝐞 𝐥𝐨𝐬 𝐒𝐮𝐞𝐧̃𝐨𝐬, I would become 𝐏𝐞𝐬𝐚𝐝𝐢𝐥𝐥 𝐚.𝐒𝐮𝐞𝐧̃𝐚. Only those who dream learn to fly.",
    nickName: "mauroicardi",
    country: "England",
    city: "Manchester",
    place: "Old Trafford",
    likes: 12,
    comments: [
      { id: "c1", nickname: "kaanyrd", message: "Great won 🔥🔥🔥" },
      { id: "c2", nickname: "muslera", message: "What a game!" },
      { id: "c3", nickname: "ltorreira34", message: "On fire..." },
      { id: "c4", nickname: "wilfiriedzaha", message: "We did it 🦾🦾" },
      { id: "c4", nickname: "wilfiriedzaha", message: "We did it 🦾🦾" },
      { id: "c4", nickname: "wilfiriedzaha", message: "We did it 🦾🦾" },
      { id: "c4", nickname: "wilfiriedzaha", message: "We did it 🦾🦾" },
    ],
    pp: pp,
    p1: p1,
    p2: p2,
  },
  {
    id: "p2",
    duration: "1w ago",
    firstName: "Fernando",
    lastName: "Muslera",
    explanation: "With my Family ❤",
    nickName: "muslera",
    country: "Tur",
    city: "Istanbul",
    place: "My Home",
    likes: 5,
    comments: [
      { id: "c1", nickname: "kaanyrd", message: "What a beautiful photo 👨‍❤️‍👨" },
      { id: "c2", nickname: "mauroicardi", message: "Great photo ❤" },
      { id: "c3", nickname: "ltorreira34", message: "On fire 🔥🔥🔥" },
      { id: "c4", nickname: "wilfiriedzaha", message: "Take a rest 🥱🥱🥱" },
      { id: "c4", nickname: "wilfiriedzaha", message: "Take a rest 🥱🥱🥱" },
      { id: "c4", nickname: "wilfiriedzaha", message: "Take a rest 🥱🥱🥱" },
      { id: "c4", nickname: "wilfiriedzaha", message: "Take a rest 🥱🥱🥱" },
    ],
    pp: pp,
    p1: p1,
    p2: p2,
  },
];

function Places() {
  return (
    <div className={classes.main}>
      <div className={classes.lastVisits}>
        <h4>Active Tags: </h4>
        <p>#Old Trafford, Manchester</p>
        <p>#Turkey</p>
        <p>#US</p>
        <p>#Tulsa</p>
      </div>
      <PlacesList data={DUMMY_DATA} />
    </div>
  );
}

export default Places;
