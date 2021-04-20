import React from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const ListTile = (props) => {
  return (
    <Col>
      <Card>
        <Card.Title>
          <a href={`/${props.list.user_id}/journeys/${props.list.id}`}>
            {props.list.title}
          </a>
        </Card.Title>
      </Card>
    </Col>
  );
};

export default ListTile;
