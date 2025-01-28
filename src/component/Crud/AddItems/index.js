import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import PhoneInput from 'react-phone-input-2';
import './ContactForm.css'; // Import the custom CSS file
import axios from 'axios'
const ContactForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // phoneNumber:'',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post('https://crudcrud.com/api/e64d8308e5704c72aefc9dfb04e316fd/items', 
          formData,
        );
  
        console.log('Item added:', response.data);
       navigate('/')
        // Optionally, you can update the UI to display the newly added item
        // For example, add the response.data to the existing items list in your state
      } catch (error) {
        console.error('Error adding item:', error);
      }
    // You can add form submission logic here
  };

  return (
    <div className="contact-form-container">
      <h2>ADD Items</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </Form.Group>
        

        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows={4}
          />
        </Form.Group> <br />

        <Button  variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ContactForm;
