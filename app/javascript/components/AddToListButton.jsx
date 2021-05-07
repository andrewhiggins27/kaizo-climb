import React, { useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownItem from "react-bootstrap/DropdownItem";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AddToListButton = (props) => {
  const [hackAddedModal, setHackAddedModal] = useState(false);
  const [addHackErrorModal, setAddHackErrorModal] = useState(false);

  const handleAddedHackClose = () => setHackAddedModal(false);
  const handleAddedHackOpen = () => setHackAddedModal(true);

  const handleAddHackErrorClose = () => setAddHackErrorModal(false);
  const handleAddHackErrorOpen = () => setAddHackErrorModal(true);

  const handleClick = (listId) => {
    fetch(`/api/v1/hacks/${props.hackId}/add_hack_to_list`, {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listId: listId,
      }),
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
        if (body.hackAdded) {
          handleAddedHackOpen();
        } else {
          handleAddHackErrorOpen();
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  return (
    <>
      <Dropdown className="add-to-journey-button">
        <Dropdown.Toggle id="add-to-list-dropdown" variant="info">
          Add To Journey
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {props.lists.map((list) => (
            <DropdownItem onClick={() => handleClick(list.id)}>
              {list.title}
            </DropdownItem>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Modal
        show={hackAddedModal}
        onHide={handleAddedHackClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Footer closeButton>
          <Modal.Body>Hack Added to Journey!</Modal.Body>
          <Button variant="primary" onClick={handleAddedHackClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={addHackErrorModal}
        onHide={handleAddHackErrorClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Footer closeButton>
          <Modal.Body>Add hack to list error: Hack is already on this journey.</Modal.Body>
          <Button variant="primary" onClick={handleAddHackErrorClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddToListButton;
