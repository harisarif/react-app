import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Container, Form, Nav, Tab, Button, Modal } from 'react-bootstrap'
import Card from '../../../components/Card'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Link } from 'react-router-dom'
import axios from '../../../utils/axios'
import Swal from 'sweetalert2'
import { getProfileImageUrl, getBackgroundProfileImageUrl } from '../../../utils/helpers';
import { UserContext } from "../../../context/UserContext";
//image
import img1 from '../../../assets/images/user/11.png'

const UserProfileEdit = () => {

    const { userData, setUserData } = useContext(UserContext);
    const [loading, setLoading] = useState(true)
    const [profileImage, setProfileImage] = useState(null)
    const [showCropper, setShowCropper] = useState(false);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({
        unit: '%',
        width: 100,
        aspect: 1,
    });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const imgRef = React.useRef(null);
    const previewCanvasRef = React.useRef(null);

    const [showBackgroundCropper, setShowBackgroundCropper] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [backgroundCrop, setBackgroundCrop] = useState({
        unit: '%',
        width: 100,
        height: 40,
        aspect: 2.5
    });
    const [completedBackgroundCrop, setCompletedBackgroundCrop] = useState(null);
    const backgroundImgRef = React.useRef(null);

    const onLoad = (img) => {
        imgRef.current = img;
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setShowCropper(true);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleBackgroundImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setBackgroundImage(reader.result);
                setShowBackgroundCropper(true);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const generateCroppedImage = async (crop) => {
        if (!crop || !imgRef.current) {
            console.error('No crop or image reference');
            return null;
        }

        const canvas = document.createElement('canvas');
        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('No 2d context');
            return null;
        }

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        try {
            ctx.drawImage(
                imgRef.current,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            // Convert the canvas to blob
            return new Promise((resolve) => {
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            console.error('Canvas to Blob conversion failed');
                            resolve(null);
                            return;
                        }
                        console.log('Generated blob:', blob);
                        resolve(blob);
                    },
                    'image/jpeg',
                    1
                );
            });
        } catch (error) {
            console.error('Error generating cropped image:', error);
            return null;
        }
    };

    const generateBackgroundCroppedImage = async (crop) => {
        if (!crop || !backgroundImgRef.current) {
            console.error('No crop or image reference');
            return null;
        }

        const canvas = document.createElement('canvas');
        const scaleX = backgroundImgRef.current.naturalWidth / backgroundImgRef.current.width;
        const scaleY = backgroundImgRef.current.naturalHeight / backgroundImgRef.current.height;
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('No 2d context');
            return null;
        }

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        try {
            ctx.drawImage(
                backgroundImgRef.current,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            return new Promise((resolve) => {
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            console.error('Canvas to Blob conversion failed');
                            resolve(null);
                            return;
                        }
                        console.log('Generated background blob:', blob);
                        resolve(blob);
                    },
                    'image/jpeg',
                    1
                );
            });
        } catch (error) {
            console.error('Error generating cropped background image:', error);
            return null;
        }
    };

    const handleCropComplete = (crop) => {
        setCompletedCrop(crop);
    };

    const handleBackgroundCropComplete = (crop) => {
        setCompletedBackgroundCrop(crop);
    };

    const handleSaveCrop = async () => {
        try {
            setIsSaving(true);
            console.log('Starting crop save...');
            if (!completedCrop || !imgRef.current) {
                console.error('No crop or image reference available');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Please select an area to crop'
                });
                setIsSaving(false);
                return;
            }

            const croppedImageBlob = await generateCroppedImage(completedCrop);
            console.log('Generated cropped image blob:', croppedImageBlob);

            if (croppedImageBlob) {
                const formData = new FormData();
                formData.append('profile_image', croppedImageBlob, 'profile.jpg');

                const token = localStorage.getItem('access_token');

                console.log('Sending request to update profile image...');
                const response = await axios.post('/api/user/update', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Server response:', response.data);

                // Close modal and update image
                setShowCropper(false);
                setImage(null);
                setIsSaving(false);

                // Update the user's profile photo in state
                if (response.data.user && response.data.user.profile_image) {
                    setUserData(prev => ({
                        ...prev,
                        profile_image: response.data.user.profile_image
                    }));
                }

                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Profile image updated successfully!'
                });

                // Refresh user data to get the updated image
                fetchUserData();
            }
        } catch (error) {
            setIsSaving(false);
            console.error('Error in handleSaveCrop:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to update profile image'
            });
        }
    };

    const handleSaveBackgroundCrop = async () => {
        try {
            setIsSaving(true);
            console.log('Starting background crop save...');
            if (!completedBackgroundCrop || !backgroundImgRef.current) {
                console.error('No crop or image reference available');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Please select an area to crop'
                });
                setIsSaving(false);
                return;
            }

            const croppedImageBlob = await generateBackgroundCroppedImage(completedBackgroundCrop);
            console.log('Generated cropped background image blob:', croppedImageBlob);

            if (croppedImageBlob) {
                const formData = new FormData();
                formData.append('background_image', croppedImageBlob, 'background.jpg');

                const token = localStorage.getItem('access_token');

                console.log('Sending request to update background image...');
                const response = await axios.post('/api/user/update', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Server response:', response.data);

                // Close modal and update image
                setShowBackgroundCropper(false);
                setBackgroundImage(null);
                setIsSaving(false);

                // Update the user's background image in state
                if (response.data.user && response.data.user.background_image) {
                    setUserData(prev => ({
                        ...prev,
                        background_image: response.data.user.background_image
                    }));
                }

                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Background image updated successfully!'
                });

                // Refresh user data
                fetchUserData();
            }
        } catch (error) {
            setIsSaving(false);
            console.error('Error in handleSaveBackgroundCrop:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to update background image'
            });
        }
    };

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

    const handlePersonalInfoSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('access_token');
        const formData = new FormData()

        // Append form fields to FormData
        Object.keys(userData).forEach(key => {
            if (key !== 'profile_image' && key !== 'background_image') {
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
                <Container className="custom-conatiner">
                    <Tab.Container defaultActiveKey="first">
                        <Card className='radius-12 border edit-profile-header overflow-hidden'>
                            <Card.Body className="p-0">
                                <Nav as="ul" variant="pills" className="iq-edit-profile mb-0">
                                    <Nav.Item as="li" className="col-md-3 p-0">
                                        <Nav.Link eventKey="first" className='text-dark' role="button">
                                            Personal Information
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="col-md-3 p-0">
                                        <Nav.Link eventKey="second" className='text-dark' role="button">
                                            Change Password
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="col-md-3 p-0">
                                        <Nav.Link eventKey="third" className='text-dark' role="button">
                                            Email and SMS
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="col-md-3 p-0">
                                        <Nav.Link eventKey="fourth" className='text-dark' role="button">
                                            Manage Contact
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Body>
                        </Card>
                        <Tab.Content>
                            <Tab.Pane eventKey="first" className="fade show">
                                <Card className='border radius-12'>
                                    <Card.Header className="d-flex justify-content-between p-3 pb-1">
                                        <div className="header-title">
                                            <h4 className="card-title fw-bold">Personal Information</h4>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="profile-header radius-14 border" style={{
                                            backgroundImage: `url(${getBackgroundProfileImageUrl(userData)})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            borderRadius: '0.25rem',
                                            position: 'relative',
                                            marginBottom: '4rem',
                                            aspectRatio: '16 / 6',

                                        }}>
                                            <div className="position-relative h-100">
                                                <div className="img-fluid avatar-100 rounded-circle" style={{
                                                    backgroundImage: `url(${getProfileImageUrl(userData)})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    width: '100px',
                                                    height: '100px',
                                                    border: '5px solid #fff',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                    position: 'absolute',
                                                    bottom: '-40px',
                                                    left: '15px'
                                                }}>
                                                    <div className="upload-icone bg-primary" style={{
                                                        position: 'absolute',
                                                        bottom: '0',
                                                        right: '0',
                                                        width: '25px',
                                                        height: '25px',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        cursor: 'pointer'
                                                    }} onClick={() => document.getElementById('profile-upload').click()}>
                                                        <input
                                                            id="profile-upload"
                                                            className="file-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            style={{
                                                                position: 'absolute',
                                                                width: '100%',
                                                                height: '100%',
                                                                opacity: 0,
                                                                cursor: 'pointer',
                                                                display: 'none'
                                                            }}
                                                        />
                                                        <svg width="14" height="14" viewBox="0 0 24 24">
                                                            <path fill="#ffffff" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="upload-background-button" style={{
                                                    position: 'absolute',
                                                    top: '16px',
                                                    left: '16px',
                                                    zIndex: 1
                                                }}>
                                                    <input
                                                        type="file"
                                                        id="background-upload"
                                                        className="file-upload"
                                                        accept="image/*"
                                                        onChange={handleBackgroundImageChange}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <label htmlFor="background-upload" className="btn btn-secondary radius-10" style={{ background: '#fff', color: '#000' }}>
                                                        <svg width="14" height="14" viewBox="0 0 24 24" className="me-2">
                                                            <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                                        </svg>
                                                        Change Cover
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <Form onSubmit={handlePersonalInfoSubmit}>
                                            <Row className="align-items-center">
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label className='text-dark'>First Name:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="first_name"
                                                        value={userData.first_name || ''}
                                                        onChange={handleInputChange}
                                                        className='radius-10'
                                                    />
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label className='text-dark'>Last Name:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="last_name"
                                                        value={userData.last_name || ''}
                                                        onChange={handleInputChange}
                                                        className='radius-10'
                                                    />
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label className='text-dark'>User Name:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="username"
                                                        value={userData.username || ''}
                                                        onChange={handleInputChange}
                                                        className='radius-10'
                                                    />
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label className='text-dark'>City:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="city"
                                                        value={userData.city || ''}
                                                        onChange={handleInputChange}
                                                        className='radius-10'
                                                    />
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label className="form-label d-block text-dark">Gender:</Form.Label>
                                                    <div className="d-flex justify-content-between gap-2 align-items-center">
                                                        <Form.Check className="form-check form-check-inline flex-grow-1 p-0 m-0">
                                                            <Form.Check.Label className='text-dark border m-0 px-5 py-2 radius-10 form-check' for='male'>
                                                                <Form.Check.Input
                                                                    type="radio"
                                                                    name="gender"
                                                                    value="male"
                                                                    id='male'
                                                                    checked={userData.gender === 'male'}
                                                                    onChange={handleInputChange}
                                                                />
                                                                Male
                                                            </Form.Check.Label>
                                                        </Form.Check>
                                                        <Form.Check className="form-check form-check-inline flex-grow-1 p-0 m-0">
                                                            <Form.Check.Label className='text-dark border m-0 px-5 py-2 radius-10 form-check' for='female'>
                                                                <Form.Check.Input
                                                                    type="radio"
                                                                    name="gender"
                                                                    value="female"
                                                                    id='female'
                                                                    checked={userData.gender === 'female'}
                                                                    onChange={handleInputChange}
                                                                /> Female
                                                            </Form.Check.Label>
                                                        </Form.Check>
                                                    </div>
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label className='text-dark'>Date Of Birth:</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="date_of_birth"
                                                        value={userData.date_of_birth || ''}
                                                        onChange={handleInputChange}
                                                        className='radius-10'
                                                    />
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label className='text-dark'>Marital Status:</Form.Label>
                                                    <Form.Select
                                                        name="marital_status"
                                                        value={userData.marital_status || ''}
                                                        onChange={handleInputChange}
                                                        className='radius-10'
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
                                                    <Form.Label className='text-dark'>Age Group:</Form.Label>
                                                    <Form.Select
                                                        name="age_group"
                                                        value={userData.age_group || ''}
                                                        onChange={handleInputChange}
                                                        className='radius-10'
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
                                                    <Form.Label className='text-dark'>Country:</Form.Label>
                                                    <Form.Select
                                                        name="country"
                                                        value={userData.country || ''}
                                                        onChange={handleInputChange}
                                                        className='radius-10'
                                                    >
                                                        <option value="">Select Country</option>
                                                        <option value="USA">USA</option>
                                                        <option value="Canada">Canada</option>
                                                        <option value="India">India</option>
                                                        <option value="UK">UK</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-6">
                                                    <Form.Label className='text-dark'>State:</Form.Label>
                                                    <Form.Select
                                                        name="state"
                                                        value={userData.state || ''}
                                                        onChange={handleInputChange}
                                                        className='radius-10'
                                                    >
                                                        <option value="">Select State</option>
                                                        <option value="California">California</option>
                                                        <option value="Florida">Florida</option>
                                                        <option value="Georgia">Georgia</option>
                                                        <option value="Texas">Texas</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className="form-group col-sm-12">
                                                    <Form.Label className='text-dark'>Address:</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        name="address"
                                                        rows={5}
                                                        value={userData.address || ''}
                                                        onChange={handleInputChange}
                                                        className='radius-10'
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <div className="d-flex justify-content-end align-items-center gap-2">
                                                <Button type="reset" variant='secondary' className="bg-white text-dark border px-3 py-2 radius-8">Cancel</Button>
                                                <Button type="submit" variant='primary' className="btn-purpule px-3 py-2 radius-8">Submit</Button>
                                            </div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second" className="fade show">
                                <Card className='border radius-12'>
                                    <Card.Header className="d-flex justify-content-between p-3 pb-1">
                                        <div className="header-title">
                                            <h4 className="card-title fw-bold">Change Password</h4>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={handlePasswordChange}>
                                            {userData?.has_password && (
                                                <Form.Group className="form-group">
                                                    <Form.Label className='text-dark'>Current Password:</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="cpass"
                                                        required={!!userData?.has_password}
                                                        placeholder="Enter your current password"
                                                        className='radius-10'
                                                    />
                                                </Form.Group>
                                            )}
                                            <Form.Group className="form-group">
                                                <Form.Label className='text-dark'>New Password:</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="npass"
                                                    required
                                                    minLength={8}
                                                    placeholder="Enter new password (min 8 characters)"
                                                    className='radius-10'
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label className='text-dark'>Verify Password:</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="vpass"
                                                    required
                                                    minLength={8}
                                                    placeholder="Confirm new password"
                                                    className='radius-10'
                                                />
                                            </Form.Group>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <Link to="/auth/recover-password" className="text-purpule">Forgot Password</Link>
                                                <div className="d-flex justify-content-end align-items-center gap-2">
                                                    <Button type="reset" variant='secondary' className="bg-white text-dark px-3 py-2 radius-10">Cancel</Button>
                                                    <Button type="submit" variant='primary' className="btn-purpule px-3 py-2 radius-10">Submit</Button>
                                                </div>
                                            </div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third" className="fade show">
                                <Card className='border radius-12'>
                                    <Card.Header className="d-flex justify-content-between p-3 pb-1">
                                        <div className="header-title">
                                            <h4 className="card-title fw-bold">Email and SMS</h4>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={handleNotificationSubmit}>
                                            <Form.Group className="d-flex align-items-center justify-content-between border px-3 py-2 radius-10 mb-3">
                                                <Form.Label className="text-dark mb-0">Enable email notifications</Form.Label>
                                                <Form.Check className="form-switch">
                                                    <Form.Check.Input
                                                        type="checkbox"
                                                        name="emailnotification"
                                                        defaultChecked={userData.email_notification}
                                                    />
                                                </Form.Check>
                                            </Form.Group>
                                            <Form.Group className="d-flex align-items-center justify-content-between border px-3 py-2 radius-10 mb-3">
                                                <Form.Label className="text-dark mb-0">Enable SMS notifications</Form.Label>
                                                <Form.Check className="form-switch">
                                                    <Form.Check.Input
                                                        type="checkbox"
                                                        name="smsnotification"
                                                        defaultChecked={userData.sms_notification}
                                                    />
                                                </Form.Check>
                                            </Form.Group>
                                            <div className="d-flex justify-content-end align-ites-center gap-2">
                                                <Button type="reset" variant='secondary' className="bg-white text-dark px-3 py-2 radius-8">Cancel</Button>
                                                <Button type="submit" variant='primary' className="btn-purpule px-3 py-2 radius-8">Submit</Button>
                                            </div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth" className="fade show">
                                <Card className='border radius-12'>
                                    <Card.Header className="d-flex justify-content-between p-3 pb-1">
                                        <div className="header-title">
                                            <h4 className="card-title fw-bold">Manage Contact</h4>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={handlePersonalInfoSubmit}>
                                            <Form.Group className="form-group">
                                                <Form.Label className='text-dark'>Contact Number:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phone"
                                                    value={userData.phone || ''}
                                                    onChange={handleInputChange}
                                                    className='radius-10'
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label className='text-dark'>Email:</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={userData.email || ''}
                                                    onChange={handleInputChange}
                                                    className='radius-10'
                                                />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label className='text-dark'>Website URL:</Form.Label>
                                                <Form.Control
                                                    type="url"
                                                    name="website_url"
                                                    value={userData.website_url || ''}
                                                    onChange={handleInputChange}
                                                    className='radius-10'
                                                />
                                            </Form.Group>
                                            <div className="d-flex justify-content-end align-ites-center gap-2">
                                                <Button type="reset" variant='secondary' className="bg-white text-dark px-3 py-2 radius-8">Cancel</Button>
                                                <Button type="submit" variant='primary' className="btn-purpule px-3 py-2 radius-8">Submit</Button>
                                            </div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Container>
            </div>
            {/* <div className="header-for-bg">
                <div className="background-header position-relative">
                    <img src={getBackgroundProfileImageUrl(userData) } className="img-fluid w-100" alt="header-bg" />
                    <div className="change-background-button">
                        <input 
                            type="file" 
                            id="background-upload"
                            className="file-upload" 
                            accept="image/*" 
                            onChange={handleBackgroundImageChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="background-upload" className="btn btn-primary btn-sm">
                            Change Background
                        </label>
                    </div>
                </div>
            </div> */}
            <Modal show={showCropper} onHide={() => !isSaving && setShowCropper(false)} size="lg" centered>
                <Modal.Header closeButton={!isSaving}>
                    <Modal.Title>Crop Profile Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {image && (
                        <div className="crop-container">
                            <ReactCrop
                                crop={crop}
                                onChange={(c) => setCrop(c)}
                                onComplete={handleCropComplete}
                                aspect={1}
                                circularCrop
                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={image}
                                    style={{ maxWidth: '100%' }}
                                    onLoad={(e) => onLoad(e.target)}
                                />
                            </ReactCrop>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowCropper(false)}
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSaveCrop}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showBackgroundCropper} onHide={() => !isSaving && setShowBackgroundCropper(false)} size="lg" centered>
                <Modal.Header closeButton={!isSaving}>
                    <Modal.Title>Crop Background Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {backgroundImage && (
                        <div className="crop-container">
                            <ReactCrop
                                crop={backgroundCrop}
                                onChange={(c) => setBackgroundCrop(c)}
                                onComplete={handleBackgroundCropComplete}
                                aspect={2.5}
                            >
                                <img
                                    ref={backgroundImgRef}
                                    alt="Crop me"
                                    src={backgroundImage}
                                    style={{ maxWidth: '100%' }}
                                    onLoad={(e) => onLoad(e.target)}
                                />
                            </ReactCrop>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowBackgroundCropper(false)}
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSaveBackgroundCrop}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserProfileEdit