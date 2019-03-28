import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';
import SimplePagination from "../../Common/SimplePagination";

import {
    Card,
    CardBody,
    CardHeader,
    Col, Input, InputGroup, InputGroupAddon,
    Button,
    Row,
    Table,
    Badge,
} from "reactstrap";

import * as actions from "../../../Store/Actions/Employee/ProjectActions";

import { getSearchUrlFromState } from '../../../util/functions'
import UserRemarks from "../Project/UserRemarks";
import CEORemarks from "../Project/CEORemarks";
import TextModal from "../../Common/Modals/TextModal";


class Projects extends Component {

    state = {
        name: "",
        status: "",
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
            });

            dispatch({
                type: actions.GET_EMPLOYEE_PROJECTS,
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
        return isHead ? <th >Evaluation</th> : <td className="text-center"><UserRemarks {...this.props} project={modal} /></td>;
    };

    renderEditComments = (isHead = true, modal = null) => {
        return isHead ? <th >CEO/ CTO Comments</th> : <td className="text-center"><CEORemarks {...this.props} project={modal} /></td>;
    };


    renderTeam = (type, project) => {
        const { Users } = project;
        if (Users) {
            const team = Users.filter(e => e.employee_type == type);
            return team.map(emp => (
                <Badge style={{ margin: "2px" }} color={(type == 'business') ? "success" : "primary"}>{emp.name}</Badge>
            ));
        }
    }

    renderBody = () => {

        if (this.state.isLoading) {
            return;
        }

        const { projects } = this.props;

        return projects.map(m => {

            return (<tr key={m.id}>

                <td>{m.name}</td>
                {/* <td className="text-center">{m.start_date}</td>
                <td className="text-center">{m.end_date}</td> */}
                <td className="text-center">
                    <a href={m.detail_file}>
                        <i className="color-dark fas fa-file-download" />
                    </a>
                </td>
                <td className="text-center">{this.renderTeam('technical', m)}</td>
                <td className="text-center">{this.renderTeam('business', m)}</td>
                <td className="text-center">{m.progress}%</td>
                {/* <td className="text-center"><TextModal text={m.ceo_comment} title="CEO/CTO Comments" icon="fas fa-comment"></TextModal></td> */}

                {this.renderEditComments(false, m)}

                <td className="text-center">{m.deadline}</td>
                {this.renderEditCell(false, m)}
            </tr>);
        });
    };

    renderCells = () => {
        return (
            <tr>

                <th>Project</th>
                <th>Details</th>
                <th>Technical Team</th>
                <th>Business Team</th>
                <th>Progress</th>
                {/* <th>Start Date</th>
                <th>Date Completed</th> */}
                <th>CEO/CTO Comments</th>
                <th>Deadline</th>
                {this.renderEditCell()}
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

        console.log('This is Project State =>  ',this.props);

        if (this.state.isLoading) {
            return false;
        }
        let { name, status } = this.state;

        const { project_status } = this.props.metaData;

        return (

            <div className="animated fadeIn">
                <Row className="mb-3">
                    <Col xs="12" lg="12">
                        <Card className="d-goals-table">
                            <CardHeader>
                                <Row>
                                    <Col md="3" className="pt-2">
                                        <h6> <i className="fas fa-project-diagram mx-2"/><b> My Projects </b></h6>
                                    </Col>
                                    <Col md="4"></Col>
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
        projects: state.EmployeeProjectReducer.projects,
        metaData: state.MetaDataReducer
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actions.getProjects(token, search)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Projects);
