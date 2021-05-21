import React, {useState} from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"

import Modal from "react-bootstrap/Modal";
import { Trash } from "react-bootstrap-icons";

const ListTile = (props) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleDeleteConfirmClose = () => setDeleteConfirmOpen(false);
  const handleDeleteConfirmShow = () => setDeleteConfirmOpen(true);

  const handleRemoveClick = () => {
    props.handleRemoveList(props.list.id)
  }

  let removeButton = (
    <>
      <Trash
        onClick={handleDeleteConfirmShow}
        style={{ float: "right", margin: ".3rem" }}
      ></Trash>
      <Modal
        show={deleteConfirmOpen}
        onHide={handleDeleteConfirmClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Journey?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This action will remove this journey permanently.
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
  )

  return (
    <Col>
      <Card>
      <div className={props.completed ? "completed-list" : "incomplete-list"}>
        <Card.Title>
          <a href={`/${props.list.user_id}/journeys/${props.list.id}`}>
            {props.list.title}
          </a>
          {removeButton}
        </Card.Title>
      </div>
      </Card>
    </Col>
  );
};

export default ListTile;
