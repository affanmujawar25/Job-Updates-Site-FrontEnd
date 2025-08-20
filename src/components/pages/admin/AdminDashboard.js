import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { FaBriefcase, FaEnvelope, FaUsers } from 'react-icons/fa';
import { getJobCount, getContactCount } from '../../../services/api';
import LoadingSpinner from '../../LoadingSpinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    jobCount: 0,
    contactCount: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [jobs, contacts] = await Promise.all([
          getJobCount(),
          getContactCount()
        ]);
        setStats({
          jobCount: jobs.count,
          contactCount: contacts.count,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  if (stats.loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="my-5">
      <h1 className="mb-5">Admin Dashboard</h1>

      <Row className="g-4 mb-5">
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <FaBriefcase size={48} className="mb-3 text-primary" />
              <h3>Job Listings</h3>
              <h2 className="display-4">{stats.jobCount}</h2>
              <p className="text-muted">Total job postings</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <FaEnvelope size={48} className="mb-3 text-success" />
              <h3>Contact Queries</h3>
              <h2 className="display-4">{stats.contactCount}</h2>
              <p className="text-muted">Total messages received</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <FaUsers size={48} className="mb-3 text-info" />
              <h3>Admin Users</h3>
              <h2 className="display-4">1</h2>
              <p className="text-muted">Total admin accounts</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-4">Quick Actions</h3>
              <div className="d-flex flex-wrap gap-3">
                <a href="/admin/jobs" className="btn btn-primary">
                  Manage Jobs
                </a>
                <a href="/admin/jobs/new" className="btn btn-success">
                  Add New Job
                </a>
                <a href="/admin/contact-queries" className="btn btn-info">
                  View Contact Queries
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;