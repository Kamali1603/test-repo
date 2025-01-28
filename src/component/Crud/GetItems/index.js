import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
function BasicExample() {
    const [items, setItems] = useState([]);
    const [show, setShow] = useState(false);
    const  navigate = useNavigate(); 
    const handleClose = () => setShow(false);

    const [id, setId] = useState('')
    const [namedata, setNameData] = useState('')
    const [emaidata, setEmailData] = useState('')
    const [messagedata, setMessageData] = useState('')

   console.log(namedata)
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

    useEffect(() => {
        fetchItems()
      }, []);
    
      const fetchItems = async () => {
        try {
          const response = await fetch('https://crudcrud.com/api/e64d8308e5704c72aefc9dfb04e316fd/items');
          const data = await response.json();
          setItems(data);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };
      const handleUpdateItem = (item, name, email, msg) => {
        
        setId(item)
        setNameData(name)
        setEmailData(email)
        setMessageData(msg)
        setShow(true)
      }
      const [formData, setFormData] = useState({
        name: namedata,
        email: emaidata,
        message: messagedata,
      });

    const par = {
        'name' :namedata,
        'email':emaidata,
        'message':messagedata
    }  
const handleSubmit = async (e) => {

 try {
  const response = await axios.put(`https://crudcrud.com/api/e64d8308e5704c72aefc9dfb04e316fd/items/${id}`, 
  par,
  );
  setShow(false)
  fetchItems()
  console.log('Item added:', response);

} catch (error) {
  console.error('Error adding item:', error);
}

}

const handleDeleteItem = async (itemId) => {
  try {
    await axios.delete(`https://crudcrud.com/api/e64d8308e5704c72aefc9dfb04e316fd/items/${itemId}`
     );
     fetchItems()
  } catch (error) {
    console.log('Error deleting item:', error);
  }
}

  return (
    <>
      <div style={{width:'100%', justifyContent:'end', display:'flex', marginLeft:-120, marginTop:20, marginBottom:50}} >
        <Button onClick={() => navigate('/add')}>ADD Data</Button>
      </div>
    <div style={{display:'flex', flexDirection:'row',  width:'100%', height:'30vh', justifyContent:'center'}}>
   
   <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'80%'}}>
  
   <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Last Email</th>
          <th>Message</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
                  {items.map((x, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{x?.name}</td>
                      <td>{x?.email}</td>
                      <td>{x?.message}</td>
                      <td>
                      <button onClick={() => handleUpdateItem(x._id, x?.name, x?.email, x?.message)}>Update</button>

                      </td>
                      <td>
                      <button onClick={() => handleDeleteItem(x._id)}>Delete</button>

                      </td>
                    </tr>
                  ))}
                </tbody>
   
    </Table>
   </div>
    </div>
    

    

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body>
        <div className="contact-form-container">
      <h2>ADD Items</h2>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={namedata}
            onChange={(e) => setNameData(e.target.value)}
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={emaidata}
            onChange={(e) => setEmailData(e.target.value)}
            placeholder="Enter your email"
          />
        </Form.Group>
        

        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={messagedata}
            onChange={(e) => setMessageData(e.target.value)}
            placeholder="Enter your message"
            rows={4}
          />
        </Form.Group> 

      </Form>
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
   
  );
}

export default BasicExample;
