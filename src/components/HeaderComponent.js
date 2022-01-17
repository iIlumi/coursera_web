import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { NAVIGATION_HEADER } from '../shared/navigationHeader';

const RenderHeaderNavItem = (props) => {
  const nav = props.navList;
  return nav.map((el) => (
    <NavItem key={el.index}>
      <NavLink className="nav-link" to={el.toPath}>
        <span className={el.className}></span> {el.htmlContent}
      </NavLink>
    </NavItem>
  ));
};

export default class Header extends Component {
  // state = {
  //   isNavOpen: false,
  // };

  // toggleNav = () => {
  //   this.setState({
  //     isNavOpen: !this.state.isNavOpen,
  //   });
  // };
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleNav = this.toggleNav.bind(this);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    return (
      <Fragment>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="assets/images/logo.png"
                height="30"
                width="41"
                alt="Ristorante Con Fusion"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                {/*  <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-info fa-lg"></span> About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg"></span> Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address-card fa-lg"></span> Contact
                    Us
                  </NavLink>
                </NavItem> */}
                <RenderHeaderNavItem navList={NAVIGATION_HEADER} />
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg"></span> Login
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Container fluid className="rounded py-3 py-sm-5 jumbotron">
          <Container>
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante con Fusion</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!
                </p>
              </div>
            </div>
          </Container>
        </Container>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody></ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
