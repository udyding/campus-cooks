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
import CreatePost from "./CreatePost";
import Browse from "./Browse";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "800px" }}>
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
              <PrivateRoute path="/create-post" component={CreatePost} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/browse" component={Browse} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}
export default App;
