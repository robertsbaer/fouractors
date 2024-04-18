import * as fuzz from 'fuzzball';
import moment from 'moment'; // Import moment
import React, { useEffect, useState } from "react";
import ActorCard from "./ActorCard";
import './App.css';
import BuyMeACoffeeButton from './BuyMeACoffeeButton'; // Make sure the path is correct
import data from "./data/actors.json";


function HintButton({ hints }) {
  const [hintCount, setHintCount] = useState(0);
  const hintKeys = Object.keys(hints); // Extract keys from the hints object

  const showNextHint = () => {
    setHintCount((current) => {
      return current < hintKeys.length ? current + 1 : current;
    });
  };

  return (
    <div className="hintContainer">
      <button onClick={showNextHint}>
        Hint ({hintCount}/{hintKeys.length})
      </button>
      {hintCount > 0 && (
        <div className="hintBox">
          {hintKeys.slice(0, hintCount).map((key, index) => (
            <p key={index} className="hintParagraph">
              {hints[key]}
            </p>
          ))}
        </div>
      )}
    </div>
  );
  
}

function App() {
  const [games, setGames] = useState([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [blur, setBlur] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD'); // Use moment to get the local date
    const dailyGames = data.quizzes.filter((quiz) => quiz.date === today);

    if (dailyGames.length > 0) {
      setGames(dailyGames);
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
      if (highestRatio > 70) { // You can adjust this threshold as needed
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
            setMessage("You've completed the games for today! Come back tomorrow for another round. Also, check out another game at <a href='https://www.letrsets.com' target='_blank' rel='noopener noreferrer'>letrsets.com</a>");
          }
        }, 2000); // 2 seconds delay before loading the next game
      } else {
        setMessage("Incorrect, try again!");
      }
    }
  };

  return (
    <div className="App">
      <button onClick={() => setIsModalOpen(true)}>Instructions</button>
      {isModalOpen && (
        <div className="modal">
          <h2>Instructions</h2>
          <p>Welcome to the game! Your objective is to guess what the four actors listed have in common. However, the commonality will never be as simple as their gender (all men or all women).</p>
          <p>Think beyond basic characteristics like gender and focus on roles, awards, and other significant aspects of their careers and life.</p>
          <p>Yes! Some answers may be correct but just not today. For example they may all be comedic actors but if it said it's wrong that's not the answer and another one is correct.</p>
          <p>The IMDB link may help</p>
          <button onClick={() => setIsModalOpen(false)}>X</button>
        </div>
      )}
      {games.length > 0 && games[currentGameIndex] && (
        <>
        <h1 className='title'>What do these actors have in common?</h1>
        <div>
          <div className={`actor-container ${blur ? "blur" : ""}`}>
            {games[currentGameIndex].actors.map((actor) => (
              <ActorCard key={actor.id} name={actor.name} image={actor.image} link={actor.link}/>
            ))}
          </div>
          <div className="input-area">
            {message && (
              <p className={message.includes("Correct!") ? "message success" : "message error"}
                dangerouslySetInnerHTML={{ __html: message }}>
              </p>
            )}
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter your guess here"
            />
            <div className="button-container-both">
            <div className="button-container">
              {games.length > 0 && games[currentGameIndex] && <HintButton hints={games[currentGameIndex].hints[0]} />}
            </div>
            <div className="button-container">
              <button onClick={handleGuess}>Submit Guess</button>
            </div>
            </div>
          </div>
        </div>
        </>
      )}
      {message && currentGameIndex >= games.length && (
        <p className="message success">Sorry! No Game today. Go checkout this game<a href='https://www.letrsets.com' target='_blank' rel='noopener noreferrer'>letrsets.com</a></p>
      )}
      <BuyMeACoffeeButton />
    </div>
  );
}

export default App;
