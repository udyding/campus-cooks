import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { BACKEND_ADDRESS } from "../config";
import axios from "axios";

// first get all the user info from the database
async function getUser(email) {
  try {
    email = encodeURIComponent(email);
    const response = await axios({
      method: "get",
      url: `${BACKEND_ADDRESS}/user/getUserInfo?email=${email}`,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default function UpdateProfile() {
  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const passwordConfirmRef = useRef();
  const displayNameRef = useRef();
  const buildingRef = useRef();
  const phoneRef = useRef();
  const { currentUser, updateInfo, updateDisplayName } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [building, setBuilding] = useState(); // default value
  const [phone, setPhone] = useState();

  useEffect(() => {
    let userInfo = getUser(currentUser.email);
    setBuilding(userInfo.building);
    if (userInfo.phone) {
      setPhone(userInfo.phone);
    }
  });

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

    // if (emailRef.current.value !== currentUser.email) {
    //   promises.push(updateEmail(emailRef.current.value));
    // }
    // if (passwordRef.current.value) {
    //   promises.push(updatePassword(passwordRef.current.value));
    // }

    // Promise.all(promises)
    //   .then(() => {
    //     // once all changes are made, redirect to profile page, unless both pass and user are changed
    //     history.push("/profile-page");
    //   })
    //   .catch(() => {
    //     setError("Failed to update account");
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }

  return (
    <>
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
            <Form.Group id="phone">
              <Form.Label>Phone #</Form.Label>
              <Form.Control type="text" ref={phoneRef} defaultValue={phone} />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/profile-page">Cancel</Link>
      </div>
    </>
  );
}
