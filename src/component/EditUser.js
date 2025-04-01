import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";

const EditUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://reqres.in/api/users/${user.id}`, formData);

      // Redirect to Users List with updated user data
      navigate("/users/UsersList", { state: { updatedUser: { ...user, ...formData } } });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#1d7373" }}>
      <Card style={{ width: "60%", maxWidth: "550px", background: "#388c8c" }} className="p-4 shadow">
      <Card.Body >
      <Card.Title className="text-center text-white mb-4" style={{ fontSize: 25, fontWeight: 600 }}>
            Edit User
          </Card.Title>
          <Form onSubmit={handleSubmit} className="space-y-4">
              <Form.Group className="mb-3">
              <Form.Label style={{ color: "white" }}>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "white" }}>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
                required
              />
            </Form.Group>
             <Form.Group className="mb-3">
              <Form.Label style={{ color: "white" }}>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>


            <div className="d-flex justify-content-around mt-4">
              <Button
               variant="danger"
                type="button"
                onClick={() => navigate(-1)}
                style={{ width: "35%" }} 
                >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{ width: "35%" }}
                >
                Update
              </Button>
            </div>
          </Form>
        
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditUser;
