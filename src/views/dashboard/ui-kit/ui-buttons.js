import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Dropdown,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import CustomToggle from "../../../components/dropdowns";

const UiButtons = () => {

  const [radioValue, setRadioValue] = useState([1]);
  const [radioValue1, setRadioValue1] = useState("1");

  const radios = [
    { name: "Radio 1", value: "radio1" },
    { name: "Radio 2", value: "radio2" },
    { name: "Radio 3", value: "radio3" },
  ];
  const radios1 = [
    { name: "Radio 1", value: "1" },
    { name: "Radio 2", value: "2" },
    { name: "Radio 3", value: "3" },
  ];


  return (
    <>
      <div id="content-page" className="content-inner">
        <Container className="custom-conatiner">
          <Row>
            <Col sm="12">
              <div
                className="card position-relative inner-page-bg bg-primary"
                style={{ height: "150px" }}
              >
                <div className="inner-page-title">
                  <h3 className="text-white">Button Page</h3>
                  <p className="text-white">lorem ipsum</p>
                </div>
              </div>
            </Col>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Default Buttons</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Button variant="primary" className="mb-3 me-1">
                    Primary
                  </Button>{" "}
                  <Button variant="secondary" className="mb-3 me-1">
                    Secondary
                  </Button>{" "}
                  <Button variant="success" className="mb-3 me-1">
                    Success
                  </Button>{" "}
                  <Button variant="danger" className="mb-3 me-1">
                    Danger
                  </Button>{" "}
                  <Button variant="warning" className="mb-3 me-1">
                    Warning
                  </Button>{" "}
                  <Button variant="info" className="mb-3 me-1">
                    Info
                  </Button>{" "}
                  <Button variant="light" className="mb-3 me-1">
                    Light
                  </Button>{" "}
                  <Button variant="dark" className="mb-3 me-1">
                    Dark
                  </Button>{" "}
                  <Button variant="link" className="mb-3 me-1">
                    Link
                  </Button>{" "}
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">
                      Default Buttons Rounded Shape
                    </h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Button variant="primary" className="rounded-pill mb-3 me-1">
                    Primary
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    className="rounded-pill mb-3 me-1">
                    Secondary
                  </Button>{" "}
                  <Button variant="success" className="rounded-pill mb-3 me-1">
                    Success
                  </Button>{" "}
                  <Button variant="danger" className="rounded-pill mb-3 me-1">
                    Danger
                  </Button>{" "}
                  <Button variant="warning" className="rounded-pill mb-3 me-1">
                    Warning
                  </Button>{" "}
                  <Button variant="info" className="rounded-pill mb-3 me-1">
                    Info
                  </Button>{" "}
                  <Button variant="light" className="rounded-pill mb-3 me-1">
                    Light
                  </Button>{" "}
                  <Button variant="dark" className="rounded-pill mb-3 me-1">
                    Dark
                  </Button>{" "}
                  <Button variant="link" className="rounded-pill mb-3 me-1">
                    Link
                  </Button>{" "}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Outline Buttons</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Button variant="outline-primary" className="mb-3 me-1">
                    Primary
                  </Button>{" "}
                  <Button variant="outline-secondary" className="mb-3 me-1">
                    Secondary
                  </Button>{" "}
                  <Button variant="outline-success" className="mb-3 me-1">
                    Success
                  </Button>{" "}
                  <Button variant="outline-danger" className="mb-3 me-1">
                    Danger
                  </Button>{" "}
                  <Button variant="outline-warning" className="mb-3 me-1">
                    Warning
                  </Button>{" "}
                  <Button variant="outline-info" className="mb-3 me-1">
                    Info
                  </Button>{" "}
                  <Button variant="outline-dark" className="mb-3 me-1">
                    Dark
                  </Button>{" "}
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Rounded Outline Buttons</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <button
                    className="btn btn-outline-primary rounded-pill mb-3 me-1"
                  >
                    Primary
                  </button>{" "}
                  <Button
                    variant="outline-secondary"
                    className="rounded-pill mb-3 me-1"
                  >
                    Secondary
                  </Button>{" "}
                  <Button
                    variant="outline-success"
                    className="rounded-pill mb-3 me-1"
                  >
                    Success
                  </Button>{" "}
                  <Button
                    variant="outline-danger"
                    className="rounded-pill mb-3 me-1"
                  >
                    Danger
                  </Button>{" "}
                  <Button
                    variant="outline-warning"
                    className="rounded-pill mb-3 me-1"
                  >
                    Warning
                  </Button>{" "}
                  <Button
                    variant="outline-info"
                    className="rounded-pill mb-3 me-1"
                  >
                    Info
                  </Button>{" "}
                  <Button
                    variant="outline-dark"
                    className="rounded-pill mb-3 me-1"
                  >
                    Dark
                  </Button>{" "}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Soft Buttons</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Button variant="primary-subtle" className="mb-3 me-1">
                    Primary
                  </Button>{" "}
                  <Button variant="secondary-subtle" className="mb-3 me-1">
                    Secondary
                  </Button>{" "}
                  <Button variant="success-subtle" className="mb-3 me-1">
                    Success
                  </Button>{" "}
                  <Button variant="danger-subtle" className="mb-3 me-1">
                    Danger
                  </Button>{" "}
                  <Button variant="warning-subtle" className="mb-3 me-1">Warning</Button>{" "}
                  <Button variant="info-subtle" className="mb-3 me-1">Info</Button>{" "}
                  <Button variant="dark-subtle" className="mb-3 me-1">Dark</Button>{" "}
                  <Button variant="gray-subtle" className="mb-3 me-1">Link</Button>{" "}
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Rounded Soft Buttons</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Button
                    variant="primary-subtle"
                    className="rounded-pill mb-3 me-1"
                  >
                    Primary
                  </Button>{" "}
                  <Button
                    variant="secondary-subtle"
                    className="rounded-pill mb-3 me-1"
                  >
                    Secondary
                  </Button>{" "}
                  <Button
                    variant="success-subtle"
                    className="rounded-pill mb-3 me-1"
                  >
                    Success
                  </Button>{" "}
                  <Button
                    variant="danger-subtle"
                    className="rounded-pill mb-3 me-1"
                  >
                    Danger
                  </Button>{" "}
                  <Button
                    variant="warning-subtle"
                    className="rounded-pill mb-3 me-1"
                  >
                    Warning
                  </Button>{" "}
                  <Button
                    variant="info-subtle"
                    className="rounded-pill mb-3 me-1"
                  >
                    Info
                  </Button>{" "}
                  <Button
                    variant="dark-subtle"
                    className="rounded-pill mb-3 me-1"
                  >
                    Dark
                  </Button>{" "}
                  <Button
                    variant="gray-subtle"
                    className="rounded-pill mb-3 me-1"
                  >
                    Link
                  </Button>{" "}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Default Buttons</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  {/* <i className="material-symbols-outlined me-1">favorite</i> */}
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Button
                    variant="primary"
                    className="btn d-inline-flex mb-3 me-1"
                  >
                    <i className="material-symbols-outlined me-1">subject</i>
                    Primary
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    className="btn d-inline-flex mb-3 me-1"
                  >
                    <i className="material-symbols-outlined me-1">favorite</i>
                    Secondary
                  </Button>{" "}
                  <Button
                    variant="success"
                    className="btn d-inline-flex mb-3 me-1"
                  >
                    <i className="material-symbols-outlined me-1">subject</i>
                    Success
                  </Button>{" "}
                  <Button
                    variant="danger"
                    className="btn d-inline-flex mb-3 me-1"
                  >
                    <i className="material-symbols-outlined me-1">favorite</i>
                    Danger
                  </Button>{" "}
                  <Button
                    variant="warning"
                    className="btn d-inline-flex mb-3 me-1"
                  >
                    <i className="material-symbols-outlined me-1">subject</i>
                    Warning
                  </Button>{" "}
                  <Button
                    variant="info"
                    className="btn d-inline-flex mb-3 me-1"
                  >
                    <i className="material-symbols-outlined me-1">favorite</i>
                    Info
                  </Button>{" "}
                  <Button
                    variant="light"
                    className="btn d-inline-flex mb-3 me-1"
                  >
                    <i className="material-symbols-outlined me-1">subject</i>
                    Light
                  </Button>{" "}
                  <Button
                    variant="dark"
                    className="btn d-inline-flex mb-3 me-1"
                  >
                    <i className="material-symbols-outlined me-1">favorite</i>
                    Dark
                  </Button>{" "}
                  <Button
                    variant="link"
                    className="btn d-inline-flex mb-3 me-1"
                  >
                    <i className="material-symbols-outlined me-1">subject</i>
                    Link
                  </Button>{" "}
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">
                      Default Buttons Rounded Shape
                    </h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Button
                    variant="primary"
                    className="rounded-pill btn mb-3 me-1 d-inline-flex"
                  >
                    <i className="material-symbols-outlined me-1">subject</i>
                    Primary
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    className="rounded-pill btn mb-3 me-1 d-inline-flex"
                  >
                    <i className="material-symbols-outlined me-1">favorite</i>
                    Secondary
                  </Button>{" "}
                  <Button
                    variant="success"
                    className="rounded-pill btn mb-3 me-1 d-inline-flex"
                  >
                    <i className="material-symbols-outlined me-1">subject</i>
                    Success
                  </Button>{" "}
                  <Button
                    variant="danger"
                    className="rounded-pill btn mb-3 me-1 d-inline-flex"
                  >
                    <i className="material-symbols-outlined me-1">favorite</i>
                    Danger
                  </Button>{" "}
                  <Button
                    variant="warning"
                    className="rounded-pill btn mb-3 me-1 d-inline-flex"
                  >
                    <i className="material-symbols-outlined me-1">subject</i>
                    Warning
                  </Button>{" "}
                  <Button
                    variant="info"
                    className="rounded-pill btn mb-3 me-1 d-inline-flex"
                  >
                    <i className="material-symbols-outlined me-1">favorite</i>
                    Info
                  </Button>{" "}
                  <Button
                    variant="light"
                    className="rounded-pill btn mb-3 me-1 d-inline-flex"
                  >
                    <i className="material-symbols-outlined me-1">subject</i>
                    Light
                  </Button>{" "}
                  <Button
                    variant="dark"
                    className="rounded-pill btn mb-3 me-1 d-inline-flex"
                  >
                    <i className="material-symbols-outlined me-1">favorite</i>
                    Dark
                  </Button>{" "}
                  <Button
                    variant="link"
                    className="rounded-pill btn mb-3 me-1 d-inline-flex"
                  >
                    <i className="material-symbols-outlined me-1">subject</i>
                    Link
                  </Button>{" "}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Outline Buttons</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Button variant="outline-primary" className="d-inline-flex btn-outline-primary mb-3 me-1">
                    <i className="material-symbols-outlined me-1">favorite</i>Primary
                  </Button>{" "}
                  <Button variant="outline-secondary" className="d-inline-flex btn-outline-primary mb-3 me-1">
                    <i className="material-symbols-outlined me-1">warning</i>Secondary
                  </Button>{" "}
                  <Button variant="outline-success" className="d-inline-flex btn-outline-primary mb-3 me-1">
                    <i className="material-symbols-outlined me-1">favorite</i>Success
                  </Button>{" "}
                  <Button variant="outline-danger" className="d-inline-flex btn-outline-primary mb-3 me-1">
                    <i className="material-symbols-outlined me-1">warning</i>Danger
                  </Button>{" "}
                  <Button variant="outline-warning" className="d-inline-flex btn-outline-primary mb-3 me-1">
                    <i className="material-symbols-outlined me-1">favorite</i>Warning
                  </Button>{" "}
                  <Button variant="outline-info" className="d-inline-flex btn-outline-primary mb-3 me-1">
                    <i className="material-symbols-outlined me-1">warning</i>Info
                  </Button>{" "}
                  <Button variant="outline-dark" className="d-inline-flex btn-outline-primary mb-3 me-1">
                    <i className="material-symbols-outlined me-1">warning</i>Dark
                  </Button>{" "}
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Rounded Outline Buttons</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Button variant="outline-primary" className="d-inline-flex btn-outline-primary rounded-pill mb-3 me-1">
                    <i className="material-symbols-outlined me-1">favorite</i>Primary
                  </Button>{" "}
                  <Button variant="outline-secondary" className="d-inline-flex btn-outline-primary rounded-pill mb-3 me-1">
                    <i className="material-symbols-outlined me-1">warning</i>Secondary
                  </Button>{" "}
                  <Button variant="outline-success" className="d-inline-flex btn-outline-primary rounded-pill mb-3 me-1">
                    <i className="material-symbols-outlined me-1">favorite</i>Success
                  </Button>{" "}
                  <Button variant="outline-danger" className="d-inline-flex btn-outline-primary rounded-pill mb-3 me-1">
                    <i className="material-symbols-outlined me-1">warning</i>Danger
                  </Button>{" "}
                  <Button variant="outline-warning" className="d-inline-flex btn-outline-primary rounded-pill mb-3 me-1">
                    <i className="material-symbols-outlined me-1">favorite</i>Warning
                  </Button>{" "}
                  <Button variant="outline-info" className="d-inline-flex btn-outline-primary rounded-pill mb-3 me-1">
                    <i className="material-symbols-outlined me-1">warning</i>Info
                  </Button>{" "}
                  <Button variant="outline-dark" className="d-inline-flex btn-outline-primary rounded-pill mb-3 me-1">
                    <i className="material-symbols-outlined me-1">warning</i>Dark
                  </Button>{" "}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Outline Buttons</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <button className="btn d-inline-flex btn-primary-subtle mb-3 me-1">
                      <i className="material-symbols-outlined me-1">favorite</i>Primary
                  </button>{" "}
                  <button variant="outline-secondary" className="btn d-inline-flex btn-secondary-subtle mb-3 me-1">
                    <i className="material-symbols-outlined me-1">warning</i>Secondary
                  </button>{" "}
                  <button variant="outline-success" className="btn d-inline-flex btn-success-subtle mb-3 me-1">
                    <i className="material-symbols-outlined me-1">favorite</i>Success
                  </button>{" "}
                  <button variant="outline-danger" className="btn d-inline-flex btn-danger-subtle mb-3 me-1">
                    <i className="material-symbols-outlined me-1">warning</i>Danger
                  </button>{" "}
                  <button variant="outline-warning" className="btn d-inline-flex btn-warning-subtle mb-3 me-1">
                    <i className="material-symbols-outlined me-1">favorite</i>Warning
                  </button>{" "}
                  <button variant="outline-info" className="btn d-inline-flex btn-info-subtle mb-3 me-1">
                    <i className="material-symbols-outlined me-1">warning</i>Info
                  </button>{" "}
                  <button variant="outline-dark" className="btn d-inline-flex btn-dark-subtle mb-3 me-1">
                    <i className="material-symbols-outlined me-1">warning</i>Dark
                  </button>{" "}
                  <button type="button" className="btn d-inline-flex btn-gray-subtle mb-3 me-1">
                    <i className="material-symbols-outlined me-1">favorite</i>Link
                  </button>{" "}
                </Card.Body>
              </Card>
            </Col>
           <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Rounded Outline Buttons</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <button type="button" className="btn d-inline-flex btn-primary-subtle rounded-pill mb-3 me-1"><i className="material-symbols-outlined me-1">favorite</i>Primary</button>{" "}
                  <button type="button" className="btn d-inline-flex btn-secondary-subtle rounded-pill mb-3 me-1"><i className="material-symbols-outlined me-1">warning</i>Secondary</button>{" "}
                  <button type="button" className="btn d-inline-flex btn-success-subtle rounded-pill mb-3 me-1"><i className="material-symbols-outlined me-1">favorite</i>Success</button>{" "}
                  <button type="button" className="btn d-inline-flex btn-danger-subtle rounded-pill mb-3 me-1"><i className="material-symbols-outlined me-1">warning</i>Danger</button>{" "}
                  <button type="button" className="btn d-inline-flex btn-warning-subtle rounded-pill mb-3 me-1"><i className="material-symbols-outlined me-1">favorite</i>Warning</button>{" "}
                  <button type="button" className="btn d-inline-flex btn-info-subtle rounded-pill mb-3 me-1"><i className="material-symbols-outlined me-1">warning</i>Info</button>{" "}
                  <button type="button" className="btn d-inline-flex btn-dark-subtle rounded-pill mb-3 me-1"><i className="material-symbols-outlined me-1">warning</i>Dark</button>{" "}
                  <button type="button" className="btn d-inline-flex btn-gray-subtle rounded-pill mb-3 me-1"><i className="material-symbols-outlined me-1">favorite</i>Link</button>{" "}
                </Card.Body>
              </Card>
            </Col> 
          </Row>
          <Row>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Button Tags</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-3 me-1">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Link className="btn btn-primary mt-1" to="#" role="button">
                    Link
                  </Link>{" "}
                  <Button variant="success" className="mt-1" type="submit">
                    Button
                  </Button>{" "}
                  <input
                    className="btn btn-danger mt-1"
                    type="button"
                    value="Input"
                  />{" "}
                  <input
                    className="btn btn-warning mt-1"
                    type="submit"
                    value="Submit"
                  />{" "}
                  <input
                    className="btn btn-info mt-1"
                    type="reset"
                    value="Reset"
                  />{" "}
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Buttons Sizes</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-3 me-1">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Button variant="primary" size="sm" className=" mt-1">
                    Small button
                  </Button>{" "}
                  <Button variant="success" className="  mt-1">
                    Button
                  </Button>{" "}
                  <Button variant="info" size="lg" className=" mt-1">
                    Large Button
                  </Button>{" "}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Block Buttons</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-3">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <div className="d-grid gap-2">
                    <Button variant="primary" >
                      Block level Button
                    </Button>{" "}
                    <Button variant="success" >
                      Block level Button
                    </Button>{" "}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Icons Buttons</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Button
                    variant="primary"
                    className=" d-inline-flex mb-1 me-1"
                  >
                    <i className="material-symbols-outlined me-0">info</i>
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    className="d-inline-flex mb-1 me-1"
                  >
                    <i className="material-symbols-outlined me-0">gpp_maybe</i>
                  </Button>{" "}
                  <Button variant="success" className="d-inline-flex mb-1 me-1">
                    <i className="material-symbols-outlined me-0">add_alert</i>
                  </Button>{" "}
                  <Button variant="danger" className="d-inline-flex mb-1 me-1">
                    <i className="material-symbols-outlined me-0">report_off</i>
                  </Button>{" "}
                  <Button variant="warning" className="d-inline-flex mb-1 me-1">
                    <i className="material-symbols-outlined me-0">show_chart</i>
                  </Button>{" "}
                  <Button variant="info" className="d-inline-flex mb-1 me-1">
                    <i className="material-symbols-outlined me-0">wifi_off</i>
                  </Button>{" "}
                  <Button variant="light" className="d-inline-flex mb-1 me-1">
                    <i className="material-symbols-outlined me-0">rss_feed</i>
                  </Button>{" "}
                  <Button variant="dark" className="d-inline-flex mb-1 me-1">
                    <i className="material-symbols-outlined me-0">backup</i>
                  </Button>{" "}
                  <Button variant="link" className="d-inline-flex mb-1 me-1">
                    <i className="material-symbols-outlined me-0">album</i>
                  </Button>{" "}
                  <div className="d-inline-block w-100 mt-1">
                    <Button
                      variant="primary"
                      className="d-inline-flex mb-1 me-1"
                    >
                      <i className="material-symbols-outlined me-1">favorite</i>
                      Buttons
                    </Button>{" "}
                    <Button
                      variant="secondary"
                      className="d-inline-flex mb-1 me-1"
                    >
                      <i className="material-symbols-outlined me-1">favorite</i>
                      Buttons
                    </Button>{" "}
                    <Button
                      variant="success"
                      className="d-inline-flex mb-1 me-1"
                    >
                      <i className="material-symbols-outlined me-1">favorite</i>
                      Buttons
                    </Button>{" "}
                    <Button
                      variant="danger"
                      className="d-inline-flex mb-1 me-1"
                    >
                      <i className="material-symbols-outlined me-1">favorite</i>
                      Buttons
                    </Button>{" "}
                    <Button variant="info" className="d-inline-flex mb-1 me-1">
                      <i className="material-symbols-outlined me-1">favorite</i>
                      Buttons
                    </Button>{" "}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Social Disabled State</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Button variant="primary" disabled>
                    Primary button
                  </Button>{" "}
                  <Button variant="success" disabled>
                    Button
                  </Button>{" "}
                  <Button variant="outline-primary" disabled>
                    Button
                  </Button>{" "}
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Buttons Toggle States</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Button variant="primary">Single toggle</Button>{" "}
                  <Button
                    variant="primary active"
                    data-bs-toggle="button"
                    aria-pressed="true"
                  >
                    Single toggle
                  </Button>{" "}
                  <Button variant="primary" disabled>
                    Single toggle
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Default Buttons Active</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <Button variant="primary" className="active mb-1">
                    Active
                  </Button>{" "}
                  <Button variant="secondary" className="active mb-1">
                    Active
                  </Button>{" "}
                  <Button variant="warning" className="active mb-1">
                    Active
                  </Button>{" "}
                  <Button variant="accent" className="mb-1" disabled>
                    Disabled
                  </Button>{" "}
                  <Button variant="primary" className="mb-1" disabled>
                    Disabled
                  </Button>{" "}
                  <Button
                    variant="outline-primary"
                    className="mb-1"
                    disabled
                  >
                    Disabled
                  </Button>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Button Group Sizing</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <div className="bd-example">
                    <div
                      className="btn-group btn-group-lg"
                      role="group"
                      aria-label="Large button group"
                    >
                      <Button variant="outline-primary">Left</Button>{" "}
                      <Button variant="outline-primary">Middle</Button>{" "}
                      <Button variant="outline-primary">Right</Button>{" "}
                    </div>
                    <br />
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Default button group"
                    >
                      <Button variant="outline-primary">Left</Button>{" "}
                      <Button variant="outline-primary">Middle</Button>{" "}
                      <Button variant="outline-primary">Right</Button>{" "}
                    </div>
                    <br />{" "}
                    <div
                      className="btn-group btn-group-sm"
                      role="group"
                      aria-label="Small button group"
                    >
                      <Button variant="outline-primary">Left</Button>{" "}
                      <Button variant="outline-primary">Middle</Button>{" "}
                      <Button variant="outline-primary">Right</Button>{" "}
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Button Group Vertical</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <ButtonGroup vertical={true}>
                    {radios1.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="outline-danger"
                        name="radio"
                        value={radio.value}
                        checked={radioValue1 === radio.value}
                        onChange={(e) => setRadioValue1(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">
                      Checkbox and radio button groups
                    </h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <div
                    className="btn-group checkboxradio"
                    role="group"
                    aria-label="Basic checkbox toggle button group"
                  >
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btncheck1"
                    />
                    <label className="btn btn-outline-primary">
                      Checkbox 1
                    </label>
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btncheck2"
                    />
                    <label className="btn btn-outline-primary">
                      Checkbox 2
                    </label>
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btncheck3"
                    />
                    <label className="btn btn-outline-primary">
                      Checkbox 3
                    </label>
                  </div>{" "}
                  <ButtonGroup className="mt-1">
                    {/* {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radiobutton-${idx}`}
                        type="radio"
                        variant="outline-primary"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))} */}
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                      <ToggleButton id="tbg-radio-1" variant="outline-primary" value={1}>
                        Radio 1
                      </ToggleButton>
                      <ToggleButton id="tbg-radio-2" variant="outline-primary" value={2}>
                        Radio 2
                      </ToggleButton>
                      <ToggleButton id="tbg-radio-3" variant="outline-primary" value={3}>
                        Radio 3
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Button Group</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-3 me-1">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <div
                    className="btn-group mt-1"
                    role="group"
                    aria-label="Basic example"
                  >
                    <Button variant="primary">Left</Button>
                    <Button variant="primary">Middle</Button>
                    <Button variant="primary">Right</Button>
                  </div>{" "}
                  <div className="btn-group mt-1">
                    <Link
                      to="#"
                      className="btn btn-primary active"
                      aria-current="page"
                    >
                      Active link
                    </Link>
                    <Link to="#" className="btn btn-primary">
                      Link
                    </Link>
                    <Link to="#" className="btn btn-primary">
                      Link
                    </Link>
                  </div>{" "}
                  <div
                    className="btn-group mt-1"
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <Button variant="outline-primary">Left</Button>
                    <Button variant="outline-primary">Middle</Button>
                    <Button variant="outline-primary">Right</Button>
                  </div>{" "}
                  <div
                    className="btn-group mt-1"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <Button variant="danger">Left</Button>
                    <Button variant="warning">Middle</Button>
                    <Button variant="success">Right</Button>
                  </div>{" "}
                </Card.Body>
              </Card>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Button Dropdown</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Button group with nested dropdown"
                  >
                    <Button variant="primary">1</Button>
                    <Button variant="primary">2</Button>
                    <div className="btn-group" role="group">
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle}>
                          <Button
                            variant="primary"
                            id="btnGroupDrop1"
                            type="button"
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Dropdown {' '}
                          </Button>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Dropdown link</Dropdown.Item>
                          <Dropdown.Item>Dropdown link</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="d-block mt-1">
                    <div
                      className="btn-group-vertical "
                      role="group"
                      aria-label="Vertical button group"
                    >
                      <Button variant="primary">Button</Button>
                      <Button variant="primary">Button</Button>
                      <div className="btn-group">
                        <Dropdown>
                          <Dropdown.Toggle as={CustomToggle}>
                            <Button
                              variant="primary"
                              type="button"
                              className="dropdown-toggle rounded-0"
                            >
                              Dropdown {" "}
                            </Button>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>Dropdown link</Dropdown.Item>
                            <Dropdown.Item>Dropdown link</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <Button variant="primary">Button</Button>
                      <Button variant="primary">Button</Button>
                      <div className="btn-group" role="group">
                        <Dropdown>
                          <Dropdown.Toggle as={CustomToggle}>
                            <Button
                              variant="primary"
                              id="btnGroupDrop1"
                              type="button"
                              className="dropdown-toggle rounded-0"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Dropdown {" "}
                            </Button>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>Dropdown link</Dropdown.Item>
                            <Dropdown.Item>Dropdown link</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className="btn-group" role="group">
                        <Dropdown>
                          <Dropdown.Toggle as={CustomToggle}>
                            <Button
                              variant="primary"
                              id="btnGroupDrop1"
                              type="button"
                              className="dropdown-toggle rounded-0"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              split
                            >
                              Dropdown {" "}
                            </Button>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>Dropdown links</Dropdown.Item>
                            <Dropdown.Item>Dropdown links</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <ButtonGroup>
                        <Dropdown>
                          <Dropdown.Toggle as={CustomToggle}>
                            <Button
                              variant="primary"
                              id="btnGroupDrop1"
                              type="button"
                              className="dropdown-toggle rounded-0 rounded-bottom"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Dropdown {" "}
                            </Button>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>Dropdown link</Dropdown.Item>
                            <Dropdown.Item>Dropdown link</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </ButtonGroup>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Button toolbar</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </p>
                  <div
                    className="btn-toolbar"
                    role="toolbar"
                    aria-label="Toolbar with button groups"
                  >
                    <div
                      className="btn-group me-2"
                      role="group"
                      aria-label="First group"
                    >
                      <Button variant="primary">1</Button>
                      <Button variant="primary">2</Button>
                      <Button variant="primary">3</Button>
                      <Button variant="primary">4</Button>
                    </div>
                    <div
                      className="btn-group me-2"
                      role="group"
                      aria-label="Second group"
                    >
                      <Button variant="secondary">5</Button>
                      <Button variant="secondary">6</Button>
                      <Button variant="secondary">7</Button>
                    </div>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Third group"
                    >
                      <Button variant="info">8</Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UiButtons;
