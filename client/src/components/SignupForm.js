import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Label, Message } from "semantic-ui-react";
import { PinkButton } from "./styledComponents";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validUserName, setValidUserName] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    document.getElementById("form").classList.remove("error");
    const { name, value } = event.target;

    if (name === "username") {
      if (value.length <= 8 && value.length >= 3) {
        setValidUserName(true);
      } else {
        setValidUserName(false);
      }
    }

    if (name === "password") {
      if (value.length >= 8) {
        setValidPassword(true);
      } else {
        setValidPassword(false);
      }
    }

    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const response = await addUser({ variables: { ...userFormData } });
      if (!response.data.addUser) {
        throw new Error("something went wrong!");
      }
      const { token } = response.data.addUser;
      Auth.login(token);
    } catch (err) {
      document.getElementById("form").classList.add("error");
      console.error(err);
    }
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Form id="form" onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Field>
          <label style={{ color: "white", fontSize: "18px", marginTop: "1em" }}>
            Email
          </label>
          <input
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field>
          <label style={{ color: "white", fontSize: "18px", marginTop: "1em" }}>
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
        </Form.Field>
      </Form.Group>
      {validUserName ? (
        <></>
      ) : (
        <Form.Field>
          <Label pointing prompt>
            Username must be between 3-8 characters.
          </Label>
        </Form.Field>
      )}
      <Form.Group>
        <Form.Field>
          <label style={{ color: "white", fontSize: "18px", marginTop: "1em" }}>
            Password
          </label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
          />
        </Form.Field>
      </Form.Group>
      {validPassword ? (
        <></>
      ) : (
        <Form.Field>
          <Label pointing prompt>
            Password must be a minimum of 8 characters.
          </Label>
        </Form.Field>
      )}
      <Message
        error
        header="Login Invalid"
        content="Username or password could not be found."
        style={{ fontSize: "18px", margin: "2.5em 15em 0 15em" }}
      />
      <PinkButton
        type="submit"
        disabled={
          !(
            userFormData.email &&
            userFormData.password &&
            userFormData.username
          )
        }
      >
        SUBMIT
      </PinkButton>
    </Form>
  );
};

export default SignupForm;
