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
} from "reactstrap";

import SimplePagination from "../Common/SimplePagination";
import * as actions from "../../Store/Actions/ProjectActions";

import { getSearchUrlFromState } from '../../util/functions'

import CreateProject from "./CreateProject";

import CompanySelect from "../Company/CompanySelect";
import ProjectTable from "./ProjectTable";


class Projects extends Component {

    state = {
        name: "",
        status: "",
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
                type: actions.GET_PROJECTS,
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

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };


    filter = () => {
        let search = getSearchUrlFromState(this.state);
        this.get(search);
    };

    renderTable = () => {

        const { projects } = this.props;

        if (projects.length > 0) {

            return <ProjectTable {...this.props} />;
        }

    }

    render() {

        let { page, totalPages, name, status } = this.state;

        const { project_status } = this.props.metaData;

        return (

            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md="3" className="mt-2">
                                        <h6><i className="fa fa-project-diagram mx-2" /> <b> Projects </b></h6>
                                    </Col>

                                    <Col md="2">
                                        <CreateProject {...this.props} />
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

                                            <Input type="select" name="status" onChange={this.onChange} value={status}>
                                                <option value="" key="all" >All</option>
                                                {project_status.map(p => <option key={p.key} value={p.key} >{p.value}</option>)}
                                            </Input>

                                            <Input type="text" placeholder="Name" name="name" onChange={this.onChange} value={name} />

                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="warning" onClick={this.filter}><i className="fa fa-filter" /> Filter</Button>
                                            </InputGroupAddon>

                                        </InputGroup>
                                    </Col>

                                </Row>

                            </CardHeader>
                            <CardBody>

                                {this.renderTable()}

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
        projects: state.ProjectReducer.projects,
        metaData: state.MetaDataReducer
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actions.getProjects(token, search),
        deleteProject: (token, id) => actions.deleteProject(token, id),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Projects);
