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
      const reverseData = arrPostsData.reverse();
      setPosts(reverseData);
    };
    getData();
  }, []);

  return (
    <div className={classes.main}>
      <PlacesList data={posts} />
    </div>
  );
}

export default Places;
