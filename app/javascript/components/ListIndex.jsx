import React, { useState, useEffect } from "react";
import ListTile from "./ListTile";
import ListCreate from "./ListCreate";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

const ListIndex = (props) => {
  const [lists, setLists] = useState([]);
  const [openCreateList, setOpenCreateList] = useState(false);

  useEffect(() => {
    fetch(`/api/v1/users/${props.match.params.userId}/lists`, {
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
        setLists(body.lists);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  const handleCreateList = (newListTitle) => {
    fetch(`/api/v1/users/${props.match.params.userId}/lists`, {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newListTitle,
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
        setLists(body.lists);
      });
  };

  let listTiles;
  if (lists.length > 0) {
    listTiles = lists.map((list) => {
      return <ListTile key={list.id} list={list} />;
    });
  }

  return (
    <>
      <Container>
        <Row>
          <h1>{props.user.username}'s Journeys</h1>
        </Row>
        <Row>
        <Col>
          <Button
            onClick={() => setOpenCreateList(!openCreateList)}
            aria-controls="create-list-form"
            aria-expanded={openCreateList}
            variant="light"
          >
            Click to Create New Journey
          </Button>
        </Col>
        </Row>
        <br></br>
        <Row>
          <Collapse in={openCreateList}>
            <div id="create-list-form">
              <ListCreate handleSubmit={handleCreateList} />
            </div>
          </Collapse>
        </Row>
        <br></br>
        <Row>{listTiles}</Row>
      </Container>
    </>
  );
};

export default ListIndex;
