import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConfirmModal = props => {

  return (
    <Modal isOpen={props.modal} toggle={props.toggle} >
      <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
      <ModalBody >
        {props.content}
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-outline-danger font-weight-bold" onClick={props.confirm}>{props.confirmButton}</button>{' '}
        <button className="btn btn-outline-dark font-weight-bold" onClick={props.toggle}>Cancel</button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
