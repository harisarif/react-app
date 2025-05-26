import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../../context/UserContext';
import Swal from 'sweetalert2';
import { Row, Col, Container, Button, Table } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import axios from '../../../utils/axios';
import NoDataFound from '../../../components/NoDataFound';
import EditPermissionsModal from "../../../components/EditPermissionsModal.js"; // Component for editing permissions

import userImage from '../../../assets/images/gifs/users.gif';

const ManageUsers = () => {
  const { userData } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); // Adjust endpoint as needed
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (user) => {
    try {
      // Show confirmation dialog
      const confirmDelete = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete ${user.name}. This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (confirmDelete.isConfirmed) {
        const response = await axios.delete(`/api/del-user/${user.id}`);
        fetchUsers();
        
        // Show success message
        Swal.fire(
          'Deleted!',
          'User has been deleted successfully.',
          'success'
        );
      }
    } catch (error) {
      // Show error message
      Swal.fire(
        'Error!',
        'Failed to delete user. Please try again.',
        'error'
      );
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div id="content-page" className="content-inner">
        <div className="custom-conatiner container">
          <Card className='create-education-card'>
            <Card.Body className='d-flex justify-content-between align-items-center w-100'>
              <h2 className='text-dark' style={{fontSize: '16px', fontWeight: '500'}}>Manage Users</h2>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control user-page-search"
              />
            </Card.Body>
          </Card>
          

          <Card className='user-card-detail'>
            <Card.Body className=''>
              <div className='user-title fw-bold p-16'>Name</div>
              <div className='user-email fw-bold p-16'>Email</div>
              <div className='user-action fw-bold heading p-16'>Actions</div>
            </Card.Body>
          </Card>

          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <Card className='user-card-detail' key={user.id}>
                <Card.Body className=''>
                  <div className='user-title'>{user.name}</div>
                  <div className='user-email'>{user.email}</div>
                  <div className='user-action'>
                    <Button variant="secondary user-edit-btn" onClick={() => handleEditClick(user)}>
                      Edit Permissions
                    </Button>
                    <Button variant="danger user-edit-btn" onClick={() => handleDeleteClick(user)}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <NoDataFound message="No users found." image={userImage} width={'w-25'} />
          )}

          {/* <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button variant="secondary" onClick={() => handleEditClick(user)}>
                        Edit Permissions
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <NoDataFound message="No users found." />
              )}
            </tbody>
          </Table> */}
        </div>
      </div>

      <EditPermissionsModal 
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        user={selectedUser}
      />
    </>
  );
};

export default ManageUsers;