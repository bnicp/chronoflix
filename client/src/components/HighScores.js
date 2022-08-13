import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { PinkButton } from "./styledComponents";
import { useQuery } from "@apollo/client";
import { GET_ALLUSERS } from "../utils/queries";
import { getUserScore } from "../utils/localStorage";

const colors = ["#de077d", "#fe6c2b", "#fcb42c", "#2786eb", "#6a0ba8"];

const HighScores = () => {
  // Query to get allUsers to display highscores, this is sorted in desc order in the resolver
  const { loading, data } = useQuery(GET_ALLUSERS);

  // Populates highscores with data from allUsers query
  const getScores = (scoreData) => {
    if (!loading) {
      const scores = colors.map((color, i) => {
        if (scoreData.allUsers[i].highScore !== null) {
          return (
            <Grid.Row style={{ color: `${color}` }} key={color}>
              <Grid.Column width={4}>{i + 1}</Grid.Column>
              <Grid.Column width={7}>
                {scoreData.allUsers[i].username}
              </Grid.Column>
              <Grid.Column>{scoreData.allUsers[i].highScore}</Grid.Column>
            </Grid.Row>
          );
        }
      });

      return scores;
    }
  };

  return (
    <div id="high-scores">
      <div className="">
        <h3 style={{ color: "white", margin: "2rem 0" }}>HIGH SCORES</h3>
      </div>
      <Grid
        columns="equal"
        className="universal-scores"
        style={{ margin: "0 0 2rem 5%", fontSize: "1rem" }}
      >
        <Grid.Row style={{ color: "white" }}>
          <Grid.Column width={4}>RANK</Grid.Column>
          <Grid.Column width={7}>USERNAME</Grid.Column>
          <Grid.Column>SCORE</Grid.Column>
        </Grid.Row>
        {getScores(data)}
      </Grid>
      <div className="current-user-scores">
        <h4 style={{ color: "white" }}>YOUR SCORE: {getUserScore()[0]}</h4>
        <h4 style={{ color: "white" }}>TIME: {getUserScore()[1]} SECONDS</h4>
      </div>

      <Grid.Row>
        <PinkButton
          as={Link}
          to="/game"
          className="huge ui button"
          style={{ fontSize: "1rem" }}
          only="mobile"
        >
          NEW GAME
        </PinkButton>
      </Grid.Row>
    </div>
  );
};

export default HighScores;
