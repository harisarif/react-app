import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import axios from '../utils/axios';
import Swal from 'sweetalert2';

const EditPermissionsModal = ({ show, onHide, user }) => {
  const [permissions, setPermissions] = useState({
    make_admin:false,
    // can_create_jobs: false,
    // can_manage_users:false,
    // can_create_events: false,
    // can_create_education: false,
    // can_create_post_business: false,
    // can_create_post_fitness: false,
    // can_create_post_crypto: false,
    // can_create_post_technology:false,
    // can_create_post_mindset: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      axios.get(`/api/users/${user.id}`)
        .then(res => {
          let arr = JSON.parse(res.data.permissions[0]?.can_create_post_category) || [];
          setPermissions((prev) => ({
            ...prev,
            make_admin: res.data.permissions[0]?.can_create_jobs == true? true : false,
            // can_create_jobs: res.data.permissions[0]?.can_create_jobs,
            // can_manage_users: res.data.permissions[0]?.can_manage_users,
            // can_create_events: res.data.permissions[0]?.can_create_events,
            // can_create_education: res.data.permissions[0]?.can_create_education,
            // can_create_post_business: arr.includes(1),
            // can_create_post_fitness: arr.includes(2),
            // can_create_post_crypto: arr.includes(3),
            // can_create_post_technology:arr.includes(4),
            // can_create_post_mindset: arr.includes(5),
          }));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setPermissions((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await axios.put(`/api/users/${user.id}/permissions`, permissions);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Permissions updated successfully!',
      });
      onHide(); // Close modal after submission
    } catch (error) {
      console.error('Error updating permissions:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update permissions. Please try again.',
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="user-permission-model"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Permissions for {user?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {Object.keys(permissions).map((permission) => (
            <Form.Group controlId={permission} key={permission}>
              <Form.Check
                type="switch"
                className='d-flex flex-row-reverse justify-content-between align-items-center py-2 px-3 border radius-10 mb-3'
                label={permission.replace(/_/g, ' ').replace('can ', 'Should able to ')}
                name={permission}
                checked={permissions[permission]}
                onChange={handleChange}
              />
            </Form.Group>
          ))}
          <Button variant="primary" type="submit" className='btn-purpule w-100 py-2 radius-10' disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPermissionsModal;