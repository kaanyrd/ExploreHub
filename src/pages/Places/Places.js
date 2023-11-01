import React, { useEffect, useState } from "react";
import PlacesList from "../../components/Places/PlacesList";
import classes from "./Places.module.css";

function Places() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const postResponse = await fetch(
        `https://explorehub-6824c-default-rtdb.europe-west1.firebasedatabase.app/app/posts.json`
      );

      const resPostsData = await postResponse.json();

      let arrPostsData = [];

      for (let key in resPostsData) {
        arrPostsData.push({
          id: key,
          ...resPostsData[key],
        });
      }
      setPosts(arrPostsData);
    };
    getData();
  }, []);

  return (
    <div className={classes.main}>
      <div className={classes.lastVisits}>
        <h4>Active Tags: </h4>
        <p>#Old Trafford, Manchester</p>
        <p>#Turkey</p>
        <p>#US</p>
        <p>#Tulsa</p>
      </div>
      <PlacesList data={posts} />
    </div>
  );
}

export default Places;
