import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Button, Modal, Form, Card, Row, Col } from "react-bootstrap";
import axios from '../utils/axios';
import { UserContext } from '../context/UserContext';
import { getProfileImageUrl } from '../utils/helpers';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import CreateJob from './job/CreateJob';
import toast from 'react-hot-toast';

//images
import user1 from "../assets/images/user/1.jpg";
import img1 from "../assets/images/icon/02.png";
import img2 from "../assets/images/icon/02.png";
import img3 from "../assets/images/icon/03.png";

const CreatePost = ({ posts, setPosts, userCanCreatePostCategories, className }) => {
  const { userData } = useContext(UserContext);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({ images: [], videos: [], documents: [] });
  const [previews, setPreviews] = useState({ images: [], videos: [], documents: [] });
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    images: [],
    videos: [],
    documents: [],
    visibility: 'public'
  });
  const [showEventModal, setShowEventModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    event_date: '',
    start_time: '',
    end_time: '',
    type: 'conference',
    is_active: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Set default category based on URL
    const path = location.pathname;
    let defaultCategoryId = '';

    if (path.includes('/business')) {
      defaultCategoryId = '1';
    } else if (path.includes('/fitness')) {
      defaultCategoryId = '2';
    } else if (path.includes('/crypto')) {
      defaultCategoryId = '3';
    } else if (path.includes('/mindset')) {
      defaultCategoryId = '4';
    }

    if (defaultCategoryId) {
      setFormData(prev => ({
        ...prev,
        category_id: defaultCategoryId
      }));
    }
  }, [location.pathname]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      const filteredCategories = response.data.filter((item) =>
        userCanCreatePostCategories?.includes(item.id)
      );
      setCategories(filteredCategories); // Set the filtered categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setSelectedFiles({ images: [], videos: [], documents: [] });
    setPreviews({ images: [], videos: [], documents: [] });
    setContent('');
    setFormData({
      title: '',
      description: '',
      category_id: '',
      images: [],
      videos: [],
      documents: [],
      visibility: 'public'
    });
  };

  const handleShow = () => {
    if (!userData || userCanCreatePostCategories?.includes(1, 2, 3, 4, 5)) {
      Swal.fire({
        title: 'Authentication Required',
        text: 'Only Admin can create posts',
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
    setShow(true);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];
    const newVideos = [];
    const newDocuments = [];
    const imagePreviewUrls = [];
    const videoPreviewUrls = [];
    const documentPreviewUrls = [];

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        newImages.push(file);
        imagePreviewUrls.push(URL.createObjectURL(file));
      } else if (file.type.startsWith('video/')) {
        newVideos.push(file);
        videoPreviewUrls.push(URL.createObjectURL(file));
      } else if (
        file.type === 'application/pdf' ||
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-powerpoint' ||
        file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
        file.type === 'text/plain'
      ) {
        newDocuments.push(file);
        documentPreviewUrls.push(file.name); // Just store the filename for documents
      }
    });

    setSelectedFiles({
      images: [...selectedFiles.images, ...newImages],
      videos: [...selectedFiles.videos, ...newVideos],
      documents: [...selectedFiles.documents, ...newDocuments]
    });

    setPreviews({
      images: [...previews.images, ...imagePreviewUrls],
      videos: [...previews.videos, ...videoPreviewUrls],
      documents: [...previews.documents, ...documentPreviewUrls]
    });

    setFormData({
      ...formData,
      images: [...formData.images, ...newImages],
      videos: [...formData.videos, ...newVideos],
      documents: [...formData.documents, ...newDocuments]
    });
  };

  const removeFile = (type, index) => {
    const newFiles = { ...selectedFiles };
    const newPreviews = { ...previews };
    const newFormData = { ...formData };

    if (type === 'images' || type === 'videos') {
      URL.revokeObjectURL(newPreviews[type][index]);
    }
    newFiles[type].splice(index, 1);
    newPreviews[type].splice(index, 1);
    newFormData[type].splice(index, 1);

    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
    setFormData(newFormData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newFormData = {
      ...formData,
      content: content
    };

    try {
      const response = await axios.post('/api/posts', newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      // Check if we have a valid response with the post data
      if (response.data && response.data.post) {
        toast.success('Post created successfully!');
        setShow(false);
        setContent('');
        setSelectedFiles({ images: [], videos: [], documents: [] });
        setPreviews({ images: [], videos: [], documents: [] });
        setFormData({
          title: '',
          description: '',
          category_id: '',
          images: [],
          videos: [],
          documents: [],
          visibility: 'public'
        });
        setPosts(prevPosts => [response.data.post, ...prevPosts]);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error.response?.data?.message || 'Something went wrong while creating the post!');
      setShow(false);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleVisibilityChange = (visibility) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     visibility: visibility || formData.visibility === 'public' ? 'private' : 'public'
  //   }));
  // };

  const handleVisibilityChange = (visibility) => {
    setFormData((prev) => ({
      ...prev,
      visibility: visibility || prev.visibility, // If no value, keep previous value
    }));
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/events', eventFormData);
      toast.success('Event created successfully!');
      setShowEventModal(false);
      setEventFormData({
        title: '',
        subtitle: '',
        description: '',
        event_date: '',
        start_time: '',
        end_time: '',
        type: 'conference',
        is_active: true
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEventDescriptionChange = (value) => {
    setEventFormData(prev => ({
      ...prev,
      description: value
    }));
  };

  useEffect(() => {
    if (!formData.visibility) {
      setFormData((prev) => ({
        ...prev,
        visibility: prev.visibility === "public" ? "private" : "public",
      }));
    }
  }, [formData.visibility]);

  const [colorPanel, setColorPanel] = useState(false);

  const modalClose = {
    fontSize: '18px', background: '#bbb', padding: '3px',
  }
  const postViewChanger = {
    height: 'fit-content', minWidth: 'fit-content', maxWidth: '100px',
  }
  const postViewIcon = {
    fontSize: '16px'
  }
  const uploadBtn = {
    width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center',
    border: '2px solid #dddddd', background: '#fff', borderRadius: '8px',
    fontSize: '28px'
  }
  const imageView = {
    width: "80px", height: "80px", objectFit: "cover", border: '2px solid #dddddd', borderRadius: '8px'
  }
  const videoView = {
    width: "80px", height: "80px", border: '2px solid #dddddd', borderRadius: '8px'
  }
  const uploadIcon = {
    color: '#d3d3d3', fontSize: '28px'
  }
  const docVeiw = {
    width: '80px', height: '80px', border: '2px solid #dddddd',
    display: 'flex', flexDirection: 'column', gap: '4px',
    justifyContent: 'center', alignItems: 'center'
  }

  const rubyText = {
    display: 'ruby-text',
  }

  const ex = (index) => {
    return index.split('.').pop();
  }

  const [selectedStyle, setSelectedStyle] = useState(null);
  const quillRef = useRef(null);

  const styles = [
    {
      color: "#ff6b6b",
      textColor: "#fff",
    },
    {
      color: "#48dbfb",
      textColor: "#000",
    },
    {
      color: "#1dd1a1",
      textColor: "#fff",
    },
    {
      color: "#feca57",
      textColor: "#000",
    },
    {
      color: "#222f3e",
      textColor: "#fff",
    },
    {
      color: "linear-gradient(to right, #ff9a9e, #fad0c4)",
      textColor: "#000",
    },
  ];

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (selectedStyle) {
        editor.root.style.background = selectedStyle.color;
        editor.root.style.color = selectedStyle.textColor;
        editor.root.style.fontSize = "18px";
        editor.root.style.textAlign = "center";
        editor.root.style.minHeight = "250px";
        editor.root.style.padding = "30px 20px";
      } else {
        // Reset styles smoothly
        editor.root.style.background = "";
        editor.root.style.color = "";
        editor.root.style.fontSize = "";
        editor.root.style.textAlign = "";
        editor.root.style.minHeight = "";
        editor.root.style.padding = "";
      }
    }
  }, [selectedStyle]);

  const handleStyleClick = (style) => {
    setSelectedStyle(selectedStyle === style ? null : style);
  };

  // Reset all styles
  const resetStyles = () => {
    setSelectedStyle(null);
  };

  return (
    <>
      <Card className={className}>
        {/* <Card.Header className="d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Create Post</h4>
          </div>
        </Card.Header> */}
        <Card.Body>
          <div className="d-flex align-items-center">
            <div className="user-img">
              <img
                src={getProfileImageUrl(userData)}
                alt="userimg"
                className="avatar-60 rounded-circle"
              />
            </div>
            <div className="post-text ms-3 w-100" onClick={handleShow}>
              <input
                type="text"
                className="form-control create-post-form-cntrl "
                placeholder="Let's Post Something..."
                style={{ cursor: "pointer" }}
                readOnly
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between create-post-icons-main">

            <div className="d-flex align-items-center photo-with-icon">
              <span class="material-symbols-outlined">
                photo_library
              </span>
              <span>Photo/video</span>
            </div>
            <div 
              className="d-flex align-items-center event-with-icon" 
              onClick={() => setShowEventModal(true)}
              style={{ cursor: 'pointer' }}
            >
              <span className="material-symbols-outlined">
                event
              </span>
              <span>Events</span>
            </div>
            <div 
              className="d-flex align-items-center jobs-with-icon"
              onClick={() => setShowJobModal(true)}
              style={{ cursor: 'pointer' }}
            >
              <span className="material-symbols-outlined">
                work
              </span>
              <span>Jobs</span>
            </div>
          </div>
          {/* <hr />
          <ul className="post-opt-block d-flex list-inline m-0 p-0">
            <li className="me-3 mb-md-0 mb-2">
              <Link to="#" className="btn btn-soft-primary">
                <img src={img1} alt="icon" className="img-fluid me-2" /> Photo/Video
              </Link>
            </li>
            <li className="me-3 mb-md-0 mb-2">
              <Link to="#" className="btn btn-soft-primary">
                <img src={img2} alt="icon" className="img-fluid me-2" /> Tag Friend
              </Link>
            </li>
            <li className="me-3">
              <Link to="#" className="btn btn-soft-primary">
                <img src={img3} alt="icon" className="img-fluid me-2" /> Feeling/Activity
              </Link>
            </li>
          </ul> */}
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header className="d-flex justify-content-between p-3">

          <Modal.Title className="d-flex align-items-center hover-bg mx-auto">
            <div className="d-flex align-items-center flex-grow-1">
              {/* <img src={getProfileImageUrl(userData)} alt="user1" className="avatar-60 rounded-circle me-3" /> */}
              {/* <h2 className="mb-0 me-2">{userData?.name}</h2> */}
              {/* <span className={`badge ${formData.visibility === 'public' ? 'bg-success' : 'bg-danger'}`}>{formData.visibility.charAt(0).toUpperCase() + formData.visibility.slice(1)}</span> */}
              <h2 className="fs-16 fw-700 mb-0">Create Post</h2>
              {/* <Dropdown className="ms-2">
                <Dropdown.Toggle variant="link" className="p-0">
                  <span className="material-symbols-outlined">arrow_drop_down</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleVisibilityChange('public')}>Public</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleVisibilityChange('private')}>Private</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
            </div>
          </Modal.Title>
          <Link to="#" className="lh-1" onClick={handleClose}>
            <span className="material-symbols-outlined text-dark rounded-4" style={modalClose}>close</span>
          </Link>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex w-100 gap-2 align-items-center mb-3">
            <img src={getProfileImageUrl(userData)} alt="user1" className="avatar-40 rounded-circle" />
            <div className="d-flex flex-column gap-0">
              <h5 className="mb-0">{userData?.name}</h5>
              <div className="d-flex align-items-center">
                <Dropdown className="">
                  <Dropdown.Toggle variant="link" className="p-0" style={postViewChanger}>
                    <span
                      className={`badge py-0 px-4 d-flex gap-2 justify-content-center align-items-center ${formData.visibility === "public" ? "bg-primary" : "bg-danger"
                        }`}
                      style={{ cursor: "pointer" }}

                    >
                      <span className="material-symbols-outlined" style={postViewIcon}>
                        {formData.visibility === "public" ? "people" : "person"}
                      </span>
                      {formData.visibility.charAt(0).toUpperCase() + formData.visibility.slice(1)}
                      <span className="material-symbols-outlined text-white" style={postViewIcon}>arrow_drop_down</span>
                    </span>

                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleVisibilityChange("public")}>
                      Public
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleVisibilityChange("private")}>
                      Private
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <br />
            <div className="d-flex gap-1 overflow-auto">
              {categories.map(category => (
                <div className={`py-1 px-2 text-white rounded border ${category.id.toString() === formData.category_id ? 'bg-primary-2' : 'bg-primary'}`}>
                  <input
                    type="radio"
                    key={category.id}
                    value={category.id}
                    checked={category.id.toString() === formData.category_id}
                    id={category.id}
                    style={{ display: 'none' }}
                    name="category_id"
                    onChange={handleInputChange}
                    required
                  />
                  <label for={category.id}>{category.name.split(" ")[0]}</label>
                </div>
              ))}
            </div>
          </Form.Group>
          <div className="mb-3">

            <ReactQuill
              placeholder="Write something here..."
              value={content}
              onChange={setContent}
              ref={quillRef}
              style={{

              }}
            />
          </div>

          <div className="position-relative">
            <div className="d-flex gap-2">
              <span className="border rounded bg-gradient color-plate" onClick={() => { setColorPanel(!colorPanel); resetStyles() }}>
                <span class="material-symbols-outlined">
                  {colorPanel ? "block" : ""}                  
                </span>
              </span>
              <div className={`${colorPanel ? "d-flex" : "d-none"} gap-2 color-panel`}>
                {styles.map((style, index) => (<span className={`border rounded color-plate`} style={{ background: style.color }} key={index} title="Click to Apply" onClick={() => handleStyleClick(style)}></span>))}
              </div>
            </div>
          </div>

          {/* <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option
                  key={category.id}
                  value={category.id}
                  selected={category.id.toString() == formData.category_id}
                >
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group> */}

          {/* File upload section */}
          {/* <div className="file-upload-section">
            <input
              type="file"
              multiple
              hidden
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            />
            <Button
              variant="outline-primary"
              className="me-2"
              onClick={() => fileInputRef.current.click()}
            >
              <i className="material-icons me-1">attach_file</i>
              Add Files
            </Button>
          </div> */}

          {/* Preview section */}
          {/* {Object.entries(previews).map(([type, files]) => (
            // files.length > 0
            true && (
              <div key={type} className="preview-section mt-3">
                <h6 className="mb-2">{type.charAt(0).toUpperCase() + type.slice(1)}</h6>
                <div className="d-flex flex-wrap gap-2">
                  {files.map((preview, index) => (
                    <div key={index} className="position-relative">
                      {type === 'images' && (
                        <img src={preview} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                      )}
                      {type === 'videos' && (
                        <video width="100" height="100" controls>
                          <source src={preview} />
                        </video>
                      )}
                      {type === 'documents' && (
                        <div className="document-preview">
                          <i className="material-icons">description</i>
                          <span>{selectedFiles[type][index].name}</span>
                        </div>
                      )}
                      <button
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        onClick={() => removeFile(type, index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))} */}
          {Object.entries(previews).some(([_, files]) => true) && (
            <div className="preview-section mt-3">
              <h6 className="mb-2">Attachments</h6>
              <div className="d-flex gap-2 overflow-auto">
                <div className="position-relative">
                  <div className="file-upload-section">
                    <input
                      type="file"
                      multiple
                      hidden
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                    />
                    <Button
                      className=""
                      onClick={() => fileInputRef.current.click()}
                      style={uploadBtn}
                    >
                      <span class="material-symbols-outlined" style={uploadIcon}>
                        cloud_upload
                      </span>
                    </Button>
                  </div>
                </div>
                {Object.entries(previews).flatMap(([type, files]) =>
                  files.map((preview, index) => (
                    <div key={`${type}-${index}`} className="position-relative">
                      {/* Render Images */}
                      {type === "images" && (
                        <img src={preview} alt="" style={imageView} />
                      )}

                      {/* Render Videos */}
                      {type === "videos" && (
                        <video style={videoView} controls>
                          <source src={preview} />
                        </video>
                      )}

                      {/* Render Documents */}
                      {type === "documents" && (
                        <div className="document-preview" style={docVeiw}>
                          <span class="material-symbols-outlined" style={uploadIcon}>
                            {
                              ex(selectedFiles[type][index].name) === 'pdf' ?
                                'picture_as_pdf' :
                                ex(selectedFiles[type][index].name) === 'doc' || ex(selectedFiles[type][index].name) === 'docx' ?
                                  'docs' :
                                  ex(selectedFiles[type][index].name) === 'xls' || ex(selectedFiles[type][index].name) === 'xlsx' ?
                                    'table' :
                                    ex(selectedFiles[type][index].name) === 'ppt' || ex(selectedFiles[type][index].name) === 'pptx' ?
                                      'jamboard_kiosk' : 'description'
                            }
                          </span>
                          {/* <span>{selectedFiles[type][index].name}</span> */}
                        </div>
                      )}

                      {/* Remove Button */}
                      <button
                        className="btn position-absolute top-0 end-0" style={{ padding: '1px 5px 0px', background: '#d31717', borderRadius: '20px' }}
                        onClick={() => removeFile(type, index)}
                      >
                        <span class="material-symbols-outlined" style={{ fontSize: '12px' }}>
                          close
                        </span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <Button
            variant="primary"
            onClick={handleSubmit}
            className="mt-3 w-100"
            disabled={isLoading || !formData.category_id || (!content.trim() && !Object.values(selectedFiles).some(files => files.length > 0))}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                Posting...
              </>
            ) : 'Post'}
          </Button>

        </Modal.Body>
      </Modal>

      {/* Event Modal */}
      <Modal show={showEventModal} onHide={() => setShowEventModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEventSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={eventFormData.title}
                onChange={handleEventInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                type="text"
                name="subtitle"
                value={eventFormData.subtitle}
                onChange={handleEventInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <ReactQuill
                theme="snow"
                value={eventFormData.description}
                onChange={handleEventDescriptionChange}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image'],
                    ['clean']
                  ],
                }}
                style={{ height: '200px', marginBottom: '50px' }}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="event_date"
                    value={eventFormData.event_date}
                    onChange={handleEventInputChange}
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
                    value={eventFormData.start_time}
                    onChange={handleEventInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="end_time"
                    value={eventFormData.end_time}
                    onChange={handleEventInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={eventFormData.type}
                onChange={handleEventInputChange}
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
                checked={eventFormData.is_active}
                onChange={handleEventInputChange}
              />
            </Form.Group>

            <div className="text-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowEventModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating...
                  </>
                ) : 'Create Event'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Job Modal */}
      <CreateJob 
        show={showJobModal} 
        onHide={() => setShowJobModal(false)}
        onJobCreated={() => {
          setShowJobModal(false);
          toast.success('Job created successfully!');
        }}
      />
    </>
  );
};
export default CreatePost;