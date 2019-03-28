import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';
import moment from "moment";

import { Link } from "react-router-dom";

import {
    Card,
    CardBody,
    CardHeader,
    Col, Row,
    Table,
} from "reactstrap";

import SimplePagination from "../../Common/SimplePagination";

import * as actions from "../../../Store/Actions/Employee/EmployeeActions";

import { getSearchUrlFromState } from '../../../util/functions';

class Offtimes extends Component {

    state = {
        start_date: "",
        end_date: "",
        page: 0,
        totalPages: 0,
        isLoading: true,
        previousTimeOffs: [],
        leaveRecord: null,
    };

    get = (search) => {

        this.setState({
            isLoading: true
        });

        let { get, dispatch, user,errorHandler } = this.props;

        get(user.accessToken, search).then(res => {

            this.setState({
                page: res.data.meta.current_page,
                totalPages: res.data.meta.last_page,
                previousTimeOffs: res.data.meta.TimeLine_History,
                leaveRecord: res.data.meta.Leave_History
            });

            dispatch({
                type: actions.GET_EMPLOYEE_OFFTIMES,
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

        const { start_date, end_date } = this.props;

        const start = moment().startOf('isoWeek').format('YYYY-MM-DD');
        const end = moment().endOf('isoWeek').format('YYYY-MM-DD');

        const data = {
            start_date: (start_date) ? start_date : start,
            end_date: (end_date) ? end_date : end,
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

    renderBody = () => {

        if (this.state.isLoading) {
            return;
        }

        const { offtimes } = this.props;
        const moment = require('moment');
        return offtimes.map(m => {

            return (
                <tr key={m.id}>
                    <td className="text-center">{m.date}</td>
                    <td className="text-center">{moment(m.login_time, 'hh:mm:ss').format('hh:mm:ss A')}</td>
                    <td className="text-center">{(m.logout_time) ? moment(m.logout_time, 'hh:mm:ss').format('hh:mm:ss A') : ""}</td>
                    <td className="text-center">{m.hours_worked}</td>
                    <td className="text-center">{m.hours_absent}</td>
                </tr>
            );
        });
    };

    renderCells = () => {
        return (
            <tr>
                <th>Date</th>
                <th>Login Time</th>
                <th>Logout Time</th>
                <th>Hours Worked</th>
                <th>Hours Absent</th>
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

    renderLeavesRecord = () => {

        const { leaveRecord } = this.state;

        const start = moment().startOf('year').format('YYYY-MM-DD');
        const end = moment().endOf('year').format('YYYY-MM-DD');

        if (leaveRecord) {
            const { total, utilized, full, short, remaining } = leaveRecord;
            return (
                <tr>
                    <td className="text-center">{total}</td>
                    <td className="text-center">{utilized}</td>
                    <td className="text-center">{full}</td>
                    <td className="text-center">{short}</td>
                    <td className="text-center">{remaining}</td>
                    <td className="text-center"><Link className="btn btn-link" to={`/employee/leaves?start_date=${start}&end_date=${end}`}><i class="fa fa-eye" /></Link></td>
                </tr>
            );
        }
    }

    render() {

        let { page, totalPages, previousTimeOffs } = this.state;

        return (

            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card className="mb-3">
                            <CardHeader>
                                <Row>
                                    <Col md="3">
                                        <h6><i className="far fa-clock mx-2" /> <b> Employee Off Times </b></h6>
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
                    <Col xs="12" lg="12">
                        <Card className="mb-3">
                            <CardHeader>
                                <Row>
                                    <Col md="3">
                                        <h6><i className="far fa-clock mx-2" /><b> Previous Off Times Record </b></h6>
                                    </Col>

                                </Row>

                            </CardHeader>
                            <CardBody>
                                <Table responsive bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Month</th>
                                            <th>Total Hours</th>
                                            <th>Hours Worked</th>
                                            <th>Hours Absent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previousTimeOffs.map(m => (
                                            <tr key={m.month}>
                                                <td className="text-center">{m.month}</td>
                                                <td className="text-center">{m.Total_hours}</td>
                                                <td className="text-center">{m.total_hours_worked}</td>
                                                <td className="text-center">{m.total_hours_absents}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md="3">
                                        <h6><i className="far fa-clock mx-2" /> <b> Current Year Leave Record</b> </h6>
                                    </Col>

                                </Row>

                            </CardHeader>
                            <CardBody>
                                <Table responsive bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Total Leaves</th>
                                            <th>Leaves Utilized</th>
                                            <th>Full Leaves</th>
                                            <th>Short Leaves</th>
                                            <th>Leaves Remaining</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderLeavesRecord()}
                                    </tbody>
                                </Table>
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
        offtimes: state.EmployeeReducer.offtimes
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actions.getOfftimes(token, search)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Offtimes);
