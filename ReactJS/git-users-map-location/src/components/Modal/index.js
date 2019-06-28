import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Box, Container } from './styles';

class Modal extends Component {
  containerRef = React.createRef();

  handleContainerClick = e => {
    if (e.target !== this.containerRef.current) return;
    const { closeModal } = this.props;
    closeModal();
  };

  render() {
    const { width, height, children, showModal } = this.props;
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {showModal && (
          <Container
            ref={this.containerRef}
            onClick={this.handleContainerClick}
            showModal={showModal}
          >
            <Box width={width} height={height}>
              {children}
            </Box>
          </Container>
        )}
      </ReactCSSTransitionGroup>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

Modal.defaultProps = {
  width: '500px',
  height: '200px'
};

export default Modal;
