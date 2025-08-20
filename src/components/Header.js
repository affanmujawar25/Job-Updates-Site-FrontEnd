import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { admin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/">JobPortal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            {admin ? (
              <NavDropdown title={`Admin (${admin.username})`} id="admin-dropdown">
                <NavDropdown.Item as={Link} to="/admin">Dashboard</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/jobs">Manage Jobs</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/contact-queries">Contact Queries</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/admin/login">Admin Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;