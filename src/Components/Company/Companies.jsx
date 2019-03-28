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


import SimplePagination from "../Common/SimplePagination";
import * as actions from "../../Store/Actions/CompanyActions";

import { getSearchUrlFromState } from '../../util/functions'

import CreateCompany from "./CreateCompany";
import EditCompany from "./EditCompany";
import DeleteModal from "../Common/Modals/DeleteModal";

class Companies extends Component {

    state = {
        name: "",

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
                type: actions.GET_COMPANIES,
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

    renderEditCell = (isHead = true, company = null) => {
        const { ability } = this.props;
        if (ability('company-update')) {
            return isHead ? <th>Edit</th> : <td><EditCompany {...this.props} company={company} /></td>;
        }
    };

    renderBody = () => {

        if (this.state.isLoading) {
            return;
        }

        const { companies } = this.props;

        return companies.map(m => {

            return (<tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.name}</td>
                <td>{m.description}</td>
                {this.renderEditCell(false, m)}
                {this.renderDeleteCell(false, m)}
            </tr>);
        });
    };

    renderCells = () => {
        return (
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
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

    deleteCompany(id) {

        let { user, deleteCompany, dispatch, alertify } = this.props;

        deleteCompany(user.accessToken, id).then(res => {
            
            dispatch({
                type: actions.DELETE_COMPANY,
                payload: id
            });

            alertify.success(res.data.message);

        }).catch(({ response }) => {
            alertify.alert('Error ' + response.status + ' - ' + response.statusText, response.data.message);
        });
    }

    renderDeleteCell = (isHead = true, model = null) => {
        const { ability } = this.props;
        if (ability('company-delete')) {
            return isHead ? <th>Delete</th> : <td><DeleteModal model={model.name + " Company"} delete={() => this.deleteCompany(model.id)} /></td>;
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
                                    <Col md="3">
                                        <i className="fa fa-align-justify" /> Companies - Page {page} of {totalPages}
                                    </Col>

                                    <Col md="2">
                                        <CreateCompany {...this.props} />
                                    </Col>

                                    <Col md="5">
                                        <InputGroup>
                                            <Input type="text" placeholder="Name" name="name" onChange={this.onChange} value={this.state.name} />
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
    companies: state.CompanyReducer.companies,
    };
  };

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actions.getCompanies(token, search),
        deleteCompany: (token, id) => actions.deleteCompany(token, id),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Companies);
