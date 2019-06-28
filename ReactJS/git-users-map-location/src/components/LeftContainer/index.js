import React from 'react';
import PropTypes from 'prop-types';
import Card from './styles';

const LeftContainer = ({ children }) => <Card>{children}</Card>;

LeftContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default LeftContainer;
