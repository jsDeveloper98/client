import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

const BootstrapNavbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    auth.logout();
    history.push("/signin");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/todos">
              Todo List
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Button onClick={handleLogout} className="logout-btn" variant="dark">
        Log Out
      </Button>
    </>
  );
};

export default BootstrapNavbar;
