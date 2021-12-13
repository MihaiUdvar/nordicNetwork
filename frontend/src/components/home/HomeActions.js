import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';

const HomeActions = (props) => {
	return (
		<div className="dash-buttons">
			<Link to="/edit-profile" className="btn btn-dark">
				<FaUserCircle /> Edit Profile
			</Link>
			<button className="btn btn-danger">
				<RiDeleteBinLine />
				Delete Account
			</button>
		</div>
	);
};

HomeActions.propTypes = {};

export default HomeActions;
