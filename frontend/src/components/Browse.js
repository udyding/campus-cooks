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
  //   const history = useHistory();

  useEffect(() => {
    const getAllPostingsFirst = async () => {
      let allPostings = await getAllPostings("", ""); // this is an array of objects
      setPostings(allPostings);
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
      setPostings(updatedPostings);
    } catch (error) {
      console.log(error); // shouldn't be one
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-center mb-4">Browse Postings</h2>
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
          {postings && postings.map((i) => <Col md={4}>{PostCard(i)}</Col>)}
        </Row>
      </Container>
    </>
  );
}
