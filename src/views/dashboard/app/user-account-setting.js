import React from 'react'
import { Container, Row, Col, Card, Nav, Tab, Tabs, Form, Button } from 'react-bootstrap'

const UserAccountSetting = () => {
    return (
        <>
            <div className="content-inner">
                <Container className="custom-conatiner">
                    <Tabs defaultActiveKey="account" id="settings-tabs" justify className="mb-3 bg-transparent border radius-12 overflow-hidden">
                        <Tab eventKey="account" title="Account Settings">
                            <Card className='border radius-12'>
                                <Card.Header className="d-flex justify-content-between p-3 pb-1">
                                    <div className="header-title">
                                        <h4 className="card-title fw-bold">Accounts Settings</h4>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <div className="acc-edit">
                                        <Form>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="uname" className="form-label text-dark">User Name:</Form.Label>
                                                <Form.Control type="text" className="form-control radius-10" id="uname" defaultValue="Bni@01" />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="email" className="form-label text-dark">Email Id:</Form.Label>
                                                <Form.Control type="email" className="form-control radius-10" id="email" defaultValue="Bnijohn@gmail.com" />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="altemail" className="form-label text-dark">Alternate Email:</Form.Label>
                                                <Form.Control type="email" className="form-control radius-10" id="altemail" defaultValue="designtheme@gmail.com" />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label className="d-block form-label text-dark">Language Known:</Form.Label>
                                                <Form.Check className="form-check form-check-inline">
                                                    <Form.Check.Input type="checkbox" className="form-check-input" id="english" defaultChecked />
                                                    <Form.Check.Label className="form-check-label text-dark" htmlFor="english">English</Form.Check.Label>
                                                </Form.Check>{" "}
                                                <Form.Check className="form-check form-check-inline">
                                                    <Form.Check.Input type="checkbox" className="form-check-input" id="french" defaultChecked />
                                                    <Form.Check.Label className="form-check-label text-dark" htmlFor="french">French</Form.Check.Label>
                                                </Form.Check>{" "}
                                                <Form.Check className="form-check form-check-inline">
                                                    <Form.Check.Input type="checkbox" className="form-check-input" id="hindi" />
                                                    <Form.Check.Label className="form-check-label text-dark" htmlFor="hindi">Hindi</Form.Check.Label>
                                                </Form.Check>{" "}
                                                <Form.Check className="form-check form-check-inline">
                                                    <Form.Check.Input type="checkbox" className="form-check-input" id="spanish" defaultChecked />
                                                    <Form.Check.Label className="form-check-label text-dark" htmlFor="spanish">Spanish</Form.Check.Label>
                                                </Form.Check>{" "}
                                                <Form.Check className="form-check form-check-inline">
                                                    <Form.Check.Input type="checkbox" className="form-check-input" id="arabic" />
                                                    <Form.Check.Label className="form-check-label text-dark" htmlFor="arabic">Arabic</Form.Check.Label>
                                                </Form.Check>{" "}
                                                <Form.Check className="form-check form-check-inline">
                                                    <Form.Check.Input type="checkbox" className="form-check-input" id="italian" />
                                                    <Form.Check.Label className="form-check-label text-dark" htmlFor="italian">Italian</Form.Check.Label>
                                                </Form.Check>{" "}
                                            </Form.Group>
                                            <div className="d-flex justify-content-end align-items-center gap-2">
                                                <Button type="reset" variant='secondary' className="bg-white text-dark px-3 py-2 radius-10">Cancel</Button>
                                                <Button type="submit" variant='primary' className="btn-purpule px-3 py-2 radius-10">Submit</Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Tab>

                        <Tab eventKey="social" title="Social Settings">
                            <Card className='border radius-12'>
                                <Card.Header className="d-flex justify-content-between p-3 pb-1">
                                    <div className="header-title">
                                        <h4 className="card-title fw-bold">Social Media</h4>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <div className="acc-edit">
                                        <Form>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="facebook" className="form-label text-dark">Facebook:</Form.Label>
                                                <Form.Control type="text" className="form-control radius-10" id="facebook" defaultValue="www.facebook.com" />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="twitter" className="form-label text-dark">Twitter:</Form.Label>
                                                <Form.Control type="text" className="form-control radius-10" id="twitter" defaultValue="www.twitter.com" />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="google" className="form-label text-dark">Google +:</Form.Label>
                                                <Form.Control type="text" className="form-control radius-10" id="google" defaultValue="www.google.com" />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="instagram" className="form-label text-dark">Instagram:</Form.Label>
                                                <Form.Control type="text" className="form-control radius-10" id="instagram" defaultValue="www.instagram.com" />
                                            </Form.Group>
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="youtube" className="form-label text-dark">You Tube:</Form.Label>
                                                <Form.Control type="text" className="form-control radius-10" id="youtube" defaultValue="www.youtube.com" />
                                            </Form.Group>
                                            <div className="d-flex justify-content-end align-items-center gap-2">
                                            <Button type="reset" variant='secondary' className="bg-white text-dark px-3 py-2 radius-10">Cancel</Button>
                                            <Button type="submit" variant='primary' className="btn-purpule px-3 py-2 radius-10">Submit</Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Tab>
                    </Tabs>


                </Container>
            </div>
        </>
    )

}

export default UserAccountSetting;