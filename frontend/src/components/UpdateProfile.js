import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const displayNameRef = useRef();
  const buildingRef = useRef();
  const phoneRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    // check form submission
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }
    // complete all changes at once
    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="displayName">
              <Form.Label>Display Name</Form.Label>
              <Form.Control type="text" ref={displayNameRef} />
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
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
