import React from 'react'

import Form from 'react-bootstrap/Form'

const CompletionCheck = (props) => {

  const handleChange = () => {
    props.handleCompletionCheck(props.hackId)
  }

  return (
    <Form>
      <Form.Check
        checked={props.completed}
        label={"Hack beaten?"}
        onChange={handleChange}
      >
      </Form.Check>
    </Form>
  )
}

export default CompletionCheck
