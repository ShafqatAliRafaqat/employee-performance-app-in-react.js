import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {
    Card,
    CardBody,
    CardHeader,
    Col, Row,
} from "reactstrap";
import * as actions from "../../../Store/Actions/Employee/GoalActions";
import { getSearchUrlFromState } from '../../../util/functions'
import Calender from "../../Goal/Calander";

class GoalsCalander extends Component {

    state = {

        start_date: "",
        end_date: "",
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
                Total_Goals: res.data.meta.Total_Goals,
                goals_complated: res.data.meta.goals_complated,
                // goals_upcoming: res.data.meta.goals_upcoming,
                goals_ongoing: res.data.meta.goals_ongoing,
                // goals_paused: res.data.meta.goals_paused,
                // goals_canceled: res.data.meta.goals_canceled,
                goals_late: res.data.meta.goals_late,
                goals_earlydone: res.data.meta.goals_earlydone,
                goals_color: res.data.meta.goals_color,
                credit_point: res.data.meta.credit_point,
            });

            dispatch({
                type: actions.GET_EMPLOYEE_GOALS_CALENDAR,
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

        const start = moment().startOf('year').format('YYYY-MM-DD');
        const end = moment().endOf('year').format('YYYY-MM-DD');

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

    render() {
        if (this.state.isLoading) {
            return false;
        }
        let { credit_point, goalsString, goals_color, goals_earlydone, goals_late,
            Total_Goals, goals_complated, goals_upcoming, goals_ongoing, goals_paused, goals_canceled, } = this.state;
        const { goals: calanderGoals, user } = this.props;
        return (

            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md="12" className="mt-2">
                                        <h6><i class="fa fa-tasks mx-2" /> <b> {goalsString} of {(user) ? user.name.toUpperCase() : ""}</b></h6>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Calender {...this.props} goals_color={goals_color} Total_Goals={Total_Goals} goals_late={goals_late}
                                    goals_complated={goals_complated} goals_upcoming={goals_upcoming} goals_ongoing={goals_ongoing} credit_point={credit_point}
                                    goals_paused={goals_paused} goals_canceled={goals_canceled} calanderGoals={calanderGoals} goals_earlydone={goals_earlydone} />
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
        goals: state.EmployeeGoalReducer.goals,
        metaData: state.MetaDataReducer,
        calanderGoals: state.GoalReducer.calanderGoals,
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actions.getGoalsCalendar(token, search)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoalsCalander);
