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
        <NavDropdown title={props.user.username} id="collasible-nav-dropdown">
          <NavDropdown.Item href="">Profile</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogoutClick}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </>
    ) : (
      <>
        <Nav.Link href="/login">Log In</Nav.Link>{" "}
        <Nav.Link href="/signup">Sign Up</Nav.Link>
      </>
    );

  <NavDropdown title={props.user.username} id="collasible-nav-dropdown">
    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
    <NavDropdown.Item onClick={handleLogoutClick}>Logout</NavDropdown.Item>
  </NavDropdown>;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Kaizo Climb </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/hacklist/1">Browse All Kaizo Hacks</Nav.Link>
          <Nav.Link href="#temp">Temp Link</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>{sessionLinks}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
