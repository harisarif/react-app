import React from "react";
import { Card, Row, Col, Container, Form } from "react-bootstrap";

const FormSwitch = () => {
  return (
    <>
      <div id="content-page" className="content-inner">
        <Container className="custom-conatiner">
          <Row>
            <Col sm="12">
              <Card
                className="position-relative inner-page-bg bg-primary"
                style={{ height: "150px" }}
              >
                <div className="inner-page-title">
                  <h3 className="text-white">Form Switch Page</h3>
                  <p className="text-white">lorem ipsum</p>
                </div>
              </Card>
            </Col>
            <Col sm="12" lg="12">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">State</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi vulputate, ex ac venenatis mollis, diam nibh finibus
                    leo
                  </p>
                  <div className="form-check form-switch form-check-inline">
                    <input className="form-check-input" type="checkbox" id="customSwitch1" />
                    <label className="form-check-label" htmlFor="customSwitch1">false / Inactive</label>
                  </div>{" "}
                  <Form.Check className="form-check form-switch form-check-inline">
                    <Form.Check
                      type="checkbox"
                      className="bg-primary"
                      id="customSwitch2"
                      defaultChecked
                    />
                    <Form.Check.Label>true / active</Form.Check.Label>
                  </Form.Check>{" "}
                  <div className="form-check form-switch form-check-inline">
                    <input className="form-check-input" type="checkbox" id="customSwitch3" disabled checked />
                    <label className="form-check-label" htmlFor="customSwitch3">disable / active</label>
                  </div>{" "}
                  <div className="form-check form-switch form-check-inline">
                    <input className="form-check-input" type="checkbox" checked="" id="customSwitch4" disabled />
                    <label className="form-check-label" htmlFor="customSwitch4">disable / Inactive</label>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="12">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Color</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi vulputate, ex ac venenatis mollis, diam nibh finibus
                    leo
                  </p>
                  <Form.Check className="form-switch form-check-inline">
                    <Form.Check.Input
                      type="checkbox"
                      className="bg-primary"
                      id="customSwitch01"
                      defaultChecked
                    />
                    <Form.Check.Label>Primary</Form.Check.Label>
                  </Form.Check>{" "}
                  <Form.Check className="form-switch form-check-inline">
                    <Form.Check.Input
                      type="checkbox"
                      className="bg-success"
                      id="customSwitch02"
                      defaultChecked
                    />
                    <Form.Check.Label>Success</Form.Check.Label>
                  </Form.Check>{" "}
                  <Form.Check className="form-switch form-check-inline">
                    <Form.Check.Input
                      type="checkbox"
                      className="bg-danger"
                      id="customSwitch03"
                      defaultChecked
                    />
                    <Form.Check.Label>Danger</Form.Check.Label>
                  </Form.Check>{" "}
                  <Form.Check className="form-switch form-check-inline">
                    <Form.Check.Input
                      type="checkbox"
                      className="bg-waring"
                      id="customSwitch04"
                      defaultChecked
                    />
                    <Form.Check.Label>Waring</Form.Check.Label>
                  </Form.Check>{" "}
                  <Form.Check className="form-switch form-check-inline">
                    <Form.Check.Input
                      type="checkbox"
                      className="bg-dark"
                      id="customSwitch05"
                      defaultChecked
                    />
                    <Form.Check.Label>Dark</Form.Check.Label>
                  </Form.Check>{" "}
                  <Form.Check className="form-switch form-check-inline">
                    <Form.Check.Input
                      type="checkbox"
                      className="bg-info"
                      id="customSwitch06"
                      defaultChecked
                    />
                    <Form.Check.Label>Info</Form.Check.Label>
                  </Form.Check>{" "}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FormSwitch;
