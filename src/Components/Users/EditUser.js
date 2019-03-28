import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/UserActions";

import {
  FormGroup,
  Input,
  Label,
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal, Row, Col
} from 'reactstrap';

import CompanySelect from "../Company/CompanySelect"

class EditUser extends Component {


  initState = {
    ...this.props.u,
    file: null,
    password: "",
    processing: false,
    isOpen: false,
  };

  state = {
    ...this.initState
  };

  onCompanyChange = companies => {
    const company_id = companies[0].id;
    this.setState({ company_id });
  }

  editUser = () => {

    this.setState({
      processing: true
    });

    let { editUser, dispatch, alertify, user, errorHandler } = this.props;

    let {
      id, name, email, password, cnic, designation,
      phone, joining, address, file, company_id,
      employee_type, } = this.state;

    const fd = new FormData();

    fd.append('name', name);
    fd.append('email', email);
    fd.append('password', password);

    if (file) {
      fd.append('file', file, file.name);
    }

    fd.append('cnic', cnic);
    fd.append('phone', phone);
    fd.append('designation', designation);
    fd.append('joining', joining);
    fd.append('address', address);
    fd.append('company_id', company_id);
    fd.append('employee_type', employee_type);

    editUser(user.accessToken, id, fd).then(res => {

      dispatch({
        type: actions.EDIT_USER,
        payload: res.data.data
      });

      this.setState({
        isOpen: false
      });

      alertify.success(res.data.message);

    }).catch(errorHandler).finally(() => {
      this.setState({
        processing: false
      });
    });

  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };

  onChange = e => {
    this.setState({
      [e.target.name]: (e.target.files) ? e.target.files[0] : e.target.value
    });
  };

  onCompanyChange = companies => {
    const company_id = companies[0].id;
    this.setState({ company_id });
  }

  render() {

    let {
      name, email, password, cnic, designation,
      phone, joining, address,
      employee_type, processing, Company } = this.state;

    const { employee_types } = this.props.metaData;

    return (
      <React.Fragment>
        <Button color="link" onClick={this.toggle} className="mr-1"><i className="fa fa-edit" /></Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-primary modal-lg">
          <ModalHeader toggle={this.toggle}><i className="fa fa-edit" /> Edit Employee</ModalHeader>

          <ModalBody>
          <div className="container-fluid">            
            <FormGroup>
              <Row>
                <Col xs="12" sm="6">
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" name="name" placeholder="Name" value={name} onChange={this.onChange} />
                </Col>
                <Col xs="12" sm="6">
                  <Label htmlFor="email">Email</Label>
                  <Input type="text" name="email" placeholder="Email" value={email} onChange={this.onChange} />
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col xs="12" sm="6">
                  <Label htmlFor="cnic">Cnic</Label>
                  <Input type="text" name="cnic" placeholder="Cnic" value={cnic} onChange={this.onChange} />
                </Col>
                <Col xs="12" sm="6">
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" name="password" placeholder="Password" value={password} onChange={this.onChange} />
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col xs="12" sm="6">
                  <Label htmlFor="phone">Phone</Label>
                  <Input type="text" name="phone" placeholder="Phone" value={phone} onChange={this.onChange} />
                </Col>
                <Col xs="12" sm="6">
                  <Label htmlFor="employee_type">Team</Label>
                  <Input type="select" name="employee_type" onChange={this.onChange} value={employee_type}>
                    <option value="" key="" >Select</option>
                    {employee_types.map(p => <option key={p.key} value={p.key} >{p.value}</option>)}
                  </Input>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col xs="12" sm="6">
                  <Label htmlFor="joining">Joining Date</Label>
                  <Input type="date" name="joining" placeholder="Joining Date" value={joining} onChange={this.onChange} />
                </Col>
                <Col xs="12" sm="6">
                  <Label htmlFor="file">CV </Label>
                  <Input type="file" name="file" onChange={this.onChange} />
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col xs="12" sm="6">
                  <Label htmlFor="company_id">Comapny</Label>

                  <CompanySelect
                    {...this.props}
                    onChange={this.onCompanyChange}
                    placeholder="Select Company"
                    companies={[Company]}
                  />

                </Col>
                <Col xs="12" sm="6">
                  <Label htmlFor="Designation">Designation</Label>
                  <Input type="text" name="designation" placeholder="Designation" value={designation} onChange={this.onChange} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col xs="12" sm="12">
                  <Label htmlFor="address">Address</Label>
                  <Input type="textarea" name="address" placeholder="Address" value={address} onChange={this.onChange} />
                </Col>
              </Row>
            </FormGroup>
          </div>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.editUser}>{(processing) ? "Updating..." : "Update"}</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>

        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = () => {
  return {
    editUser: (token, id, data) => actions.editUser(token, id, data),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditUser);
