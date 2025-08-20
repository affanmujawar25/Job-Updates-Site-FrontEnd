import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { CgLayoutGrid } from 'react-icons/cg';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await login(credentials.username, credentials.password);
      if (success) {
        navigate('/admin');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="text-center mb-4">
                <h2>Admin Login</h2>
                <p className="text-muted">Please sign in to continue</p>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;