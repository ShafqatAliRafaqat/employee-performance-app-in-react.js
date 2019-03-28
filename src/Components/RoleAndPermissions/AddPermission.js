import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/RoleAndPermissionActions";

import {
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import { can } from "../../util/functions";

class AddPermission extends Component {

  state = {
    name: "",
    isOpen: false
  };

  createPermission = () => {

    let { user, createPermission, getPermissions, dispatch, alertify, errorHandler } = this.props;

    createPermission(user.accessToken, this.state.name).then(res => {

      getPermissions(user.accessToken).then(res => {
        dispatch({
          type: actions.GET_PERMISSIONS,
          payload: res.data.data
        });
      });

      alertify.success(res.data.message);

      this.setState({
        name: ""
      });

    }).catch(errorHandler);

    this.setState({
      isOpen: false
    });

  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };

  render() {

    let { permissions: prs } = this.props;
    if (!can('permission-create', prs)) {
      return <React.Fragment />
    }

    return (
      <React.Fragment>
        <Button color="success" onClick={this.toggle} className="mr-1">
          <i className="fa fa-plus" /> Create Permission
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-success">
          <ModalHeader toggle={this.toggle}><i className="fa fa-plus" /> Create Permission</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="name">Permission Name</Label>
              <Input type="text" name="name" placeholder="Permission Name" value={this.state.name} onChange={e => { this.setState({ name: e.target.value }) }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.createPermission}>Create</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = () => {
  return {
    getRoles: token => actions.getRoles(token),
    createPermission: (token, name) => actions.createPermission(token, name),
    getPermissions: token => actions.getPermissions(token)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddPermission);
