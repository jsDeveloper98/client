import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../contexts/auth";
import { useHttp } from "../hooks/http";
import { useMessage } from "../hooks/message";

const AuthForm = ({ attr }) => {
  const { request, error, loading, clearError } = useHttp();
  const message = useMessage();
  const auth = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    try {
      const data = await request("/api/auth/signup", "POST", form);
    } catch (e) {}
  };

  const login = async (e) => {
    try {
      const data = await request("/api/auth/signin", "POST", form);
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  const handleSubmit = () => {
    attr === "signin" ? login() : register();
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  return (
    <div className="container form-container">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button
          disabled={loading}
          onClick={handleSubmit}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AuthForm;
