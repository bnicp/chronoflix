import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";
import { PinkButton, YellowButton } from "./styledComponents";

import { useQuery} from '@apollo/client';
import { GET_ALLUSERS } from '../utils/queries';

const colors = ["#de077d", "#fe6c2b", "#fcb42c", "#2786eb", "#6a0ba8"];

const HighScores = () => {

const { loading, data } =useQuery(GET_ALLUSERS);
// console.log(data)
// const userData = data?.allUsers || {};
const getScores = (data2) => {
console.log(data2)
if(!loading){
  const scores = colors.map((color, i) => (
    <Grid.Row style={{ color: `${color}` }} key={color} centered columns={3}>
      <Grid.Column>{i + 1}</Grid.Column>
      <Grid.Column>{data2.allUsers[i].username}</Grid.Column>
      <Grid.Column>SCORE</Grid.Column>
    </Grid.Row>
  ));

return scores
}
}


// const scores = colors.map((color, i) => (
//   <Grid.Row style={{ color: `${color}` }} key={color} centered columns={3}>
//     <Grid.Column>{i + 1}</Grid.Column>
//     <Grid.Column>username</Grid.Column>
//     <Grid.Column>SCORE</Grid.Column>
//   </Grid.Row>
// ));

// if (loading) {
//   return <h2>LOADING...</h2>;
// }
// const HighScores = () => (
  return (
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
      {getScores(data)}
    </Grid>
    <div className="current-user-scores" style={{ marginBottom: "2rem" }}>
      <h1 style={{ color: "white" }}>YOUR SCORE</h1>
      <h1 style={{ color: "white" }}>TIME: {20 * 60} SECONDS</h1>
    </div>
    <PinkButton
      style={{ marginBottom: "2rem" }}
      as={Link}
      to="/game"
      className="huge ui button"
    >
      NEW GAME
    </PinkButton>
    <YellowButton
      style={{ marginBottom: "2rem" }}
      as={Link}
      to="/"
      className="huge ui button"
    >
      HOME
    </YellowButton>
  </div>
);
}

export default HighScores;
