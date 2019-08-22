import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

class Google extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        <NavLink className="text-danger" href='http://localhost:5000/api/google'>
          Google
        </NavLink>
      </Fragment>
    );
  }
}

export default Google;