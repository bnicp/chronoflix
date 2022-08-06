import React from "react";
import { Grid, Image, Segment, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import army from "../assets/army.jpg";
import _ from "lodash";

const movieNumber = 3;

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
      as={Link}
      to="/highscores"
      style={{ marginBottom: "4rem" }}
    >
      SUBMIT
    </Button>
  </div>
);

export default Game;
