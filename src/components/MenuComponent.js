import React, { Component } from 'react';
import { Media } from 'reactstrap';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Media>
              menu component
          </Media>
        </div>
      </div>
    );
  }
}

export default Menu;
