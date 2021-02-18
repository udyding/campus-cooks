import React, { useState, useEffect } from "react";
import { Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import PostCard from "./PostCard";

export default function ProfilePage() {
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const { currentUser, logout, getPostings } = useAuth();
  const history = useHistory();
  const [postings, setPostings] = useState();

  useEffect(() => {
    const getUsersPostings = async () => {
      let userPostings = await getPostings(currentUser.email); // this is an array of objects
      setPostings(userPostings);
    };
    getUsersPostings();
  }, []);

  async function handleLogout() {
    try {
      setError("");
      // setLoading(true);
      await logout();
      history.push("/"); // once logged out redirect to home page
    } catch {
      setError("Failed to log out");
    }
    // setLoading(false);
  }
  return (
    <>
      <h2 className="text-center mb-4">Hi, {currentUser.displayName}!</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
        Update profile
      </Link>
      <Link to="/create-post" className="btn btn-primary w-100 mt-3">
        Add a new post
      </Link>
      <Link to="/browse" className="btn btn-primary w-100 mt-3">
        Browse for food
      </Link>
      <Container>
        <h2 className="text-center mb-4">My Postings</h2>
        <Row className="show-grid">
          {postings && postings.map((i) => <Col md={4}>{PostCard(i)}</Col>)}
        </Row>
      </Container>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
