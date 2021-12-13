import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import Button from '../button/Button';

const PostInput = ({ auth, addPost }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  return (
    <Fragment>
      {auth.isAuthenticated && !auth.loading && (
        <div className="post-form">
          <form
            className="form my-1"
            onSubmit={(e) => {
              e.preventDefault();
              addPost({ title, text });
              // clear the form
              setTitle('');
              setText('');
            }}
          >
            <input
              className="my-1 post-input"
              style={{ borderStyle: 'none' }}
              type="text"
              placeholder="Post title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="post-input"
              style={{ borderStyle: 'none' }}
              name="text"
              cols="30"
              rows="3"
              placeholder="Description"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
            <Button title="Post" />
          </form>
        </div>
      )}
    </Fragment>
  );
};

PostInput.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addPost })(PostInput);
