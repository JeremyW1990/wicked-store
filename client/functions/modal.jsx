import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

/*
  this component is for rendering a modal dynamically, according to props been passed in
  the modal is used in two different places in this app:
  1. cart item detele confirm modal
  2. end of demostration confirm modal
*/
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
