import React, { useEffect, useState } from "react";
import HackTile from "./HackTile";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

export const CreatorShow = (props) => {
  const [creator, setCreator] = useState({});
  const [hacks, setHacks] = useState([]);
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    let creatorId = props.match.params.id;
    fetch(`/api/v1/creators/${creatorId}`, {
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
        setCreator(body.creator);
        setHacks(body.hacks);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

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

  let HackTiles = hacks.map((hack) => {
    return (
      <HackTile
        key={hack.id}
        hack={hack}
        allowAddToList={true}
        user={props.user}
        lists={userLists}
      ></HackTile>
    );
  });

  return (
    <Container>
      <Card>
        <Card.Header>
        <h1>Hacks created by {creator.name}</h1>
        </Card.Header>
        <Row className="justify-content-md-center">{HackTiles}</Row>
      </Card>
    </Container>
  );
};
