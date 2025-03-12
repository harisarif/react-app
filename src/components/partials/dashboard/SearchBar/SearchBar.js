import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Nav, Form, Card, Container, Image, Dropdown, Navbar } from "react-bootstrap";
import { LuSearch } from "react-icons/lu";
import axios from "../../../../utils/axios";
import { UserContext } from "../../../../context/UserContext";
import {
  Row,
  Col,
  Tab,
  OverlayTrigger,
  Tooltip,
  Collapse
} from "react-bootstrap";
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { getProfileImageUrl } from '../../../../utils/helpers';
const FollowButton = styled.button`
  border: none;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  
  &.follow-btn {
    background: linear-gradient(45deg, #007bff, #6610f2);
    color: white;
    
    &:hover {
      background: linear-gradient(45deg, #0056b3, #520dc2);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
    }
  }
  
  &.unfollow-btn {
    background: #f8f9fa;
    color: #dc3545;
    border: 1px solid #dc3545;
    
    &:hover {
      background: #dc3545;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
  }
  
  &:active::after {
    transform: scale(0, 0);
    opacity: .3;
    transition: 0s;
  }
`;


export default function SearchBar(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const [admins, setAdmins] = useState();

  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    axios.get(`/api/get-admins?search=${searchQuery}`)
      .then(response => {
        setAdmins(response.data.users);
      })
      .catch(error => {
        console.log(error);
      });
  }, [searchQuery]);
  const handleFollow = async (userId) => {
    if (!userData) {
      Swal.fire({
        title: 'Please Login',
        text: 'You need to be logged in to follow users',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/auth/sign-in';
        }
      });
      return;
    }

    try {
      const response = await axios.post(`/api/follow/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.data.status == 'success') {
        // console.log("follow")
        // setHasMore(false);
        // setIsLoading(false);
        // fetchPosts(1);


        // setPosts(posts.map(p => {
        //   if (p.user?.id === userId) {
        //     return {
        //       ...p,
        //       is_following: !p.is_following
        //     };
        //   }
        //   return p;
        // }));

        setAdmins(admins.map(a => {
          if (a.id == userId) {
            return {
              ...a,
              is_following: !a.is_following
            };
          }
          return a; // Return unchanged admin if id doesn't match
        }));

        // Show success message
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to follow/unfollow user',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Main Search Bar */}
      <Form>
        <Form.Group className={`SearchBar ${props.page}`} controlId="">
          <LuSearch size={24} style={{ position: "absolute", left: "16px" }} />
          <Form.Control
            type="text"
            className="border-0 bg-transparent"
            placeholder="Search for users"
            style={{ paddingLeft: "50px" }}
            value={searchQuery}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setShowDropdown(false)}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
      </Form>

      {/* Search Dropdown (Hidden until focused) */}
      {showDropdown && admins.length > 0 && (
        <div
          className="dropdown-menu show"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            zIndex: 10,
            background: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {admins.map((admin) => (
            <Card className="mb-2 header-search-result">
              <Card.Body className="p-3 py-2">

                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-start align-items-center overflow-hidden">
                    <img
                      src={getProfileImageUrl(admin)}
                      alt={admin.name}
                      className="rounded-circle avatar-40 me-2"
                    />
                    <div className="d-flex flex-column gap-0">
                      <h6 className="mb-0 suggestion-user-name text-dark font-14">{admin?.name}</h6>
                      <p className="mb-0 text-muted suggestion-user-email text-dark font-12 mt-n1">{admin?.email}</p>
                    </div>
                  </div>
                </div>

              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
