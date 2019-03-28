import React, { Component } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminNav from "./AdminNav";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";

import * as actionsCreators from "../../Store/Actions/MetaDataActions";
import * as actions from "../../Store/Actions/RoleAndPermissionActions";
import * as authActions from "../../Store/Actions/AuthActions";

import { connect } from "react-redux";
import alertify from "alertifyjs";
import { filterNavLinks } from "../../util/functions";

import { can } from '../../util/functions';

import navigation from '../../_nav';
import routes from "../../routes";


alertify.set('notifier', 'position', 'top-right');

class AdminLayout extends Component {
  state = {
    isLoading: true
  };
  isAuthenticated = () => {
    return this.props.user !== null;
  };

  ability = (p, matchAll = false) => {
    let { permissions: prs } = this.props;
    return can(p, prs, matchAll);
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    let { fetchMetaData, dispatch, getAuthPermissions, user } = this.props;


    fetchMetaData(user.accessToken).then(res => {

      dispatch({
        type: actionsCreators.GET_META_DATA,
        payload: res.data.data
      });

    }).catch(this.errorHandler);

    getAuthPermissions(user.accessToken, user.id).then(res => {

      dispatch({
        type: authActions.GET_AUTH_PERMISSIONS,
        payload: res.data
      });

    }).catch(this.errorHandler).finally(() => {

      this.setState({
        isLoading: false
      });
    });
  }

  errorHandler = error => {

    let title = "Error";
    let message = "Something went wrong";

    if (error) {
      message = error.toString();
    }

    const { response } = error;

    if (response) {

      if (response.status === 401) {

        let { dispatch } = this.props;

        dispatch({
          type: authActions.LOGOUT
        });

        return;

      }

      title = 'Error ' + response.status + ' - ' + response.statusText;
      message = response.data.message;
    }

    alertify.alert(title, message);
  }


  render() {
    if (this.state.isLoading) {
      return false;
    }
    let { permissions } = this.props;

    if (permissions.length === 0) {
      return <p />;
    }

    let nav = filterNavLinks(navigation, permissions);

    return (

      <React.Fragment>

        <AdminHeader />

        <AdminNav nav={nav} />

        <div id="content" className="h-100">

          <div id="content-header">
            {/* <div id="breadcrumb">
              <a href="#">
                <i className="icon-home"></i> Home</a>
              <a href="#" className="current">SR7 Statement</a>
            </div> */}
          </div>

          <div className="container-fluid" style={{ padding: "30px" }}>
            <Switch>

              {routes.map((route, idx) => {
                return route.Component ? (
                  <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => {
                    if (this.isAuthenticated()) {
                      return <route.Component alertify={alertify} ability={this.ability} {...props} {...this.props} errorHandler={this.errorHandler} />
                    }
                    return <Redirect to='/login' />;
                  }}
                  />
                )
                  : (null);
              },
              )}
              <Redirect from="/" to="/dashboard" />

            </Switch>
          </div>

        </div>

        <AdminFooter />

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user,
    permissions: state.AuthReducer.permissions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    fetchMetaData: token => actionsCreators.getMetaData(token),
    getAuthPermissions: (token, id) => actions.getUserPermissions(token, id)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLayout);
