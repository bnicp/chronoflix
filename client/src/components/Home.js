import React from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import cf_logo from "../assets/cf_logo.png";
import AuthService from "../utils/auth";
import { YellowButton, OrangeButton, PinkButton } from "./styledComponents";

const NewGame = () => (
  <>
    <div className="logo" style={{ maxWidth: "80%", marginLeft: "10%" }}>
      <Image src={cf_logo} size="big" centered />
    </div>
    <div className="new-game">
      <div className="make-selection">
        {AuthService.loggedIn() ? (
          <OrangeButton as={Link} to="/game" className="huge ui button">
            NEW GAME
          </OrangeButton>
        ) : (
          <></>
        )}
      </div>
      <div className="make-selection">
        <YellowButton as={Link} to="/about" className="huge ui button">
          ABOUT
        </YellowButton>
      </div>
      <div className="make-selection">
        <PinkButton
          as={Link}
          to="/highscores"
          className="huge ui button"
          style={{ marginBottom: "2rem" }}
        >
          HIGH SCORES
        </PinkButton>
      </div>
    </div>
  </>
);

export default NewGame;
