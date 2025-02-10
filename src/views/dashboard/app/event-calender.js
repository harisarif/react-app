import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Container, Button, Modal, Form } from "react-bootstrap";
import { UserContext } from "../../../context/UserContext";
import axios from "../../../utils/axios";
import Swal from "sweetalert2";
import moment from "moment";
import NoDataFound from '../../../components/NoDataFound';

const EventCalender = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { userData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    event_date: '',
    start_time: '',
    end_time: '',
    type: 'conference',
    is_active: true
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          if (key === 'is_active') {
            formDataToSend.append(key, formData[key] ? 1 : 0);
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      if (selectedEvent) {
        await axios.put(`/api/events/${selectedEvent.id}`, formDataToSend);
      } else {
        await axios.post('/api/events', formDataToSend);
      }

      setShowModal(false);
      fetchEvents();
      Swal.fire({
        icon: 'success',
        title: `Event ${selectedEvent ? 'updated' : 'created'} successfully!`
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong'
      });
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      subtitle: event.subtitle || '',
      description: event.description || '',
      event_date: moment(event.event_date).format('YYYY-MM-DD'),
      start_time: event.start_time || '',
      end_time: event.end_time || '',
      type: event.type,
      is_active: event.is_active
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/events/${id}`);
        fetchEvents();
        Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete event.', 'error');
    }
  };

  const handleAddNew = () => {
    setSelectedEvent(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      event_date: '',
      start_time: '',
      end_time: '',
      type: 'conference',
      is_active: true
    });
    setShowModal(true);
  };

  return (
    <div id="content-page" className="content-inner">
      <div className="container mt-5">
        {userData &&  userData?.permissions[0]?.can_create_events == 1 && (
          <div className="mb-4">
            <Button variant="primary" onClick={handleAddNew}>
              Add New Event
            </Button>
          </div>
        )}
        
        <Row>
          {events.length < 1 ? (
            <Col sm={12}>
              <NoDataFound 
                message={userData?.roles === "admin" ? "No events found. Click 'Add New Event' to create one!" : "No upcoming events at the moment."}
                containerClassName="text-center py-5"
              />
            </Col>
          ) : (
            events.map((event) => (
              <Col xs={4} key={event.id} className="mb-4">
                <div className="col-12">
                  <div className="card cardhover">
                    <div className="card-body label-card">
                      <div>
                        <h6 className="price">
                          <span className="regular-price text-dark pr-2 label-span">
                            {moment(event.event_date).format('DD MMMM')}
                          </span>
                        </h6>
                      </div>
                      <h5>{event.title}</h5>
                      <small>{event.subtitle}</small>
                      <div className="mt-2">
                        <p className="mb-0">{event.description}</p>
                      </div>
                      {userData?.roles === "admin" && (
                        <div className="mt-3">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEdit(event)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(event.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent ? 'Edit Event' : 'Create New Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="talk">Talk</option>
                <option value="seminar">Seminar</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Active"
                name="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  is_active: e.target.checked
                }))}
              />
            </Form.Group>

            <div className="text-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {selectedEvent ? 'Update' : 'Create'} Event
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EventCalender;
