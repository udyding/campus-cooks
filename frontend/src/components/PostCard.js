import React, { useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import styles from "../styles/PostCard.module.css";

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
        <Card
          style={{
            width: "18rem",
            margin: "10px",
            borderRadius: "10px",
            borderColor: "#FCDDBC",
            borderWidth: "medium",
            padding: "0px",
          }}
        >
          <Card.Body>
            <Card.Title style={{ fontWeight: "bold" }}>
              {posting.postTitle}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              ${posting.price} per serving
            </Card.Subtitle>
            <Card.Text className={styles.cardText}>
              {posting.building}
            </Card.Text>
            <Card.Text
              className={styles.cardText}
              style={{ marginBottom: "12px" }}
            >
              Posted: {posting.date}
            </Card.Text>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="more-details"
              aria-expanded={open}
              variant="outline-info"
              style={{ marginRight: "10px" }}
            >
              More details
            </Button>
            {isDelete && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deletePost();
                }}
              >
                Delete post
              </Button>
            )}
            <Collapse in={open}>
              <div id="more-details" className={styles.additional}>
                <Card.Text className={styles.cardText}>
                  Posted by: {posting.displayName}
                </Card.Text>
                <Card.Text className={styles.cardText}>
                  Description: {posting.description}
                </Card.Text>
                <Card.Text className={styles.cardText}>
                  Email: {posting.email}
                </Card.Text>
                <Card.Text className={styles.cardText}>
                  Phone: {posting.phone}
                </Card.Text>
              </div>
            </Collapse>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
