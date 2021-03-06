import React, { Component } from 'react';

// import { Link } from 'react-router';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap';

export default class Main extends Component {
  render() {
    return (
      <Grid bsClass="container">

        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#brand">React-Bootstrap</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/">
                Weather
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link
              </NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                Link Right
              </NavItem>
              <NavItem eventKey={2} href="#">
                Link Right
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Row className="show-grid">
          <Col md={2}>
          </Col>

          <Col sm={12} md={8}>
            {React.cloneElement(this.props.children, this.props)}
          </Col>
          <Col md={2}>
          </Col>
        </Row>
      </Grid>
    );
  }
}
