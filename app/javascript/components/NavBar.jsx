import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = (props) => {
  const handleLogoutClick = (event) => {
    fetch("/logout", {
      credentials: "include",
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        if (body.logged_out) {
          props.handleLogout();
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  const sessionLinks =
    props.loggedInStatus === "LOGGED_IN" ? (
      <>
        <NavDropdown className="navbar-links" title={props.user.username} id="collasible-nav-dropdown">
          <NavDropdown.Item href="">Profile</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogoutClick}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </>
    ) : (
      <>
        <Nav.Link className="navbar-links" href="/login">Log In</Nav.Link>{" "}
        <Nav.Link className="navbar-links" href="/signup">Sign Up</Nav.Link>
      </>
    );

  <NavDropdown title={props.user.username} id="collasible-nav-dropdown">
    <NavDropdown.Item className="navbar-links" href="#action/3.1">Profile</NavDropdown.Item>
    <NavDropdown.Item className="navbar-links" onClick={handleLogoutClick}>Logout</NavDropdown.Item>
  </NavDropdown>;

  let navLinks;

  if (props.user.id) {
    navLinks = (
      <>
        <Nav.Link className="navbar-links" href="/hacklist/1">Browse All Kaizo Hacks</Nav.Link>
        <Nav.Link className="navbar-links" href={`/${props.user.id}/journeys`}>
          View My Journeys
        </Nav.Link>
      </>
    );
  } else {
    navLinks = (
      <>
        <Nav.Link className="navbar-links" href="/hacklist/1">Browse All Kaizo Hacks</Nav.Link>
      </>
    );
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="nav-bar">
      <Navbar.Brand href="/" className="navbar-title">Kaizo Climb </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">{navLinks}</Nav>
        <Nav>{sessionLinks}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
