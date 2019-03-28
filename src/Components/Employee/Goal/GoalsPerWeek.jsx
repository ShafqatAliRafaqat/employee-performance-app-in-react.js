import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';
import moment from "moment";

import {
    Card,
    CardBody,
    CardHeader,
    Col, Row,
    Table,
} from "reactstrap";

import SimplePagination from "../../Common/SimplePagination";

import * as actions from "../../../Store/Actions/Employee/GoalActions";

import { getSearchUrlFromState } from '../../../util/functions'

import EditGoal from "./EditGoal";
import CreateGoal from "./CreateGoal";
import GoalsDetails from "./GoalDetail";

class GoalsPerWeek extends Component {

    state = {
        user_id: "",
        goalsString: "Goals",
        page: 0,
        totalPages: 0,
        isLoading: true
    };

    get = (search) => {

        this.setState({
            isLoading: true
        });

        let { get, dispatch, user, errorHandler } = this.props;

        get(user.accessToken, search).then(res => {

            this.setState({
                page: res.data.meta.current_page,
                totalPages: res.data.meta.last_page,
                goalsString: res.data.meta.Goals_String,
                goals_color: res.data.meta.goals_color,
            });

            dispatch({
                type: actions.GET_EMPLOYEE_GOALS,
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
        let params = qs.parse(search);

        const start = moment().startOf('isoWeek').format('YYYY-MM-DD');
        const end = moment().endOf('isoWeek').format('YYYY-MM-DD');

        const data = {
            start_date: (this.props.start_date) ? this.props.start_date : start,
            end_date: (this.props.end_date) ? this.props.end_date : end,
        }

        params = { ...params, ...data }

        search = getSearchUrlFromState(params);

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

    renderDetailsCell = (isHead = true, modal = null) => {
        const { ability } = this.props;
        return isHead ? <th>Goal Details</th> : <td className="text-center"><GoalsDetails {...this.props} goals={modal} /></td>;
    };

    renderBody = () => {

        if (this.state.isLoading) {
            return;
        }

        const { goals_color } = this.state;

        const { tableGoals } = this.props;

        return tableGoals.map(m => {

            return (
                <tr key={m.id} style={{ backgroundColor: goals_color[m.status] }}>
                    <td>{m.day}</td>
                    <td>{m.start_date}</td>
                    <td>{m.end_date}</td>
                    <td className="text-center">{m.status}</td>
                    {this.renderDetailsCell(false, m)}
                    <td className="text-center">
                        {(m.file) ? <a href={m.file}> <i className="color-dark fas fa-file-download" /></a> : "No File"}
                    </td>

                    <td className="text-center"><EditGoal {...this.props} goal={m} /></td>
                </tr>
            );
        });
    };

    renderCells = () => {
        return (
            <tr>
                <th>Start Day</th>
                <th>Start Date</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Goal Details</th>
                <th>Goal PDF</th>
                <th>Edit</th>
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


    render() {
        let { goalsString } = this.state;
        return (

            <div className="animated fadeIn">
                <Row className="mb-3">
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md="10" className="pt-2">
                                        <h6> <i className="fas fa-tasks mx-2" /> <b>{goalsString}</b></h6>
                                    </Col>

                                    <Col md="2">
                                        <CreateGoal {...this.props} />
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
        tableGoals: state.EmployeeGoalReducer.tableGoals,
        metaData: state.MetaDataReducer
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actions.getGoals(token, search)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoalsPerWeek);
