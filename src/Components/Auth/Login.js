import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionsCreators from "../../Store/Actions/AuthActions";
import alertify from 'alertifyjs';
import "../../assets/css/matrix-login.css";

class Login extends Component {

  state = {
    email: "",
    password: "",
    error: "",
    inProgress: false,
  };

  componentWillMount() {
    if (this.props.user) {
      this.props.history.push("/");
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  login = () => {

    let { login, dispatch, history } = this.props;

    this.setState({
      inProgress: true
    });

    const { email, password } = this.state;

    const params = { email, password };

    login(params).then(res => {

      dispatch({
        type: actionsCreators.LOGIN,
        payload: res.data
      });

      history.push("/");

    }).catch(({ response }) => {
      alertify.alert('Error ' + response.status + ' - ' + response.statusText, response.data.message);
    }).finally(() => {
      this.setState({
        inProgress: false
      });
    });
  };

  render() {

    const { email, inProgress, password } = this.state;

    return (
      <div className="container-fluid" style={{ marginTop: "50px" }}>

        <div id="loginbox">

          <div className="outerbox">

            <form id="loginform" className="form-vertical">
              <div className="control-group normal_text"><div className="height30"></div> <h3> <img src="images/images_backend/logo.png" alt="Logo" /></h3></div>
              <div className="control-group">
                <div className="controls">
                  <div className="main_input_box">
                    <span className="add-on bg_lg"><i className="icon-user"> </i></span>
                    <input type="email" name="email" placeholder="Email"
                      value={email}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="control-group">
                <div className="controls">
                  <div className="main_input_box">
                    <span className="add-on bg_ly"><i className="icon-lock"></i></span>
                    <input type="password" name="password" placeholder="Password"
                      value={password}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">

                <span className="pull-left"><a href="#" className="flip-link btn btn-info" id="to-recover">Lost password?</a></span>

                <span className="pull-right">
                  <input type="button" value={(inProgress) ? "Please wait..." : "Login"} disabled={inProgress} onClick={this.login} className="btn btn-success" />
                </span>

              </div>
            </form>

            <form id="recoverform" action="#" className="form-vertical">
              <p className="normal_text">Enter your e-mail address below and we will send you instructions how to recover a password.</p>

              <div className="controls">
                <div className="main_input_box">
                  <span className="add-on bg_lo"><i className="icon-envelope"></i></span>
                  <input type="text" placeholder="E-mail address" />
                </div>
              </div>

              <div className="form-actions">
                <span className="pull-left"><a href="#" className="flip-link btn btn-success" id="to-login">&laquo; Back to login</a></span>
                <span className="pull-right"><a className="btn btn-info">Reecover</a></span>
              </div>

            </form>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.AuthReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    login: data => actionsCreators.login(data)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
