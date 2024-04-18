import moment from 'moment'; // Import moment
import React, { useEffect, useState } from "react";
import ActorCard from "./ActorCard";
import actorsData from "./data/actors.json"; // Assuming you have a JSON file



function Game() {
  const [dailyActors, setDailyActors] = useState([]);
  const [guess, setGuess] = useState("");

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD'); // Get today's date in the local time zone
    if (localStorage.getItem("lastPlayed") !== today) {
      setDailyActors(actorsData[new Date().getDay()]); // Assuming your data indexing is correct
      localStorage.setItem("lastPlayed", today);
    }
  }, []);

  const handleGuess = () => {
    if (guess.toLowerCase() === "presidents") { // Example check
      alert("Correct!");
    } else {
      alert("Try again!");
    }
  };

  return (
    <div className="App">
      <h1>Actor Guessing Game</h1>
      <h1>What do these actors have in common?</h1>
      {message && (
        <p className={message === "Correct!" ? "message success" : "message error"}>
          {message}
        </p>
      )}
      {todayQuiz && (
        <div>
          <div className="actor-container">
            {todayQuiz.actors.map((actor) => (
              <ActorCard key={actor.id} name={actor.name} image={actor.image} />
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter your guess here"
            />
            <button onClick={handleGuess}>Submit Guess</button>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default Game;
