import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review.js";
import MoviesList from "./components/movies-list.js";
import Movie from "./components/movie.js";
import Login from "./components/login.js";

export default function App() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>
            <Nav.Link>
              {true ? (
                <a onClick={logout}>Logout User</a>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route exact path="/" Component={MoviesList} />
        <Route exact path="/movies" Component={MoviesList} />
        <Route
          path="/movies/:id/review"
          render={(props) => {
            <AddReview {...props} user={user} />;
          }}
        />
        <Route
          path="/movies/:id"
          Component={(props) => {
            <Movie {...props} user={user} />;
          }}
        />
        <Route
          path="/login"
          render={(props) => {
            <Login {...props} login={login} />;
          }}
        />
      </Routes>
    </div>
  );
}
