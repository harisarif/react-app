import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Tab, Form, Button, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from '../../../utils/axios'
import Swal from 'sweetalert2'
import { getProfileImageUrl } from '../../../utils/helpers';
//image
import img1 from '../../../assets/images/user/11.png'

const UserProfileEdit = () => {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const [profileImage, setProfileImage] = useState(null)

    useEffect(() => {
        fetchUserData()
    }, [])

    const fetchUserData = async () => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserData(response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching user data:', error)
            setLoading(false)
        }
    }

    const handleImageChange = async (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(file);
            
            // Create a preview and update immediately
            setUserData(prev => ({
                ...prev,
                profile_image: URL.createObjectURL(file)
            }));

            // Automatically upload the image
            const token = localStorage.getItem('access_token');
            const formData = new FormData();
            formData.append('profile_image', file);

            try {
                const response = await axios.post('/api/user/update', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                
                // Refresh user data to get the new image path
                fetchUserData();
                
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Profile image updated successfully!'
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'Failed to update profile image'
                });
            }
        }
    }

    const handlePersonalInfoSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('access_token');
        const formData = new FormData()

        // Append form fields to FormData
        Object.keys(userData).forEach(key => {
            if (key !== 'profile_image') {
                formData.append(key, userData[key])
            }
        })

        if (profileImage) {
            formData.append('profile_image', profileImage)
        }

        try {
            const response = await axios.post('/api/user/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Profile updated successfully!'
            })
            fetchUserData() // Refresh user data
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to update profile'
            })
        }
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        try {
            // Check if passwords match
            if (e.target.npass.value !== e.target.vpass.value) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'New password and verify password do not match'
                });
                return;
            }

            const formData = {
                new_password: e.target.npass.value,
                new_password_confirmation: e.target.vpass.value
            };

            // Add current password only if user has a password set
            if (userData?.has_password) {
                if (!e.target.cpass.value) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Current password is required'
                    });
                    return;
                }
                formData.current_password = e.target.cpass.value;
            }

            console.log('Sending formData:', formData);
            const response = await axios.post('/api/user/password', formData);
            
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message
            });

            // Clear the form
            e.target.reset();
        } catch (error) {
            console.error('Error details:', error);
            const errorMessage = error.response?.data?.error || 
                               Object.values(error.response?.data?.errors || {})[0]?.[0] ||
                               'Failed to update password';
            
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage
            });
        }
    }

    const handleNotificationSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('access_token');
        const formData = {
            email_notification: e.target.emailnotification.checked,
            sms_notification: e.target.smsnotification.checked
        }

        try {
            await axios.post('/api/user/notifications', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Notification preferences updated successfully!'
            })
            fetchUserData() // Refresh user data
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to update notification preferences'
            })
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className='content-inner'>
                <Container>
                    <Tab.Container defaultActiveKey="first">
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <Card.Body className="p-0">
                                        <div>
                                            <Nav as="ul" variant="pills" className="iq-edit-profile row mb-0">
                                                <Nav.Item as="li" className="col-md-3 p-0">
                                                    <Nav.Link eventKey="first" role="button">
                                                        Personal Information
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item as="li" className="col-md-3 p-0">
                                                    <Nav.Link eventKey="second" role="button">
                                                        Change Password
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item as="li" className="col-md-3 p-0">
                                                    <Nav.Link eventKey="third" role="button">
                                                        Email and SMS
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item as="li" className="col-md-3 p-0">
                                                    <Nav.Link eventKey="fourth" role="button">
                                                        Manage Contact
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={12}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first" className="fade show">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">
                                                    <h4 className="card-title">Personal Information</h4>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <Form onSubmit={handlePersonalInfoSubmit}>
                                                    <Form.Group className="form-group align-items-center">
                                                        <Col md="12">
                                                            <div className="profile-img-edit">
                                                                <img 
                                                                    className="profile-pic" 
                                                                    src={getProfileImageUrl(userData)} 
                                                                    alt="profile-pic" 
                                                                />
                                                                <div className="p-image d-flex align-items-center justify-content-center">
                                                                    <label htmlFor="file-upload" className="d-flex align-items-center justify-content-center w-100 h-100 m-0">
                                                                        <span className="material-symbols-outlined">edit</span>
                                                                    </label>
                                                                    <input 
                                                                        id="file-upload"
                                                                        className="file-upload" 
                                                                        type="file" 
                                                                        accept="image/*" 
                                                                        onChange={handleImageChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Form.Group>
                                                    <Row className="align-items-center">
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label>First Name:</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="first_name"
                                                                value={userData.first_name || ''}
                                                                onChange={handleInputChange}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label>Last Name:</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="last_name"
                                                                value={userData.last_name || ''}
                                                                onChange={handleInputChange}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label>User Name:</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="username"
                                                                value={userData.username || ''}
                                                                onChange={handleInputChange}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label>City:</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="city"
                                                                value={userData.city || ''}
                                                                onChange={handleInputChange}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label d-block">Gender:</Form.Label>
                                                            <Form.Check className="form-check form-check-inline">
                                                                <Form.Check.Input
                                                                    type="radio"
                                                                    name="gender"
                                                                    value="male"
                                                                    checked={userData.gender === 'male'}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <Form.Check.Label>Male</Form.Check.Label>
                                                            </Form.Check>
                                                            <Form.Check className="form-check form-check-inline">
                                                                <Form.Check.Input
                                                                    type="radio"
                                                                    name="gender"
                                                                    value="female"
                                                                    checked={userData.gender === 'female'}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <Form.Check.Label>Female</Form.Check.Label>
                                                            </Form.Check>
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label>Date Of Birth:</Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                name="date_of_birth"
                                                                value={userData.date_of_birth || ''}
                                                                onChange={handleInputChange}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label>Marital Status:</Form.Label>
                                                            <Form.Select
                                                                name="marital_status"
                                                                value={userData.marital_status || ''}
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="">Select Status</option>
                                                                <option value="Single">Single</option>
                                                                <option value="Married">Married</option>
                                                                <option value="Widowed">Widowed</option>
                                                                <option value="Divorced">Divorced</option>
                                                                <option value="Separated">Separated</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label>Age Group:</Form.Label>
                                                            <Form.Select
                                                                name="age_group"
                                                                value={userData.age_group || ''}
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="">Select Age Group</option>
                                                                <option value="18-25">18-25</option>
                                                                <option value="26-35">26-35</option>
                                                                <option value="36-45">36-45</option>
                                                                <option value="46-62">46-62</option>
                                                                <option value="63+">63+</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label>Country:</Form.Label>
                                                            <Form.Select
                                                                name="country"
                                                                value={userData.country || ''}
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="">Select Country</option>
                                                                <option value="USA">USA</option>
                                                                <option value="Canada">Canada</option>
                                                                <option value="India">India</option>
                                                                <option value="UK">UK</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label>State:</Form.Label>
                                                            <Form.Select
                                                                name="state"
                                                                value={userData.state || ''}
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="">Select State</option>
                                                                <option value="California">California</option>
                                                                <option value="Florida">Florida</option>
                                                                <option value="Georgia">Georgia</option>
                                                                <option value="Texas">Texas</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-12">
                                                            <Form.Label>Address:</Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                name="address"
                                                                rows={5}
                                                                value={userData.address || ''}
                                                                onChange={handleInputChange}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                                                    <Button type="reset" variant='' className="btn-danger-subtle">Cancel</Button>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second" className="fade show">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">
                                                    <h4 className="card-title">Change Password</h4>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <Form onSubmit={handlePasswordChange}>
                                                    {userData?.has_password && (
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Current Password:</Form.Label>
                                                            <Link to="/auth/recoverpw" className="float-end">Forgot Password</Link>
                                                            <Form.Control 
                                                                type="password" 
                                                                name="cpass" 
                                                                required={!!userData?.has_password}
                                                                placeholder="Enter your current password" 
                                                            />
                                                        </Form.Group>
                                                    )}
                                                    <Form.Group className="form-group">
                                                        <Form.Label>New Password:</Form.Label>
                                                        <Form.Control 
                                                            type="password" 
                                                            name="npass" 
                                                            required 
                                                            minLength={8}
                                                            placeholder="Enter new password (min 8 characters)" 
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Verify Password:</Form.Label>
                                                        <Form.Control 
                                                            type="password" 
                                                            name="vpass" 
                                                            required 
                                                            minLength={8}
                                                            placeholder="Confirm new password" 
                                                        />
                                                    </Form.Group>
                                                    <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                                                    <Button type="reset" variant='' className="btn-danger-subtle">Cancel</Button>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third" className="fade show">
                                        <Card>
                                            <Card.Header className="card-header d-flex justify-content-between">
                                                <div className="header-title">
                                                    <h4 className="card-title">Email and SMS</h4>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <Form onSubmit={handleNotificationSubmit}>
                                                    <Form.Group className="form-group row align-items-center">
                                                        <Form.Label className="col-md-3">Email Notification:</Form.Label>
                                                        <div className="col-md-9">
                                                            <Form.Check className="form-switch">
                                                                <Form.Check.Input
                                                                    type="checkbox"
                                                                    name="emailnotification"
                                                                    defaultChecked={userData.email_notification}
                                                                />
                                                                <Form.Check.Label>Enable email notifications</Form.Check.Label>
                                                            </Form.Check>
                                                        </div>
                                                    </Form.Group>
                                                    <Form.Group className="form-group row align-items-center">
                                                        <Form.Label className="col-md-3">SMS Notification:</Form.Label>
                                                        <div className="col-md-9">
                                                            <Form.Check className="form-switch">
                                                                <Form.Check.Input
                                                                    type="checkbox"
                                                                    name="smsnotification"
                                                                    defaultChecked={userData.sms_notification}
                                                                />
                                                                <Form.Check.Label>Enable SMS notifications</Form.Check.Label>
                                                            </Form.Check>
                                                        </div>
                                                    </Form.Group>
                                                    <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                                                    <Button type="reset" variant='' className="btn-danger-subtle">Cancel</Button>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="fourth" className="fade show">
                                        <Card>
                                            <Card.Header className="d-flex justify-content-between">
                                                <div className="header-title">
                                                    <h4 className="card-title">Manage Contact</h4>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <Form onSubmit={handlePersonalInfoSubmit}>
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Contact Number:</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="phone"
                                                            value={userData.phone || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Email:</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            name="email"
                                                            value={userData.email || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Website URL:</Form.Label>
                                                        <Form.Control
                                                            type="url"
                                                            name="website_url"
                                                            value={userData.website_url || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </Form.Group>
                                                    <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                                                    <Button type="reset" variant='' className="btn-danger-subtle">Cancel</Button>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </div>
        </>
    )
}

export default UserProfileEdit