import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Addwatchlist } from "../../../store/storeslices";
import { Addedmesage, Deletemesage } from "../../../utils";

function WatchlistIcon({ movie }) {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.apidata.watchlistdata);
  const handlewatch = (movie) => {
    dispatch(Addwatchlist(movie))
    const f = watchlist?.find((watchFilm) => watchFilm.id === movie.id)
    if (f) {
      Deletemesage()
    }
    else {
      Addedmesage()
    }
  }

  return (
    <span
      className="watchList"
      onClick={() => handlewatch(movie)}
    >
      {watchlist?.find((watchFilm) => watchFilm.id === movie.id) ? (
        <i className="fa-solid fa-bookmark"></i>
      ) : (
        <i className="fa-regular fa-bookmark"></i>
      )}
    </span>
  );
}

export default WatchlistIcon;