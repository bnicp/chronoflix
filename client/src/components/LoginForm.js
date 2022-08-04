// import React, { useState } from "react";
import React from "react";
// import { useMutation } from "@apollo/client";
// import { Form, Button, Alert } from "react-bootstrap";
import { Button, Form } from "semantic-ui-react";
// import { ADD_USER } from "../utils/mutations";
// import Auth from "../utils/auth";

const LoginForm = () => {
  // set initial form state
  // const [userFormData, setUserFormData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });
  // // set state for form validation
  // const [validated] = useState(false);
  // // set state for alert
  // const [showAlert, setShowAlert] = useState(false);
  // const [addUser, { error }] = useMutation(ADD_USER);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setUserFormData({ ...userFormData, [name]: value });
  // };

  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // // check if form has everything (as per react-bootstrap docs)
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // try {
    //   const response = await addUser({ variables: { ...userFormData } });
    //   if (!response.data.addUser) {
    //     throw new Error("something went wrong!");
    //   }
    //   const { token, user } = response.data.addUser;
    //   Auth.login(token);
    // } catch (err) {
    //   console.error(err);
    //   setShowAlert(true);
    // }
    // setUserFormData({
    //   username: "",
    //   email: "",
    //   password: "",
    // });
  };

  return (
    <Form>
      <Form.Field>
        <label>Username</label>
        <input placeholder="Username" />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input placeholder="Password" />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );

  //   return (
  //     <>
  //       {/* This is needed for the validation functionality above */}
  //       {/*validated={validated} */}
  //       <Form noValidate onSubmit={handleFormSubmit}>
  //         {/* show alert if server response is bad */}
  //         <Alert
  //           dismissible
  //           // onClose={() => setShowAlert(false)}
  //           // show={showAlert}
  //           variant="danger"
  //         >
  //           Something went wrong with your login!
  //         </Alert>

  //         <Form.Group>
  //           <Form.Label htmlFor="username">Username</Form.Label>
  //           {/* <Form.Control
  //             type="text"
  //             placeholder="Your username"
  //             name="username"
  //             onChange={handleInputChange}
  //             value={userFormData.username}
  //             required
  //           /> */}
  //           <Form.Control.Feedback type="invalid">
  //             Username is required!
  //           </Form.Control.Feedback>
  //         </Form.Group>

  //         <Form.Group>
  //           <Form.Label htmlFor="password">Password</Form.Label>
  //           <Form.Control
  //             type="password"
  //             placeholder="Your password"
  //             name="password"
  //             // onChange={handleInputChange}
  //             // value={userFormData.password}
  //             required
  //           />
  //           <Form.Control.Feedback type="invalid">
  //             Password is required!
  //           </Form.Control.Feedback>
  //         </Form.Group>
  //         <Button
  //           // disabled={
  //           //   !(
  //           //     userFormData.username &&
  //           //     userFormData.email &&
  //           //     userFormData.password
  //           //   )
  //           // }
  //           type="submit"
  //           variant="success"
  //         >
  //           Submit
  //         </Button>
  //       </Form>
  //     </>
  //   );
  // };
};

export default LoginForm;
