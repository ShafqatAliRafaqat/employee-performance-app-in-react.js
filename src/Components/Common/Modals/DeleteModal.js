import React, { Component } from "react";

import {
  Label,
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal
} from 'reactstrap';

class DeleteModal extends Component {

  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };

  delete = () => {
    this.props.delete();
    this.toggle();
  };

  renderBtnText = () => {
    const { children } = this.props;
    if (children) {
      return children;
    }
    return (
      <React.Fragment>
        <i className="fa fa-trash" />
      </React.Fragment>
    );
  };

  render() {

    let { model } = this.props;

    return (
      <React.Fragment>
        <Button color="link" style={{ color: "red" }} onClick={this.toggle} className="mr-1" {...this.props}>
          {this.renderBtnText()}
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-danger">
          <ModalHeader toggle={this.toggle}> Confirmation</ModalHeader>
          <ModalBody>
            <Label >Are you sure to delete {model} ?</Label>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.delete}>Yes</Button>{' '}
            <Button color="success" onClick={this.toggle}>No</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}


export default DeleteModal;
