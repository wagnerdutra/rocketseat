import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Form from './styles';

const AddUser = React.forwardRef(
  ({ handleSubmit, handleCancel, onInputChange, userName, hadError, showModal }, ref) => (
    <Modal closeModal={handleCancel} showModal={showModal}>
      <Form onSubmit={handleSubmit}>
        <p>Adicionar novo usuário</p>
        <input
          type="text"
          value={userName}
          ref={ref}
          onChange={onInputChange}
          className={hadError ? 'error' : ''}
        />
        <div className="actions">
          <button type="button" className="secondary" onClick={handleCancel}>
            Cancelar
          </button>
          <button type="submit" className="success">
            Salvar
          </button>
        </div>
      </Form>
    </Modal>
  )
);

AddUser.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  hadError: PropTypes.bool.isRequired,
  showModal: PropTypes.bool.isRequired
};

export default AddUser;
