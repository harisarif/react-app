import React from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap'
import Card from '../../../components/Card'

import { Link } from 'react-router-dom'


const UserPrivacySetting = () => {
    return (
        <>
            <div className="content-inner">
                <Container className="custom-conatiner">
                    <Card className='create-education-card'>
                        <Card.Body className='d-flex justify-content-between align-items-center w-100'>
                            <h2 className='text-dark' style={{ fontSize: '16px', fontWeight: '500' }}>Privacy Settings</h2>
                        </Card.Body>
                    </Card>
                    <Card className='radius-12 border'>
                        <Card.Body>
                            <div className="d-flex flex-column gap-3">
                                <div className="privacy-card">
                                    <h4 className="text-dark">Account Privacy</h4>
                                    <div className="privacy-card-body radius-10 border p-3">
                                        <Form.Check>
                                            <Form.Check.Input type="checkbox" id="customCheck5" />
                                            <Form.Check.Label className="text-dark" for="customCheck5">Private Account</Form.Check.Label>
                                        </Form.Check>
                                        <p className='text-dark'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                            has been the industry's standard dummy text ever since the 1500s, when an unknown
                                            printer took a galley of type and scrambled it to make a type specimen book
                                        </p>
                                    </div>
                                </div>
                                <div className="privacy-card">
                                    <h4 className="text-dark">Activity Status</h4>
                                    <div className="privacy-card-body radius-10 border p-3">
                                        <Form.Check>
                                            <Form.Check.Input defaultChecked className='text-dark' type="checkbox" id="activety" />
                                            <Form.Check.Label className="text-dark" htmlFor="activety">Show Activity Status</Form.Check.Label>
                                        </Form.Check>
                                        <p className='text-dark'>It is a long established fact that a reader will be distracted by the readable content of
                                            a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                            more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                            here', making it look like readable English.
                                        </p>
                                    </div>
                                </div>
                                <div className="privacy-card">
                                    <h4 className="text-dark">Story Sharing</h4>
                                    <div className="privacy-card-body radius-10 border p-3">
                                        <Form.Check>
                                            <Form.Check.Input type="checkbox" defaultChecked id="story" />
                                            <Form.Check.Label className="text-dark" htmlFor="story">Allow Sharing</Form.Check.Label>
                                        </Form.Check>
                                        <p className='text-dark'>It is a long established fact that a reader will be distracted by the readable content of
                                            a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                            more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                            here', making it look like readable English.
                                        </p>
                                    </div>
                                </div>
                                <div className="privacy-card">
                                    <h4 className="text-dark">Photo Of You</h4>
                                    <div className="privacy-card-body radius-10 border p-3">
                                        <div className="d-flex justify-content-start align-items-center gap-3 flex-wrap">
                                            <div className="custom-control custom-radio">
                                                <input type="radio" id="automatically" name="customRadio0" className="form-check-input" defaultChecked />{" "}
                                                <label className="form-check-label text-dark" htmlFor="automatically"> Add Automatically</label>
                                            </div>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" id="automatically1" name="customRadio0" className="form-check-input" />{" "}
                                                <label className="form-check-label text-dark" htmlFor="automatically1"> Add Manualy</label>
                                            </div>
                                        </div>
                                        <p className='text-dark'>It is a long established fact that a reader will be distracted by the readable content of
                                            a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                            more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                            here', making it look like readable English.
                                        </p>
                                    </div>
                                </div>
                                <div className="privacy-card">
                                    <h4 className="text-dark">Your Profile</h4>
                                    <div className="privacy-card-body radius-10 border p-3">
                                        <div className="d-flex justify-content-start align-items-center gap-3 flex-wrap">
                                            <div className='custom-control custom-radio'>
                                                <Form.Check.Input type="radio" name="customRadio1" id="public" defaultChecked />{" "}
                                                <Form.Check.Label htmlFor="public" className="text-dark">Public</Form.Check.Label>
                                            </div>
                                            <div className='custom-control custom-radio'>
                                                <Form.Check.Input type="radio" name="customRadio1" id="friend" />{" "}
                                                <Form.Check.Label htmlFor="friend" className="text-dark">Friend</Form.Check.Label>
                                            </div>
                                            <div className='custom-control custom-radio'>
                                                <Form.Check.Input type="radio" name="customRadio1" id="spfriend" />{" "}
                                                <Form.Check.Label htmlFor="spfriend" className="text-dark">Specific Friend</Form.Check.Label>
                                            </div>
                                            <div className='custom-control custom-radio'>
                                                <Form.Check.Input type="radio" name="customRadio1" id="onlyme" />{" "}
                                                <Form.Check.Label htmlFor="onlyme" className="text-dark">Only Me</Form.Check.Label>
                                            </div>
                                        </div>
                                        <p className='text-dark'>It is a long established fact that a reader will be distracted by the readable content of
                                            a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                            more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                            here', making it look like readable English.
                                        </p>
                                    </div>
                                </div>
                                <div className="privacy-card">
                                    <h4 className="text-dark">Login Notification</h4>
                                    <div className="privacy-card-body radius-10 border p-3">
                                        <div className="d-flex justify-content-start align-items-center gap-3 flex-wrap">
                                            <div className='custom-control custom-radio'>
                                                <Form.Check.Input type="radio" name="customRadio2" id="enable" />{" "}
                                                <Form.Check.Label htmlFor="enable" className="text-dark">Enable</Form.Check.Label>
                                            </div>
                                            <div className='custom-control custom-radio'>
                                                <Form.Check.Input type="radio" name="customRadio2" id="disable" defaultChecked />{" "}
                                                <Form.Check.Label htmlFor="disable" className="text-dark">Disable</Form.Check.Label>
                                            </div>
                                        </div>
                                        <p className='text-dark'>It is a long established fact that a reader will be distracted by the readable content of
                                            a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                            more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                            here', making it look like readable English.
                                        </p>
                                    </div>
                                </div>
                                <div className="privacy-card">
                                    <h4 className="text-dark">Privacy Help</h4>
                                    <div className="privacy-card-body radius-10 border p-3">
                                        <Link to="#" className="d-flex align-items-center text-purpule text-purpule-hover" >
                                            <span className="material-symbols-outlined">support_agent</span>
                                            <span className="ms-2">Support</span></Link>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </>
    )

}

export default UserPrivacySetting;