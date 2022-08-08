import React, { useState } from "react";
import { Grid, Image, Segment, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import army from "../assets/army.jpg";
import _ from "lodash";
import { fetchMovies, generateRandomInteger } from "../utils/API";
import Auth from '../utils/auth';
require("dotenv").config();

const Game = () => {
  const movieNumber = 3;
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [answerKey, setAnswerKey] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);

  const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return (
        <div id="instructions">
        You must be logged in to start a game!
        </div>
      )
    };

  const handleSelect = (event) => {
    // event.preventDefault();
    const selection = event.target.getAttribute('data-id');
    if (userAnswer.indexOf(selection) !== -1 && selection === userAnswer[userAnswer.length - 1]) {
      userAnswer.pop()
    } else if (userAnswer.indexOf(selection) === -1) {
      userAnswer.push(selection);
    }

    console.log(userAnswer)

  };

  const handleStart = async (event) => {
    event.preventDefault();

    try {
      const response = await fetchMovies();
      const movies = await response.json();

      let movieArr = [];

      do {
        const addMovie = movies.results[generateRandomInteger(19)];
        if (movieArr.indexOf(addMovie) === -1) {
          movieArr.push(addMovie);
        }
      } while (movieArr.length < 6);

      const movieData = movieArr.map((movie) => ({
        movieId: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        image: movie.poster_path
      }));
      console.log(movieData)
      setFetchedMovies(movieData);
      // console.log(fetchedMovies);
      function compare(a, b) {
        if (a.release_date < b.release_date) {
          return -1;
        }
        if (a.release_date > b.release_date) {
          return 1;
        }
        return 0;
      }
  
      let answerKey = movieData.map((a) => {
        return { ...a };
      });
      answerKey = answerKey.sort(compare);
      console.log(answerKey);
      setAnswerKey(answerKey);
    } catch (err) {
      console.error(err)
    }
  };

  const posters = _.times(fetchedMovies.length, (i) => (
    <Grid.Column key={i} max={fetchedMovies.length} style={{ margin: "1rem 0 1rem 0" }}>
      <Segment
        id={`poster${i}`}
        style={{ backgroundColor: "#de077d", borderRadius: "1rem" }}
        
      >
        <Image
          style={{ borderRadius: "1rem" }}
          src={`https://www.themoviedb.org/t/p/w1280/${fetchedMovies[i].image}`}
          alt={`${fetchedMovies[i].title}`}
          data-id={`${fetchedMovies[i].movieId}`}
          onClick={handleSelect}
          className="movie-poster"
        />
      </Segment>
    </Grid.Column>
  ));

  return (
    <div id="game-screen">
      <div id="instructions">
        Click the poster images to place the movies in order by release year.
      </div>
      <Grid centered style={{ marginBottom: "4rem" }}>
        <Grid.Row columns={1} only="mobile tablet" style={{ maxWidth: "80%" }}>
          {posters}
        </Grid.Row>
        <Grid.Row columns={movieNumber * 2} only="computer">
          {posters}
        </Grid.Row>
      </Grid>
      <div className="timer">TIME LEFT: </div>
      <Button
        className="massive ui button"
        id="start-button"
        onClick={handleStart}>
        START
      </Button>

      <Button
        className="massive ui button"
        id="submit-button"
        as={Link}
        to="/highscores"
        style={{ marginBottom: "4rem" }}
      >
        SUBMIT
      </Button>
    </div>
  );
};

export default Game;
