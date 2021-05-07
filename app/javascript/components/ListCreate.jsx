import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AlertMessage from "./AlertMessage";

const ListCreate = (props) => {
  const [form, setForm] = useState("");
  const [formErrors, setFormErrors] = useState("");

  const handleChange = (e) => {
    e.preventDefault;
    setForm(e.currentTarget.value);
  };

  const handleSubmit = () => {
    if (form === "") {
      setFormErrors("Title can not be blank");
    } else {
      props.handleSubmit(form);
      setForm("")
    }
  };

  return (
    <Form>
      <AlertMessage message={formErrors} />
      <Form.Group controlId="formTitle">
        <Form.Label>Title of Journey:</Form.Label>
        <Form.Control
          type="title"
          placeholder="Enter title"
          name="title"
          onChange={handleChange}
          value={form}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default ListCreate;
