import React, {useState} from 'react'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const HackSearch = (props) => {
  const [form, setForm] = useState("")

  const handleChange = (e) => {
    e.preventDefault;
    setForm(e.currentTarget.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleSearchQuery(form)
  }

  return (
    <Form inline onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          placeholder="Search for Hack"
          onChange={handleChange}
          value={form}
        />
      <Button variant="secondary" type="submit">
        Submit
      </Button>
      </Form.Group>
    </Form>
  )
}

export default HackSearch