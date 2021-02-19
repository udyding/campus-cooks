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
  const [open, setOpen] = useState({});
  const [showMore, setShowMore] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(12);
  const [index, setIndex] = useState();
  const [postingsExist, setPostingsExist] = useState(true);

  const handleShowMorePosts = () => {
    const newIndex = index + 12;
    const newShowMore = newIndex < postings.length - 1;
    setShowMore(newShowMore);
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 12);
  };

  useEffect(() => {
    const getUsersPostings = async () => {
      try {
        let userPostings = await getPostings(currentUser.email); // this is an array of objects
        const openMap = {};
        for (let i = 0; i < userPostings.length; i++) {
          openMap[i] = false;
        }
        setOpen(openMap);
        setPostings(userPostings);
        setIndex(userPostings.length);
        if (userPostings.length == 0) {
          setPostingsExist(false);
        }
      } catch (err) {
        console.log(err);
      }
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
      {postingsExist == false && <h2>No postings yet</h2>}
      {postingsExist && (
        <Container>
          <h2 className="text-center mb-4">My Postings</h2>
          <Row className="show-grid">
            {postings &&
              postings.slice(0, visiblePosts).map((posting, i) => {
                return (
                  <Col md={4}>
                    <PostCard
                      open={open[i]}
                      setOpen={() =>
                        setOpen((o) => ({
                          ...o,
                          [i]: !o[i],
                        }))
                      }
                      posting={posting}
                      isDelete={true}
                    />
                  </Col>
                );
              })}
          </Row>
          {showMore && postings && postings.length > 12 && (
            <button onClick={handleShowMorePosts}>Load more</button>
          )}
        </Container>
      )}
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
