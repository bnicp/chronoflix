import React from "react";
import { Button, Image, Segment } from "semantic-ui-react";
import cf_logo from "../assets/cf_logo.png";

const NewGame = () => (
  <>
    <div className="logo">
      <Image src={cf_logo} />
    </div>
    <div className="new-game">
      <div className="selection">
        <Button className="massive ui button" id="orange-overwrite">
          NEW GAME
        </Button>
      </div>
      <div className="selection">
        <Button className="massive ui button" id="yellow-overwrite">
          DIFFICULTY
        </Button>
      </div>
      <div className="selection">
        <Button className="massive ui button" id="pink-overwrite">
          HIGH SCORES
        </Button>
      </div>
    </div>
  </>
);

export default NewGame;
