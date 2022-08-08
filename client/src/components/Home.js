import React from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import cf_logo from "../assets/cf_logo.png";
import AuthService from '../utils/auth';

// const token = AuthService.loggedIn() ? AuthService.getToken() : null;

const NewGame = () => (
  <>
    <div className="logo">
      <Image src={cf_logo} size="big" centered />
    </div>
    <div className="new-game">
      <div className="make-selection">
      {AuthService.loggedIn() ? (
        <>
        <Button
          className="massive ui button"
          as={Link}
          to="/game"
          id="orange-overwrite"
          // disabled={(!token)}
        >
          NEW GAME
        </Button>
        </>
      ) : (
        <></>
      )}
      </div>
      <div className="make-selection">
        <Button className="massive ui button"
        as={Link}
        to="/about"
        id="yellow-overwrite">
          About
        </Button>
      </div>
      <div className="make-selection">
        <Button className="massive ui button" 
        as={Link}
        to="/highscores"
        id="pink-overwrite">
          HIGH SCORES
        </Button>
      </div>
    </div>
  </>
);

export default NewGame;
