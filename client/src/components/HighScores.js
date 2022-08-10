import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";
import { PinkButton, YellowButton } from "./styledComponents";

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
      <h3 style={{ color: "white" }}>HIGH SCORES</h3>
    </div>
    <Grid
      textAlign="center"
      columns="equal"
      centered
      className="universal-scores"
      style={{ margin: "0 0 2rem 2rem", fontSize: "1rem" }}
    >
      <Grid.Row style={{ color: "white"}} centered columns={3}>
        <Grid.Column>PLACE</Grid.Column>
        <Grid.Column>USERNAME</Grid.Column>
        <Grid.Column>SCORE</Grid.Column>
      </Grid.Row>
      {scores}
    </Grid>
    <div className="current-user-scores" style={{ marginBottom: "2rem" }}>
      <h4 style={{ color: "white" }}>YOUR SCORE</h4>
      <h4 style={{ color: "white" }}>TIME: {20 * 60} SECONDS</h4>
    </div>

    <Grid.Row columns={1} only="mobile tablet">
    <PinkButton
      style={{ marginBottom: "2rem" }}
      as={Link}
      to="/game"
      className="huge ui button"
    >
      NEW GAME
    </PinkButton>
    </Grid.Row>
    <Grid.Row columns={1} only="mobile tablet">

    <YellowButton
      style={{ marginBottom: "2rem" }}
      as={Link}
      to="/"
      className="huge ui button"
    >
      HOME
    </YellowButton>
    </Grid.Row>
  </div>
);

export default HighScores;
