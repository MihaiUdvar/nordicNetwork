import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentUserProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { loadUser } from '../../actions/auth';
import { CgHello } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { IoAddCircleOutline } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';

const Home = ({
  loadUser,
  getCurrentUserProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    loadUser();
    getCurrentUserProfile();
  }, [getCurrentUserProfile, loadUser]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="container">
      <p className="lead text-dark">
        <CgHello /> Welcome, {user && user.name}!
      </p>
      <Fragment>
        {profile !== null ? (
          <Fragment>
            <Link to="/edit-profile">
              <button type="button" className="btn ">
                <FiEdit />
                Edit Profile
              </button>
            </Link>
            <button className="btn " onClick={() => deleteAccount()}>
              <RiDeleteBinLine />
              Delete Account
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <Link to="/create-profile" className="btn btn-dark">
              <IoAddCircleOutline />
              Create Profile
            </Link>
            <button className="btn " onClick={() => deleteAccount()}>
              <RiDeleteBinLine />
              Delete Account
            </button>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

Home.propTypes = {
  loadUser: PropTypes.func.isRequired,
  getCurrentUserProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  loadUser,
  getCurrentUserProfile,
  deleteAccount,
})(Home);
