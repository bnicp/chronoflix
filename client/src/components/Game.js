import React, { useState } from "react";
import { Grid, Image, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import IMAGES from "../assets/seq_numbers/index";
import seq_1 from "../assets/seq_numbers/seq_1.jpg";
import seq_2 from "../assets/seq_numbers/seq_2.jpg";
import seq_3 from "../assets/seq_numbers/seq_3.jpg";
import seq_4 from "../assets/seq_numbers/seq_4.jpg";
import seq_5 from "../assets/seq_numbers/seq_5.jpg";
import seq_6 from "../assets/seq_numbers/seq_6.jpg";
import _ from "lodash";
import { fetchMovies, generateRandomInteger } from "../utils/API";
import Auth from "../utils/auth";
import { PinkButton, YellowButton } from "./styledComponents";

const Game = () => {
  const movieNumber = 3;
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [answerKey, setAnswerKey] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [userAnswerSrc, setUserAnswerSrc] = useState([]);

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return <div id="instructions">You must be logged in to start a game!</div>;
  }

  const handleSelect = (event) => {
    const seqArr = [seq_1, seq_2, seq_3, seq_4, seq_5, seq_6];
    const selection_id = event.target.getAttribute("data-id");
    const selection_src = event.target.getAttribute("src");
    const select_poster = event.target;
    // const targetIndex = select_poster.getAttribute('data-index').value
    // const overlay = document.getElementById(`overlay${targetIndex}`)
    // const obj = {}
    // obj.id = selection_id
    // obj.src = selection_src
    // console.log(seq_numbers)

    if (
      userAnswer.indexOf(selection_id) !== -1 &&
      selection_id === userAnswer[userAnswer.length - 1]
    ) {
      const originalPoster = userAnswerSrc[userAnswer.indexOf(selection_id)];
      select_poster.src = `${originalPoster}`;
      select_poster.parentElement.style.backgroundColor = "#de077d";
      // overlay.classList.add('display')
      userAnswer.pop();
      userAnswerSrc.pop();
    } else if (userAnswer.indexOf(selection_id) === -1) {
      userAnswer.push(selection_id);
      userAnswerSrc.push(selection_src);
      console.log("length" + userAnswer.length);
      // overlay.classList.remove('display');
      select_poster.src = `${seqArr[userAnswer.length - 1]}`;
      select_poster.parentElement.style.backgroundColor = "#fff";
    }

    console.log(userAnswer);
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
        image: movie.poster_path,
      }));
      console.log(movieData);
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
      console.error(err);
    }
  };

  const posters = _.times(fetchedMovies.length, (i) => (
    <Grid.Column
      key={i}
      max={fetchedMovies.length}
      style={{ margin: "1rem 0 1rem 0" }}
    >
      <Segment
        id={`poster${i}`}
        style={{
          backgroundColor: "#de077d",
          borderRadius: "1rem",
          position: "relative",
        }}
      >
        <Image
          style={{ borderRadius: "1rem" }}
          src={`https://www.themoviedb.org/t/p/w1280/${fetchedMovies[i].image}`}
          alt={`${fetchedMovies[i].title}`}
          data-id={`${fetchedMovies[i].movieId}`}
          data-index={`${[i]}`}
          // data-src={`https://www.themoviedb.org/t/p/w1280/${fetchedMovies[i].image}`}
          onClick={handleSelect}
          className="movie-poster"
        />

        {/* <Image
          className="movie-poster"
          style={{ borderRadius: "1rem", position: "absolute", top:"0%", left:"0%", display:"none"}}
          src={`https://belusaweb.s3.amazonaws.com/product-images/colors/Banana_banana-squeezie-al26021-gallery-1.jpg`}
          alt={`${fetchedMovies[i].title}`}
          id={`overlay${[i]}`}
          // data-src={`https://www.themoviedb.org/t/p/w1280/${fetchedMovies[i].image}`}
          // onClick={handleSelect}
          
        /> */}
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
      <PinkButton
        className="massive ui button"
        id="start-button"
        onClick={handleStart}
      >
        START
      </PinkButton>

      <YellowButton
        className="massive ui button"
        id="submit-button"
        as={Link}
        to="/highscores"
      >
        SUBMIT
      </YellowButton>
    </div>
  );
};

export default Game;
