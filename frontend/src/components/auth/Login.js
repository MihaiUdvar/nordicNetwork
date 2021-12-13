import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import ShootingStars from '../shootingStars/ShootingStars';
import Button from '../button/Button';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return isAuthenticated ? (
    <Redirect to="/posts" />
  ) : (
    <div className="container">
      <ShootingStars />
      <h1 className="large text-primary">Sign in</h1>
      <p className="lead">
        <FaUserAlt /> Sign into your account
      </p>
      <form className="form" onSubmit={(e) => submitHandler(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            minLength="6"
            autoComplete="on"
          />
        </div>
        <Button title="Log in" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
