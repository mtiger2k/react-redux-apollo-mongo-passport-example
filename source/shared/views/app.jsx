'use strict';
import React from 'react'
import { Row, Col } from 'react-bootstrap';

import { Link } from 'react-router'

export default class Index extends React.Component {
  static getData(){
  
  }
  
  render() {
    return (
      <Row>
        <Col md={6}>
          <h2>Welcome to my server-rendered app</h2>
          <h3>Check out these links</h3>
          <ul>
            <li><Link to="/calculator">Calculator</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/counter">Counter</Link></li>
            <li><Link to="/test">Private page</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </Col>
      </Row>
    )
  }
}


