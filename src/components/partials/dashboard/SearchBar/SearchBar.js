import React from 'react';
import { Nav, Form, Card, Container, Image, Dropdown, Navbar } from "react-bootstrap";
import { LuSearch } from "react-icons/lu";

export default function SearchBar(props) {
  return (
    <Form>
      <Form.Group className={`SearchBar ${props.page}`} controlId="">
        <LuSearch size={24} style={{ position: 'absolute', left: '16px' }} />
        <Form.Control type="text" className="border-0 bg-transparent" placeholder="Search for users" style={{ paddingLeft: '50px' }} />
      </Form.Group>
    </Form>
  )
}
