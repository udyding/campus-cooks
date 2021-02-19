import React, { useRef, useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import PostCard from "./PostCard";

export default function ProfilePage() {
  //   const [error, setError] = useState("");
  const { getAllPostings } = useAuth();
  const [postings, setPostings] = useState();
  const maxPriceRef = useRef();
  const buildingFilterRef = useRef();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState({});
  const [showMore, setShowMore] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [index, setIndex] = useState();
  let openMap = {};

  const handleShowMorePosts = () => {
    const newIndex = index + 3;
    const newShowMore = newIndex < postings.length - 1;
    setShowMore(newShowMore);
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 3);
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
      setIndex(allPostings.length);
    };
    getAllPostingsFirst();
  }, []);

  async function handleSubmit(e) {
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
      setVisiblePosts(3);
      setShowMore(updatedPostings.length > 3);
    } catch (error) {
      console.log(error); // shouldn't be one
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-center mb-4">Browse Postings</h2>
      <Link to="/profile-page" className="btn btn-primary w-100 mt-3">
        Go to my profile
      </Link>
      <Form onSubmit={handleSubmit}>
        <Form.Group id="priceMax">
          <Form.Label>Max Price</Form.Label>
          <Form.Control type="text" ref={maxPriceRef} />
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
        <Button disabled={loading} className="w-100" type="submit">
          Filter
        </Button>
      </Form>
      <Container>
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
                  />
                </Col>
              );
            })}
        </Row>
        {showMore && <button onClick={handleShowMorePosts}>Load more</button>}
      </Container>
    </>
  );
}
