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

import SimplePagination from "../Common/SimplePagination";

import * as actions from "../../Store/Actions/OffTimeActions";

import { getSearchUrlFromState } from '../../util/functions'

import EditOfftime from "./EditOfftime";

import DeleteModal from "../Common/Modals/DeleteModal";



class Offtimes extends Component {

    state = {
        start_date: "",
        end_date: "",
        user_id: "",
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

        let { get, dispatch, user, errorHandler } = this.props;

        get(user.accessToken, search).then(res => {

            this.setState({
                page: res.data.meta.current_page,
                totalPages: res.data.meta.last_page,
                previousTimeOffs: res.data.meta.TimeLine_History,
                leaveRecord: res.data.meta.Leave_History,
                user: res.data.meta.user,
            });

            dispatch({
                type: actions.GET_OFFTIMES,
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

    renderEditCell = (isHead = true, modal = null) => {
        const { ability } = this.props;
        if (ability('timeline-update')) {
            return isHead ? <th>Edit</th> : <td><EditOfftime {...this.props} offtime={modal} /></td>;
        }
    };

    renderDeleteCell = (isHead = true, model = null) => {
        const { ability } = this.props;
        if (ability('timeline-delete')) {
            return isHead ? <th>Delete</th> : <td><DeleteModal model="Offtime" delete={() => this.deleteOfftime(model.id)} /></td>;
        }
    };

    renderBody = () => {

        if (this.state.isLoading) {
            return;
        }

        const { offtimes } = this.props;
        console.log(offtimes);
        if (!offtimes) {
            return ;
        }
        return offtimes.map(m => {

            return (
                <tr key={m.id}>

                    <td className="text-center">{m.date}</td>
                    <td className="text-center">{moment(m.login_time, 'hh:mm:ss').format('hh:mm:ss A')}</td>
                    <td className="text-center">{(m.logout_time) ? moment(m.logout_time, 'hh:mm:ss').format('hh:mm:ss A') : ""}</td>
                    <td className="text-center">{m.hours_worked}</td>
                    <td className="text-center">{m.hours_absent}</td>

                    {/* {this.renderEditCell(false, m)}
                    {this.renderDeleteCell(false, m)} */}

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
                {/* {this.renderEditCell()}
                {this.renderDeleteCell()} */}
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

    deleteOfftime(id) {

        let { user, deleteOfftime, dispatch, alertify } = this.props;

        deleteOfftime(user.accessToken, id).then(res => {

            dispatch({
                type: actions.DELETE_OFFTIME,
                payload: id
            });

            alertify.success(res.data.message);

        }).catch(({ response }) => {
            alertify.alert('Error ' + response.status + ' - ' + response.statusText, response.data.message);
        });
    }


    renderLeavesRecord = () => {
        const { leaveRecord, user_id } = this.state;

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
                    <td className="text-center"><Link className="btn btn-link" to={`/leaves?user_id=${user_id}&start_date=${start}&end_date=${end}`}><i class="fa fa-eye" /></Link></td>
                </tr>
            );
        }
    }

    render() {

        let { page, totalPages, user_id, user, previousTimeOffs } = this.state;


        return (

            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card className="mb-3">
                            <CardHeader>
                                <Row>
                                    <Col md="12" className="mt-2">
                                        <h6><i className="far fa-clock px-2" /> <b> {(user) ? user.name : ""} Off Times</b></h6>
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
                                <div className="text-center">
                                    Page {page} of {totalPages}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" lg="12">
                        <Card className="mb-3">
                            <CardHeader>
                                <Row>
                                    <Col md="12" className="mt-2">
                                        <h6><i className="far fa-clock mx-2" /><b> Previous Off Times Record {(user) ? "Of " + user.name : ""}</b></h6>
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
                                    <Col md="12" className="mt-2">
                                        <h6><i className="far fa-clock mx-2" />  <b> Current Year Leave Record {(user) ? "Of " + user.name : ""}</b></h6>
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
        offtimes: state.OffTimeReducer.offtimes
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actions.getOfftimes(token, search),
        deleteOfftime: (token, id) => actions.deleteOfftime(token, id),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Offtimes);
