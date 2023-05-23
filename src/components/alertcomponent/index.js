import React, { useState } from 'react';
import '../alertcomponent/alert.scss';
import like from '../../assets/like.svg'

const Alert = ({showAlert,setShowAlert}) => {

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <div className="alert-container">
          <div className="alert-box">
            <img src={like}/>
            <h3>Thank You for Suggestion!</h3>
            <p>Your suggestion has been succesfully added to my watchlist, I will manage sometime to watch your suggestion. ❤️</p>
            <span className="close-btn" onClick={handleClose}>
              X
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;





