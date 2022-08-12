/* eslint-disable max-len */
import React from "react";
import { Container, Header, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { PinkButton, YellowButton } from "./styledComponents";

const About = () => (
  <Container style={{ color: "white", marginTop: "4rem" }} text>
    <Header as="h2" style={{ color: "white" }}>
      About ChronoFlix
    </Header>
    <p>
      Built by a team of non-movie aficionados, ChronoFlix was built because of
      a mutual frustration of not knowing what movies people were talking about.
      We built ChronoFlix in order to be better trivia teammates to our friends,
      have general knowledge in conversation, and indulge and overall curiosity about
      movies.
    </p>
    <p>
      This game is built on data sourced from TMDb. Using GraphQL we have a
      responsive and quick design that results in a pleasing experience for
      players. It is also backed by MongoDB, Javascript, and many node packages.
      Check out our GitHub to find out more. Thanks for stopping by!
    </p>
    <a href="https://github.com/bnicp/chronoflix" rel="noreferrer noopener" target="_blank">GitHub Link</a>
    <Grid.Row>
    <PinkButton
      as={Link}
      to="/game"
      className="huge ui button"
      style= {{ fontSize:"1rem", marginBottom: "2rem" }}
      only="mobile" 
    >
      NEW GAME
    </PinkButton>
    </Grid.Row>
  </Container>
  
);

export default About;
