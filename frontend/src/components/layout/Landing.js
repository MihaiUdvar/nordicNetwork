import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Button from '../button/Button';
import ShootingStars from '../shootingStars/ShootingStars';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/posts" />;
  }
  return (
    <div className="landing">
      <ShootingStars />

      <div className="landing-inner">
        <div className="buttons">
          <Link to="/register">
            <Button title="Sign Up" />
          </Link>
          <Link to="/login">
            <Button title="Log in" />
          </Link>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
