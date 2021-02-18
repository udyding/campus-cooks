import React from "react";
import { Button, Container } from "react-bootstrap";

export default function Login() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <>
          <h1 className="text-center mb-4">Welcome to Campus Cooks!</h1>
          <div className="mb-3">
            <Button
              href="/login"
              variant="outline-primary"
              className="w-100"
              size="lg"
            >
              Log In
            </Button>
          </div>
        </>
      </div>
    </Container>
  );
}
