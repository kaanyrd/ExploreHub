import React, { useEffect, useState } from "react";
import PlacesList from "../../components/Places/PlacesList";
import classes from "./Places.module.css";

function Places() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const postResponse = await fetch(`https://retoolapi.dev/d2cIkX/posts`);
        const resPostsData = await postResponse.json();
        const reverseData = resPostsData.reverse();
        setPosts(reverseData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className={`${classes.main} ${loading && classes.mainLess}`}>
      {loading ? (
        <div className={classes.loadingContent}>
          <div className={classes.loading}></div>
        </div>
      ) : (
        <PlacesList data={posts} />
      )}
    </div>
  );
}

export default Places;
