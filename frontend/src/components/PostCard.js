import React from "react";
import { Card, Button } from "react-bootstrap";

export default function PostCard(posting) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{posting.postTitle}</Card.Title>
        <Card.Text>
          {posting.building}
          {posting.price}
          {posting.date}
        </Card.Text>
        <Button variant="primary">More details</Button>
      </Card.Body>
    </Card>
  );
}
