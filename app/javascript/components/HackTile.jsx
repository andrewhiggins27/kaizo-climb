import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import AddToListButton from "./AddToListButton";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import ScreenshotCarousel from "./ScreenshotCarousel";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row"
import ReactTooltip from 'react-tooltip'

import { BoxArrowRight, BoxArrowLeft, Trash } from "react-bootstrap-icons";
import CompletionCheck from "./CompletionCheck";

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
    position = <h1 className="position-number">{props.position}</h1>;
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
  let completionCheck = <></>;

  if (props.allowPositionChange) {
    if (props.position == 1) {
      positionControls = (
        <Card.Footer>
          <BoxArrowRight
            onClick={handlePositionChangeRight}
            style={{ float: "right" }}
            data-tip="Change position"
          />
          <ReactTooltip/>
        </Card.Footer>
      );
    } else if (props.position === props.listLength) {
      positionControls = (
        <Card.Footer>
          <BoxArrowLeft
            onClick={handlePositionChangeLeft}
            style={{ float: "left" }}
            data-tip="Change position"
          />
          <ReactTooltip/>
        </Card.Footer>
      );
    } else {
      positionControls = (
        <Card.Footer>
          <BoxArrowLeft
            onClick={handlePositionChangeLeft}
            style={{ float: "left" }}
            data-tip="Change position"
          />
          <BoxArrowRight
            onClick={handlePositionChangeRight}
            style={{ float: "right" }}
            data-tip="Change position"
          />
          <ReactTooltip/>
        </Card.Footer>
      );
    }

    removeButton = (
      <>
        <Trash
          onClick={handleDeleteConfirmShow}
          style={{ float: "right" }}
          data-tip="Remove Hack"
        ></Trash>
        <ReactTooltip/>
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

    completionCheck = (
      <CompletionCheck
        completed={props.hackCompleted}
        handleCompletionCheck={props.handleCompletionCheck}
        hackId={props.hack.id}
      />
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
        <div
          className={
            props.hackCompleted ? "hack-tile-completed" : "hack-tile-incomplete"
          }
        >
            <Card.Header>
            <Card.Title>
              <Link className="hack-tile-link" to={`/hack/${props.hack.id}`}>{props.hack.name}</Link>
            </Card.Title>
            </Card.Header>
          <Card.Body>
          <Row className="ml-1">
            {position}
            {completionCheck}
          </Row>
            {removeButton}
            <Card.Subtitle style={{marginBottom: ".2rem", marginTop: ".2rem"}}>Created by: {creatorNames}</Card.Subtitle>
            <Card.Subtitle>{props.hack.length}</Card.Subtitle>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="description-card-text"
              aria-expanded={open}
              variant="outline-secondary"
              size="sm"
            >
              {open ? "Hide Description" : "Expand Description"}
            </Button>
            <Collapse in={open}>
              <div id="description-card-text">{props.hack.description}</div>
            </Collapse>
          </Card.Body>
          <ScreenshotCarousel screenshots={props.hack.screenshots} />
          {positionControls}
          {addToListButton}
        </div>
      </Card>
    </Col>
  );
};

export default HackTile;
