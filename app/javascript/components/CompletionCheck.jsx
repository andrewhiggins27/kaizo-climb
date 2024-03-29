import React from 'react'

import Form from 'react-bootstrap/Form'

const CompletionCheck = (props) => {

  const handleChange = () => {
    props.handleCompletionCheck(props.hackId)
  }

  return (
    <Form className="ml-auto mr-3">
      <Form.Check
        checked={props.completed}
        label={"I Beat This!"}
        onChange={handleChange}
      >
      </Form.Check>
    </Form>
  )
}

export default CompletionCheck
