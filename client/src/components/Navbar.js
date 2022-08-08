import React, { Component } from "react";
import { Menu, Segment, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import words from "../assets/word_symbol_transparent.png";
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
          {/* <Image src={logo} size="mini" style={{ display: "inline-block" }} /> */}
          <Image
            src={words}
            size="medium"
            id="nav-logo"
            as={Link}
            to="*"
            style={{ display: "inline-block" }}
          />
        </div>
        <Menu pointing secondary className="twelve wide column">
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeItem === "home"}
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
            <></>
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
