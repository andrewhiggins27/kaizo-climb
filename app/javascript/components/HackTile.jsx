import React, { Fragment, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
import ScreenshotCarousel from './ScreenshotCarousel'
import { Link } from "react-router-dom";

const HackTile = props => {
  const [open, setOpen] = useState(false)

  const creatorNames = props.hack.creators.map(creator => {
    return(
      <Fragment
        key={creator.id}
      >
        {creator.name} {"\n"}
      </Fragment>
    )
  })
  return(
    <Col xs={12} md={6} lg={4}
      style={{paddingBottom: '.5rem'}}
    >
      <Card>
      <Card.Body>
        <Card.Title>
          <Link to={`/hack/${props.hack.id}`}>
            {props.hack.name}
          </Link>
        </Card.Title>
        <Card.Subtitle>
          {creatorNames}
        </Card.Subtitle>
        <Card.Subtitle
          style={{paddingTop: '.5rem'}}
        >
          {props.hack.length}
        </Card.Subtitle>
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
            {props.hack.description}
          </div>
        </Collapse>
      </Card.Body>
      <ScreenshotCarousel
        screenshots={props.hack.screenshots}
      />
      </Card>
    </Col>
  )
}

export default HackTile