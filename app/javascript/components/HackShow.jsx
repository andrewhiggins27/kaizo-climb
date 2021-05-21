import React, { useEffect, useState, Fragment } from "react";

import AddToListButton from "./AddToListButton";

import Container from "react-bootstrap/Container";
import ScreenshotCarousel from "./ScreenshotCarousel";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import smwIcon from "../../assets/images/smwc32logo.jpeg";

const HackShow = (props) => {
  const [hack, setHack] = useState({});
  const [open, setOpen] = useState(false);
  const [userLists, setUserLists] = useState([])

  let creators;
  if (hack.creators) {
    creators = hack.creators.map((creator, i) => {
      return (
        <a key={i} href={`/creators/${creator.id}`}>
          <Fragment>{creator.name}</Fragment>
        </a>
      );
    });
  }

  useEffect(() => {
    let pageId = props.match.params.id;
    fetch(`/api/v1/hacks/${pageId}`, {
      credentials: "same-origin",
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        setHack(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, [props.match.params.id]);

  useEffect(() => {
    if (props.user.id !== undefined) {
      let userId = props.user.id;

      fetch(`/api/v1/users/${userId}/lists`, {
        credentials: "same-origin",
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw error;
          }
        })
        .then((response) => response.json())
        .then((body) => {
          setUserLists(body.lists);
        })
        .catch((error) => console.error(`Error in fetch: ${error.message}`));
    }
  }, [props.user]);

  return (
    <Container>
      <Card className="hack-show">
        <Card.Body>
          <Card.Header>
            <Row>
              <Col>
                <h1>{hack.name}</h1>
              </Col>
              <Col>
                <a href={hack.url}>
                  <Image
                    className="smw-central-logo"
                    src={smwIcon}
                    roundedCircle
                  />
                </a>
              </Col>
            </Row>
          </Card.Header>
          <Card.Title>
            Created By: &nbsp;
            {creators}
          </Card.Title>
          <Card.Title>Number of Exits: {hack.length}</Card.Title>
          <Card.Title>Last Update/Release: {hack.date}</Card.Title>
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
              <Card.Text>{hack.description}</Card.Text>
            </div>
          </Collapse>
          <ScreenshotCarousel screenshots={hack.screenshots} />
          <div className="float-right">
            <AddToListButton
              user={props.user}
              hackId={hack.id}
              lists={userLists}
            />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HackShow;
