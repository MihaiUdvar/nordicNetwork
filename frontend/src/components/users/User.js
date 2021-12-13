import React from 'react';
import PropTypes from 'prop-types';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlinePhone } from 'react-icons/ai';

const User = ({
	profile: { user, nickname, city, phoneNumber, gender, status },
}) => {
	return (
		user && (
			<div className="profile">
				<div>
					<img src={user.avatar} alt="" className="round-img" />
				</div>
				<div>
					<h2>{user.name}</h2>
					<p>
						<AiOutlinePhone /> {phoneNumber}
					</p>
					<p className="my-1">
						{city && (
							<span>
								<IoLocationSharp />
								{city}
							</span>
						)}
					</p>
				</div>
			</div>
		)
	);
};

User.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default User;
