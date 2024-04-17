import * as fuzz from 'fuzzball';

import React, { useEffect, useState } from "react";
import ActorCard from "./ActorCard";
import './App.css';
import BuyMeACoffeeButton from './BuyMeACoffeeButton';
import data from "./data/actors.json";

function App() {
  const [games, setGames] = useState([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [blur, setBlur] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [currentHint, setCurrentHint] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const dailyGames = data.quizzes.filter((quiz) => quiz.date === today);
    if (dailyGames.length > 0) {
      setGames(dailyGames);
      setBlur(true);
      setTimeout(() => setBlur(false), 1000);
    } else {
      setMessage("No quizzes available for today.");
    }
  }, []);

  const handleGuess = () => {
    const currentGame = games[currentGameIndex];
    if (currentGame) {
      const highestRatio = currentGame.answers.reduce((highest, answer) => {
        const guessRatio = fuzz.ratio(guess.toLowerCase().trim(), answer);
        return guessRatio > highest ? guessRatio : highest;
      }, 0);
      if (highestRatio > 70) {
        setMessage("Correct!");
        setBlur(true);
        setTimeout(() => {
          const nextIndex = currentGameIndex + 1;
          if (nextIndex < games.length) {
            setCurrentGameIndex(nextIndex);
            setGuess("");
            setMessage("");
            setBlur(false);
          } else {
            setMessage("You've completed the games for today! Come back tomorrow for another round.");
          }
        }, 2000);
      } else {
        setMessage("Incorrect, try again!");
      }
    }
  };

  const useHint = () => {
    const currentGame = games[currentGameIndex];
    if (currentGame && hintsUsed < 3) {
      const hintKey = `hint${hintsUsed + 1}`; // constructs 'hint1', 'hint2', etc.
      const newHint = currentGame.hints[0][hintKey]; // Access hint from the array
      setCurrentHint(newHint);
      setHintsUsed(hintsUsed + 1);
    }
  };
  

  return (
    <div className="App">
      <button onClick={() => setIsModalOpen(true)}>Instructions</button>
      {isModalOpen && (
        <div className="modal">
          <h2>Instructions</h2>
          <p>Welcome to the game! Your objective is to guess what the four actors listed have in common.</p>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      )}
      <h1>What do these actors have in common?</h1>
      {games.length > 0 && games[currentGameIndex] && (
        <div>
          <div className={`actor-container ${blur ? "blur" : ""}`}>
            {games[currentGameIndex].actors.map((actor) => (
              <ActorCard key={actor.id} name={actor.name} image={actor.image} link={actor.link}/>
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
            {currentHint && <p className="hint-display">Hint: {currentHint}</p>}
          <button onClick={useHint} disabled={hintsUsed >= 3} className="hint-button">Use Hint ({hintsUsed}/3)</button>
          </div>
        </div>
      )}
      <BuyMeACoffeeButton />
    </div>
  );
}

export default App;
