import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styles from "../styles/Register.module.css";

export default function Register() {
  const displayNameRef = useRef();
  const buildingRef = useRef();
  const phoneRef = useRef();
  const { currentUser, updateInfo, updateDisplayName, firstLogin } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (displayNameRef.current.value !== currentUser.displayName) {
        updateDisplayName(displayNameRef.current.value);
      }
      await firstLogin(currentUser.email);
      await updateInfo(
        currentUser.email,
        buildingRef.current.value,
        phoneRef.current.value
      );
      history.push("/profile-page");
    } catch (error) {
      setError("Failed to register account");
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
              <h2 className="text-center mb-4">Register</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="displayName">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={displayNameRef}
                    required
                    defaultValue={currentUser.displayName}
                  />
                </Form.Group>
                <Form.Group id="building">
                  <Form.Label>Residence</Form.Label>
                  <Form.Control
                    as="select"
                    // defaultValue={currentUser.building} ADD THISSSSSSSS
                    type="building"
                    ref={buildingRef}
                    required
                  >
                    {/* <option>Choose...</option> */}
                    <option>Village 1</option>
                    <option>Ron Eydt Village (REV)</option>
                    <option>Claudette Millar Hall (CMH)</option>
                    <option>Mackenzie King Village</option>
                    <option>UW Place</option>
                    <option>Columbia Lake Village</option>
                    <option>Minota Hagey</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group id="phone">
                  <Form.Label>Phone #</Form.Label>
                  <Form.Control type="text" ref={phoneRef} />
                </Form.Group>

                <Button disabled={loading} className="w-100" type="submit">
                  Sign me up!
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/profile-page">Cancel</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
