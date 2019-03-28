import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';

import {
  Card,
  CardBody,
  CardHeader,
  Col, Input, InputGroup, InputGroupAddon,
  Button,
  Row,
  Table,
} from "reactstrap";

import moment from "moment";

import SimplePagination from "../Common/SimplePagination";
import * as actions from "../../Store/Actions/UserActions";

import * as roleActions from "../../Store/Actions/RoleAndPermissionActions";

import { can, getSearchUrlFromState } from '../../util/functions'

import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import DeleteModal from "../Common/Modals/DeleteModal";
import UserRolesBadge from "./UserRolesBadge";

import { Link } from "react-router-dom";
import UserDetail from "./Detail";

class Users extends Component {

  state = {
    name: "",
    number: "",
    cnic: "",
    email: "",
    address: "",
    employee_type: "",

    page: 0,
    totalPages: 0,
    isLoading: true
  };

  userRolePrs = ['role-list', 'user-role-list', 'user-role-update'];


  getRoles = () => {

    const { ability } = this.props;

    if (ability(this.userRolePrs, true)) {

      let { getRoles, dispatch, user, errorHandler } = this.props;

      getRoles(user.accessToken).then(res => {

        dispatch({
          type: roleActions.GET_ROLES,
          payload: res.data.data
        });

      }).catch(errorHandler);
    }

  };

  get = (search) => {

    this.setState({
      isLoading: true
    });

    let { get, dispatch, user, errorHandler } = this.props;

    this.getRoles();

    get(user.accessToken, search).then(res => {

      this.setState({
        page: res.data.meta.current_page,
        totalPages: res.data.meta.last_page,
      });

      dispatch({
        type: actions.GET_USERS,
        payload: res.data.data
      });

    }).catch(errorHandler).finally(() => {

      this.setState({
        isLoading: false
      });

    });
  };

  componentDidMount() {

    let search = this.props.location.search;

    const params = qs.parse(search);

    for (let key in params) {
      this.setState({
        [key]: params[key]
      });
    }

    this.get(search);
  }

  next = () => {
    let next = this.state.page + 1;
    if (next <= this.state.totalPages) {
      let search = getSearchUrlFromState(this.state);
      this.get(search + "page=" + next);
    }
  };

  previous = () => {
    let previous = this.state.page - 1;
    if (previous > 0) {
      let search = getSearchUrlFromState(this.state);
      this.get(search + "page=" + previous);
    }
  };

  ability = (p, matchAll = false) => {
    let { permissions: prs } = this.props;
    return can(p, prs, matchAll);
  };

  renderRolesCell = (isHead = true, user = null) => {
    const { ability } = this.props;
    if (ability(this.userRolePrs, true)) {
      return isHead ? <th>Roles</th> : <td className="text-center"><UserRolesBadge {...this.props} u={user} /></td>
    }
  };

  renderEditCell = (isHead = true, user = null) => {
    const { ability } = this.props;
    if (ability('user-edit')) {
      return isHead ? <th>Actions</th> : <EditUser {...this.props} u={user} />;
    }
  };
  renderUserDetails = (isHead = true, user = null) => {

    return isHead ? <th>Details</th> : <td className="text-center"><UserDetail {...this.props} u={user} /></td>;
  };


  getCreditPointRating = points => {
    const pr = (points * 100) / 60;
    return (((pr) / 100) * 5).toFixed(1);
  };

