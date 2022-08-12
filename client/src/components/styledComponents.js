import styled from "styled-components";
import { Button } from "semantic-ui-react";

// Create a Title component that'll render an <h1> tag with some styles
export const CustomButton = styled(Button)`
  background-color: var(--dark-blue) !important;
  width: 45% !important;
  margin-top: 3rem !important;
  &:hover {
  color: white !important;
  }
`;

// Create a Wrapper component that'll render a <section> tag with some styles
export const PinkButton = styled(CustomButton)`
  color: var(--pink) !important;
  border: 3px solid var(--pink) !important;
  &:hover {
    background-color: var(--pink) !important;
  }
`;

export const OrangeButton = styled(CustomButton)`
  color: var(--orange) !important;
  border: 3px solid var(--orange) !important;
  &:hover {
    background-color: var(--orange) !important;
  }
`;

export const YellowButton = styled(CustomButton)`
  color: var(--yellow) !important;
  border: 3px solid var(--yellow) !important;
  &:hover {
    background-color: var(--yellow) !important;
  }
`;
