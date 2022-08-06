import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

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

    // check if form has everything (as per react-bootstrap docs)
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
      <Button
        inverted
        color="red"
        type="submit"
        style={{ fontSize: "18px", marginTop: "1.5em" }}
        disabled={!(userFormData.email && userFormData.password)}
      >
        Submit
      </Button>
    </Form>

    // <>
    //   <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
    //     {/* <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
    //       Something went wrong with your login credentials!
    //     </Alert> */}
    //     <Form.Group>
    //       <Form.Label htmlFor='email'>Email</Form.Label>
    //       <Form.Control
    //         type='text'
    //         placeholder='Your email'
    //         name='email'
    //         onChange={handleInputChange}
    //         value={userFormData.email}
    //         required
    //       />
    //       <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
    //     </Form.Group>

    //     <Form.Group>
    //       <Form.Label htmlFor='password'>Password</Form.Label>
    //       <Form.Control
    //         type='password'
    //         placeholder='Your password'
    //         name='password'
    //         onChange={handleInputChange}
    //         value={userFormData.password}
    //         required
    //       />
    //       <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
    //     </Form.Group>
    //     <Button
    //       disabled={!(userFormData.email && userFormData.password)}
    //       type='submit'
    //       variant='success'>
    //       Submit
    //     </Button>
    //   </Form>
    // </>
  );
};

export default LoginForm;

// const LoginForm = () => (
//   <Form>
//     <Form.Field>
//       <label style={{ color: "white", fontSize: "20px" }}>Username</label>
//       <input placeholder="Username" />
//     </Form.Field>
//     <Form.Field>
//       <label style={{ color: "white", fontSize: "20px" }}>Password</label>
//       <input placeholder="Password" />
//     </Form.Field>
//     <Button inverted color="red">
//       Submit
//     </Button>
//   </Form>
// );

// export default LoginForm;
