/* eslint-disable max-len */
import React from "react";
import { Container, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

const About = () => (
  <Container style={{ color: "white", marginTop: "4rem" }} text>
    <Header as="h2" style={{ color: "white" }}>
      About Chronoflix
    </Header>
    <p>
      Built by a team of non-movie aficionados, ChronoFlix was built because of
      a mutual frustration of not knowing what movies people were talking about.
      We built ChronoFlix in order to be better trivia teammates to our friends,
      have general knowledge in conversation, and overall curiosity about
      movies.
    </p>
    <p>
      This game is built on data sourced from TMDb. Using GraphQL we have a
      responsive and quick design that results in a pleasing experience for
      players. It is also backed by MongoDB, Javascript, and many node packages.
      Check out our GitHub to find out more. Thanks for stopping by!
    </p>
    <a href="https://github.com/bnicp/chronoflix" rel="noreferrer noopener" target="_blank">GitHub Link</a>
  </Container>
);

export default About;
