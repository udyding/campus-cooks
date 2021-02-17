import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      let response = await login();
      // if user's first time logging in
      if (response) {
        history.push("/register");
      } else {
        history.push("/profile-page"); // already in database
      }
    } catch (error) {
      console.log(error);
      setError("Failed to log in.");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Button disabled={loading} className="w-100" type="submit">
              Log In With Google
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
