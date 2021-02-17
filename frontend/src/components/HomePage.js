import React from "react";
import { Button } from "react-bootstrap";

export default function Login() {
  return (
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
      <div>
        <Button href="/signup" variant="info" className="w-100" size="lg">
          Sign Up
        </Button>
      </div>
    </>
  );
}
