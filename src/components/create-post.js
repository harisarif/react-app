import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Button, Modal, Form, Card } from "react-bootstrap";
import axios from '../utils/axios';
import { UserContext } from '../context/UserContext';
import { getProfileImageUrl } from '../utils/helpers';
import Swal from 'sweetalert2';

//images
import user1 from "../assets/images/user/1.jpg";
import img1 from "../assets/images/icon/02.png";
import img2 from "../assets/images/icon/02.png";
import img3 from "../assets/images/icon/03.png";

const CreatePost = ({ posts, setPosts,userCanCreatePostCategories, className }) => {
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
    documents: []
  });
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
      documents: []
    });
  };

  const handleShow = () => {
    if (!userData || userCanCreatePostCategories?.includes(1,2,3,4,5) ) {
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
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message || 'Post created successfully',
          timer: 1500,
          showConfirmButton: false
        });

        // Reset form
        setContent('');
        setSelectedFiles({ images: [], videos: [], documents: [] });
        setPreviews({ images: [], videos: [], documents: [] });
        setFormData({
          title: '',
          description: '',
          category_id: '',
          images: [],
          videos: [],
          documents: []
        });
        setShow(false);

        // Notify parent component about the new post
        setPosts(prevPosts => [response.data.post, ...prevPosts]);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message || 'Something went wrong while creating the post!',
      });
      setShow(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className={className}>
        <Card.Header className="d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Create Post</h4>
          </div>
        </Card.Header>
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
                className="form-control rounded"
                placeholder="Write something here..."
                style={{ cursor: "pointer" }}
                readOnly
              />
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

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title>Create Post</Modal.Title>
          <Link to="#" className="lh-1" onClick={handleClose}>
            <span className="material-symbols-outlined">close</span>
          </Link>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center mb-3">
            <img src={getProfileImageUrl(userData)} alt="user1" className="avatar-60 rounded-circle me-3" />
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write something here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <Form.Group className="mb-3">
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
          </Form.Group>
          
          {/* File upload section */}
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
              variant="outline-primary" 
              className="me-2"
              onClick={() => fileInputRef.current.click()}
            >
              <i className="material-icons me-1">attach_file</i>
              Add Files
            </Button>
          </div>

          {/* Preview section */}
          {Object.entries(previews).map(([type, files]) => (
            files.length > 0 && (
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
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={isLoading || !formData.category_id || (!content.trim() && !Object.values(selectedFiles).some(files => files.length > 0))}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                Posting...
              </>
            ) : 'Post'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreatePost;
