import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import {
  Row,
  Col,
  Container,
  Dropdown,
  Nav,
  Tab,
  OverlayTrigger,
  Tooltip,
  Button,
  Modal,
  Card,
  Collapse,
  Form
} from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from '../../../utils/axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";
import ReactCrop from 'react-image-crop'
import { getProfileImageUrl, getBackgroundProfileImageUrl } from '../../../utils/helpers';


import { FaRegHeart } from "react-icons/fa6";
import { RiShare2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";

import DummyImage from '../../../assets/images/dummy-image.png'
import eventImage from '../../../assets/images/gifs/events.gif';

import avatar from '../../../assets/images/d0d79bd9c491d22b6f3398fcaedf2780.jpg'
import post from '../../../assets/images/92a4f16eb9cbb1b124bd7efeb55f2f38.jpg'
import { LuSearch } from "react-icons/lu";
import { LuSlidersHorizontal } from "react-icons/lu";

import moment from "moment";
import NoDataFound from '../../../components/NoDataFound';
import DateTimeFormat from '../../../components/DateTimeFormat';

const CategoryBatch = ({ category }) => {
  let classes = '';
  if (category === 'Business Management') {
    classes = 'text-white info-btn-sm';
  } else if (category === 'Technology') {
    classes = 'text-white tech-info-btn-sm';
  } else if (category === 'Crypto') {
    classes = 'text-white crypto-info-btn-sm';
  } else if (category === 'Fitness') {
    classes = 'text-white fitness-info-btn-sm';
  } else if (category === 'Mindset') {
    classes = 'text-white mindset-info-btn-sm';
  } else {
    classes = 'text-white other-info-btn-sm';
  }
  const firstWord = category?.split(' ')[0] || '';
  return (
    <span class={`rounded-pill position-absolute top-left-12 ${classes}`}>{firstWord}</span>
  );
}

const stepStyles = {
  stepContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
    gap: '1rem'
  },
  step: {
    width: '150px',
    padding: '0.75rem',
    textAlign: 'center',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer'
  },
  activeStep: {
    backgroundColor: '#6c5dd3',
    color: 'white'
  }
};

