import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/RoleAndPermissionActions";

import {
  FormGroup,
  Input,
  Label,
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal
} from 'reactstrap';

import { can } from "../../util/functions";

class AddRole extends Component {

  state = {
    name: "",
    isOpen: false
  };

  createRole = () => {

    let { user, createRole, getRoles, dispatch, alertify, errorHandler } = this.props;

    createRole(user.accessToken, this.state.name).then(res => {

      getRoles(user.accessToken).then(res => {
        dispatch({
          type: actions.GET_ROLES,
          payload: res.data.data
        });
      });

      alertify.success(res.data.message);

      this.setState({
        name: ""
      });

    })
      .catch(errorHandler);

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
    if (!can('role-create', prs)) {
      return <React.Fragment />
    }

    return (
      <React.Fragment>
        <Button color="success" onClick={this.toggle} className="mr-1">
          <i className="fa fa-plus" /> Create Role
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-success">
          <ModalHeader toggle={this.toggle}><i className="fa fa-plus" /> Create Role</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="name">Role Name</Label>
              <Input type="text" name="name" placeholder="Role Name" value={this.state.name} onChange={e => { this.setState({ name: e.target.value }) }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.createRole}>Create</Button>{' '}
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
    createRole: (token, name) => actions.createRole(token, name),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddRole);
