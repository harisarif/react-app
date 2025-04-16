import React, { useState, useEffect } from 'react';
import { Col, Modal, Row, Form, Button, Card, Container } from "react-bootstrap";
import axios from '../utils/axios';
import Swal from 'sweetalert2';
// img
import embed from "../assets/images/icon/embed.png";
import whatsapp from "../assets/images/icon/whatsapp.png";
import facebook from "../assets/images/icon/facebook.png";
import twitter from "../assets/images/icon/twitter.png";
import pinterest from "../assets/images/icon/pinterest.png";
import linkdin from "../assets/images/icon/linkedin.png";

import { Link } from "react-router-dom";
import { getProfileImageUrl } from "../utils/helpers";

import avatar from "../assets/images/logo-white.png";

const ViewJobDetailModal = ({ id,show, onHide }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseurl = process.env.REACT_APP_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/jobs/${id}`);
        if (response.data && response.data.job) {
          setJob(response.data.job);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

const [formData, setFormData] = useState({
  job_id:id,
  first_name: '',
  last_name: '',
  email: '',
  country: '',
  company: '',
  job_title: '',
  cv: null, // New field for CV upload
});
  const [submitLoading, setSubmitLoading] = useState(false)

const handleInputChange = (e) => {
  const { name, value, files } = e.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: files ? files[0] : value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitLoading(true);

  // Create FormData for file upload
  const formDataToSubmit = new FormData();
  Object.keys(formData).forEach(key => {
    if (formData[key] !== null && formData[key] !== '') {
      formDataToSubmit.append(key, formData[key]);
    }
  });

  try {
    const response = await axios.post('/api/job-application', formDataToSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Job application submitted successfully!',
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to submit job application',
    });
  } finally {
    window.location.href = '/job-list';
    setSubmitLoading(false);
  }
};

  if (loading) {
    return (
      <div className="content-inner">
        <Container className="custom-conatiner">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="content-inner">
        <Container className="custom-conatiner">
          <div className="text-center py-5">
            <h3>Job not found</h3>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="job-detail-view-modal"
      >
        <Modal.Header className="border-0">
          <Modal.Title  id="contained-modal-title-vcenter"  className="d-flex justify-content-between w-100">
            <div>
            {/* <h3 className="modal-title text-dark">
              Job Deatil
            </h3> */}
            <svg width="145" height="24" viewBox="0 0 145 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.67733 9.50001L7.88976 20.2602C9.81426 23.5936 14.6255 23.5936 16.55 20.2602L22.7624 9.5C24.6869 6.16666 22.2813 2 18.4323 2H6.00746C2.15845 2 -0.247164 6.16668 1.67733 9.50001ZM14.818 19.2602C13.6633 21.2602 10.7765 21.2602 9.62181 19.2602L9.46165 18.9828L9.46597 18.7275C9.48329 17.7026 9.76288 16.6993 10.2781 15.8131L12.0767 12.7195L14.1092 16.2155C14.4957 16.8803 14.7508 17.6132 14.8607 18.3743L14.9544 19.0239L14.818 19.2602ZM16.4299 16.4683L19.3673 11.3806C18.7773 11.5172 18.172 11.5868 17.5629 11.5868H13.7316L15.8382 15.2102C16.0721 15.6125 16.2699 16.0335 16.4299 16.4683ZM20.9542 8.63193L21.0304 8.5C22.1851 6.5 20.7417 4 18.4323 4H17.8353L17.1846 4.56727C16.6902 4.99824 16.2698 5.50736 15.9402 6.07437L13.8981 9.58676H17.5629C18.4271 9.58676 19.281 9.40011 20.0663 9.03957L20.9542 8.63193ZM14.9554 4C14.6791 4.33499 14.4301 4.69248 14.2111 5.06912L12.0767 8.74038L10.0324 5.22419C9.77912 4.78855 9.48582 4.37881 9.15689 4H14.9554ZM6.15405 4H6.00746C3.69806 4 2.25468 6.50001 3.40938 8.50001L3.4915 8.64223L4.37838 9.04644C5.15962 9.40251 6.00817 9.58676 6.86672 9.58676H10.2553L8.30338 6.22943C7.9234 5.57587 7.42333 5.00001 6.8295 4.53215L6.15405 4ZM5.07407 11.3833L7.88909 16.2591C8.05955 15.7565 8.28025 15.2702 8.54905 14.8079L10.4218 11.5868H6.86672C6.26169 11.5868 5.66037 11.5181 5.07407 11.3833Z" fill="#9146FF"/>
<path d="M37.4382 19V5.90909H45.6456V7.60938H39.4134V11.598H45.2173V13.2919H39.4134V17.2997H45.7223V19H37.4382ZM54.7591 22.6818V17.4723H54.644C54.5289 17.6811 54.3627 17.9197 54.1454 18.1882C53.9324 18.4567 53.6383 18.6911 53.2633 18.8913C52.8883 19.0916 52.4025 19.1918 51.8059 19.1918C51.0133 19.1918 50.3059 18.9893 49.6838 18.5845C49.0659 18.1754 48.5801 17.5937 48.2264 16.8395C47.877 16.081 47.7022 15.1712 47.7022 14.1101C47.7022 13.049 47.8791 12.1413 48.2328 11.3871C48.5907 10.6328 49.0808 10.0554 49.7029 9.65483C50.3251 9.25426 51.0304 9.05398 51.8187 9.05398C52.4281 9.05398 52.9181 9.15625 53.2889 9.3608C53.6639 9.56108 53.9537 9.79545 54.1582 10.0639C54.367 10.3324 54.5289 10.5689 54.644 10.7734H54.8038V9.18182H56.6703V22.6818H54.7591ZM52.2278 17.5618C52.7775 17.5618 53.242 17.4169 53.6213 17.1271C54.0048 16.8331 54.2946 16.4261 54.4906 15.9062C54.6909 15.3864 54.791 14.7812 54.791 14.0909C54.791 13.4091 54.693 12.8125 54.497 12.3011C54.301 11.7898 54.0133 11.3913 53.6341 11.1058C53.2548 10.8203 52.786 10.6776 52.2278 10.6776C51.6525 10.6776 51.1731 10.8267 50.7896 11.125C50.4061 11.4233 50.1163 11.8303 49.9203 12.3459C49.7285 12.8615 49.6326 13.4432 49.6326 14.0909C49.6326 14.7472 49.7306 15.3374 49.9267 15.8615C50.1227 16.3857 50.4125 16.8011 50.796 17.108C51.1838 17.4105 51.661 17.5618 52.2278 17.5618ZM65.4593 14.9283V9.18182H67.377V19H65.4977V17.2997H65.3954C65.1696 17.8239 64.8074 18.2607 64.3088 18.6101C63.8145 18.9553 63.1987 19.1278 62.4615 19.1278C61.8308 19.1278 61.2725 18.9893 60.7868 18.7124C60.3052 18.4311 59.926 18.0156 59.649 17.4659C59.3762 16.9162 59.2399 16.2365 59.2399 15.4268V9.18182H61.1511V15.1967C61.1511 15.8658 61.3365 16.3984 61.7072 16.7947C62.0779 17.1911 62.5595 17.3892 63.1518 17.3892C63.5098 17.3892 63.8656 17.2997 64.2193 17.1207C64.5772 16.9418 64.8734 16.6712 65.1078 16.3089C65.3464 15.9467 65.4636 15.4865 65.4593 14.9283ZM69.945 19V9.18182H71.8562V19H69.945ZM70.9102 7.6669C70.5778 7.6669 70.2923 7.55611 70.0536 7.33452C69.8192 7.10866 69.7021 6.8402 69.7021 6.52912C69.7021 6.21378 69.8192 5.94531 70.0536 5.72372C70.2923 5.49787 70.5778 5.38494 70.9102 5.38494C71.2425 5.38494 71.5259 5.49787 71.7603 5.72372C71.9989 5.94531 72.1183 6.21378 72.1183 6.52912C72.1183 6.8402 71.9989 7.10866 71.7603 7.33452C71.5259 7.55611 71.2425 7.6669 70.9102 7.6669ZM79.0105 9.18182V10.7159H73.6475V9.18182H79.0105ZM75.0858 6.82955H76.997V16.1172C76.997 16.4879 77.0524 16.767 77.1632 16.9545C77.274 17.1378 77.4167 17.2635 77.5914 17.3317C77.7704 17.3956 77.9643 17.4276 78.1731 17.4276C78.3265 17.4276 78.4608 17.4169 78.5758 17.3956C78.6909 17.3743 78.7804 17.3572 78.8443 17.3445L79.1895 18.9233C79.0787 18.9659 78.921 19.0085 78.7164 19.0511C78.5119 19.098 78.2562 19.1236 77.9494 19.1278C77.4466 19.1364 76.9778 19.0469 76.5431 18.8594C76.1085 18.6719 75.7569 18.3821 75.4885 17.9901C75.22 17.598 75.0858 17.1058 75.0858 16.5135V6.82955ZM82.3327 22.6818C82.0472 22.6818 81.7873 22.6584 81.5529 22.6115C81.3185 22.5689 81.1438 22.522 81.0288 22.4709L81.489 20.9048C81.8384 20.9986 82.1495 21.0391 82.4222 21.0263C82.695 21.0135 82.9357 20.9112 83.1445 20.7195C83.3576 20.5277 83.5451 20.2145 83.707 19.7798L83.9435 19.1278L80.3512 9.18182H82.3967L84.8832 16.8011H84.9854L87.4719 9.18182H89.5238L85.4776 20.3104C85.2901 20.8217 85.0515 21.2543 84.7617 21.608C84.4719 21.9659 84.1268 22.2344 83.7262 22.4134C83.3256 22.5923 82.8612 22.6818 82.3327 22.6818ZM107.11 10.1662H105.116C105.039 9.74006 104.896 9.36506 104.687 9.04119C104.479 8.71733 104.223 8.44247 103.92 8.21662C103.618 7.99077 103.279 7.82031 102.904 7.70526C102.533 7.5902 102.139 7.53267 101.721 7.53267C100.967 7.53267 100.292 7.7223 99.6951 8.10156C99.1028 8.48082 98.6341 9.03693 98.2889 9.76989C97.948 10.5028 97.7775 11.3977 97.7775 12.4545C97.7775 13.5199 97.948 14.419 98.2889 15.152C98.6341 15.8849 99.1049 16.4389 99.7015 16.8139C100.298 17.1889 100.969 17.3764 101.715 17.3764C102.128 17.3764 102.52 17.321 102.891 17.2102C103.266 17.0952 103.605 16.9268 103.907 16.7053C104.21 16.4837 104.466 16.2131 104.675 15.8935C104.888 15.5696 105.035 15.1989 105.116 14.7812L107.11 14.7876C107.003 15.4311 106.797 16.0234 106.49 16.5646C106.187 17.1016 105.797 17.5661 105.32 17.9581C104.847 18.3459 104.306 18.6463 103.697 18.8594C103.087 19.0724 102.422 19.179 101.702 19.179C100.569 19.179 99.5588 18.9105 98.6724 18.3736C97.786 17.8324 97.0872 17.0589 96.5758 16.0533C96.0687 15.0476 95.8152 13.848 95.8152 12.4545C95.8152 11.0568 96.0708 9.85724 96.5822 8.85582C97.0936 7.85014 97.7924 7.07883 98.6788 6.5419C99.5652 6.00071 100.573 5.73011 101.702 5.73011C102.397 5.73011 103.045 5.83026 103.645 6.03054C104.251 6.22656 104.794 6.51633 105.275 6.89986C105.757 7.27912 106.155 7.74361 106.471 8.29332C106.786 8.83878 106.999 9.46307 107.11 10.1662ZM109.32 19V9.18182H111.231V19H109.32ZM110.285 7.6669C109.953 7.6669 109.667 7.55611 109.429 7.33452C109.194 7.10866 109.077 6.8402 109.077 6.52912C109.077 6.21378 109.194 5.94531 109.429 5.72372C109.667 5.49787 109.953 5.38494 110.285 5.38494C110.618 5.38494 110.901 5.49787 111.135 5.72372C111.374 5.94531 111.493 6.21378 111.493 6.52912C111.493 6.8402 111.374 7.10866 111.135 7.33452C110.901 7.55611 110.618 7.6669 110.285 7.6669ZM113.802 19V9.18182H115.65V10.7415H115.752C115.931 10.2131 116.246 9.79758 116.698 9.49503C117.154 9.18821 117.67 9.0348 118.245 9.0348C118.364 9.0348 118.505 9.03906 118.667 9.04759C118.833 9.05611 118.963 9.06676 119.057 9.07955V10.9077C118.98 10.8864 118.844 10.8629 118.648 10.8374C118.452 10.8075 118.256 10.7926 118.059 10.7926C117.608 10.7926 117.205 10.8885 116.851 11.0803C116.502 11.2678 116.225 11.5298 116.02 11.8665C115.816 12.1989 115.714 12.5781 115.714 13.0043V19H113.802ZM124.495 19.1982C123.544 19.1982 122.726 18.983 122.04 18.5526C121.358 18.1179 120.834 17.5192 120.468 16.7564C120.101 15.9936 119.918 15.12 119.918 14.1357C119.918 13.1385 120.105 12.2585 120.48 11.4957C120.855 10.7287 121.384 10.13 122.066 9.69957C122.748 9.26918 123.551 9.05398 124.475 9.05398C125.221 9.05398 125.886 9.19247 126.47 9.46946C127.054 9.74219 127.525 10.1257 127.882 10.62C128.245 11.1143 128.46 11.6918 128.528 12.3523H126.668C126.566 11.892 126.331 11.4957 125.965 11.1634C125.603 10.831 125.117 10.6648 124.507 10.6648C123.975 10.6648 123.508 10.8054 123.108 11.0866C122.711 11.3636 122.402 11.7599 122.181 12.2756C121.959 12.7869 121.848 13.392 121.848 14.0909C121.848 14.8068 121.957 15.4247 122.174 15.9446C122.392 16.4645 122.699 16.8672 123.095 17.1527C123.495 17.4382 123.966 17.581 124.507 17.581C124.87 17.581 125.198 17.5149 125.492 17.3828C125.79 17.2464 126.039 17.0526 126.24 16.8011C126.444 16.5497 126.587 16.2472 126.668 15.8935H128.528C128.46 16.5284 128.253 17.0952 127.908 17.5938C127.563 18.0923 127.1 18.4844 126.521 18.7699C125.946 19.0554 125.27 19.1982 124.495 19.1982ZM132.483 5.90909V19H130.572V5.90909H132.483ZM139.286 19.1982C138.319 19.1982 137.485 18.9915 136.787 18.5781C136.092 18.1605 135.555 17.5746 135.176 16.8203C134.801 16.0618 134.613 15.1733 134.613 14.1548C134.613 13.1491 134.801 12.2628 135.176 11.4957C135.555 10.7287 136.083 10.13 136.761 9.69957C137.443 9.26918 138.24 9.05398 139.152 9.05398C139.706 9.05398 140.243 9.1456 140.762 9.32884C141.282 9.51207 141.749 9.79972 142.162 10.1918C142.576 10.5838 142.902 11.093 143.14 11.7195C143.379 12.3416 143.498 13.098 143.498 13.9886V14.6662H135.694V13.2344H141.625C141.625 12.7315 141.523 12.2862 141.319 11.8984C141.114 11.5064 140.826 11.1974 140.456 10.9716C140.089 10.7457 139.659 10.6328 139.164 10.6328C138.627 10.6328 138.159 10.7649 137.758 11.0291C137.362 11.2891 137.055 11.63 136.838 12.0518C136.625 12.4695 136.518 12.9233 136.518 13.4134V14.532C136.518 15.1882 136.633 15.7464 136.863 16.2067C137.098 16.6669 137.424 17.0185 137.841 17.2614C138.259 17.5 138.747 17.6193 139.305 17.6193C139.667 17.6193 139.998 17.5682 140.296 17.4659C140.594 17.3594 140.852 17.2017 141.069 16.9929C141.287 16.7841 141.453 16.5263 141.568 16.2195L143.377 16.5455C143.232 17.0781 142.972 17.5447 142.597 17.9453C142.226 18.3416 141.76 18.6506 141.197 18.8722C140.639 19.0895 140.002 19.1982 139.286 19.1982Z" fill="#9146FF"/>
</svg>
<br/>
            <span className=''>Complete the form below to have a copy of our resource sent direct your inbox.</span>
            </div>
            <button  className="model-close-btn">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.21875" y="0.21875" width="27.5625" height="27.5625" rx="13.7812" stroke="#CCCCCC" stroke-width="0.4375" />
                <path d="M10.6992 17.3016L17.3026 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M17.3026 17.3016L10.6992 10.6982" stroke="#292D32" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-row gap-3">
          <Card className="h-100 job-list-card flex-column align-items-start">
            <div className="job-card-img">
              <img 
                               src={`${baseurl}/images/${job.main_image}`}
                               alt={job.title}
                className="card-img-top" 

                loading="lazy"
              />
            </div>
            <Card.Body className="">
              <h4 className="card-title turncate-2 text-black" style={{fontSize: 20, fontWeight: '600'}}>
                {job.title}
              </h4>
              <div 
                className="ql-editor p-0"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </Card.Body>
          </Card>
          <Card className="h-100 job-form">
          <form
              onSubmit={handleSubmit}
              className="mt-5"
              data-toggle="validator"
            >
              
              <div className="form-group text-start">
                <h6 htmlFor="email" className="form-label fw-bold">
                  First Name
                </h6>
                <input
                  id="first-name"
                  type="text"
                  name="first_name"
                  className="form-control mb-0"
                  placeholder="Enter  Your  First  Name"
                  required=""
                  autofocus=""
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group text-start">
                <h6 htmlFor="email" className="form-label fw-bold">
                  Last Name
                </h6>
                <input
                  id="last-name"
                  type="text"
                  name="last_name"
                  className="form-control mb-0"
                  placeholder="Enter Your Last Name"
                  required=""
                  autofocus=""
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group text-start">
                <h6 htmlFor="email" className="form-label fw-bold">
                  Email Address
                </h6>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control mb-0"
                  placeholder="user@example.com"
                  required=""
                  autofocus=""
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group text-start">
                <h6 htmlFor="email" className="form-label fw-bold">
                  Country
                </h6>
                <select name="country" className="form-select" id="country" value={formData.country} onChange={handleInputChange}>
                  <option value="">Select a country</option>
                  <option value="AF">Afghanistan</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                  <option value="AS">American Samoa</option>
                  <option value="AD">Andorra</option>
                  <option value="AO">Angola</option>
                  <option value="AI">Anguilla</option>
                  <option value="AQ">Antarctica</option>
                  <option value="AG">Antigua and Barbuda</option>
                  <option value="AR">Argentina</option>
                  <option value="AM">Armenia</option>
                  <option value="AW">Aruba</option>
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="AZ">Azerbaijan</option>
                  <option value="BS">Bahamas</option>
                  <option value="BH">Bahrain</option>
                  <option value="BD">Bangladesh</option>
                  <option value="BB">Barbados</option>
                  <option value="BY">Belarus</option>
                  <option value="BE">Belgium</option>
                  <option value="BZ">Belize</option>
                  <option value="BJ">Benin</option>
                  <option value="BM">Bermuda</option>
                  <option value="BT">Bhutan</option>
                  <option value="BO">Bolivia</option>
                  <option value="BA">Bosnia and Herzegovina</option>
                  <option value="BW">Botswana</option>
                  <option value="BR">Brazil</option>
                  <option value="BN">Brunei Darussalam</option>
                  <option value="BG">Bulgaria</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="BI">Burundi</option>
                  <option value="CV">Cabo Verde</option>
                  <option value="KH">Cambodia</option>
                  <option value="CM">Cameroon</option>
                  <option value="CA">Canada</option>
                  <option value="KY">Cayman Islands</option>
                  <option value="CF">Central African Republic</option>
                  <option value="TD">Chad</option>
                  <option value="CL">Chile</option>
                  <option value="CN">China</option>
                  <option value="CO">Colombia</option>
                  <option value="KM">Comoros</option>
                  <option value="CG">Congo</option>
                  <option value="CD">Congo, Democratic Republic of the</option>
                  <option value="CR">Costa Rica</option>
                  <option value="CI">Côte d'Ivoire</option>
                  <option value="HR">Croatia</option>
                  <option value="CU">Cuba</option>
                  <option value="CY">Cyprus</option>
                  <option value="CZ">Czechia</option>
                  <option value="DK">Denmark</option>
                  <option value="DJ">Djibouti</option>
                  <option value="DM">Dominica</option>
                  <option value="DO">Dominican Republic</option>
                  <option value="EC">Ecuador</option>
                  <option value="EG">Egypt</option>
                  <option value="SV">El Salvador</option>
                  <option value="GQ">Equatorial Guinea</option>
                  <option value="ER">Eritrea</option>
                  <option value="EE">Estonia</option>
                  <option value="SZ">Eswatini</option>
                  <option value="ET">Ethiopia</option>
                  <option value="FJ">Fiji</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option>
                  <option value="GA">Gabon</option>
                  <option value="GM">Gambia</option>
                  <option value="GE">Georgia</option>
                  <option value="DE">Germany</option>
                  <option value="GH">Ghana</option>
                  <option value="GR">Greece</option>
                  <option value="GD">Grenada</option>
                  <option value="GU">Guam</option>
                  <option value="GT">Guatemala</option>
                  <option value="GN">Guinea</option>
                  <option value="GW">Guinea-Bissau</option>
                  <option value="GY">Guyana</option>
                  <option value="HT">Haiti</option>
                  <option value="HN">Honduras</option>
                  <option value="HU">Hungary</option>
                  <option value="IS">Iceland</option>
                  <option value="IN">India</option>
                  <option value="ID">Indonesia</option>
                  <option value="IR">Iran</option>
                  <option value="IQ">Iraq</option>
                  <option value="IE">Ireland</option>
                  <option value="IL">Israel</option>
                  <option value="IT">Italy</option>
                  <option value="JM">Jamaica</option>
                  <option value="JP">Japan</option>
                  <option value="JO">Jordan</option>
                  <option value="KZ">Kazakhstan</option>
                  <option value="KE">Kenya</option>
                  <option value="KI">Kiribati</option>
                  <option value="KP">Korea (North)</option>
                  <option value="KR">Korea (South)</option>
                  <option value="KW">Kuwait</option>
                  <option value="KG">Kyrgyzstan</option>
                  <option value="LA">Lao People's Democratic Republic</option>
                  <option value="LV">Latvia</option>
                  <option value="LB">Lebanon</option>
                  <option value="LS">Lesotho</option>
                  <option value="LR">Liberia</option>
                  <option value="LY">Libya</option>
                  <option value="LI">Liechtenstein</option>
                  <option value="LT">Lithuania</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MG">Madagascar</option>
                  <option value="MW">Malawi</option>
                  <option value="MY">Malaysia</option>
                  <option value="MV">Maldives</option>
                  <option value="ML">Mali</option>
                  <option value="MT">Malta</option>
                  <option value="MH">Marshall Islands</option>
                  <option value="MR">Mauritania</option>
                  <option value="MU">Mauritius</option>
                  <option value="MX">Mexico</option>
                  <option value="FM">Micronesia (Federated States of)</option>
                  <option value="MD">Moldova</option>
                  <option value="MC">Monaco</option>
                  <option value="MN">Mongolia</option>
                  <option value="ME">Montenegro</option>
                  <option value="MA">Morocco</option>
                  <option value="MZ">Mozambique</option>
                  <option value="MM">Myanmar</option>
                  <option value="NA">Namibia</option>
                  <option value="NR">Nauru</option>
                  <option value="NP">Nepal</option>
                  <option value="NL">Netherlands</option>
                  <option value="NZ">New Zealand</option>
                  <option value="NI">Nicaragua</option>
                  <option value="NE">Niger</option>
                  <option value="NG">Nigeria</option>
                  <option value="NO">Norway</option>
                  <option value="OM">Oman</option>
                  <option value="PK">Pakistan</option>
                  <option value="PW">Palau</option>
                  <option value="PA">Panama</option>
                  <option value="PG">Papua New Guinea</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Peru</option>
                  <option value="PH">Philippines</option>
                  <option value="PL">Poland</option>
                  <option value="PT">Portugal</option>
                  <option value="QA">Qatar</option>
                  <option value="RO">Romania</option>
                  <option value="RU">Russia</option>
                  <option value="RW">Rwanda</option>
                  <option value="KN">Saint Kitts and Nevis</option>
                  <option value="LC">Saint Lucia</option>
                  <option value="VC">Saint Vincent and the Grenadines</option>
                  <option value="WS">Samoa</option>
                  <option value="SM">San Marino</option>
                  <option value="ST">Sao Tome and Principe</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="SN">Senegal</option>
                  <option value="RS">Serbia</option>
                  <option value="SC">Seychelles</option>
                  <option value="SL">Sierra Leone</option>
                  <option value="SG">Singapore</option>
                  <option value="SK">Slovakia</option>
                  <option value="SI">Slovenia</option>
                  <option value="SB">Solomon Islands</option>
                  <option value="SO">Somalia</option>
                  <option value="ZA">South Africa</option>
                  <option value="SS">South Sudan</option>
                  <option value="ES">Spain</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="SD">Sudan</option>
                  <option value="SR">Suriname</option>
                  <option value="SE">Sweden</option>
                  <option value="CH">Switzerland</option>
                  <option value="SY">Syrian Arab Republic</option>
                  <option value="TW">Taiwan</option>
                  <option value="TJ">Tajikistan</option>
                  <option value="TZ">Tanzania</option>
                  <option value="TH">Thailand</option>
                  <option value="TL">Timor-Leste</option>
                  <option value="TG">Togo</option>
                  <option value="TO">Tonga</option>
                  <option value="TT">Trinidad and Tobago</option>
                  <option value="TN">Tunisia</option>
                  <option value="TR">Turkey</option>
                  <option value="TM">Turkmenistan</option>
                  <option value="TV">Tuvalu</option>
                  <option value="UG">Uganda</option>
                  <option value="UA">Ukraine</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="UY">Uruguay</option>
                  <option value="UZ">Uzbekistan</option>
                  <option value="VU">Vanuatu</option>
                  <option value="VE">Venezuela</option>
                  <option value="VN">Vietnam</option>
                  <option value="YE">Yemen</option>
                  <option value="ZM">Zambia</option>
                  <option value="ZW">Zimbabwe</option>
                </select>
              </div>
              <div className="form-group text-start">
                <h6 htmlFor="email" className="form-label fw-bold">
                  Company
                </h6>
                <input
                  id="company"
                  type="text"
                  name="company"
                  className="form-control mb-0"
                  placeholder=""
                  required=""
                  autofocus=""
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group text-start">
  <h6 htmlFor="cv" className="form-label fw-bold">
    Upload CV (PDF only)
  </h6>
  <input
    id="cv"
    type="file"
    name="cv"
    accept=".pdf"
    className="form-control mb-0"
    onChange={handleInputChange}
    required
    aria-required="true"
  />
</div>
              <div className="form-group text-start">
                <h6 htmlFor="email" className="form-label fw-bold">
                  Job Title
                </h6>
                <input
                  id="job-title"
                  type="text"
                  name="job_title"
                  className="form-control mb-0"
                  placeholder=""
                  required=""
                  autofocus=""
                  value={formData.job_title}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-4 fw-semibold text-uppercase w-100"
                disabled={submitLoading}
              >
                {submitLoading ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting...
                  </div>
                ) : (
                  'Apply for job'
                )}
              </button>
            </form>
          </Card>      
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ViewJobDetailModal;
