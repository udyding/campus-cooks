import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import PostCard from "./PostCard";
import styles from "../styles/Browse.module.css";
import logo from "../images/logo.png";

export default function ProfilePage() {
  //   const [error, setError] = useState("");
  const { getAllPostings } = useAuth();
  const [postings, setPostings] = useState();
  const maxPriceRef = useRef();
  const buildingFilterRef = useRef();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState({});
  const [showMore, setShowMore] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(12);
  const [index, setIndex] = useState();
  const [postingsExist, setPostingsExist] = useState(true);
  let openMap = {};

  const handleShowMorePosts = () => {
    const newIndex = index + 12;
    const newShowMore = newIndex < postings.length - 1;
    setShowMore(newShowMore);
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 12);
  };

  useEffect(() => {
    // first get all the postings
    const getAllPostingsFirst = async () => {
      let allPostings = await getAllPostings("", ""); // this is an array of objects
      for (let i = 0; i < allPostings.length; i++) {
        openMap[i] = false;
      }
      setOpen(openMap);
      setPostings(allPostings);
      if (allPostings.length == 0) {
        setPostingsExist(false);
      }
      setIndex(allPostings.length);
    };
    getAllPostingsFirst();
  }, []);

  async function handleSubmit(e) {
    setPostingsExist(true);
    e.preventDefault();
    setLoading(true);
    try {
      let maxPriceFilter, buildingFilter;
      if (maxPriceRef.current.value.trim() !== "") {
        maxPriceFilter = parseFloat(maxPriceRef.current.value.trim());
      }
      if (buildingFilterRef.current.value !== "Choose...") {
        buildingFilter = buildingFilterRef.current.value;
      }
      let updatedPostings = await getAllPostings(
        maxPriceFilter,
        buildingFilter
      );
      let openMap = {};
      for (let i = 0; i < updatedPostings.length; i++) {
        openMap[i] = false;
      }
      setOpen(openMap);
      setPostings(updatedPostings);
      setIndex(updatedPostings.length);
      setVisiblePosts(12);
      setShowMore(updatedPostings.length > 12);
      if (updatedPostings.length == 0) {
        setPostingsExist(false);
      }
    } catch (error) {
      console.log(error); // shouldn't be one
    } finally {
      setLoading(false);
    }
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
            <Nav className="ml-auto">
              <Nav.Link
                className={styles.profileButton}
                style={{ color: "white" }}
                href="/profile-page"
              >
                Go to my profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className={styles.content}>
          <h2 className="text-center mb-4">Browse Postings</h2>
          <Form onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <Form.Group id="priceMax">
                <Form.Label>Max Price ($):</Form.Label>
                <Form.Control type="number" ref={maxPriceRef} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Building:</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  type="filter"
                  ref={buildingFilterRef}
                >
                  <option>Choose...</option>
                  <option>Village 1</option>
                  <option>Ron Eydt Village (REV)</option>
                  <option>Claudette Millar Hall (CMH)</option>
                  <option>Mackenzie King Village</option>
                  <option>UW Place</option>
                  <option>Columbia Lake Village</option>
                  <option>Minota Hagey</option>
                </Form.Control>
              </Form.Group>
              <Button disabled={loading} type="submit" variant="info">
                Filter
              </Button>
            </div>
          </Form>
          {postingsExist == false && (
            <h4 style={{ textAlign: "center" }}>No postings yet.</h4>
          )}
          {postingsExist && (
            <Container>
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
