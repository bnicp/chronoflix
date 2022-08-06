import React, { Component } from "react";
import { Menu, Segment, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "../assets/cf_symbol.png";
import words from "../assets/cf_words.png";
import AuthService from "../utils/auth";

export default class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Segment>
        <div className="four wide column">
          <Image src={logo} size="mini" style={{ display: "inline-block" }} />
          <Image src={words} size="small" style={{ display: "inline-block" }} />
        </div>
        <Menu pointing secondary className="twelve wide column">
          <Menu.Item
            as={Link}
            to="/newgame"
            name="new game"
            active={activeItem === "new game"}
            onClick={this.handleItemClick}
          />
          {AuthService.loggedIn() ? (
            <>
              <Menu.Item
                as={Link}
                to="/logout"
                name="logout"
                active={activeItem === "logout"}
                onClick={AuthService.logout}
              />
            </>
          ) : (
            <Menu.Item
              as={Link}
              to="/login"
              name="login"
              active={activeItem === "login"}
              onClick={this.handleItemClick}
            />
          )}
          {AuthService.loggedIn() ? (
            <>
            </>
          ) : (
            <Menu.Item
            as={Link}
            to="/signup"
            name="sign up"
            active={activeItem === "sign up"}
            onClick={this.handleItemClick}
          />
          )}
        </Menu>
      </Segment>
    );
  }
}
