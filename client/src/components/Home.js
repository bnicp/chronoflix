import React from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import cf_logo from "../assets/cf_logo.png";
import AuthService from "../utils/auth";
import { YellowButton, OrangeButton, PinkButton } from "./styledComponents";

// const token = AuthService.loggedIn() ? AuthService.getToken() : null;

const NewGame = () => (
  <>
    <div className="logo">
      <Image src={cf_logo} size="big" centered />
    </div>
    <div className="new-game">
      <div className="make-selection">
        {AuthService.loggedIn() ? (
          <OrangeButton as={Link} to="/game" className="massive ui button">
            NEW GAME
          </OrangeButton>
        ) : (
          <></>
        )}
      </div>
      <div className="make-selection">
        <YellowButton as={Link} to="/about" className="massive ui button">
          ABOUT
        </YellowButton>
      </div>
      <div className="make-selection">
        <PinkButton as={Link} to="/highscores" className="massive ui button">
          HIGH SCORES
        </PinkButton>
      </div>
    </div>
  </>
);

export default NewGame;