const EventCalender = () => {
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);
  const handleShow = (event) => {
    setSelectedEventDetail(event);
    setShowModalDetail(true);
  };
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };
  const [croppedGETImageBlob, setCroppedImageBlob] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { userData } = useContext(UserContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    media: null,
    category_id: '',
    event_type: '',
    event_mode: '',
    title: '',
    subtitle: '',
    description: '',
    price: '',
    standard_price: '',
    premium_price: '',
    followers: '',
    location: '',
    country: ''
  });

  const eventTypes = ['Workshop', 'Seminar', 'Conference', 'Webinar'];
  const eventModes = ['Online', 'Offline', 'Hybrid'];

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const [isDirty, setIsDirty] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const initialData = JSON.stringify(formData); // Store initial state

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Any date');
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Dynamic categories from events - FIXED THE SYNTAX ERROR HERE
  const categoryOptions = [
    'All Categories',
    ...categories.map(cat => cat.name)
  ];

  const dateOptions = [
    'Any date',
    'Today',
    'Tomorrow',
    'This week',
    'This weekend',
    'Choose a date'
  ];

  const handleCategoryChange = (category) => {
    if (category === 'All Categories') {
      setSelectedCategories([]);
    } else if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleApplyFilters = () => {
    setFilters({
      date: selectedDate,
      categories: selectedCategories
    });
    setShowFilterModal(false);
  };

  const handleResetFilters = () => {
    setSelectedDate('Any date');
    setSelectedCategories([]);
  };

  useEffect(() => {
    if (JSON.stringify(formData) !== initialData) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [formData]);

  useEffect(() => {
    fetchEvents();
  }, []);
  const [admins, setAdmins] = useState();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState();
  useEffect(() => {
    axios.get(`/api/get-admins?search=${searchQuery}`)
      .then(response => {
        const adminsArray = response.data.users || []; // Ensure it's an array
        const userArray = userData ? [userData] : []; // Wrap userData in an array if it exists
        setSelectedAdmin(userData?.id);
        setAdmins([...userArray, ...adminsArray].filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i));
      })
      .catch(error => {
        console.log(error);
      });
  }, [searchQuery, userData]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };



  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;
    if (name === "media") {
      setFormData({ ...formData, media: files });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'file' ? files[0] : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'is_active') {
          formDataToSend.append(key, formData[key] ? 1 : 0);
        } else if (key !== 'media') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // // Handle media files
      // if (formData.media && formData.media.length > 0) {
      //   for (let i = 0; i < formData.media.length; i++) {
      //     const file = formData.media[i];
      //     if (file instanceof File) {
      //       formDataToSend.append('media[]', file);
      //     }
      //   }
      // }
      if (selectedEvent) {
        await axios.put(`/api/events/${selectedEvent.id}`, formDataToSend);
      } else {
        await axios.post('/api/events', formDataToSend);
      }

      setShowModal(false);
      fetchEvents();
      Swal.fire({
        icon: 'success',
        title: `Event ${selectedEvent ? 'updated' : 'created'} successfully!`,
        customClass: {
          popup: 'custom-swal-z-index',
          container: 'custom-swal-container'
        },
        position: 'center',
        showConfirmButton: true
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong',
        customClass: {
          popup: 'custom-swal-z-index',
          container: 'custom-swal-container'
        },
        position: 'center',
        showConfirmButton: true
      });
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      // organizer_id:event.organizer_id,
      // banner_image:event.banner_image,
      title: event.title,
      subtitle: event.subtitle || '',
      description: event.description || '',
      event_date: moment(event.event_date).format('YYYY-MM-DD'),
      start_time: event.start_time || '',
      end_time: event.end_time || '',
      // type: event.type,
      // is_active: event.is_active
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
    // setSelectedAdmin(null);
    setCroppedImageBlob(null);
    setFormData({
      // organizer_id:'',
      // banner_image: '',
      // main_image:'',
      media: null,
      title: '',
      subtitle: '',
      description: '',
      event_date: '',
      start_time: '',
      end_time: '',
      // type: '',
      // is_active: true
    });
    setShowModal(true);
  };

  const handleModalClose = () => {
    if (isDirty) {
      setShowDiscardModal(true);
    } else {
      // Directly close without confirmation
      setShowModal(false);
    }
  };


  const [completedCrop, setCompletedCrop] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const imgRef = React.useRef(null);
  const previewCanvasRef = React.useRef(null);

  const [showBackgroundCropper, setShowBackgroundCropper] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const [backgroundCrop, setBackgroundCrop] = useState({
    unit: '%', // Use '%' for a percentage-based crop
    x: 10, // Start crop 10% from the left
    y: 10, // Start crop 10% from the top
    width: 80, // Crop width 80% of the image
    height: 50, // Crop height 50% of the image
    aspect: 2.5, // Maintain aspect ratio
  });
  const [completedBackgroundCrop, setCompletedBackgroundCrop] = useState(null);
  const backgroundImgRef = React.useRef(null);


  const onLoad = (img) => {
    imgRef.current = img;
    const aspectRatio = 2.5;
    const cropWidth = img.width * 0.8;
    const cropHeight = cropWidth / aspectRatio;

    const defaultCrop = {
      unit: 'px',
      x: (img.width - cropWidth) / 2,
      y: (img.height - cropHeight) / 2,
      width: cropWidth,
      height: cropHeight,
      aspect: aspectRatio,
    };

    setBackgroundCrop(defaultCrop);

    // 🔹 Manually trigger crop complete to store crop data
    handleBackgroundCropComplete(defaultCrop);
  };

  const handleCroppedImage = async (croppedImageBlob) => {
    // Create a FormData object

    const formData = new FormData();

    // Create a File object from the Blob
    const file = new File([croppedImageBlob], 'cropped-image.jpg', {
      type: 'image/jpeg'
    });

    // Append the file to FormData
    formData.append('media', file);

    // Store the FormData object
    setFormData(prevFormData => ({
      ...prevFormData,
      media: formData
    }));
    alert('handleCroppedImage');
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

      handleCroppedImage(croppedImageBlob); // Call the function to handle conversion
      if (croppedImageBlob) {
        setCroppedImageBlob(croppedImageBlob);

        // alert();
        // Close modal and update image
        setShowBackgroundCropper(false);
        setBackgroundImage(null);
        setIsSaving(false);

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'banner image cropped successfully!',
          customClass: {
            popup: 'custom-swal-z-index',
            container: 'custom-swal-container'
          },
          position: 'center',
          showConfirmButton: true
        })
      }

    } catch (error) {
      setIsSaving(false);
      console.error('Error in handleSaveBackgroundCrop:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to update background image',
        backdrop: true,
        background: '#fff',
        customClass: {
          popup: 'custom-swal-z-index',
          container: 'custom-swal-container'
        },
        position: 'center',
        showConfirmButton: true
      });
    }
  };

  const handleBackgroundCropComplete = (crop) => {
    setCompletedBackgroundCrop(crop);
  };


  const handleAdminSelect = (id) => {
    setFormData({
      ...formData,
      organizer_id: id
    });
    setSelectedAdmin(id);
  };

  const [showDropdown, setShowDropdown] = useState();



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

  const [filters, setFilters] = useState({
    date: 'Any date',
    categories: []
  });

  // Add this utility function above your component
  const checkDateMatch = (eventDate, filterDate) => {
    const eventDateObj = new Date(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const endOfWeek = new Date(today);
    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

    const startOfWeekend = new Date(today);
    startOfWeekend.setDate(startOfWeekend.getDate() + (5 - startOfWeekend.getDay())); // Friday
    const endOfWeekend = new Date(startOfWeekend);
    endOfWeekend.setDate(endOfWeekend.getDate() + 2); // Sunday

    switch (filterDate) {
      case 'Today':
        return eventDateObj.toDateString() === today.toDateString();
      case 'Tomorrow':
        return eventDateObj.toDateString() === tomorrow.toDateString();
      case 'This week':
        return eventDateObj >= today && eventDateObj <= endOfWeek;
      case 'This weekend':
        return eventDateObj >= startOfWeekend && eventDateObj <= endOfWeekend;
      default:
        return true;
    }
  };

  // Then in your component where you filter events:
  const filteredEvents = events.filter(event => {
    // Filter by date
    const dateMatch = filters.date === 'Any date' || checkDateMatch(event.start_time, filters.date);

    // Filter by category
    const categoryMatch = filters.categories.length === 0 ||
      filters.categories.includes(event.category?.name);

    // Filter by search term
    const searchTerm = searchQuery.toLowerCase();
    const searchMatch = searchTerm === '' ||
      event.title?.toLowerCase().includes(searchTerm) ||
      event.subtitle?.toLowerCase().includes(searchTerm) ||
      event.description?.toLowerCase().includes(searchTerm) ||
      event.category?.name?.toLowerCase().includes(searchTerm) ||
      event.status?.toLowerCase().includes(searchTerm);

    return dateMatch && categoryMatch && searchMatch;
  });



  return (
    <div id="content-page" className="content-inner">
      <div className="custom-conatiner container">
        <Card className='create-education-card'>
          <Card.Body className='d-flex justify-content-between align-items-center w-100'>
            <h2 className='text-dark' style={{ fontSize: '16px', fontWeight: '500' }}>Education Content</h2>
            {userData && userData?.permissions[0]?.can_create_education == 1 && (
              <Button className='py-0 btn-purpule' variant="primary" style={{ fontWeight: '400' }} onClick={handleAddNew}>
                Add New Event
              </Button>
            )}
          </Card.Body>
        </Card>

        <Row className="special-post-container g-3 mb-3">
          <Col md={8} className='position-relative'>
            <Form.Control
              type="text"
              placeholder="Search by caption..."
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                setSearchQuery(searchTerm);
              }}
              className="w-100 radius-8 px-44"
            />
            <LuSearch color='#939393' className='search-btn-left' />
            <LuSlidersHorizontal
              color='#939393'
              className='search-btn-right cursor-pointer'
              onClick={() => setShowFilterModal(true)}
              style={{ fontSize: '20px' }}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              className="w-100 radius-8"
              onChange={(e) => {
                const category = e.target.value;
                if (category === 'all') {
                  setSelectedCategories([]);
                } else {
                  setSelectedCategories([category]);
                }
                setFilters(prev => ({
                  ...prev,
                  categories: category === 'all' ? [] : [category]
                }));
              }}
              value={filters.categories[0] || 'all'}
            >
              <option value="all">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>{cat.name}</option>
              ))}
            </Form.Select>
          </Col>
          {console.log('Categories', categories)}
          {filteredEvents.length < 1 ? (
            <NoDataFound message={'No Events Found'} width={'w-25'} image={eventImage} />
          ) : ( 
            filteredEvents.map((event, index) => (
              <Col xxl={4} lg={6} key={index} data-event-cat={event.category?.name}>
                <Card className="event-calender-card border">
                  <Card.Body>
                    <CategoryBatch category={event.category?.name} />
                    <span class={`rounded-pill position-absolute top-right-12 text-white fitness-info-btn-sm`}>{event.status?.name}</span>
                    <Image src={`${event.banner_image == null ? DummyImage : event.banner_image}`} className='w-100 transition-transform duration-300 hover:scale-110 border-bottom' alt={''} />
                    <div className="d-flex flex-column gap-3 p-3">
                      <div className="d-flex flex-column gap-1">
                        <div className="d-flex justify-content-between gap-2">
                          <h5 className="cap-title text-dark m-0">{event.title}</h5>
                          <div className="d-flex align-items-center gap-1 justify-content-end">
                            <FaRegHeart size={'16px'} color={`#444`} className='cursor-pointer' />
                            <RiShare2Line size={'18px'} color={`#444`} className='cursor-pointer' />
                            <Dropdown>
                              <Dropdown.Toggle variant="Link" id="dropdown-basic" className="p-0 d-flex align-items-start border-0">
                                <SlOptionsVertical color={`#444`} className="cursor-pointer" size={'14px'} />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item href="#">Edit</Dropdown.Item>
                                <Dropdown.Item href="#">Delete</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <p className="cap-subtitle text-dark m-0"><DateTimeFormat dateTime={event.start_time} /> {event.mode && (`- ${event.mode}`)}</p>
                      </div>
                      <div className="d-flex flex-column gap-1 align-items-start">
                        <div className="d-flex gap-1 align-items-center justify-content-start">
                          <FaRegUser size={'12px'} color={`#444`} />
                          <p className="cap-followers text-dark m-0">{`${event.followers} Followers`}</p>
                        </div>
                        <p className="cap-bottomTitle text-dark m-0 text-uppercase">Dummy</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)} centered>
          <Modal.Header className="d-flex justify-content-between px-3 py-2">
            <Modal.Title className="d-flex align-items-center hover-bg mx-auto">
              <div className="d-flex align-items-center flex-grow-1">
                Filter Events
              </div>
            </Modal.Title>
            <Link to="#" className="lh-1" onHide={() => setShowFilterModal(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="0.21875" y="0.21875" width="27.5625" height="27.5625" rx="13.7812" stroke="#CCCCCC" stroke-width="0.4375" />
                <path d="M10.6982 17.3016L17.3016 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M17.3016 17.3016L10.6982 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </Link>
          </Modal.Header>
          <Modal.Body>

            <div className="mb-4">
              <h6 className="mb-3 text-center">Date</h6>
              <div className="d-flex flex-column gap-1">
                {dateOptions.map((date, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    id={`date-${index}`}
                    label={date}
                    checked={selectedDate === date}
                    onChange={() => setSelectedDate(date)}
                    className="custom-radio p-0 d-flex flex-row-reverse justify-content-between align-items-center"
                  />
                ))}
              </div>
            </div>

            <div>
              <h6 className="mb-3 text-center">Categories</h6>
              <div className="d-flex flex-column gap-1 mb-3">
                <Form.Check
                  type="radio"
                  id="all-categories"
                  label="All Categories"
                  checked={selectedCategories.length === 0}
                  onChange={() => handleCategoryChange('All Categories')}
                  className="custom-checkbox p-0 d-flex flex-row-reverse justify-content-between align-items-center"
                />
                {categoryOptions.filter(cat => cat !== 'All Categories').map((category, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    id={`category-${index}`}
                    label={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="custom-checkbox p-0 d-flex flex-row-reverse justify-content-between align-items-center"
                  />
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" className="btn-gray-2 border-gray-2 text-dark px-3 radius-6" onClick={handleResetFilters}>
                Reset
              </Button>
              <Button variant="primary" className="btn-purpule px-3 radius-6" onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showModalDetail} size="lg" centered onHide={() => setShowModalDetail(false)}>
          <Modal.Body>
            <div className={`media-grid position-relative media-grid-1 mt-0`}>
              <div className="media-item" >
                <div className="position-relative w-100 h-100" >
                  <img src={process.env.REACT_APP_BACKEND_BASE_URL + '/' + selectedEventDetail?.main_image} alt='' />
                </div>
              </div>
              <span className={`badge badge-event-calendar position-absolute top-left-12`}>{selectedEventDetail?.status ? selectedEventDetail?.status : 'Public'}</span>
              <span className={`badge badge-event-calendar-close position-absolute top-right-12`} onClick={() => setShowModalDetail(false)}>
                x
              </span>
            </div>
            <div className='d-flex flex-column gap-2 mt-3'>
              <span className={`badge badge-event-calendar-detail`}>{selectedEventDetail?.type}</span>
              <h6 className="mb-0 me-2 text-dark fw-bold">{selectedEventDetail?.title}</h6>
              <p className="mb-0 mt-n1 text-dark" style={{ fontSize: 16, fontWeight: '300' }}>{selectedEventDetail?.description}</p>
            </div>
            <div className='d-flex gap-3 mt-3'>
              <div className='event-card flex-grow-1 px-3 py-2 d-flex gap-3 align-items-center radius-10 bg-gray-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 9C11.0711 9 12.75 7.32107 12.75 5.25C12.75 3.17893 11.0711 1.5 9 1.5C6.92893 1.5 5.25 3.17893 5.25 5.25C5.25 7.32107 6.92893 9 9 9Z" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M15.4436 16.5C15.4436 13.5975 12.5561 11.25 9.00109 11.25C5.44609 11.25 2.55859 13.5975 2.55859 16.5" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div className='d-flex flex-column gap-0'>
                  <h6 className="mb-0 text-gray">Organizer</h6>
                  <p className='mb-0 mt-n1'>{selectedEventDetail?.organizer?.name}</p>
                </div>
              </div>

              <div className='event-card flex-grow-1 px-3 py-2 d-flex gap-3 align-items-center radius-10 bg-gray-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 9C11.0711 9 12.75 7.32107 12.75 5.25C12.75 3.17893 11.0711 1.5 9 1.5C6.92893 1.5 5.25 3.17893 5.25 5.25C5.25 7.32107 6.92893 9 9 9Z" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M15.4436 16.5C15.4436 13.5975 12.5561 11.25 9.00109 11.25C5.44609 11.25 2.55859 13.5975 2.55859 16.5" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div className='d-flex flex-column gap-0'>
                  <h6 className="mb-0 text-gray">Date</h6>
                  <p className='mb-0 mt-n1'>{moment(selectedEventDetail?.event_date).format('DD MMMM')}</p>
                </div>
              </div>

              <div className='event-card flex-grow-1 px-3 py-2 d-flex gap-3 align-items-center radius-10 bg-gray-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 9C11.0711 9 12.75 7.32107 12.75 5.25C12.75 3.17893 11.0711 1.5 9 1.5C6.92893 1.5 5.25 3.17893 5.25 5.25C5.25 7.32107 6.92893 9 9 9Z" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M15.4436 16.5C15.4436 13.5975 12.5561 11.25 9.00109 11.25C5.44609 11.25 2.55859 13.5975 2.55859 16.5" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div className='d-flex flex-column gap-0'>
                  <h6 className="mb-0 text-gray">Time</h6>
                  <p className='mb-0 mt-n1'>
                    {moment(selectedEventDetail?.start_time).format('hh:mm A')}
                    {' - '}
                    {moment(selectedEventDetail?.end_time).format('hh:mm A')}
                  </p>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </div>
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

      <Modal show={showModal} onHide={handleModalClose} size="lg" className="create-new-event-modal">
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent ? 'Edit Event' : 'Create New Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div style={stepStyles.stepContainer}>
            <div
            class="modal-step-main-div"
              style={{
                ...stepStyles.step,
                ...(currentStep === 1 ? stepStyles.activeStep : {})
              }}
              onClick={() => setCurrentStep(1)}
            >
              {/* <div>Step 1</div> */}
              <small>Basic Info</small>
            </div>
            <div
              class="modal-step-main-div"
              style={{
                ...stepStyles.step,
                ...(currentStep === 2 ? stepStyles.activeStep : {})
              }}
              onClick={() => setCurrentStep(2)}
            >
              {/* <div>Step 2</div> */}
              <small>Additional Details</small>
            </div>
          </div>

          {currentStep === 1 ? (
            <Form>
              <div className="mb-4">
                <label className="dropzone-container " style={{ aspectRatio: '16/9' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundImageChange}
                    className="d-none"
                  />
                  <div className="dropzone-content">
                    {croppedGETImageBlob ? (
                      <img
                        src={URL.createObjectURL(croppedGETImageBlob)}
                        alt="Preview"
                        className="img-fluid"
                      />
                    ) : (
                      <div className="text-center">
                        <i className="fas fa-cloud-upload-alt fa-3x mb-2"></i>
                        <p>Drag and drop or click to upload image (16:9)</p>
                      </div>
                    )}
                  </div>
                </label>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Type</Form.Label>
                <Form.Select
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleInputChange}
                >
                  <option value="">Select Event Type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Mode</Form.Label>
                <Form.Select
                  name="event_mode"
                  value={formData.event_mode}
                  onChange={handleInputChange}
                >
                  <option value="">Select Event Mode</option>
                  {eventModes.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label>Select Organizer (optional)</Form.Label>
                <div>
                  <div
                    className="d-flex align-items-center justify-content-between border rounded p-2 mb-2"
                    style={{ cursor: "pointer", background: "#fff" }}
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <div className="d-flex align-items-center">
                      {selectedAdmin ? (
                        <>
                          <img
                            src={getProfileImageUrl(admins.find(a => a.id === selectedAdmin))}
                            alt={admins.find(a => a.id === selectedAdmin)?.name}
                            className="rounded-circle me-2"
                            style={{ width: "30px", height: "30px" }}
                          />
                          <h6 className="mb-0">
                            {admins.find(a => a.id === selectedAdmin)?.name || "Select Organizer"}
                          </h6>
                        </>
                      ) : (
                        <h6 className="mb-0 text-muted">Select Organizer</h6>
                      )}
                    </div>
                    <i className={`fas fa-chevron-${showDropdown ? "up" : "down"}`}></i>
                  </div>


                  {showDropdown && (
                    <div
                      className="border rounded p-2 position-absolute bg-white shadow modal-inner-dropdown"
                      style={{ maxHeight: "250px", width: "100%", overflowY: "auto", zIndex: 1000 }}
                    >

                      <Form.Control
                        type="text"
                        placeholder="Search Users..."
                        value={searchQuery}
                        onChange={(e) => {
                          const query = e.target.value;
                          axios.get(`/api/get-admins?search=${query}`)
                            .then(response => {
                              const adminsArray = response.data.users || [];
                              const userArray = userData ? [userData] : [];
                              setAdmins([...userArray, ...adminsArray].filter((v, i, a) => a.findIndex(v2 => v2.id === v.id) === i));
                            })
                            .catch(error => console.log(error));
                          setSearchQuery(query);
                        }}
                        autoFocus
                      />


                      <div className="mt-2">
                        {admins?.length > 0 ? (
                          admins.slice(0, 3).map((admin) => (
                            <Card
                              key={admin.id}
                              className={`mb-1 p-2 ${selectedAdmin === admin.id ? "bg-light" : ""}`}
                              style={{ cursor: "pointer", fontSize: "14px" }}
                              onClick={() => {
                                handleAdminSelect(admin.id);
                                setShowDropdown(false);
                              }}
                            >
                              <Card.Body className="d-flex justify-content-between align-items-center p-2">
                                <div className="d-flex align-items-center">
                                  <img
                                    src={getProfileImageUrl(admin)}
                                    alt={admin.name}
                                    className="rounded-circle me-2"
                                    style={{ width: "25px", height: "25px" }}
                                  />
                                  <h6 className="mb-0">{admin.name}</h6>
                                </div>
                                {selectedAdmin === admin.id && <i className="fas fa-check text-success"></i>}
                              </Card.Body>
                            </Card>
                          ))
                        ) : (
                          <p className="text-muted text-center">No admins found</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="radius-8"
                  placeholder="Enter Title"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subtitle</Form.Label>
                <Form.Control
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="radius-8"
                  placeholder="Enter Subitle"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <ReactQuill
                  value={formData.description}
                  onChange={(value) => setFormData({ ...formData, description: value })}
                  modules={modules}
                />
                {/* <ReactQuill
                theme="snow"
                name="description"
                value={formData.description}
                onChange={(value) => {
                  setFormData(prev => ({
                    ...prev,
                    description: value
                  }));
                }}
                modules={modules}
                style={{ height: '200px', marginBottom: '50px' }}
              /> */}
              </Form.Group>
            </Form>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Standard Price</Form.Label>
                <Form.Control
                  type="number"
                  name="standard_price"
                  value={formData.standard_price}
                  onChange={handleInputChange}
                  placeholder="Enter standard price"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Premium Price</Form.Label>
                <Form.Control
                  type="number"
                  name="premium_price"
                  value={formData.premium_price}
                  onChange={handleInputChange}
                  placeholder="Enter premium price"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Followers</Form.Label>
                <Form.Control
                  type="number"
                  name="followers"
                  value={formData.followers}
                  onChange={handleInputChange}
                  placeholder="Enter number of followers"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                />
              </Form.Group>

              {/* <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required // Add required if you want to enforce selection
              >
                  <option value="">Select Type</option>
                  <option value="in-person">In person</option>
                  <option value="virtual">Virtual</option>
              </Form.Select>
            </Form.Group> */}

              {/* <Form.Group className="mb-3">
              <Form.Label>Visibility</Form.Label>
              <Form.Select
                name="is_active"
                value={formData.is_active}
                onChange={handleInputChange}
              >
                <option value="1">Public</option>
                <option value="0">Private</option>
              </Form.Select>
            </Form.Group> */}

            </Form>
          )}
        </Modal.Body>
        <div className="d-flex justify-content-between  bottom-button">
          {currentStep > 1 && (
            <Button variant="outline-secondary" onClick={handleBack}>
              Back
            </Button>
          )}
          {currentStep < 2 ? (
            <Button variant="primary" onClick={handleNext} className="ms-auto">
              Next
            </Button>
          ) : (
            <Button type="submit" variant="primary" className="ms-auto">
              {selectedEvent ? 'Update Event' : 'Create Event'}
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default EventCalender;
