import React, {useEffect, useState, Fragment} from 'react'
import Container from 'react-bootstrap/Container'
import ScreenshotCarousel from './ScreenshotCarousel'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

import smwIcon from '../../assets/images/smwc32logo.jpeg'

const HackShow = (props) => {
  const [hack, setHack] = useState({})
  const [open, setOpen] = useState(false)

  let creators
  if (hack.creators) {
    creators = hack.creators.map((creator, i) => {
      return(
        <Fragment key={i} >
            {creator.name}
        </Fragment>
      )
    })
  }

  useEffect(() => {
    let pageId = props.match.params.id
    fetch(`/api/v1/hacks/${pageId}`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw (error);
      }
    })
    .then(response => response.json())
    .then(body => {
      setHack(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [props.match.params.id])

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Header>
          <Row>
            <Col>
              <h1>{hack.name}</h1>
            </Col>
            <Col>
             <a href={hack.url}>
              <Image className="smw-central-logo" src={smwIcon} roundedCircle/>
             </a>
            </Col>
          </Row>
          </Card.Header>
          <Card.Title>
            Created By: &nbsp;
            {creators}
          </Card.Title>
          <Card.Title>
            Number of Exits: {hack.length}
          </Card.Title>
          <Card.Title>
            Last Update/Release: {hack.date}
          </Card.Title>
          <Button
          onClick={() => setOpen(!open)}
          aria-controls="description-card-text"
          aria-expanded={open}
          variant="light"
        >
          Click for Description
        </Button>
        <Collapse in={open}>
          <div id="description-card-text">
            <Card.Text>
              {hack.description}
            </Card.Text>
          </div>
        </Collapse>
        <ScreenshotCarousel screenshots={hack.screenshots}/>
        </Card.Body>
      </Card>
      <a href="javascript:history.back()">
        Back
      </a>
    </Container>
  )
}

export default HackShow
