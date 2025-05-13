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

import { Link } from "react-router-dom";
import axios from "../../../utils/axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";
import ReactCrop from 'react-image-crop'
import { getProfileImageUrl, getBackgroundProfileImageUrl } from '../../../utils/helpers';

import avatar from '../../../assets/images/d0d79bd9c491d22b6f3398fcaedf2780.jpg'
import post from '../../../assets/images/92a4f16eb9cbb1b124bd7efeb55f2f38.jpg'
import { LuSearch } from "react-icons/lu";
import { LuSlidersHorizontal } from "react-icons/lu";

import moment from "moment";
import NoDataFound from '../../../components/NoDataFound';

const EventCalender = () => {
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);
  const handleShow = (event) => {
    setSelectedEventDetail(event);
    setShowModalDetail(true);
  };
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };
  const [croppedGETImageBlob,setCroppedImageBlob] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { userData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    // organizer_id:'',
    // banner_image: '',
    // main_image: '',
    media:null,
    title: '',
    subtitle: '',
    description: '',
    event_date: '',
    start_time: '',
    end_time: '',
    // type: '',
    // is_active: true
  });

  const [isDirty, setIsDirty] = useState(false);
const [showDiscardModal, setShowDiscardModal] = useState(false);

const initialData = JSON.stringify(formData); // Store initial state

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
  }, [searchQuery,userData]);
  
  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;
    if(name === "media"){
      setFormData({ ...formData, [name]: files });
    }else{
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
      // Object.keys(formData).forEach(key => {

      //     if (key === 'is_active') {
      //       formDataToSend.append(key, formData[key] ? 1 : 0);
      //     }
      //     else if (key === 'media') {
      //       if (formData.media && formData.media.length > 0) {
      //         for (let i = 0; i < formData.media.length; i++) {
      //             formDataToSend.append('media[]', formData.media[i]);
      //         }
      //       }
      //     }
      //     else {
      //       formDataToSend.append(key, formData[key]);
      //     }
      //   });
      Object.keys(formData).forEach(key => {
        if (key === 'is_active') {
          formDataToSend.append(key, formData[key] ? 1 : 0);
        } else if (key !== 'media') {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      // Handle media files
      if (formData.media && formData.media.length > 0) {
        for (let i = 0; i < formData.media.length; i++) {
          const file = formData.media[i];
          if (file instanceof File) {
            formDataToSend.append('media[]', file);
          }
        }
      }
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
      media:null,
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
  // Convert the Blob to a base64 string
  const reader = new FileReader();
  reader.onloadend = () => {
      const base64data = reader.result; // This is the base64 string
      setFormData(prevFormData => ({
          ...prevFormData,
          banner_image: base64data // Add the base64 string to formData
      }));
  };
  reader.readAsDataURL(croppedImageBlob); // Read the Blob as a data URL
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
          handleCroppedImage(croppedImageBlob); // Call the function to handle conversion
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
        });
        
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


const handleAdminSelect = (id) =>{
  setFormData({
    ...formData,
    organizer_id: id
});
  setSelectedAdmin(id);
};

const [showDropdown,setShowDropdown] = useState();



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



  return (
    <div id="content-page" className="content-inner">
      <div className="custom-conatiner container">
        <Card className='create-education-card'>
          <Card.Body className='d-flex justify-content-between align-items-center w-100'>
            <h2 className='text-dark' style={{fontSize: '16px', fontWeight: '500'}}>Education Content</h2>
            {userData && userData?.permissions[0]?.can_create_education == 1 && (
              <Button className='py-0 btn-purpule' variant="primary" style={{fontWeight: '400'}} onClick={handleAddNew}>
              Add New Event
              </Button>
            )}
          </Card.Body>
        </Card>

        <Row className="special-post-container">
          <Col md={12}>
            <Form.Control
              type="text"
              placeholder="Search by caption..."
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              className="w-100 radius-8 px-44"
            />
            <LuSearch color='#939393' className='search-btn-left' />
            <LuSlidersHorizontal color='#939393' className='search-btn-right cursor-pointer' />
          </Col>
        </Row>

        {/* <Row className="special-post-container">
          {events.length < 1 ? (
              <Col sm={12}>
                <NoDataFound 
                  message={userData?.roles === "admin" ? "No events found. Click 'Add New Event' to create one!" : "No upcoming events at the moment."}
                  containerClassName="text-center py-5"
                />
              </Col>
            ) : (
              events.map((event) => (
            <Col lg={12} className="special-post">
              <Card className="card-block card-stretch card-height">
                <Card.Body>
                  <div className={`media-grid position-relative media-grid-1 mt-0`}>
                    <div className="media-item" >
                      <div className="position-relative w-100 h-100" >
                        <img src={process.env.REACT_APP_BACKEND_BASE_URL +'/'+ event?.main_image} alt='' />
                      </div>
                    </div>
                    <span className={`badge badge-event-calendar position-absolute top-left-12`}>{event.status ? event.status : 'Public'}</span>
                  </div>
                  <div className='d-flex flex-column gap-2 mt-3'>
                    <span className={`badge badge-event-calendar-detail`}>{event.type}</span>
                    <h6 className="mb-0 me-2 text-dark fw-bold">{event.title}</h6>
                    <p className="mb-0 mt-n1 text-dark" style={{fontSize: 16, fontWeight: '300'}}>{event.description}</p>
                  </div>
                  <div className='d-flex gap-3 mt-3'>
                  {userData && userData?.permissions[0]?.can_create_events == 1 && (
                    <div className='d-flex gap-3'>
                      <Button variant="primary" className='btn-purpule py-2 px-3 radius-8' onClick={() => handleShow(event)}>
                        View Details
                      </Button>
                      <Button variant="danger" className='btn-red py-2 px-3 radius-8' onClick={(e) => {
                          e.stopPropagation(); // Prevent the parent from receiving the click event
                          handleDelete(event.id);
                        }}>
                        Delete
                      </Button>
                    </div>
                  )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            ))
          )}
        </Row> */}

        <Modal show={showModalDetail} size="lg" centered onHide={() => setShowModalDetail(false)}>
          <Modal.Body>
            <div className={`media-grid position-relative media-grid-1 mt-0`}>
              <div className="media-item" >
                <div className="position-relative w-100 h-100" >
                  <img src={process.env.REACT_APP_BACKEND_BASE_URL +'/'+ selectedEventDetail?.main_image} alt='' />
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
              <p className="mb-0 mt-n1 text-dark" style={{fontSize: 16, fontWeight: '300'}}>{selectedEventDetail?.description}</p>
            </div>
            <div className='d-flex gap-3 mt-3'>
              <div className='event-card flex-grow-1 px-3 py-2 d-flex gap-3 align-items-center radius-10 bg-gray-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 9C11.0711 9 12.75 7.32107 12.75 5.25C12.75 3.17893 11.0711 1.5 9 1.5C6.92893 1.5 5.25 3.17893 5.25 5.25C5.25 7.32107 6.92893 9 9 9Z" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15.4436 16.5C15.4436 13.5975 12.5561 11.25 9.00109 11.25C5.44609 11.25 2.55859 13.5975 2.55859 16.5" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div className='d-flex flex-column gap-0'>
                  <h6 className="mb-0 text-gray">Organizer</h6>
                  <p className='mb-0 mt-n1'>{selectedEventDetail?.organizer?.name}</p>
                </div>
              </div>

              <div className='event-card flex-grow-1 px-3 py-2 d-flex gap-3 align-items-center radius-10 bg-gray-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 9C11.0711 9 12.75 7.32107 12.75 5.25C12.75 3.17893 11.0711 1.5 9 1.5C6.92893 1.5 5.25 3.17893 5.25 5.25C5.25 7.32107 6.92893 9 9 9Z" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15.4436 16.5C15.4436 13.5975 12.5561 11.25 9.00109 11.25C5.44609 11.25 2.55859 13.5975 2.55859 16.5" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div className='d-flex flex-column gap-0'>
                  <h6 className="mb-0 text-gray">Date</h6>
                  <p className='mb-0 mt-n1'>{moment(selectedEventDetail?.event_date).format('DD MMMM')}</p>
                </div>
              </div>

              <div className='event-card flex-grow-1 px-3 py-2 d-flex gap-3 align-items-center radius-10 bg-gray-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 9C11.0711 9 12.75 7.32107 12.75 5.25C12.75 3.17893 11.0711 1.5 9 1.5C6.92893 1.5 5.25 3.17893 5.25 5.25C5.25 7.32107 6.92893 9 9 9Z" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15.4436 16.5C15.4436 13.5975 12.5561 11.25 9.00109 11.25C5.44609 11.25 2.55859 13.5975 2.55859 16.5" stroke="#292D32" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
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
        
        {/* <Row>
          {events.length < 1 ? (
            <Col sm={12}>
              <NoDataFound 
                message={userData?.roles === "admin" ? "No events found. Click 'Add New Event' to create one!" : "No upcoming events at the moment."}
                containerClassName="text-center py-5"
              />
            </Col>
          ) : (
            events.map((event) => (
              <div>
             <Col xs={4} key={event.id} className="mb-4" onClick={() => handleShow(event)}>
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
                     
                     {userData && userData?.permissions[0]?.can_create_events == 1 && (
                       <div className="mt-3">
                         <Button
                           variant="outline-primary"
                           size="sm"
                           className="me-2"
                           onClick={() => handleShow(event)} // Use handleShow
                         >
                           View Details
                         </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent the parent from receiving the click event
                              handleDelete(event.id);
                            }}
                          >
                            Delete
                          </Button>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             </Col>
             <Modal show={showDiscardModal} onHide={() => setShowDiscardModal(false)} centered>
    <Modal.Header closeButton>
        <Modal.Title>Discard Changes?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        You have unsaved changes. Are you sure you want to discard them?
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDiscardModal(false)}>
            Cancel
        </Button>
        <Button variant="danger" onClick={() => setShowModal(false)}>
            Discard Changes
        </Button>
    </Modal.Footer>
</Modal>

             <Modal show={showModalDetail} onHide={() => setShowModalDetail(false)}>
               <Modal.Header closeButton>
                 <Modal.Title>{selectedEventDetail?.title}</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                <img src={process.env.REACT_APP_BACKEND_BASE_URL +'/'+ selectedEventDetail?.main_image} alt={selectedEventDetail?.title} width="100%" />
                <br></br><br></br>
                 <p><strong>Short Description:</strong> {selectedEventDetail?.subtitle}</p>
                 <p dangerouslySetInnerHTML={{ __html: selectedEventDetail?.description }} />
                 <p><strong>Event Date:</strong> {moment(selectedEventDetail?.event_date).format('DD MMMM')}</p>
                 <p><strong>Start Time:</strong> {moment(selectedEventDetail?.start_time).format('hh:mm A')}</p>
                 <p><strong>End Time:</strong> {moment(selectedEventDetail?.end_time).format('hh:mm A')}</p>
                 <p><strong>Event Type:</strong> {selectedEventDetail?.type}</p>
                 <p><strong>Organizer:</strong> {selectedEventDetail?.organizer?.name}</p>
               </Modal.Body>
               <Modal.Footer>
                 <Button variant="secondary" onClick={() => setShowModalDetail(false)}>
                   Close
                 </Button>
               </Modal.Footer>
             </Modal>
             </div>
            ))
          )}
        </Row> */}
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

      <Modal show={showModal} onHide={() => handleModalClose()} size="lg">
        <Modal.Header className="d-flex justify-content-between px-3 py-2">
          <Modal.Title className="d-flex align-items-center hover-bg mx-auto">
            <div className="d-flex align-items-center flex-grow-1">
              {selectedEvent ? 'Edit Event' : 'Create New Event'}
            </div>
          </Modal.Title>
          <Link to="#" className="lh-1" onClick={() => setShowModal(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="0.21875" y="0.21875" width="27.5625" height="27.5625" rx="13.7812" stroke="#CCCCCC" stroke-width="0.4375"/>
              <path d="M10.6982 17.3016L17.3016 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.3016 17.3016L10.6982 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Link>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group className="mb-3">
              <Form.Label>Banner Image</Form.Label>
              <div className="profile-header" style={{
                backgroundImage: `url(${croppedGETImageBlob ? URL.createObjectURL(croppedGETImageBlob) : process.env.REACT_APP_BACKEND_BASE_URL +'/'+ selectedEvent?.banner_image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '0.25rem',
                padding: '7rem',
                position: 'relative',
                marginBottom: '2rem'
              }}>
                <div className="position-relative">
                    
                    <div className="upload-background-button" style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
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
                        <label htmlFor="background-upload" className="btn btn-primary btn-sm">
                            <svg width="14" height="14" viewBox="0 0 24 24" className="me-2">
                                <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                            </svg>
                            Add Banner Image
                        </label>
                    </div>
                </div>
              </div>
            </Form.Group> */}

            {/* <Form.Group>
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
                    className="border rounded p-2 position-absolute bg-white shadow"
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
            </Form.Group> */}

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
              <Form.Control
                as="textarea"
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className='radius-8'
                placeholder='Write here...'
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

            <Row>
              <Col sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleInputChange}
                    required
                    className='radius-8'
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleInputChange}
                    placeholder="Set Start Time"
                    className='radius-8'
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleInputChange}
                    placeholder="Set End Time"
                    className='radius-8'
                  />
                </Form.Group>
                <Form.Group className="mb-3">
              <Form.Label>Attachments (optional)</Form.Label>
              <Form.Control
                type="file"
                name="media"
                multiple
                onChange={handleInputChange}
                accept="*/*"
                className='radius-8'
              />
            </Form.Group>
              </Col>
            </Row>

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

            <div className="text-end">
              <Button variant="primary" type="submit" className="radius-8 btn-purpule w-100">
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
