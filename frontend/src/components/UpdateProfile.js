import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styles from "../styles/UpdateProfile.module.css";

export default function UpdateProfile() {
  const displayNameRef = useRef();
  const buildingRef = useRef();
  const phoneRef = useRef();
  const { currentUser, updateInfo, updateDisplayName, getUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [building, setBuilding] = useState(); // default value
  const [phone, setPhone] = useState();

  useEffect(() => {
    const getUserInfo = async () => {
      let userInfo = await getUser(currentUser.email);
      setBuilding(userInfo.building);
      if (userInfo.phone) {
        setPhone(userInfo.phone);
      }
    };

    getUserInfo();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    // complete all changes at once
    // const promises = [];
    setLoading(true);
    setError("");
    try {
      if (displayNameRef.current.value !== currentUser.displayName) {
        updateDisplayName(displayNameRef.current.value);
      }
      await updateInfo(
        currentUser.email,
        buildingRef.current.value,
        phoneRef.current.value
      );
      history.push("/profile-page");
    } catch (error) {
      setError("Failed to update information");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className={styles.card}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Update Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="displayName">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={displayNameRef}
                    required
                    defaultValue={currentUser.displayName}
                  />
                </Form.Group>
                {building && (
                  <Form.Group id="building">
                    <Form.Label>Residence</Form.Label>
                    <Form.Control
                      as="select"
                      // defaultValue={currentUser.building} ADD THISSSSSSSS
                      type="building"
                      ref={buildingRef}
                      required
                      defaultValue={building}
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
                )}
                {phone && (
                  <Form.Group id="phone">
                    <Form.Label>Phone #</Form.Label>
                    <Form.Control
                      type="text"
                      ref={phoneRef}
                      defaultValue={phone}
                    />
                  </Form.Group>
                )}
                <Button
                  disabled={loading}
                  className="w-100"
                  type="submit"
                  variant="info"
                >
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <div className="w-100 text-center mt-2">
            <Link to="/profile-page" style={{ color: "#5bc0de" }}>
              Cancel
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
