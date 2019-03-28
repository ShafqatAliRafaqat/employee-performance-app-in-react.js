import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';

import {
    Card,
    CardBody,
    CardHeader,
    Col, Row,
    Table,
} from "reactstrap";

import SimplePagination from "../../Common/SimplePagination";

import * as actions from "../../../Store/Actions/Employee/EmployeeActions";

import { getSearchUrlFromState } from '../../../util/functions'

import BooleanBadge from "../../Common/BooleanBadge";


class Leaves extends Component {

    state = {
        page: 0,
        totalPages: 0,
        isLoading: true
    };

    get = (search) => {

        this.setState({
            isLoading: true
        });

        let { get, dispatch, user, alertify, errorHandler } = this.props;

        get(user.accessToken, search).then(res => {

            this.setState({
                page: res.data.meta.current_page,
                totalPages: res.data.meta.last_page
            });

            dispatch({
                type: actions.GET_EMPLOYEE_LEAVES,
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

    renderBody = () => {

        if (this.state.isLoading) {
            return;
        }

        const { leaves } = this.props;

        return leaves.map(m => {

            return (
                <tr key={m.id}>
                    <td className="text-center">{m.leave_date}</td>
                    <td className="text-center">{m.leave_type}</td>
                    <td className="text-center">{(m.isFull == '1') ? "Full" : "Short"}</td>
                    <td className="text-center"><BooleanBadge boolean={m.isTracked} /></td>
                    <td className="text-center">{m.detail}</td>
                </tr>
            );
        });
    };

    renderCells = () => {
        return (
            <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Leave</th>
                <th>Tracking</th>
                <th>Details</th>
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

        let { page, totalPages } = this.state;

        return (

            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md="12" className="mt-2">
                                        <h6><i className="fas fa-user-slash mx-2" /> <b> Leaves </b> </h6>
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        leaves: state.EmployeeReducer.leaves,
        metaData: state.MetaDataReducer
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actions.getLeaves(token, search)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Leaves);
