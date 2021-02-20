import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styles from "../styles/CreatePost.module.css";

export default function CreatePost() {
  const dishRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const { currentUser, addPost } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let currDate = new Date();
      currDate = currDate.toDateString();
      let priceNumRef = parseFloat(priceRef.current.value.replace("$", ""));
      let posting = {
        dishName: dishRef.current.value,
        price: priceNumRef,
        description: descriptionRef.current.value,
        date: currDate,
      };
      await addPost(currentUser.email, currentUser.displayName, posting);
      history.push("/profile-page");
    } catch (error) {
      setError("Failed to add post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className={styles.card}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Create a New Post</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="dish">
                  <Form.Label>Your Dish</Form.Label>
                  <Form.Control
                    type="text"
                    ref={dishRef}
                    required
                    placeholder="e.g.: Shrimp Tacos"
                  />
                </Form.Group>
                <Form.Group id="price">
                  <Form.Label>Price per Portion ($)</Form.Label>
                  <Form.Control
                    type="number"
                    ref={priceRef}
                    required
                    placeholder="e.g.: 3.50"
                  />
                </Form.Group>
                <Form.Group id="description">
                  <Form.Label>Description (max 140 chars)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    ref={descriptionRef}
                    required
                    maxLength="140"
                    placeholder="e.g.: I made over 20 shrimp tacos yesterday for taco night! These tacos contain jumbo shrimp, guac, and pico de gallo!"
                  />
                </Form.Group>
                <Button
                  disabled={loading}
                  className="w-100"
                  type="submit"
                  variant="success"
                >
                  Publish!
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/profile-page" style={{ color: "#5cb85c" }}>
              Cancel
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
