import React, { useState, useEffect } from "react";
import {
  Button,
  Alert,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import PostCard from "./PostCard";
import styles from "../styles/ProfilePage.module.css";
import logo from "../images/logo.png";

export default function ProfilePage() {
  const [error, setError] = useState("");
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
      <div className={styles.container}>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="35"
              height="35"
              style={{ marginBottom: "4px", marginRight: "10px" }}
            />
            Campus Cooks
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                className={styles.profileButton}
                style={{ color: "white" }}
                href="/browse"
              >
                Browse for food
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Button variant="info" onClick={handleLogout}>
                Log Out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className={styles.content}>
          <h1 className={styles.greeting}>Hi, {currentUser.displayName}!</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className={styles.header}>
            <Button
              variant="info"
              href="/update-profile"
              size="lg"
              style={{ marginRight: "25px" }}
            >
              Update profile
            </Button>
            <Button variant="warning" href="/create-post" size="lg">
              Create a new post
            </Button>
          </div>
          {postingsExist == false && (
            <h4 style={{ textAlign: "center" }}>No postings yet.</h4>
          )}
          {postingsExist && (
            <Container>
              <h2 className="text-center mb-4">My Postings</h2>
              <Row className="justify-content-center">
                {postings &&
                  postings.slice(0, visiblePosts).map((posting, i) => {
                    return (
                      <div
                        className={{ display: "flex", alignItems: "center" }}
                      >
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
                      </div>
                    );
                  })}
              </Row>
              <div className={styles.loadMore}>
                {showMore && postings && postings.length > 12 && (
                  <Button variant="warning" onClick={handleShowMorePosts}>
                    Load more
                  </Button>
                )}
              </div>
            </Container>
          )}
        </div>
      </div>
    </>
  );
}
