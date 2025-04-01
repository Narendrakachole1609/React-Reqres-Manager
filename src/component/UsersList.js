import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button, Navbar, Form } from "react-bootstrap";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const updatedUser = location.state?.updatedUser;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        let userList = response.data.data;

        if (updatedUser) {
          userList = userList.map((user) => (user.id === updatedUser.id ? updatedUser : user));
        }

        setUsers(userList);
        setFilteredUsers(userList);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, updatedUser]);

  useEffect(() => {
    const filtered = users.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  if (loading) return <div>Loading...</div>;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user");
    }
  };

  return (
    <div style={{ background: "#388c8c" }}>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand className="d-flex px-4" style={{fontSize:20,fontWeight:600}}>User Management List</Navbar.Brand>
          <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-end">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search.."
                className="me-2"
                aria-label="Search"
                style={{ borderWidth: 2, borderColor: "black" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row className="justify-content-center mt-4">
          {filteredUsers.map((user) => (
            <Col key={user.id} xs={12} md={6} xl={6} className="d-flex justify-content-center mb-4">
              <Card
                style={{
                  width: "30rem",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Row className="g-0">
                  <Col md={5}>
                    <Card.Img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }}
                    />
                  </Col>
                  <Col md={7}>
                    <Card.Body className="d-flex flex-column justify-content-center">
                      <Card.Title>
                        {user.first_name} {user.last_name}
                      </Card.Title>
                      <Card.Text className="text-muted">{user.email}</Card.Text>
                      <div className="d-flex">
                        <Button
                          variant="primary"
                          className="me-2"
                          onClick={() => navigate(`/edit/${user.id}`, { state: { user } })}
                        >
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(user.id)}>
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="d-flex justify-content-center py-4">
        <Button className="me-3" onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <Button onClick={() => setPage(page + 1)} disabled={page === 2}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default UsersList;
