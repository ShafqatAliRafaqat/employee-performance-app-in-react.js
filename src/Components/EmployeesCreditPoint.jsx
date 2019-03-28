import React, { Component } from "react";
import { connect } from "react-redux";
import { HorizontalBar } from "react-chartjs-2";

import { Card, CardBody, CardHeader, Col, Row} from "reactstrap";

import _ from "lodash";

import * as actions from "../Store/Actions/Employee/EmployeeActions";

class EmplopyeeCreditPoints extends Component {
  state = {
    isLoading: true
  };

  get = () => {
    this.setState({
      isLoading: true
    });

    let { get, dispatch, user, errorHandler } = this.props;

    get(user.accessToken)
      .then(res => {
        dispatch({
          type: actions.GET_EMPLOYEES_CREDIT_POINTS,
          payload: res.data
        });
      })
      .catch(errorHandler)
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  componentDidMount() {
    this.get();
  }

  renderBody = creditPoints => {
    if (this.state.isLoading) {
      return;
    }

    return creditPoints.map(m => {
      return (
        <tr key={m.id}>
          <td>{m.name}</td>
          <td>{m.points ? m.points : "0"}</td>
        </tr>
      );
    });
  };

  renderCells = () => {
    return (
      <tr>
        <th>Name</th>
        <th>Points</th>
      </tr>
    );
  };

  renderTable(team, type) {

    return (
      <Row className="mb-3">
        <Col xs="12" lg="12">
          <Card className="d-goals-table">
            <CardHeader>
              <Row>
                <Col md="12" className="c-header">
                  <h6> <i className="fas fa-award mx-2" /><b>{type} Employee of the Month</b></h6>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <HorizontalBar
                data={{
                  labels: team.map(e => e.name),
                  datasets: [
                    {
                      label: " Employee of the Month",
                      data: team.map(e => (e.points ? e.points : 0)),
                      backgroundColor: (type === "Technical Team") ? '#28b779' : '#da542e',
                      borderColor: '#33dd66',
                      animation: true,
                    }
                  ]
                }}
                options={{ maintainAspectRatio: true }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }

  render() {
    let { creditPoints, user } = this.props;
    
    const { employee_type } = user;

    const tech = creditPoints.filter(g => g.employee_type == "technical");
    const business = creditPoints.filter(g => g.employee_type == "business");

    return (
      <div className="animated fadeIn">

        {(employee_type === "technical") ? this.renderTable(tech, "Technical Team") : (employee_type === "business") ? this.renderTable(business, "Business Team") : [this.renderTable(tech, "Technical Team"), this.renderTable(business, "Business Team") ] }

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    creditPoints: state.EmployeeReducer.creditPoints
  };
};

const mapDispatchToProps = () => {
  return {
    get: token => actions.getEmployeesCreditPoints(token)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmplopyeeCreditPoints);
