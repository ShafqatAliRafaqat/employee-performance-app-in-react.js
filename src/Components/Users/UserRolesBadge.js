import React, { Component } from "react";

import {
  Badge
} from "reactstrap";

import * as actions from "../../Store/Actions/RoleAndPermissionActions";
import { connect } from "react-redux";
import EditUserRoles from "./EditUserRoles";

class UserRolesBadge extends Component {

  state = {
    u: this.props.u,
    userRoles: [],
    isLoading: true
  };

  componentWillMount() {
    this.getUserRoles();
  }

  getUserRoles = () => {

    let { getUserRoles, user, dispatch, errorHandler } = this.props;

    getUserRoles(user.accessToken, this.state.u.id).then(res => {

      dispatch({
        type: actions.GET_USER_ROLES,
        payload: {
          id: this.state.u.id,
          roles: res.data.data
        }
      });

    }).catch(errorHandler).finally(() => {
      this.setState({
        isLoading: false
      });
    });

  };


  getCurrentUserRoles = () => {
    let { usersRoles } = this.props;
    let roles = [];

    if (usersRoles) {
      usersRoles.map(ur => {
        if (ur.id === this.state.u.id) {
          roles = ur.roles;
        }
      });
    }
    return roles;
  };


  renderEditRoles = (roles) => {
    if (this.state.isLoading) {
      return <p>Loading...</p>
    }
    return <EditUserRoles userRoles={roles} {...this.props} />;
  };

  render() {
    let roles = this.getCurrentUserRoles();
    return (
      <div className="item">
        {roles.map(r => <Badge key={r.id} color="success" style={{ margin: '.1rem' }}>{r.name}</Badge>)}
        {this.renderEditRoles(roles)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersRoles: state.RoleAndPermissionsReducer.usersRoles,
  };
};

const mapDispatchToProps = () => {
  return {
    getUserRoles: (token, id) => actions.getUserRoles(token, id),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRolesBadge);
