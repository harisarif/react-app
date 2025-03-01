import React from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap'
import Card from '../../../components/Card'

import { Link } from 'react-router-dom'


const UserPrivacySetting = () => {
    return (
        <>
            <div className="content-inner">
                <Container className="custom-conatiner">
                    <Row>
                        <Col lg="12">
                            <Card>
                                <Card.Header className="d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title">Privacy Setting</h4>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <div className="acc-privacy">
                                        <div className="data-privacy">
                                            <h4 className="mb-2">Account Privacy</h4>
                                            <Form.Check>
                                                <Form.Check.Input type="checkbox" id="customCheck5" />{' '}
                                                <Form.Check.Label className="mb-2" htmlor="customCheck5">Private Account</Form.Check.Label>
                                            </Form.Check>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                                printer took a galley of type and scrambled it to make a type specimen book
                                            </p>
                                        </div>
                                        <hr />
                                        <div className="data-privacy">
                                            <h4 className="mb-2">Activity Status</h4>
                                            <Form.Check>
                                                <Form.Check.Input defaultChecked type="checkbox" id="activety" />{' '}
                                                <Form.Check.Label className="mb-2" htmlFor="activety">Show Activity Status</Form.Check.Label>
                                            </Form.Check>
                                            <p>It is a long established fact that a reader will be distracted by the readable content of
                                                a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                                more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                                here', making it look like readable English.
                                            </p>
                                        </div>
                                        <hr />
                                        <div className="data-privacy">
                                            <h4 className="mb-2"> Story Sharing </h4>
                                            <Form.Check>
                                                <Form.Check.Input type="checkbox" defaultChecked id="story" />{' '}
                                                <Form.Check.Label className="mb-2" htmlFor="story">Allow Sharing</Form.Check.Label>
                                            </Form.Check>
                                            <p>It is a long established fact that a reader will be distracted by the readable content of
                                                a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                                more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                                here', making it look like readable English.
                                            </p>
                                        </div>
                                        <hr />
                                        <div className="data-privacy">
                                            <h4 className="mb-2"> Photo Of You </h4>
                                            <div className="custom-control custom-radio">
                                                <input type="radio" id="automatically" name="customRadio0" className="form-check-input" defaultChecked />{" "}
                                                <label className="form-check-label" htmlFor="automatically"> Add Automatically</label>
                                            </div>
                                            <div className="custom-control custom-radio mb-2">
                                                <input type="radio" id="automatically1" name="customRadio0" className="form-check-input" />{" "}
                                                <label className="form-check-label" htmlFor="automatically1"> Add Manualy</label>
                                            </div>
                                            <p>It is a long established fact that a reader will be distracted by the readable content of
                                                a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                                more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                                here', making it look like readable English.
                                            </p>
                                        </div>
                                        <hr />
                                        <div className="data-privacy">
                                            <h4 className="mb-2"> Your Profile </h4>
                                            <div className='custom-control custom-radio'>
                                                <Form.Check.Input type="radio" name="customRadio1" id="public" defaultChecked />{' '}
                                                <Form.Check.Label htmlFor="public" className="">Public</Form.Check.Label>
                                            </div>
                                            <div className='custom-control custom-radio'>
                                                <Form.Check.Input type="radio" name="customRadio1" id="friend" />{' '}
                                                <Form.Check.Label htmlFor="friend" className="">Friend</Form.Check.Label>
                                            </div>
                                            <div className='custom-control custom-radio'>
                                                <Form.Check.Input type="radio" name="customRadio1" id="spfriend" />{' '}
                                                <Form.Check.Label htmlFor="spfriend" className="">Specific Friend</Form.Check.Label>
                                            </div>
                                            <div className='custom-control custom-radio mb-2'>
                                                <Form.Check.Input type="radio" name="customRadio1" id="onlyme" />{' '}
                                                <Form.Check.Label htmlFor="onlyme" className="">Only Me</Form.Check.Label>
                                            </div>
                                            <p>It is a long established fact that a reader will be distracted by the readable content of
                                                a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                                more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                                here', making it look like readable English.
                                            </p>
                                        </div>
                                        <hr />
                                        <div className="data-privacy">
                                            <h4 className="mb-2"> Login Notification </h4>
                                            <div className='custom-control custom-radio'>
                                                <Form.Check.Input type="radio" name="customRadio2" id="enable" />{' '}
                                                <Form.Check.Label htmlFor="enable" className="pl-2">Enable</Form.Check.Label>
                                            </div>
                                            <div className='custom-control custom-radio mb-2'>
                                                <Form.Check.Input type="radio" name="customRadio2" id="disable" defaultChecked />{' '}
                                                <Form.Check.Label htmlFor="disable" className="pl-2">Disable</Form.Check.Label>
                                            </div>
                                            <p>It is a long established fact that a reader will be distracted by the readable content of
                                                a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                                                more-or-less normal distribution of letters, as opposed to using 'Content here, content
                                                here', making it look like readable English.
                                            </p>
                                        </div>
                                        <hr />
                                        <div className="data-privacy">
                                            <h4 className="mb-2">Privacy Help</h4>
                                            <Link to="#" className="d-flex align-items-center">
                                                <span className="material-symbols-outlined">support_agent</span>
                                                <span className="ms-2">Support</span></Link>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )

}

export default UserPrivacySetting;