import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import useLogin from '../hooks/useLogin'

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      {/* username */}
      <Form.Group controlId="formBasicUsername" className="mb-2">
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />
      </Form.Group>

      {/* password */}
      <Form.Group controlId="formBasicPassword" className="mb-2">
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
      </Form.Group>

      {/* submit button */}
      <div className="d-grid my-4">
      <Button
        variant="primary"
        type="submit"
        onSubmit={(event) => handleSubmit(event)}
      >
        Login
      </Button>
      </div>
    </Form>
  );
}