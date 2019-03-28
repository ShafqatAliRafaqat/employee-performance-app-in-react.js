import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';
import * as actions from "../../Store/Actions/GoalActions";
import { getSearchUrlFromState } from '../../util/functions'
import moment from "moment";
import GoalsDetails from "./GoalDetail";
import {
    Card,
    CardBody,
    CardHeader,
    Col, Row,
    Table,
} from "reactstrap";

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

    get = (search) => {

        this.setState({
            isLoading: true
        });

        let { get, dispatch, user,  errorHandler } = this.props;

        get(user.accessToken, search).then(res => {

            this.setState({
                page: res.data.meta.current_page,
                totalPages: res.data.meta.last_page,
                goals_color: res.data.meta.goals_color,
                goalsString: res.data.meta.Goals_String,
            });

            dispatch({
                type: actions.GET_GOALS,
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


        const today = moment();
        const date = today.format('YYYY-MM-DD');

        const data = {
            start_date: (this.props.start_date) ? this.props.start_date : date,
            end_date: (this.props.end_date) ? this.props.end_date : date,
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
        // const { ability } = this.props;
        return isHead ? <th>Goal Details</th> : <td className="text-center"><GoalsDetails {...this.props} goals={modal} /></td>;
    };
    renderBody = (goals) => {

        if (this.state.isLoading) {
            return false;
        }
        const { goals_color } = this.state;

        return goals.map(m => {

            return (
                <tr key={m.id} style={{ backgroundColor: goals_color[m.status] }}>
                    <td className="text-center">{m.day}</td>
                    <td>{m.Users[0].name}</td>
                    <td className="text-center">{m.start_date}</td>
                    <td className="text-center">{m.end_date}</td>
                    <td className="text-center">{m.status}</td>
                    {this.renderDetailsCell(false, m)}
                    <td className="text-center">
                        {(m.file) ? <a href={m.file}> <i className="color-dark fas fa-file-download" /></a> : "No File"}
                    </td>

                </tr>
            );
        });
    };

    renderCells = () => {
        return (
            <tr>
                <th>Day</th>
                <th>Employee</th>
                <th>Start Date</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Goal Details</th>
                <th>Goal PDF</th>
            </tr>
        );
    };

    renderEmployeeGoalsTable(goals, type) {
        let { goalsString } = this.state;

        return (
            <React.Fragment>
                <Row className="mb-3">
                    <Col xs="12" lg="12">
                        <Card className="d-goals-table">
                            <CardHeader>
                                <Row>
                                    <Col md="12" className="c-header">
                                        <h6>  <i className="fas fa-tasks mx-2" /> <b> {type} {goalsString}</b></h6>
                                    </Col>
                                </Row>

                            </CardHeader>
                            <CardBody>
                                <Table responsive bordered striped>
                                    <thead>
                                        {this.renderCells()}
                                    </thead>
                                    <tbody>
                                        {this.renderBody(goals)}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    filter = () => {
        let search = getSearchUrlFromState(this.state);
        this.get(search);
    };

    deleteGoal(id) {

        let { user, deleteGoal, dispatch, alertify, errorHandler } = this.props;

        deleteGoal(user.accessToken, id).then(res => {

            dispatch({
                type: actions.DELETE_GOAL,
                payload: id
            });

            alertify.success(res.data.message);

        }).catch(errorHandler);
    }

    render() {
        if (this.state.isLoading) {
            return false;
        }
        let { goals } = this.props;

        const tech = goals.filter(g => (g.Users[0].employee_type === "technical"));
        const business = goals.filter(g => (g.Users[0].employee_type === "business"));

        return (

            <div className="animated fadeIn">

                {this.renderEmployeeGoalsTable(business, "Business Team")}
                {this.renderEmployeeGoalsTable(tech, "Technial Team")}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        goals: state.GoalReducer.goals,
        metaData: state.MetaDataReducer
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actions.getGoals(token, search),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Goals);
