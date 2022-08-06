import React from "react";
import { Grid, Image, Segment, Button } from "semantic-ui-react";

const HighScores = () => (
  <div id="high-scores">
    <div className="heading">
      <h1>HIGH SCORES</h1>
    </div>
    <div className="universal-scores">
      <img src="./client/src/assets/all_user_scores.png" id="all" />
    </div>
    <div className="current-user-scores">
      <img src="./client/src/assets/current_user_scores.png" id="one" />
    </div>
    <Button className="massive ui button new-game" id="pink-overwrite">
      NEW GAME
    </Button>
  </div>
);

export default HighScores;
