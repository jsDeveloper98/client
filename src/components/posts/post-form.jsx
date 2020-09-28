import React, { useContext } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../../contexts/auth";
import { useHttp } from "../../hooks/http";

const PostForm = () => {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const post = await request("/api/post/create", "POST", form, {
        authorization: `Bearer ${token}`,
      });
      console.log({ post });
    } catch (e) {}
  };

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          autoComplete="off"
          type="text"
          placeholder="Enter Title"
          onChange={handleChange}
          name="title"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control
          autoComplete="off"
          type="text"
          placeholder="Enter Description"
          onChange={handleChange}
          name="description"
        />
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PostForm;
