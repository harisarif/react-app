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
            <h3 className="modal-title text-dark">
              Job Deatil
            </h3>
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
          <Card className="h-100 job-list-card">
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
                className="ql-editor"
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
