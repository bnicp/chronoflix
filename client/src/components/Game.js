import React, { useState, useEffect } from "react";
import { Grid, Image, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { fetchMovies, generateRandomInteger } from "../utils/API";
import Auth from "../utils/auth";
import { PinkButton, YellowButton } from "./styledComponents";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SCORE } from "../utils/mutations";
import { GET_ME } from "../utils/queries";
import { saveCurrScore, saveCurrTime } from "../utils/localStorage";

export default function Game() {
  const movieNumber = 3;
  const [randomMovies, setRandomMovies] = useState([]);
  const [answerKey, setAnswerKey] = useState([]);
  const [userAnswerArray, setUserAnswerArray] = useState([]);
  const [currentSelectedMovie, setCurrentSelectedMovie] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [clickCounter, setClickCounter] = useState(1);
  const [seed, setSeed] = useState(1);
  const [correctAns, setCorrectAns] = useState([]);
  const [incorrectAns, setIncorrectAns] = useState([]);
  const [numberArray, setNumberArray] = useState(
    new Array(movieNumber).fill(0)
  );

  const [saveScore, { error }] = useMutation(ADD_SCORE);
  const { loading, data } = useQuery(GET_ME);

  const navigate = useNavigate();
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const colors = ["#de077d", "#fe6c2b", "#fcb42c", "#2786eb", "#6a0ba8"];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else {
      setSeconds(0);
      return () => clearInterval(interval);
    }
  }, [isPlaying, setSeconds]);

  if (!token) {
    return <div id="instructions">You must be logged in to start a game!</div>;
  }

  const handleSelect = (event) => {
    // these don't matter except for state
    const movieId = event.target.getAttribute("data-id");
    const index = event.target.getAttribute("data-index");
    setCurrentSelectedMovie([...currentSelectedMovie, index]);
    setUserAnswerArray([...userAnswerArray, movieId]);
    numberArray[index] = clickCounter;
    setNumberArray(numberArray);

    setClickCounter((clickCounter) => clickCounter + 1);
  };

  const handleUnselect = (event) => {
    setCurrentSelectedMovie([]);
    setUserAnswerArray([]);
    setClickCounter(1);
    setNumberArray(new Array(movieNumber).fill(0));
  };

  const submitAnswers = async (event) => {
    const correctArr = [];
    const incorrectArr = [];
    let counter = 0;
    let i = 0;

    while (i < answerKey.length) {
      if (answerKey[i].toString() === userAnswerArray[i]) {
        counter++;
        correctArr.push(userAnswerArray[i]);
      } else {
        incorrectArr.push(userAnswerArray[i]);
      }
      i++;
    }
    setCorrectAns(correctArr);
    setIncorrectAns(incorrectArr);

    if (counter == answerKey.length) {
      setIsPlaying(false);

      // Calculates score based on time intervals
      let score;

      if (seconds <= 20) {
        score = Math.ceil(5000 - 75 * seconds);
      } else if (seconds > 20 && seconds <= 40) {
        score = Math.ceil(3500 - 3500 * (0.009 * seconds));
      } else if (seconds > 40 && seconds <= 60) {
        score = Math.ceil(2240 - 2240 * (0.008 * seconds));
      } else if (seconds > 60 && seconds <= 90) {
        score = Math.ceil(1165 - 1165 * (0.007 * seconds));
      } else {
        score = Math.ceil(431 - 431 * (0.004 * seconds));
      }

      // Save to local storage for highscore screen
      saveCurrScore(score);
      saveCurrTime(seconds);

      // Pulls highscore from logged in user,
      // New score will replace queried highScore if it's greater
      try {
        if (data.me.highScore < score) {
          const { data } = await saveScore({
            variables: { highScore: score },
          });
        }
      } catch (err) {
        console.error(err);
      }

      // Directs to Highscore page
      navigate("/highscores", { replace: true }, [navigate]);
    } else {
      // Reloads posters to how they were before user selects sequence
      setSeed(Math.random());
      // Removes sequence numbers
      handleUnselect();

      // Make this a disappearing modal or something?
      return console.log("Try again");
    }
  };

  function compare(a, b) {
    if (a.release_date < b.release_date) {
      return -1;
    }
    if (a.release_date > b.release_date) {
      return 1;
    }
    return 0;
  }

  const handleStart = async (event) => {
    setIsPlaying(!isPlaying);

    try {
      const response = await fetchMovies();
      const movies = await response.json();
      const movieArr = [];

      do {
        const addMovie = movies.results[generateRandomInteger(19)];
        if (movieArr.indexOf(addMovie) === -1) {
          movieArr.push(addMovie);
        }
      } while (movieArr.length < movieNumber);

      const movieData = movieArr.map((movie) => ({
        movieId: movie.id,
        title: movie.title,
        release_date: new Date(movie.release_date),
        image: `https://www.themoviedb.org/t/p/w1280/${movie.poster_path}`,
      }));

      const deepCopy = _.cloneDeep(movieData);
      movieData.sort(compare);
      setRandomMovies(deepCopy);
      setAnswerKey(movieData.map((movieData) => movieData.movieId));
      console.log(movieData);
    } catch (err) {
      console.error(err);
    }
  };

  const posters = _.times(randomMovies.length, (i) => (
    <Grid.Column
      key={i}
      max={randomMovies.length}
      style={{ margin: "1rem 0 1rem 0" }}
    >
      <Segment
        id={`poster${i}`}
        data-id={`${randomMovies[i].movieId}`}
        style={{
          backgroundColor:
            correctAns.indexOf(String(randomMovies[i].movieId)) !== -1
              ? "#00ff00"
              : incorrectAns.indexOf(String(randomMovies[i].movieId)) !== -1
              ? "#ff0000"
              : "#de077d",
          borderRadius: "1rem",
          position: "relative",
          top: "0",
          left: "0",
        }}
      >
        <Image
          style={{
            borderRadius: "1rem",
            position: "relative",
            top: "0",
            left: "0",
          }}
          src={`https://www.themoviedb.org/t/p/w1280/${randomMovies[i].image}`}
          // src={
          //   userAnswerArray.indexOf(String(answerKey[i].movieId)) !== -1
          //     ? `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/2324px-Banana-Single.jpg`
          //     : answerKey[i].image
          // }
          alt={`${randomMovies[i].title}`}
          data-id={`${randomMovies[i].movieId}`}
          id={`${randomMovies[i].movieId}`}
          data-index={`${[i]}`}
          data-src={`https://www.themoviedb.org/t/p/w1280/${randomMovies[i].image}`}
          className="movie-poster"
          onClick={handleSelect}
        />
        <h1
          id={`overlay${i}`}
          data-index={`${[i]}`}
          data-id={`${randomMovies[i].movieId}`}
          style={{
            borderRadius: "1rem",
            position: "absolute",
            top: "-.5rem",
            left: "0",
            color: "white",
            opacity: "0.85",
            width: "100%",
            height: "100%",
            backgroundColor: colors[i],
            textAlign: "center",
            padding: "50% 0",
            fontSize: "10rem",
            display: currentSelectedMovie.includes(`${i}`) ? "block" : "none",
          }}
          onClick={handleUnselect}
        >
          {numberArray[i]}
        </h1>
      </Segment>
    </Grid.Column>
  ));

  return (
    <div id="game-screen">
      <div id="instructions">
        Click the poster images to place the movies in order by release year.
      </div>
      {/* is seed necessary for the key? */}
      <Grid centered style={{ marginBottom: "4rem" }}>
        <Grid.Row columns={1} only="mobile tablet" style={{ maxWidth: "80%" }}>
          {posters}
        </Grid.Row>
        <Grid.Row columns={movieNumber * 2} only="computer">
          {posters}
        </Grid.Row>
      </Grid>
      <div className="timer">
        TIME ELAPSED: {parseInt(seconds / 60)}:
        {String(seconds % 60).length == 1 ? "0" + (seconds % 60) : seconds % 60}
      </div>

      {isPlaying ? (
        <></>
      ) : (
        <PinkButton
          className="huge ui button"
          id="start-button"
          onClick={handleStart}
        >
          START
        </PinkButton>
      )}
      {isPlaying ? (
        <YellowButton
          className="huge ui button"
          id="submit-button"
          style={{
            marginBottom: "4rem",
          }}
          onClick={submitAnswers}
          disabled={userAnswerArray.length != movieNumber}
        >
          SUBMIT
        </YellowButton>
      ) : (
        <></>
      )}
    </div>
  );
}
