import React from "react";
import { Button, Form } from "semantic-ui-react";

const LoginForm = () => (
  <Form>
    <Form.Field>
      <label style={{ color: "white", fontSize: "20px" }}>Username</label>
      <input placeholder="Username" />
    </Form.Field>
    <Form.Field>
      <label style={{ color: "white", fontSize: "20px" }}>Password</label>
      <input placeholder="Password" />
    </Form.Field>
    <Button inverted color="red">
      Submit
    </Button>
  </Form>
);

export default LoginForm;
