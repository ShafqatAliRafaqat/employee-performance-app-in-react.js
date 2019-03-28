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

import monthsAndYears from './MonthsAndYears';

import SimplePagination from "../Common/SimplePagination";
import * as actions from "../../Store/Actions/StatementActions";

import { getSearchUrlFromState } from '../../util/functions'

import CreateStatement from "./CreateStatement";
import EditStatement from "./EditStatement";
import DeleteModal from "../Common/Modals/DeleteModal";

import CompanySelect from "../Company/CompanySelect";



class Statments extends Component {

    state = {
        year: "",
        month: "",
        company_id: "",

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
                type: actions.GET_STATEMENTS,
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
        if (ability('statement-update')) {
            return isHead ? <th>Edit</th> : <td className="text-center"><EditStatement {...this.props} statement={modal} /></td>;
        }
    };

    renderBody = () => {

        if (this.state.isLoading) {
            return;
        }

        const { statements } = this.props;
        const { months } = monthsAndYears;

        return statements.map(m => {

            return (<tr key={m.id}>
                <td>{m.id}</td>
                <td className="text-center">{m.year}</td>
                <td className="text-center">{months[m.month - 1]}</td>
                <td className="text-center">{m.quadrant}</td>

                <td className="text-center">
                    <a href={m.file}>
                        <i className="color-dark fas fa-file-download" />
                    </a>
                </td>

                <td className="text-center">{m.company}</td>

                {this.renderEditCell(false, m)}
                {this.renderDeleteCell(false, m)}
            </tr>);
        });
    };

    renderCells = () => {
        return (
            <tr>
                <th>ID</th>
                <th>Year</th>
                <th>Month</th>
                <th>Quadrant</th>
                <th>File</th>
                <th>Company</th>

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

    deleteStament(id) {

        let { user, deleteStament, dispatch, alertify } = this.props;

        deleteStament(user.accessToken, id).then(res => {

            dispatch({
                type: actions.DELETE_STATEMENT,
                payload: id
            });

            alertify.success(res.data.message);

        }).catch(({ response }) => {
            alertify.alert('Error ' + response.status + ' - ' + response.statusText, response.data.message);
        });
    }

    renderDeleteCell = (isHead = true, model = null) => {
        const { ability } = this.props;
        if (ability('statement-delete')) {
            return isHead ? <th>Delete</th> : <td className="text-center"><DeleteModal model="Statment" delete={() => this.deleteStament(model.id)} /></td>;
        }
    };

    render() {

        let { page, totalPages, month } = this.state;
        const { months } = monthsAndYears;

        return (

            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <Row >
                                    <Col md="3" className="mt-2">
                                        <h6> <i className="fa fa-money-check-alt mx-2" /> <b>Statments</b></h6>
                                    </Col>

                                    <Col md="2">
                                        <CreateStatement {...this.props} />
                                    </Col>

                                    <Col md="2">
                                        <CompanySelect
                                            withAllOption
                                            autoSelect
                                            {...this.props}
                                            onChange={companies => this.setState({ company_id: companies[0].id })}
                                            placeholder="Select Company"
                                        />
                                    </Col>

                                    <Col md="5">
                                        <InputGroup>

                                            <Input type="text" placeholder="Year" name="year" onChange={this.onChange} value={this.state.year} />

                                            <Input type="select" value={month} name="month" onChange={this.onChange}>
                                                <option value="">All Months</option>
                                                {months.map((m, i) => (<option key={m} value={i + 1}>{m}</option>))}
                                            </Input>

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
        statements: state.StatementReducer.statements,
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actions.getStaments(token, search),
        deleteStament: (token, id) => actions.deleteStament(token, id),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Statments);
