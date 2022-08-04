import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";

export default class Navbar extends Component {
  state = { activeItem: "login" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            name="new game"
            active={activeItem === "new game"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="high scores"
            active={activeItem === "high scores"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    );
  }
}
