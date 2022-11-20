import React, { useEffect, useState } from "react";
import { AppUserGetDb } from "./Firebase";

const Favourites = ({ user }) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = React.useState([]);
  useEffect(() => {
    AppUserGetDb().then((data) => {
      setFavourites(data["favourites"]);
      setLoading(false);
    });
  }, []);
  console.log("d", favourites);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {favourites.map((favourite) => (
          <div key={favourite.number}>{favourite.name}</div>
        ))}
      </div>
    );
  }
};

export default Favourites;