  renderBody = () => {

    if (this.state.isLoading) {
      return;
    }

    const { users } = this.props;

    const start = moment().startOf('isoWeek').format('YYYY-MM-DD');
    const end = moment().endOf('isoWeek').format('YYYY-MM-DD');
    const m_start = moment().startOf('month').format('YYYY-MM-DD');
    const m_end = moment().endOf('month').format('YYYY-MM-DD');

    return users.map(m => {

      return (
        <tr key={m.id}>
          <td>{m.id}</td>
          <td>{m.name}</td>
          <td>{m.designation}</td>
          <td className="text-center"><Link className="btn btn-link" {...this.props.m} to={`/goals?user_id=${m.id}&start_date=${start}&end_date=${end}`}><i className="fas fa-list-ul" /></Link></td>
          <td className="text-center"><Link className="btn btn-link" to={`/offtimes?user_id=${m.id}&start_date=${m_start}&end_date=${m_end}`}><i class="fas fa-clock" /></Link></td>
          <td className="text-center">
            <Link className="btn btn-link" to={`/creditpoints?user_id=${m.id}&start_date=${m_start}&end_date=${m_end}`}>
              <i class="fas fa-star" />
            </Link>
          </td>
          {/* <td className="text-center">{this.getCreditPointRating(m.credit_points)}</td> */}
          <td className="text-center">
            <a href={m.cv}>
              <i className="color-dark fas fa-file-download" />
            </a>
          </td>
          {this.renderRolesCell(false, m)}
          {this.renderUserDetails(false, m)}
          <td className="text-center">
          {this.renderEditCell(false, m)}
          {this.renderDeleteCell(false, m)}
          </td>
        </tr>);
    });
  };

  renderCells = () => {
    return (
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Designation</th>
        <th>Goals</th>
        <th>Offtimes</th>
        <th>Credit Point</th>
        <th>CV</th>
        {this.renderRolesCell()}
        {this.renderUserDetails()}
        <th>Actions</th>
      </tr>
    );
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };


  filter = () => {
    let search = getSearchUrlFromState(this.state);
    this.get(search);
  };

  deleteUser(id) {

    let { user, deleteUser, dispatch, alertify } = this.props;

    deleteUser(user.accessToken, id).then(res => {
      dispatch({
        type: actions.DELETE_USER,
        payload: id
      });
      alertify.success(res.data.message);
    }).catch(({ response }) => {
      alertify.alert('Error ' + response.status + ' - ' + response.statusText, response.data.message);
    });
  }

  renderDeleteCell = (isHead = true, model = null) => {
    const { ability } = this.props;
    if (ability('employee-delete')) {
      return isHead ? <th>Actions</th> :<DeleteModal model={model.name + " Employee"} delete={() => this.deleteUser(model.id)} />;
    
    }
  };


  render() {

    let { page, totalPages, employee_type } = this.state;

    const { employee_types } = this.props.metaData;

    return (

      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="3" className="pt-2">
                     <h6><i className="fa fa-users mx-2" /> <b> Employees</b></h6>
                  </Col>

                  <Col md="1">
                    <CreateUser {...this.props} label={"Create"} />
                  </Col>

                  <Col md="8">
                    <InputGroup>


                      <Input type="select" name="employee_type" onChange={this.onChange} value={employee_type}>
                        <option value="" key="all" >All</option>
                        {employee_types.map(p => <option key={p.key} value={p.key} >{p.value}</option>)}
                      </Input>

                      <Input type="text" placeholder="Name" name="name" onChange={this.onChange} value={this.state.name} />
                      <Input type="text" placeholder="Email" name="email" onChange={this.onChange} value={this.state.email} />

                      {/* <Input type="number" placeholder="Number" name="number" onChange={this.onChange} value={this.state.number} />
                      <Input type="text" placeholder="Cnic" name="cnic" onChange={this.onChange} value={this.state.cnic} />
                      <Input type="text" placeholder="Address" name="address" onChange={this.onChange} value={this.state.address} /> */}


                      <InputGroupAddon addonType="append">
                        <Button type="button" color="warning" onClick={this.filter}><i className="fa fa-filter" /> Filter</Button>
                      </InputGroupAddon>

                    </InputGroup>
                  </Col>
                </Row>

              </CardHeader>
              <CardBody>
                <Table responsive bordered striped>
                  <thead>
                    {this.renderCells()}
                  </thead>
                  <tbody>
                    {this.renderBody()}
                  </tbody>
                </Table>

                <SimplePagination next={this.next} previous={this.previous} />
                <div className="text-center"> Page {page} of {totalPages}</div>

              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.UsersReducer.users,
    roles: state.RoleAndPermissionsReducer.roles,
    metaData: state.MetaDataReducer
  };
};

const mapDispatchToProps = () => {
  return {
    get: (token, search) => actions.getUsers(token, search),
    deleteUser: (token, id) => actions.deleteUser(token, id),

    getRoles: (token) => roleActions.getRoles(token),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
