import React, { useState, useEffect } from 'react';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';
import { getAllContactQueries } from '../../../services/api';
import LoadingSpinner from '../../LoadingSpinner';
import moment from 'moment';

const ContactQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const data = await getAllContactQueries();
        setQueries(data);
      } catch (err) {
        setError('Failed to fetch contact queries');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Contact Queries</h1>

      {queries.length === 0 ? (
        <Alert variant="info">No contact queries found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {queries.map(query => (
              <tr key={query.queryID}>
                <td>{query.queryID}</td>
                <td>{query.name}</td>
                <td>{query.email}</td>
                <td>{query.subject}</td>
                <td>{query.message.length > 50 ? `${query.message.substring(0, 50)}...` : query.message}</td>
                <td>{moment(query.submissionDate).format('MMM D, YYYY')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ContactQueries;