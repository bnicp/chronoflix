import React from "react";
import { Link } from "react-router-dom";
import { Grid, Image, Segment, Button } from "semantic-ui-react";
import scores from "../assets/all_user_scores.png";
import current from "../assets/current_user_scores.png";

const HighScores = () => (
  <div id="high-scores">
    <div className="heading">
      <h1>HIGH SCORES</h1>
    </div>
    <div className="universal-scores">
      <Image src={scores} id="all" />
    </div>
    <div className="current-user-scores">
      <Image src={current} id="one" />
    </div>
    <Button
      as={Link}
      to="/game"
      className="massive ui button new-game"
      id="pink-overwrite"
    >
      NEW GAME
    </Button>
    <Button
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
