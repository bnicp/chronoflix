import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";

const LoginForm = () => (
  <Form>
    <Form.Field>
      <label>Username</label>
      <input placeholder="Username" />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder="Password" />
    </Form.Field>
    <Button inverted color="red">
      Submit
    </Button>
  </Form>
);

export default LoginForm;
