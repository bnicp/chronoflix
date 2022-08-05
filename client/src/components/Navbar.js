import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => {
    switch (name) {
      case "login":
        // res.redirect("/login");
        break;
      case "sign up":
        // res.redirect("/signup");
        break;
      case "new game":
        // res.redirect("/signup");
        break;
      default:
      // res.redirect("/newgame");
    }
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Segment>
        <Menu pointing secondary>
          <Menu.Item
            as={Link}
            to="/newgame"
            name="new game"
            active={activeItem === "new game"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/login"
            name="login"
            active={activeItem === "login"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/signup"
            name="sign up"
            active={activeItem === "sign up"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    );
  }
}
