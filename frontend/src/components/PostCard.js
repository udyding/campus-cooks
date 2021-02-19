import React, { useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function PostCard(props) {
  const { open, setOpen, posting, isDelete } = props;
  const { deleteSinglePost } = useAuth();
  const [exists, setExists] = useState(true);
  const history = useHistory();

  async function deletePost() {
    try {
      await deleteSinglePost(posting._id);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {exists && (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{posting.postTitle}</Card.Title>
            <Card.Text>
              {posting.price}
              {posting.building}
              {posting.date}
            </Card.Text>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="more-details"
              aria-expanded={open}
            >
              More details!
            </Button>
            {isDelete && (
              <Button
                variant="danger"
                onClick={() => {
                  deletePost();
                }}
              >
                Delete post
              </Button>
            )}
            <Collapse in={open}>
              <div id="more-details">
                Posted by: {posting.displayName}
                Description: {posting.description}
                Contacts: Email me at {posting.email} or call me at{" "}
                {posting.phone}
              </div>
            </Collapse>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
