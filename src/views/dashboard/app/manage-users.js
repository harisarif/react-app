import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../../context/UserContext';
import Swal from 'sweetalert2';
import { Row, Col, Container, Button, Table } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import axios from '../../../utils/axios';
import NoDataFound from '../../../components/NoDataFound';
import EditPermissionsModal from "../../../components/EditPermissionsModal.js"; // Component for editing permissions

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

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div id="content-page" className="content-inner">
        <div className="container">
          <h2 className="mb-4">Manage Users</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mb-3"
          />
          <Table striped bordered hover>
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
          </Table>
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