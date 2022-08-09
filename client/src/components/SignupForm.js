import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, FormGroup } from "semantic-ui-react";
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
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check if form has everything (as per react-bootstrap docs)
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
      const { token, user } = response.data.addUser;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
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
      <PinkButton
        type="submit"
        disabled={
          !(
            userFormData.email &&
            userFormData.password &&
            userFormData.password
          )
        }
      >
        SUBMIT
      </PinkButton>
    </Form>
  );
};

export default SignupForm;
