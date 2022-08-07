import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";

const colors = ["#de077d", "#fe6c2b", "#fcb42c", "#2786eb", "#6a0ba8"];

const scores = colors.map((color, i) => (
  <Grid.Row style={{ color: `${color}` }} key={color} centered columns={3}>
    <Grid.Column>{i + 1}</Grid.Column>
    <Grid.Column>USERNAME</Grid.Column>
    <Grid.Column>SCORE</Grid.Column>
  </Grid.Row>
));

const HighScores = () => (
  <div id="high-scores">
    <div className="heading">
      <h1 style={{ color: "white" }}>HIGH SCORES</h1>
    </div>
    <Grid
      textAlign="center"
      columns="equal"
      centered
      className="universal-scores"
      style={{ marginBottom: "2rem" }}
    >
      <Grid.Row style={{ color: "white" }} centered columns={3}>
        <Grid.Column>PLACE</Grid.Column>
        <Grid.Column>USERNAME</Grid.Column>
        <Grid.Column>SCORE</Grid.Column>
      </Grid.Row>
      {scores}
    </Grid>
    <div className="current-user-scores" style={{ marginBottom: "2rem" }}>
      <h1 style={{ color: "white" }}>YOUR SCORE</h1>
      <h1 style={{ color: "white" }}>TIME: {20 * 60} SECONDS</h1>
    </div>
    <Button
      style={{ marginBottom: "2rem" }}
      as={Link}
      to="/game"
      className="massive ui button new-game"
      id="yellow-overwrite"
    >
      NEW GAME
    </Button>
    <Button
      style={{ marginBottom: "2rem" }}
      as={Link}
      to="/"
      className="massive ui button new-game"
      id="pink-overwrite"
    >
      HOME
    </Button>
  </div>
);

export default HighScores;
