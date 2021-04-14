import React from 'react'
import Alert from "react-bootstrap/Alert"

const AlertMessage = (props) => {
  const alertMessage = props.message === "" ? <></> : <Alert variant={props.variant}>{props.message}</Alert>

  return(
    <>
      {alertMessage}
    </>
  )
}

export default AlertMessage