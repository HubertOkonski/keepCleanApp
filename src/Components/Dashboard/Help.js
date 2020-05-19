import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalTitle,
  ModalFooter,
  ModalBody,
} from "react-bootstrap";
function Help(props) {
  const handleClose = () => props.setHelpView(false);
  return (
    <>
      <Modal show={props.helpView} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {" "}
            App was created to show programming skills and help me help to keep
            house clean during Covid-19 pandemic.
          </p>
          <p>
            As a guest you can only see calendar but You can't modife it, only
            house members are allowed to do any modification in a calendar.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Help;
