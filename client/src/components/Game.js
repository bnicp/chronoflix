import React from "react";
import { Grid, Image, Segment, Button } from "semantic-ui-react";
import army from "../assets/army.jpg";
import _ from "lodash";

const movieNumber = 3;

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

async function fetchMovies() {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e11f09fb5ad40a4f8bb7c23b9db6229e&with_genres=27&page=2&language=en-US&primary_release_date.gte=2011&primary_release_date.lte=2020`);
  const movies = await response.text();
  const movieData = JSON.parse(movies);
  console.log(movieData);

  let movieArr = []
  
  do {
      const addMovie = movieData.results[generateRandomInteger(19)];
      if (movieArr.indexOf(addMovie) === -1) {
          movieArr.push(addMovie)
      } 
  } while (movieArr.length < 6);

  console.log(movieArr);

  function compare( a, b ) {
      if ( a.release_date < b.release_date ){
        return -1;
      }
      if ( a.release_date > b.release_date ){
        return 1;
      }
      return 0;
    }
  
  let answerKey = movieArr.map(a => {return {...a}})
  answerKey = answerKey.sort(compare);
  console.log(answerKey);
  
}

window.onLoad= fetchMovies();

const posters = _.times(movieNumber, (i) => (
  <Grid.Column key={i} max={movieNumber} style={{ margin: "1rem 0 1rem 0" }}>
    <Segment
      id={`poster${i}`}
      style={{ backgroundColor: "#de077d", borderRadius: "1rem" }}
    >
      <Image
        style={{ borderRadius: "1rem" }}
        src={army}
        className="movie-poster"
      />
    </Segment>
  </Grid.Column>
));

const Game = () => (
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
      id="submit-button"
      style={{ marginBottom: "4rem" }}
    >
      SUBMIT
    </Button>
  </div>
);

export default Game;
