import PropTypes from 'prop-types';
import React from 'react';
import { Box, User } from './styles';
import LeftContainer from '../LeftContainer';

const UserContainerList = ({ users }) => (
  <LeftContainer>
    <Box>
      {users.map(user => (
        <User key={user.id}>
          <img src={user.avatar} alt="user-avatar" />
          <div className="user-details">
            {user.name && <p>{user.name}</p>}
            <p>{user.login}</p>
          </div>
          <button type="button" className="delete-button">
            test
          </button>
        </User>
      ))}
    </Box>
  </LeftContainer>
);

UserContainerList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      login: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    })
  ).isRequired
};

export default UserContainerList;
