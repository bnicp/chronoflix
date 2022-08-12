import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button, Segment } from "semantic-ui-react";
import { PinkButton, YellowButton } from "./styledComponents";

const colors = ["#de077d", "#fe6c2b", "#fcb42c", "#2786eb", "#6a0ba8"];

const scores = colors.map((color, i) => (
  <Grid.Row style={{ color: `${color}` }} key={color}>
    <Grid.Column width={4}>{i + 1}</Grid.Column>
    <Grid.Column width={7}>USERNAME</Grid.Column>
    <Grid.Column>SCORE</Grid.Column>
  </Grid.Row>
));

const HighScores = () => (
  <div id="high-scores">
    <div className="">
      <h3 style={{ color: "white", margin: "2rem 0" }}>HIGH SCORES</h3>
    </div>
    <Grid
      textAlign="center"
      columns="equal"
      centered
      className="universal-scores"
      style={{ margin: "0 0 2rem 5%", fontSize: "1rem" }}
    >
      <Grid.Row style={{ color: "white" }}>
        <Grid.Column width={4}>RANK</Grid.Column>
        <Grid.Column width={7}>USERNAME</Grid.Column>
        <Grid.Column>SCORE</Grid.Column>
      </Grid.Row>
      {scores}
    </Grid>
    <div className="current-user-scores">
      <h4 style={{ color: "white" }}>YOUR SCORE</h4>
      <h4 style={{ color: "white" }}>TIME: {20 * 60} SECONDS</h4>
    </div>

    <Grid.Row>
    <PinkButton
      as={Link}
      to="/game"
      className="huge ui button"
      style= {{ fontSize:"1rem" }}
      only="mobile" 
    >
      NEW GAME
    </PinkButton>
    {/* </Grid.Row> */}
    {/* <Grid.Row> */}

    <YellowButton
      style={{ marginBottom: "2rem", fontSize:"1rem" }}
      as={Link}
      to="/"
      className="huge ui button"
      only="mobile" 
    >
      HOME
    </YellowButton>
    </Grid.Row>
  </div>
);

export default HighScores;
