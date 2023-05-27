import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Addwishlist } from "../../../store/storeslices";
import { dislikemessage, likedmessage } from "../../../utils";

function HeartIcon({ movie }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.apidata.wishlistdata);
  const handlelike = (movie) => {
    dispatch(Addwishlist(movie))
    const f = wishlist?.find((watchFilm) => watchFilm.id === movie.id)
    if (f) {
      dislikemessage()
    }
    else {
      likedmessage()
    }
  }

  return (
    <span
      className="heart"
      onClick={() => handlelike(movie)}
    >
      {wishlist?.find((wishFilm) => wishFilm.id === movie.id) ? (
        <i className="fa-solid fa-heart"></i>
      ) : (
        <i className="fa-regular fa-heart"></i>
      )}
    </span>
  );
}

export default HeartIcon;