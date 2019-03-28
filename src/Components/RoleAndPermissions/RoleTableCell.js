import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/RoleAndPermissionActions";

import PermissionsBadge from './PermissionsBadge';
import EditRole from "./EditRole";
import { can } from "../../util/functions";


class RoleTableCell extends Component {

  state = {
    loading: true,
    permissions: []
  };

  componentDidMount() {
    this.getRolePermissions();
  }

  componentWillReceiveProps(nextProps) {
    this.getRolePermissions();
  }

  getRolePermissions = () => {

    let { r, token, getRolePermissions, errorHandler } = this.props;

    getRolePermissions(token, r.id)
      .then(res => {
        this.setState({
          permissions: res.data.data
        });
      })
      .catch(errorHandler).finally(() => {
        this.setState({
          loading: false
        })
      });
  };

  renderPermissionsBadge = () => {
    if (this.state.loading) {
      return <p>Loading...</p>
    }
    return <PermissionsBadge permissions={this.state.permissions} />
  };

  renderEditRoleButton = (r) => {

    let { permissions: prs } = this.props;
    if (can('role-permission-update', prs)) {
      if (this.state.loading) {
        return <td><p>Loading...</p></td>
      }
      return <td><EditRole r={r} rolePermissions={this.state.permissions} {...this.props} /></td>
    }

  };

  render() {
    let { r } = this.props;
    return (
      <tr key={r.id}>
        <td>{r.name}</td>
        <td>{this.renderPermissionsBadge()}</td>
        {this.renderEditRoleButton(r)}
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.AuthReducer.user.accessToken,
  };
};

const mapDispatchToProps = () => {
  return {
    getRolePermissions: (token, id) => actions.getRolePermissions(token, id)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleTableCell);
