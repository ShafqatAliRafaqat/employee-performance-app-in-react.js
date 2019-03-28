import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';

import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table,
} from "reactstrap";

import _ from "lodash";


import SimplePagination from "../Common/SimplePagination";
import * as actions from "../../Store/Actions/Employee/EmployeeActions";

import { getSearchUrlFromState } from '../../util/functions'

class News extends Component {

    state = {
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
            });

            dispatch({
                type: actions.GET_EMPLOYEE_NEWS,
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

        const { news } = this.props;

        return news.map(m => {

            return (<tr key={m.id}>
                <td>{m.news}</td>
                <td>{m.created_at}</td>
            </tr>);
        });
    };

    renderCells = () => {
        return (
            <tr>

                <th>Details</th>
                <th>Date</th>

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

        return (
            <div className="animated fadeIn">
                <Row className="mb-3">
                    <Col xs="12" lg="12">
                        <Card className="d-goals-table">
                            <CardHeader>
                                <Row>
                                    <Col md="12" className="c-header">
                                        <h6><i className="fas fa-newspaper mx-2" /> <b> News</b></h6>
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
        news: state.EmployeeReducer.news,
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actions.getNews(token, search)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(News);
