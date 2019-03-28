import React, {Component} from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/RoleAndPermissionActions";

import {
  CustomInput,
  FormGroup,
  Label,
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal
} from 'reactstrap';

class EditUserRoles extends Component {

  state = {
    isOpen:false,
    userRoles:[]
  };


  toggle = () => {
    this.setState({
      isOpen:!this.state.isOpen
    })
  };


  onCheckBoxChange = (e,r) => {
    if(e.target.checked){
      this.setState({
        userRoles:[...this.state.userRoles,r]
      });
    }
    else{
      let userRoles = this.state.userRoles.filter(v => {
        return v.name !== e.target.value
      });
      this.setState({
        userRoles:userRoles
      });
    }
  };

  renderRoles(){

    return this.props.roles.map(r => {
      return (
        <FormGroup style={{ marginRight: '1rem' }} key={r.name} check className="checkbox" inline>
          <CustomInput checked={this.exists(r)} id={r.id} className="form-check-input" type="checkbox" value={r.name} inline onChange={e=>this.onCheckBoxChange(e,r)} />
          <Label check className="form-check-label">{r.name}</Label>
        </FormGroup>
      );

    });

  }

  exists = (o) => {

    let ar = this.state.userRoles.filter(r =>{
      return r.id === o.id;
    });
    return ar.length > 0;
  };


  componentWillMount(){
    let {userRoles} = this.props;
    this.setState({
      userRoles:userRoles
    });
  }

  editUserRoles = () => {

    let {user,u,dispatch,editUserRoles,alertify,errorHandler} = this.props;
    let {userRoles} = this.state;

    let roles = userRoles.map( v => v.name);

    editUserRoles(user.accessToken,u.id,roles).then(res => {

      dispatch({
        type: actions.EDIT_USER_ROLES,
        payload: {
          id:u.id,
          roles:[...userRoles]
        }
      });

      alertify.success(res.data.message);

    }).catch(errorHandler);

    this.setState({
      isOpen:false
    });

  };

  render(){

    return (
      <React.Fragment>

        <Button className="p-2" color="link" onClick={this.toggle}><i className="fas fa-edit"></i></Button>

        <Modal  isOpen={this.state.isOpen} toggle={this.toggle} className="modal-primary">
          <ModalHeader toggle={this.toggle}><i className="fas fa-edit"></i> Edit User Roles</ModalHeader>
          <ModalBody>
            {this.renderRoles()}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editUserRoles}><i className="fas fa-edit"></i> Edit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = () => {
  return {
    editUserRoles:(token,id,roles)=>actions.editUserRoles(token,id,roles)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditUserRoles);
