import React, { useState, useEffect } from "react";
import { Grid, Image, Segment } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import IMAGES from "../assets/seq_numbers/index";
import seq_0 from "../assets/seq_numbers/seq_0.jpg";
import seq_1 from "../assets/seq_numbers/seq_1.jpg";
import seq_2 from "../assets/seq_numbers/seq_2.jpg";
import _ from "lodash";
import { fetchMovies, generateRandomInteger } from "../utils/API";
import Auth from "../utils/auth";
import { PinkButton, YellowButton } from "./styledComponents";
import { useElapsedTime } from "use-elapsed-time";

export default function Game() {
  const movieNumber = 3;
  const [randomMovies, setRandomMovies] = useState([]);
  const [answerKey, setAnswerKey] = useState([]);
  const [userAnswerArray, setUserAnswerArray] = useState([]);
  const [currentSelectedMovie, setCurrentSelectedMovie] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [seed, setSeed] = useState(1);

  const navigate = useNavigate();
  const token = Auth.loggedIn() ? Auth.getToken() : null;

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
    const movieId = event.target.getAttribute("data-id");
    const index = event.target.getAttribute("data-index");
    setCurrentSelectedMovie([...currentSelectedMovie, index]);
    setUserAnswerArray([...userAnswerArray, movieId]);
  };

  const handleUnselect = (event) => {
    const movieId = event.target.getAttribute("data-id");
    const index = event.target.getAttribute("data-index");
    setCurrentSelectedMovie(
      currentSelectedMovie.filter((element) => element != index)
    );
    setUserAnswerArray(userAnswerArray.filter((element) => element != movieId));
  };

  const submitAnswers = (event) => {
    const correctArr = [];
    const incorrectArr = [];
    // stopCounting();

    for (let i = 0; i < answerKey.length; i++) {
      if (answerKey[i].movieId === Number(userAnswerArray[i])) {
        correctArr.push(userAnswerArray[i]);
      } else {
        incorrectArr.push(userAnswerArray[i]);
      }
    }

    if (correctArr.length === answerKey.length) {
      setIsWinner(true);
      let score;
      // if (counter <= 20) {
      //   score = Math.ceil(5000 - 41 * counter);
      // } else if (counter > 20 && counter < 40) {
      //   score = Math.ceil(4160 * (0.75 * counter * 0.01));
      // } else if (counter >= 40 && counter <= 60) {
      //   score = Math.ceil(2943 * (0.75 * counter * 0.01));
      // } else {
      //   score = Math.ceil(1618 * (0.5 * counter));
      // }

      navigate("/highscores", { replace: true }, [navigate]);
      return console.log("Timer should be stopped");
    } else {
      setSeed(Math.random());

      return console.log("Try again");
    }
  };

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
        release_date: movie.release_date,
        image: `https://www.themoviedb.org/t/p/w1280/${movie.poster_path}`,
      }));

      setRandomMovies(movieData);
      const sortedArray = _.sortBy(movieData, [movieData.release_date]);
      setAnswerKey(sortedArray.map((movieData) => movieData.movieId));
    } catch (err) {
      console.error(err);
    }
  };

  const getImagePath = (i) => {
    switch (i) {
      case 0:
        return seq_0;
      case 1:
        return seq_1;
      default:
        return seq_2;
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
            userAnswerArray.indexOf(String(answerKey[i])) !== -1
              ? "#00ff00"
              : userAnswerArray.indexOf(String(answerKey[i])) !== -1
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
          //   correctAns.indexOf(String(answerKey[i].movieId)) !== -1
          //     ? `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/2324px-Banana-Single.jpg`
          //     : `https://www.themoviedb.org/t/p/w1280/${answerKey[i].image}`
          // }
          alt={`${randomMovies[i].title}`}
          data-id={`${randomMovies[i].movieId}`}
          id={`${randomMovies[i].movieId}`}
          data-index={`${[i]}`}
          data-src={`https://www.themoviedb.org/t/p/w1280/${randomMovies[i].image}`}
          className="movie-poster"
          onClick={handleSelect}
        />
        <Image
          src={getImagePath(i)}
          data-index={`${[i]}`}
          data-id={`${randomMovies[i].movieId}`}
          style={{
            borderRadius: "1rem",
            position: "absolute",
            top: "0",
            left: "0",
            opacity: "0.85",
            display: currentSelectedMovie.includes(`${i}`) ? "block" : "none",
          }}
          onClick={handleUnselect}
        ></Image>
      </Segment>
    </Grid.Column>
  ));

  return (
    <div id="game-screen">
      <div id="instructions">
        Click the poster images to place the movies in order by release year.
      </div>
      <Grid key={seed} centered style={{ marginBottom: "4rem" }}>
        <Grid.Row columns={1} only="mobile tablet" style={{ maxWidth: "80%" }}>
          {posters}
        </Grid.Row>
        <Grid.Row columns={movieNumber * 2} only="computer">
          {posters}
        </Grid.Row>
      </Grid>
      <div className="timer">TIME ELAPSED: {seconds}</div>

      <PinkButton
        className="massive ui button"
        id="start-button"
        onClick={handleStart}
      >
        {!isPlaying ? "START" : "RESET"}
      </PinkButton>
      {/* { !isStarted ? ( null ) : ( ) } */}
      <YellowButton
        className="massive ui button"
        id="submit-button"
        style={{
          marginBottom: "4rem",
          // visibility: isPlaying ? "visible" : "hidden",
        }}
        onClick={submitAnswers}
        disabled={userAnswerArray.length != movieNumber}
      >
        SUBMIT
      </YellowButton>
    </div>
  );
}
