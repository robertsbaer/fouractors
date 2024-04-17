import React from "react";
import './App.css';
import imdbLogo from './imdb.png'; // Make sure the path matches where you have saved your IMDb logo.

function ActorCard({ image, name, link }) {
  return (
    <div className="actor-card">
      <img src={image} alt={name} className="actor-image" />
      <p>{name}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img src={imdbLogo} alt="IMDb Logo" className="imdb-logo"/>
        </a>
      )}
    </div>
  );
}

export default ActorCard;
