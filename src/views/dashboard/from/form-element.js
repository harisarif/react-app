import React, { useState } from "react";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";
import Select from "react-select";

const FormElement = () => {
  const data = [
    {
      value: 1,
      label: "select-1",
    },
    {
      value: 2,
      label: "select-2",
    },
    {
      value: 3,
      label: "select-3",
    },
    {
      value: 4,
      label: "select-4",
    },
    {
      value: 5,
      label: "select-5",
    },
    {
      value: 6,
      label: "select-6",
    },
    {
      value: 7,
      label: "select-7",
    },
    {
      value: 8,
      label: "select-8",
    },
  ];

  const Choice = [
    {
      value: "choice1",
      label: "choice1",
    },
    {
      value: "choice2",
      label: "choice2",
    },
    {
      value: "choice3",
      label: "choice3",
    },

  ];
  // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };


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
                  <h3 className="text-white">Form Layout Page</h3>
                  <p className="text-white">lorem ipsum</p>
                </div>
              </Card>
            </Col>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Basic Form</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi vulputate, ex ac venenatis mollis, diam nibh finibus
                    leo
                  </p>
                  <Form>
                    <Form.Group className="form-group">
                      <Form.Label>Email address:</Form.Label>
                      <Form.Control type="email" id="email1" />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control type="password" id="pwd" />
                    </Form.Group>
                    <Form.Group className="mb-3 form-group">
                      <Form.Check>
                        <Form.Check.Input
                          type="checkbox"
                          id="flexCheckDefault"
                        />{" "}
                        <Form.Check.Label>Remember me</Form.Check.Label>
                      </Form.Check>
                    </Form.Group>
                    <Button variant="primary">Submit</Button>{" "}
                    <Button variant="danger">cancel</Button>
                  </Form>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Form Grid</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi vulputate, ex ac venenatis mollis, diam nibh finibus
                    leo
                  </p>
                  <Form>
                    <Row>
                      <div className="col-md-6 mb-3">
                        <Form.Control type="text" placeholder="First name" />
                      </div>
                      <Col>
                        <Form.Control type="text" placeholder="Last name" />
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Input</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi vulputate, ex ac venenatis mollis, diam nibh finibus
                    leo
                  </p>
                  <Form>
                    <Form.Group className="form-group">
                      <Form.Label>Input Text </Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue="Mark Jhon"
                        placeholder="Enter Name"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Email Input</Form.Label>
                      <Form.Control
                        type="email"
                        defaultValue="markjhon@gmail.com"
                        placeholder="Enter Email"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Url Input</Form.Label>
                      <Form.Control
                        type="url"
                        defaultValue="https://getbootstrap.com"
                        placeholder="Enter Url"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Telephone Input</Form.Label>
                      <Form.Control
                        type="tel"
                        defaultValue="1-(555)-555-5555"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Number Input</Form.Label>
                      <Form.Control type="number" defaultValue="2356" />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Password Input</Form.Label>
                      <Form.Control
                        type="password"
                        defaultValue="markjhon123"
                        placeholder="Enter Password"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Date Input</Form.Label>
                      <Form.Control type="date" defaultValue="2019-12-18" />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Month Input</Form.Label>
                      <Form.Control type="month" defaultValue="2019-12" />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Week Input</Form.Label>
                      <Form.Control type="week" defaultValue="2019-W46" />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Time Input</Form.Label>
                      <Form.Control type="time" defaultValue="13:45" />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Date and Time Input</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        defaultValue="2019-12-19T13:45:00"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Example textarea</Form.Label>
                      <Form.Control as="textarea" rows="5"></Form.Control>
                    </Form.Group>
                    <Button variant="primary">Submit</Button>{" "}
                    <Button variant="danger">cancel</Button>
                  </Form>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Input Size</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi vulputate, ex ac venenatis mollis, diam nibh finibus
                    leo
                  </p>
                  <Form>
                    <Form.Group className="form-group">
                      <Form.Label>Small</Form.Label>
                      <Form.Control
                        type="email"
                        className="form-control-sm"
                        placeholder="form-control-sm"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Default</Form.Label>
                      <Form.Control type="email" placeholder="form-control" />
                    </Form.Group>
                    <Form.Group className="mb-0 form-group">
                      <Form.Label className="pb-0">Large</Form.Label>
                      <Form.Control
                        type="email"
                        className="form-control-lg"
                        placeholder="form-control-lg"
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12" lg="6">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Horizontal Form</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis, diam nibh finibus leo</p>
                  <Form className="form-horizontal" action="#">
                    <Row className="form-group">
                      <label className="control-label col-sm-4 align-self-center mb-0" htmlFor="email">Email:</label>
                      <div className="col-sm-8">
                        <input type="email" className="form-control" id="email" placeholder="Enter Your  email" />
                      </div>
                    </Row>
                    <Row className="form-group">
                      <label className="control-label col-sm-4 align-self-center mb-0" htmlFor="pwd1">Password:</label>
                      <div className="col-sm-8">
                        <input type="password" className="form-control" id="pwd1" placeholder="Enter Your password" />
                      </div>
                    </Row>
                    <div className="form-group">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckDefault2" />
                        <label className="form-check-label" htmlFor="flexCheckDefault2">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <Form.Check className="form-group">
                      <button type="submit" className="btn btn-primary">Submit</button>{" "}
                      <button type="submit" className="btn btn-danger text-white">cancel</button>
                    </Form.Check>
                  </Form>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Form row</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi vulputate, ex ac venenatis mollis, diam nibh finibus
                    leo
                  </p>
                  <Form>
                    <Row>
                      <div className="col-md-6 mb-3">
                        <input type="text" className="form-control" placeholder="First name" />
                      </div>
                      <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Last name" />
                      </div>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Input</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi vulputate, ex ac venenatis mollis, diam nibh finibus
                    leo
                  </p>
                  <Form>
                    <Form.Group className="form-group">
                      <Form.Label>Disabled Input</Form.Label>
                      <Form.Control
                        type="text"
                        id="exampleInputDisabled1"
                        disabled
                        defaultValue="Mark Jhon"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Placeholder</Form.Label>
                      <Form.Control
                        type="text"
                        id="exampleInputPlaceholder"
                        placeholder="This is Placeholder"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Readonly</Form.Label>
                      <Form.Control
                        type="text"
                        id="exampleInputReadonly"
                        disaed="true"
                        defaultValue="Mark Jhon"
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Input Color </Form.Label>
                      <input type="color" className="form-control" id="exampleInputcolor" defaultValue="#50b5ff" />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="exampleFormControlSelect1">
                        Select Input
                      </Form.Label>
                      <select
                        className="form-select"
                        id="exampleFormControlSelect1"
                      >
                        <option>Select your age</option>
                        <option>0-18</option>
                        <option>18-26</option>
                        <option>26-46</option>
                        <option>46-60</option>
                        <option>Above 60</option>
                      </select>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="choices-single-default">
                        Select Input New
                      </Form.Label>
                      <select
                        className="form-select"
                        data-trigger
                        name="choices-single-default"
                        id="choices-single-default"
                      >
                        <option defaultValue>This is a placeholder</option>
                        <option value="Choice 1">Choice 1</option>
                        <option value="Choice 2">Choice 2</option>
                        <option value="Choice 3">Choice 3</option>
                      </select>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="choices-multiple-default">
                        Default
                      </Form.Label>
                      {/* <select
                        className="form-select"
                        data-trigger
                        name="choices-multiple-default"
                        id="choices-multiple-default"
                        multiple
                      >
                        <option selected>Choice 1</option>
                        <option value="Choice 2">Choice 2</option>
                        <option value="Choice 3">Choice 3</option>
                        <option value="Choice 4" disabled>
                          Choice 4
                        </option>
                      </select> */}
                      {/* <Select
                        className="dropdown"
                        placeholder=""
                        value={Choice.filter((obj) =>
                        selectedChoice.includes(obj.value)
                        )} // set selected values
                        options={Choice} // set list of the data
                        onChange={handlesChange} // assign onChange function
                        // isMulti
                        isClearable
                      /> */}
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={Choice[0]}
                        isClearable
                        options={Choice}
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="exampleFormControlSelect2">
                        Example multiple select
                      </Form.Label>
                      <Select
                        className="dropdown"
                        placeholder=""
                        value={data.filter((obj) =>
                          selectedValue.includes(obj.value)
                        )} // set selected values
                        options={data} // set list of the data
                        onChange={handleChange} // assign onChange function
                        isMulti
                        isClearable
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="customRange1">
                        Range Input
                      </Form.Label>
                      <Form.Range id="customRange1" />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Check className="d-block">
                        <Form.Check.Input
                          type="checkbox"
                          id="flexCheckDefault2"
                        />{" "}
                        <Form.Check.Label>Default checkbox</Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="d-block">
                        <Form.Check.Input
                          type="checkbox"
                          id="flexCheckChecked"
                          defaultChecked
                        />{" "}
                        <Form.Check.Label>Checked checkbox</Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="d-block">
                        <Form.Check.Input
                          type="checkbox"
                          id="flexCheckDisabled"
                          disabled
                        />{" "}
                        <Form.Check.Label>Disabled checkbox</Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="d-block">
                        <Form.Check.Input
                          type="checkbox"
                          id="flexCheckCheckedDisabled"
                          defaultChecked
                          disabled
                        />{" "}
                        <Form.Check.Label>
                          Disabled checked checkbox
                        </Form.Check.Label>
                      </Form.Check>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Check className="d-block">
                        <Form.Check.Input
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />{" "}
                        <Form.Check.Label>Default radio</Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="d-block">
                        <Form.Check.Input
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          defaultChecked
                        />{" "}
                        <Form.Check.Label>
                          Default checked radio
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="d-block">
                        <Form.Check.Input
                          type="radio"
                          name="flexRadioDisabled"
                          id="flexRadioDisabled"
                          disabled
                        />{" "}
                        <Form.Check.Label>Disabled radio</Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="d-block">
                        <Form.Check.Input
                          type="radio"
                          name="flexRadioDisabled"
                          id="flexRadioCheckedDisabled"
                          defaultChecked
                          disabled
                        />{" "}
                        <Form.Check.Label>
                          Disabled checked radio
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="d-block">
                        <Form.Check.Input
                          type="radio"
                          name="Selected and disabled radio"
                          id="Selected and disabled radio"
                          defaultChecked
                          disabled
                        />{" "}
                        <Form.Check.Label>
                        Selected and disabled radio
                        </Form.Check.Label>
                      </Form.Check>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <div className="custom-control custom-radio custom-control-inline d-flex align-items-center">
                        <input
                          type="radio"
                          id="customRadio6"
                          name="customRadio1"
                          className="custom-control-input"
                        />{" "}
                        <label
                          className="custom-control-label"
                          htmlFor="customRadio6"
                        >{" "}
                          Default radio
                        </label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="customRadio7"
                          name="customRadio1"
                          className="custom-control-input"
                        />{" "}
                        <label className="custom-control-label">
                          {" "}
                          Default radio
                        </label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="customRadio8"
                          name="customRadio6"
                          className="custom-control-input"
                          defaultChecked
                        />{" "}
                        <label className="custom-control-label">
                          {" "}
                          Selected radio
                        </label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="customRadio9"
                          name="customRadio7"
                          className="custom-control-input"
                        />{" "}
                        <label className="custom-control-label">
                          {" "}
                          disabled radio
                        </label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="customRadio10"
                          name="customRadio8"
                          className="custom-control-input"
                          disabled
                          defaultChecked
                        />{" "}
                        <label className="custom-control-label">
                          {" "}
                          Selected and disabled radio
                        </label>
                      </div>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Check className="form-switch">
                        <Form.Check.Input
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                        />{" "}
                        <Form.Check.Label htmlFor="flexSwitchCheckDefault">
                          Default switch checkbox input
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="form-switch">
                        <Form.Check.Input
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          defaultChecked
                        />{" "}
                        <Form.Check.Label>
                          Checked switch checkbox input
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="form-switch">
                        <Form.Check.Input
                          type="checkbox"
                          id="flexSwitchCheckDisabled"
                          disabled
                        />{" "}
                        <Form.Check.Label>
                          Disabled switch checkbox input
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check className="form-switch">
                        <Form.Check.Input
                          type="checkbox"
                          id="flexSwitchCheckCheckedDisabled"
                          defaultChecked
                          disabled
                        />{" "}
                        <Form.Check.Label>
                          Disabled checked switch checkbox input
                        </Form.Check.Label>
                      </Form.Check>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label className="custom-file-input">
                        Example file input
                      </Form.Label>{" "}
                      <Form.Control type="file" id="customFile" />
                    </Form.Group>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label className="custom-file-input">
                        Choose file
                      </Form.Label>{" "}
                      <Form.Control type="file" id="customFile1" />
                    </Form.Group>
                    <Button variant="primary">Submit</Button>{" "}
                    <Button variant="danger">cancel</Button>
                  </Form>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Select Size</h4>
                  </div>
                </Card.Header>
                <Card.Body className="pt-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi vulputate, ex ac venenatis mollis, diam nibh finibus
                    leo
                  </p>
                  <Form.Group className="form-group">
                    <Form.Label>Small</Form.Label>
                    <select className="form-select form-select-sm mb-3 shadow-none">
                      <option defaultValue>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Default</Form.Label>
                    <select className="form-select mb-3 shadow-none">
                      <option defaultValue>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Large</Form.Label>
                    <select className="form-select form-select-lg shadow-none">
                      <option defaultValue>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FormElement;
