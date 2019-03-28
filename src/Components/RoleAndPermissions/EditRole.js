import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/RoleAndPermissionActions";

import {
  CustomInput,
  FormGroup,
  Input,
  Label,
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal
} from 'reactstrap';


import { upperCaseW } from "../../util/functions"

class EditRole extends Component {

  state = {
    isOpen: false,
    rolePermissions: []
  };


  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };


  onCheckBoxChange = (e, p) => {
    if (e.target.checked) {
      this.setState({
        rolePermissions: [...this.state.rolePermissions, p]
      });
    }
    else {
      let rolePermissions = this.state.rolePermissions.filter(v => {
        return v.name !== e.target.value
      });
      this.setState({
        rolePermissions: rolePermissions
      });
    }
  };

  renderPermissions() {

    return this.props.permissions.map(p => {
      return (
        <FormGroup style={{ marginRight: '1rem' }} key={p.name} check className="checkbox" inline>
          <CustomInput checked={this.exists(p)} id={p.id} className="form-check-input" type="checkbox" value={p.name} inline onChange={e => this.onCheckBoxChange(e, p)} />
          <Label check className="form-check-label">{p.name}</Label>
        </FormGroup>
      );

    });

  }

  exists = (o) => {
    let ar = this.state.rolePermissions.filter(p => {
      return p.id === o.id;
    });
    return ar.length > 0;
  };


  componentWillMount() {
    let { rolePermissions } = this.props;

    this.setState({
      rolePermissions: rolePermissions
    });
  }

  edit = () => {

    let { token, r, dispatch, getRoles, editRolePermissions, alertify, errorHandler } = this.props;

    let permissions = this.state.rolePermissions.map(v => v.name);

    editRolePermissions(token, r.id, permissions).then(res => {

      getRoles(token).then(res => {
        dispatch({
          type: actions.GET_ROLES,
          payload: res.data.data
        });
      });

      alertify.success(res.data.message);

    }).catch(errorHandler);
    this.setState({
      isOpen: false
    });
  };


  render() {

    return (
      <React.Fragment>
        <Button color="primary" onClick={this.toggle} className="mr-1">
          <i className="fa fa-pencil" /> Edit Role
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-primary modal-lg">
          <ModalHeader toggle={this.toggle}><i className="fa fa-pencil" /> Edit Role</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="name">Role Name</Label>
              <Input disabled value={this.props.r.name} />
            </FormGroup>

            <FormGroup>
              <Label>Permissions</Label>
            </FormGroup>

            {this.renderPermissions()}

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.edit}><i className="fa fa-pencil" /> Edit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    permissions: state.RoleAndPermissionsReducer.permissions,
  };
};

const mapDispatchToProps = () => {
  return {
    getRoles: (token) => actions.getRoles(token),
    editRolePermissions: (token, id, permissions) => actions.editRolePermissions(token, id, permissions)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRole);
