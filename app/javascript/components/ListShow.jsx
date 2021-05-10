import React, { useState, useEffect } from "react";

import HackTile from "./HackTile";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button"

const ListShow = (props) => {
  const [data, setData] = useState({
    list: {},
    hacks: [],
  });

  useEffect(() => {
    fetch(
      `/api/v1/users/${props.match.params.userId}/lists/${props.match.params.listId}`
    )
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
        setData(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  const updatePosition = (orderedIdArray) => {
    fetch(
      `/api/v1/users/${props.match.params.userId}/lists/${props.match.params.listId}/position_change`,
      {
        method: "PATCH",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newOrderedList: orderedIdArray,
        }),
      }
    )
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
        setData(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  const handlePositionChange = (positionIndex, direction) => {
    if (direction === "left") {
      let newOrderedList = [...data.list.ordered_ids];
      let swap1 = newOrderedList[positionIndex - 1];
      let swap2 = newOrderedList[positionIndex];

      newOrderedList[positionIndex] = swap1;
      newOrderedList[positionIndex - 1] = swap2;

      updatePosition(newOrderedList);
    } else if (direction === "right") {
      let newOrderedList = [...data.list.ordered_ids];
      let swap1 = newOrderedList[positionIndex + 1];
      let swap2 = newOrderedList[positionIndex];
      newOrderedList[positionIndex] = swap1;
      newOrderedList[positionIndex + 1] = swap2;

      updatePosition(newOrderedList);
    }
  };

  const handleRemoveClick = (hackId) => {
    fetch(`/api/v1/hacks/${hackId}/remove_hack_from_list`, {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listId: props.match.params.listId,
      })
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
      setData(body);
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  const handleCompletionCheck = (hackId) => {
    fetch(
      `/api/v1/completed_hack`,
      {
        method: "PATCH",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: props.user.id,
          hack_id: hackId
        }),
      }
    )
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
        props.handleLogin(body.user)
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }

  let hackTiles = <></>;
  if (data.list.ordered_ids && data.list.ordered_ids.length > 0 && data.hacks.length > 0) {
    hackTiles = data.list.ordered_ids.map((id, index) => {
      let hack = data.hacks.find((hack) => hack.id.toString() === id);
      let hackCompleted = false
      if (hack && props.user.completed_hack_ids.includes(hack.id.toString())) {
        hackCompleted = true
      }

      return (
        <HackTile
          key={hack.id}
          hack={hack}
          position={index + 1}
          allowPositionChange={true}
          listLength={data.list.ordered_ids.length}
          handlePositionChange={handlePositionChange}
          handleRemoveClick={handleRemoveClick}
          hackCompleted={hackCompleted}
          handleCompletionCheck={handleCompletionCheck}
        />
      );
    });
  }

  return (
    <Container>
      <div>
        <h1>{data.list.title}</h1>
        <Row className="justify-content-md-center">{hackTiles}</Row>
      </div>
      <Button href="/hacklist/1">Add Hacks to Journey</Button>
    </Container>
  );
};

export default ListShow;
