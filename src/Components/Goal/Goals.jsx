import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {
    Card,
    CardBody,
    CardHeader,
    Col, Row,
    Table,
} from "reactstrap";

import SimplePagination from "../Common/SimplePagination";

import * as actions from "../../Store/Actions/GoalActions";

import { getSearchUrlFromState } from '../../util/functions'

import CreateGoal from "./CreateGoal";

import EditGoal from "./EditGoal";

import DeleteModal from "../Common/Modals/DeleteModal";
import TextModal from "../Common/Modals/TextModal";
import dates from '../../util/dates'
import Calender from "./Calander";
import GoalsDetails from "./GoalDetail";

class Goals extends Component {

    state = {

        start_date: "",
        end_date: "",
        user_id: "",
        goalsString: "Goals",
        page: 0,
        totalPages: 0,
        isLoading: true
    };

    get = (search, action) => {

        this.setState({
            isLoading: true
        });

        let { get, dispatch, user, alertify, errorHandler } = this.props;

        get(user.accessToken, search).then(res => {

            this.setState({
                page: res.data.meta.current_page,
                totalPages: res.data.meta.last_page,
                goalsString: res.data.meta.Goals_String,
                Total_Goals: res.data.meta.Total_Goals,
                goals_complated: res.data.meta.goals_complated,
                // goals_upcoming: res.data.meta.goals_upcoming,
                goals_ongoing: res.data.meta.goals_ongoing,
                // goals_paused: res.data.meta.goals_paused,
                // goals_canceled: res.data.meta.goals_canceled,
                goals_late: res.data.meta.goals_late,
                goals_earlydone: res.data.meta.goals_earlydone,
                goals_color: res.data.meta.goals_color,
                user: res.data.meta.user,
                credit_point: res.data.meta.credit_point,
            });

            dispatch({
                type: action,
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
        let st = {};
        for (let key in params) {
            st = {
                ...st,
                [key]: params[key]
            }
        }

        this.setState(st);

        const { user_id } = st;

        this.get(search, actions.GET_GOALS);
        this.get("?user_id=" + user_id, actions.GET_CALANDER_GOALS);
    }



    next = () => {
        let next = this.state.page + 1;
        if (next <= this.state.totalPages) {
            let search = getSearchUrlFromState(this.state);
            this.get(search + "page=" + next, actions.GET_GOALS);
        }
    };

    previous = () => {
        let previous = this.state.page - 1;
        if (previous > 0) {
            let search = getSearchUrlFromState(this.state);
            this.get(search + "page=" + previous, actions.GET_GOALS);
        }
    };

    renderEditCell = (isHead = true, modal = null) => {

        const { ability } = this.props;
        if (ability('goal-update')) {
            return isHead ? <th>Actions</th> : <EditGoal {...this.props} goal={modal} />;
        }
    };

    renderDeleteCell = (isHead = true, model = null) => {
        const { ability } = this.props;
        if (ability('goal-delete')) {
            return isHead ? <th>Actions</th> : <DeleteModal model="Goal" delete={() => this.deleteGoal(model.id)} />;
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
        const { goals } = this.props;
        const { goals_color } = this.state;
        return goals.map(m => {

            return (
                <tr key={m.id} style={{backgroundColor:goals_color[m.status] }}>
                    <td>{m.day}</td>
                    <td>{m.start_date}</td>
                    <td>{m.end_date}</td>
                    <td>{m.status}</td>
                    <td>{m.Project.name}</td>
                    {this.renderDetailsCell(false, m)}
                    <td className="text-center">
                        {(m.file) ? <a href={m.file}> <i className="color-dark fas fa-file-download" /></a> : "No File"}
                    </td>
                    <td className="text-center">
                        {this.renderEditCell(false, m)}
                        {this.renderDeleteCell(false, m)}
                    </td>


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
                <th>Project</th>
                <th>Goal Details</th>
                <th>Goal PDF</th>
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
        this.get(search, actions.GET_GOALS);
    };

    deleteGoal(id) {

        let { user, deleteGoal, dispatch, alertify } = this.props;

        deleteGoal(user.accessToken, id).then(res => {

            dispatch({
                type: actions.DELETE_GOAL,
                payload: id
            });

            alertify.success(res.data.message);

        }).catch(({ response }) => {
            alertify.alert('Error ' + response.status + ' - ' + response.statusText, response.data.message);
        });
    }



    render() {

        let { page, totalPages, name, status, user_id, user, goalsString, goals_color, goals_earlydone, goals_late, credit_point,
            Total_Goals, goals_complated, goals_upcoming, goals_ongoing, goals_paused, goals_canceled, } = this.state;

        return (

            <div className="animated fadeIn">
                <Row className="mb-3">
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md="10" className="pt-2">
                                        <h6> <i className="fas fa-tasks mx-2" /><b> {goalsString} of {(user) ? user.name : ""}</b></h6>
                                    </Col>
                                    <Col md="2">
                                        <CreateGoal {...this.props} user_id={user_id} />
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
                                <div className="text-center">Page {page} of {totalPages}</div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs="12" lg="12">
                        <Card className="d-goals-table">
                            <CardHeader>
                                <Row>
                                    <Col md="12" className="c-header">
                                        <h6> <i class="fas fa-tasks mx-2" /> <b> {goalsString} of {(user) ? user.name : ""}</b> </h6>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Calender {...this.props} goals_color={goals_color} Total_Goals={Total_Goals}
                                    goals_late={goals_late} credit_point={credit_point}
                                    goals_complated={goals_complated} goals_ongoing={goals_ongoing}
                                    goals_earlydone={goals_earlydone} />
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
        goals: state.GoalReducer.goals,
        calanderGoals: state.GoalReducer.calanderGoals,
        metaData: state.MetaDataReducer
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actions.getGoals(token, search),
        deleteGoal: (token, id) => actions.deleteGoal(token, id),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Goals);
