import React from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import cf_logo from "../assets/cf_logo.png";

const NewGame = () => (
  <>
    <div className="logo">
      <Image src={cf_logo} size="huge" centered />
    </div>
    <div className="new-game">
      <div className="make-selection">
        <Button
          className="massive ui button"
          as={Link}
          to="/game"
          id="orange-overwrite"
        >
          NEW GAME
        </Button>
      </div>
      <div className="make-selection">
        <Button className="massive ui button" id="yellow-overwrite">
          HOW TO
        </Button>
      </div>
      <div className="make-selection">
        <Button className="massive ui button" id="pink-overwrite">
          HIGH SCORES
        </Button>
      </div>
    </div>
  </>
);

export default NewGame;
