import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import axios from '../../../utils/axios';
import Swal from 'sweetalert2';

const JobDetail = () => {
  const { id } = useParams();
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
    <div className="content-inner">
      <Container className="custom-conatiner">
<div className="row">
  <div className='col-12 col-md-7 col-lg-7 find-more-left-side'>
        <Card>
          <Card.Body>
            <div className="mb-4">
              <img
                src={`${baseurl}/images/${job.main_image}`}
                alt={job.title}
                className="img-fluid rounded w-100"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
            
            <div className="job-content">
              <h2 className="mb-3">{job.title}</h2>
              <p className="lead mb-4">{job.short_description}</p>
              <div 
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>
          </Card.Body>
        </Card>
        </div>
        <div className="col-12 col-md-5 col-lg-5 find-more-right-side">
          <div className="sign-in-from text-center">
            <a
              href=""
              className="d-inline-flex align-items-center justify-content-center gap-2"
            >
              <svg
                width={50}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.67733 9.50001L7.88976 20.2602C9.81426 23.5936 14.6255 23.5936 16.55 20.2602L22.7624 9.5C24.6869 6.16666 22.2813 2 18.4323 2H6.00746C2.15845 2 -0.247164 6.16668 1.67733 9.50001ZM14.818 19.2602C13.6633 21.2602 10.7765 21.2602 9.62181 19.2602L9.46165 18.9828L9.46597 18.7275C9.48329 17.7026 9.76288 16.6993 10.2781 15.8131L12.0767 12.7195L14.1092 16.2155C14.4957 16.8803 14.7508 17.6132 14.8607 18.3743L14.9544 19.0239L14.818 19.2602ZM16.4299 16.4683L19.3673 11.3806C18.7773 11.5172 18.172 11.5868 17.5629 11.5868H13.7316L15.8382 15.2102C16.0721 15.6125 16.2699 16.0335 16.4299 16.4683ZM20.9542 8.63193L21.0304 8.5C22.1851 6.5 20.7417 4 18.4323 4H17.8353L17.1846 4.56727C16.6902 4.99824 16.2698 5.50736 15.9402 6.07437L13.8981 9.58676H17.5629C18.4271 9.58676 19.281 9.40011 20.0663 9.03957L20.9542 8.63193ZM14.9554 4C14.6791 4.33499 14.4301 4.69248 14.2111 5.06912L12.0767 8.74038L10.0324 5.22419C9.77912 4.78855 9.48582 4.37881 9.15689 4H14.9554ZM6.15405 4H6.00746C3.69806 4 2.25468 6.50001 3.40938 8.50001L3.4915 8.64223L4.37838 9.04644C5.15962 9.40251 6.00817 9.58676 6.86672 9.58676H10.2553L8.30338 6.22943C7.9234 5.57587 7.42333 5.00001 6.8295 4.53215L6.15405 4ZM5.07407 11.3833L7.88909 16.2591C8.05955 15.7565 8.28025 15.2702 8.54905 14.8079L10.4218 11.5868H6.86672C6.26169 11.5868 5.66037 11.5181 5.07407 11.3833Z"
                  fill="currentColor"
                />
              </svg>
              <h2 className="mb-0">Equity Circle</h2>
            </a>
            <p className="mt-3 font-size-16">
              Complete the form below to have a copy of our resource sent direct
              your inbox.
            </p>
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
          </div>
        </div>
        </div>
      </Container>
    </div>
  );
};

export default JobDetail;
