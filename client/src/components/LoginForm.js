import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { PinkButton } from "./styledComponents";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  // const [validated] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    try {
      const response = await loginUser({ variables: { ...userFormData } });

      if (!response.data.loginUser) {
        throw new Error("something went wrong!");
      }

      const { token, user } = await response.data.loginUser;
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      // setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
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
      <PinkButton
        type="submit"
        disabled={!(userFormData.email && userFormData.password)}
      >
        SUBMIT
      </PinkButton>
    </Form>
  );
};

export default LoginForm;
