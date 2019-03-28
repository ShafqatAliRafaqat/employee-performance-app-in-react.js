import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';

import {
    Card,
    CardBody,
    CardHeader,
    Col, Input, InputGroup, InputGroupAddon,
    Button,
    Row,
    Table,
} from "reactstrap";

import _ from "lodash";


import SimplePagination from "../Common/SimplePagination";
import * as actions from "../../Store/Actions/NewActions";

import { getSearchUrlFromState } from '../../util/functions'

import CreateNews from "./CreateNews";
import EditNews from "./EditNews";
import DeleteModal from "../Common/Modals/DeleteModal";

class News extends Component {

    state = {
        news: "",
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
                totalPages: res.data.meta.last_page,
            });

            dispatch({
                type: actions.GET_NEWS,
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

    renderEditCell = (isHead = true, model = null) => {
        const { ability } = this.props;
        if (ability('news-update')) {
            return isHead ? <th>Edit</th> : <td><EditNews {...this.props} news={model} /></td>;
        }
    };

    renderBody = () => {

        if (this.state.isLoading) {
            return;
        }

        const { news } = this.props;

        return news.map(m => {

            return (
                <tr key={m.id}>
                    <td>{m.id}</td>
                    <td>{m.news}</td>
                    <td>{m.created_at}</td>
                    {this.renderEditCell(false, m)}
                    {this.renderDeleteCell(false, m)}
                </tr>
            );
        });
    };

    renderCells = () => {
        return (
            <tr>
                <th>ID</th>
                <th>News</th>
                <th>Date</th>
                {this.renderEditCell()}
                {this.renderDeleteCell()}
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

    deleteNews(id) {

        let { user, deleteNews, dispatch, alertify } = this.props;

        deleteNews(user.accessToken, id).then(res => {

            dispatch({
                type: actions.DELETE_NEWS,
                payload: id
            });

            alertify.success(res.data.message);

        }).catch(({ response }) => {
            alertify.alert('Error ' + response.status + ' - ' + response.statusText, response.data.message);
        });
    }

    renderDeleteCell = (isHead = true, model = null) => {
        const { ability } = this.props;
        if (ability('news-delete')) {
            return isHead ? <th>Delete</th> : <td><DeleteModal model="News" delete={() => this.deleteNews(model.id)} /></td>;
        }
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
                                    <Col md="5" className="mt-2">
                                        <h6><i className="fa fa-newspaper mx-2" /> <b> News</b> </h6>
                                    </Col>

                                    <Col md="2">
                                        <CreateNews {...this.props} />
                                    </Col>
                                    <Col md="5">
                                        <InputGroup>
                                            <Input type="text" placeholder="Search" name="news" onChange={this.onChange} value={this.state.news} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="warning" onClick={this.filter}><i className="fa fa-filter" /> Filter</Button>
                                            </InputGroupAddon>
                                        </InputGroup>
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
                                <div className="text-center"> <div className="text-center">Page {page} of {totalPages}</div></div>

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
        news: state.NewReducer.news,
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actions.getNews(token, search),
        deleteNews: (token, id) => actions.deleteNews(token, id),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(News);
