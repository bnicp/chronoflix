import React, { useState } from "react";
import { Form, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { PinkButton } from "./styledComponents";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    document.getElementById("form").classList.remove("error");
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser({ variables: { ...userFormData } });

      if (!response.data.loginUser) {
        console.log(response);
        throw new Error("something went wrong!");
      }

      const { token, user } = await response.data.loginUser;

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
            type="text"
            placeholder="Email"
            id="email"
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
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </Form.Field>
      </Form.Group>
      <Message
        error
        header="Login Invalid"
        content="Username or password could not be found."
        style={{ fontSize: "18px", margin: "2.5em 15em 0 15em" }}
      />
      <PinkButton
        type="submit"
        style={{ marginTop: "1em" }}
        disabled={!(userFormData.email && userFormData.password)}
      >
        SUBMIT
      </PinkButton>
    </Form>
  );
};

export default LoginForm;
