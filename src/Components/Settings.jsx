import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Card, CardFooter,
  CardBody,
  CardHeader,
  Col, Input,
  Button,
  Row,
  FormGroup,
  Label
} from "reactstrap";

import * as actions from "../Store/Actions/MetaDataActions";

class Settings extends Component {

  state = {
    isLoading: false,
    updating: false,
    settings: []
  };

  getSettings = () => {

    this.setLoading(true);

    let { user, fetchData, dispatch, alertify } = this.props;

    fetchData(user.accessToken).then(res => {

      dispatch({
        type: actions.GET_SETTINGS,
        payload: res.data.data
      });

      this.setState({
        settings: res.data.data
      });

    }).catch(({ response }) => {
      alertify.alert('Error ' + response.status + ' - ' + response.statusText, response.data.message);
    }).finally(() => {
      this.setLoading(false);
    });
  };

  setLoading = v => {
    this.setState({
      isLoading: v
    });
  };

  onChange = (e, s) => {

    const settings = this.state.settings.map(v => {
      if (s.key === v.key) return { ...s, value: e.target.value };
      else return { ...v };
    });

    this.setState({
      settings
    });
  };

  saveSettings = () => {

    this.setState({
      updating: true
    });

    let { user, editSettings, dispatch, alertify } = this.props;
    let { settings } = this.state;

    editSettings(user.accessToken, settings).then(res => {
      dispatch({
        type: actions.EDIT_SETTINGS,
        payload: settings
      });
      alertify.success(res.data.message);
    })
      .catch(this.props.errorHandler).finally(() => {
        this.setState({
          updating: false
        });
      });
  };

  componentDidMount() {
    this.getSettings();
  }

  renderCardBody() {

    const { settings } = this.state;

    let jsx = [];

    settings.forEach(s => {

      jsx.push(
        <Row key={s.key}>
          <Col xs="12">
            <FormGroup>
              <Label htmlFor={s.key}>{s.name}</Label>
              <Input type="text" name={s.key} placeholder={s.name} value={s.value} required onChange={e => this.onChange(e, s)} />
            </FormGroup>
          </Col>
        </Row>
      );
    });

    return jsx;
  }

  renderEditSettingsButton() {
    let { ability } = this.props;
    if (ability('setting-edit')) {
      return (
        <CardFooter className="text-center">
          <Button disabled={this.state.updating} onClick={this.saveSettings} type="submit" size="sm" color="primary"><i className="fa fa-pencil" />
            {(this.state.updating) ? " Updating..." : " Update Setting"}
          </Button>
        </CardFooter>
      );
    }
  }

  render() {

    if (this.state.isLoading) {
      return <p>Loading....</p>
    }

    return (<div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <Row>
                <Col md="3" className="mt-2">
                  <h6><i className="fa fa-cogs mx-2" /> <b> Settings </b></h6>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
            <div className="container-fluid">
              {this.renderCardBody()}
            </div>
            </CardBody>
              {this.renderEditSettingsButton()}
          </Card>
        </Col>
      </Row>
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    settings: state.MetaDataReducer.settings
  };
};

const mapDispatchToProps = () => {
  return {
    fetchData: token => actions.getSettings(token),
    editSettings: (token, settings) => actions.editSettings(token, settings)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
