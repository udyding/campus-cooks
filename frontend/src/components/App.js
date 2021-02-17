import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SignUp from "./SignUp";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "./ProfilePage";
import UpdateProfile from "./UpdateProfile";
import Register from "./Register";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <PrivateRoute
                exact
                path="/profile-page"
                component={ProfilePage}
              />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}
export default App;
