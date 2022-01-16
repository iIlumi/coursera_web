import React, { Component, Fragment } from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';

export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <Navbar dark>
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
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
      </Fragment>
    );
  }
}
