import React, { useState } from "react";

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownItem from "react-bootstrap/DropdownItem";

const AddToListButton = (props) => {
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
        console.log(body)
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="add-to-list-dropdown">
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
  );
};

export default AddToListButton;
