import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import AddToListButton from "./AddToListButton";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import ScreenshotCarousel from "./ScreenshotCarousel";
import Modal from "react-bootstrap/Modal";

import { BoxArrowRight, BoxArrowLeft, Trash } from "react-bootstrap-icons";

const HackTile = (props) => {
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleDeleteConfirmClose = () => setDeleteConfirmOpen(false);
  const handleDeleteConfirmShow = () => setDeleteConfirmOpen(true);

  const handleRemoveClick = () => {
    props.handleRemoveClick(props.hack.id);
  };

  const creatorNames = props.hack.creators.map((creator) => {
    return (
      <Fragment key={creator.id}>
        <a href={`/creators/${creator.id}`}>
          {creator.name} {"\n"}
        </a>
      </Fragment>
    );
  });

  let position = <></>;
  if (props.position) {
    position = <h1>{props.position}</h1>;
  }

  const handlePositionChangeRight = (event) => {
    event.preventDefault();
    props.handlePositionChange(props.position - 1, "right");
  };

  const handlePositionChangeLeft = (event) => {
    event.preventDefault();
    props.handlePositionChange(props.position - 1, "left");
  };

  let positionControls = <> </>;
  let removeButton = <></>;
  if (props.allowPositionChange) {
    if (props.position == 1) {
      positionControls = (
        <Card.Footer>
          <BoxArrowRight
            onClick={handlePositionChangeRight}
            style={{ float: "right" }}
          />
        </Card.Footer>
      );
    } else if (props.position === props.listLength) {
      positionControls = (
        <Card.Footer>
          <BoxArrowLeft
            onClick={handlePositionChangeLeft}
            style={{ float: "left" }}
          />
        </Card.Footer>
      );
    } else {
      positionControls = (
        <Card.Footer>
          <BoxArrowLeft
            onClick={handlePositionChangeLeft}
            style={{ float: "left" }}
          />
          <BoxArrowRight
            onClick={handlePositionChangeRight}
            style={{ float: "right" }}
          />
        </Card.Footer>
      );
    }

    removeButton = (
      <>
        <Trash
          onClick={handleDeleteConfirmShow}
          style={{ float: "right" }}
        ></Trash>
        <Modal
          show={deleteConfirmOpen}
          onHide={handleDeleteConfirmClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Remove Hack From Journey?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This action will remove this hack from this journey. Hacks can be
            re-added anytime.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteConfirmClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleRemoveClick}>
              Understood
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  let addToListButton;
  if (props.allowAddToList) {
    addToListButton = (
      <div className="float-right">
      <AddToListButton
        user={props.user}
        hackId={props.hack.id}
        lists={props.lists}
      />
      </div>
    );
  }

  return (
    <Col xs={12} md={6} lg={4} style={{ paddingBottom: ".5rem" }}>
      <Card>
        <Card.Body>
          {position}
          {removeButton}
          <Card.Title>
            <Link to={`/hack/${props.hack.id}`}>{props.hack.name}</Link>
          </Card.Title>
          <Card.Subtitle>Created by: {creatorNames}</Card.Subtitle>
          <Card.Subtitle style={{ paddingTop: ".5rem" }}>
            {props.hack.length}
          </Card.Subtitle>
          <br></br>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="description-card-text"
            aria-expanded={open}
            variant="dark"
          >
            Expand Description
          </Button>
          <Collapse in={open}>
            <div id="description-card-text">{props.hack.description}</div>
          </Collapse>
        </Card.Body>
        <ScreenshotCarousel screenshots={props.hack.screenshots} />
        {positionControls}
        {addToListButton}
      </Card>
    </Col>
  );
};

export default HackTile;
