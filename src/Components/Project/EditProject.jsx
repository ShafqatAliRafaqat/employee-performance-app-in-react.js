import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/ProjectActions";

import Slider from 'rc-slider';

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    FormGroup, Input, Label, Col, Row,
    Progress
} from 'reactstrap';

import CompanySelect from "../Company/CompanySelect"
import UserSelect from "../Users/UserSelect"

import 'rc-slider/assets/index.css';


class EditProject extends Component {

    initState = {
        ...this.props.project,

        detail_file: null,
        prof_and_loss: null,

        businessTeam: [],
        technicalTeam: [],

        processing: false,
        isOpen: false,
    };

    state = {
        ...this.initState
    };

    componentWillMount() {

        const { Users } = this.state;

        const businessTeam = Users.filter(e => e.employee_type === 'business');
        const technicalTeam = Users.filter(e => e.employee_type === 'technical');

        this.setState({ businessTeam, technicalTeam });
    }

    onChange = e => {
        this.setState({
            [e.target.name]: (e.target.files) ? e.target.files[0] : e.target.value
        });
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    edit = () => {

        this.setState({
            processing: true
        });

        let { user, edit, dispatch, alertify, errorHandler } = this.props;

        const {
            id, name, start_date, deadline,
            end_date, detail_file, prof_and_loss,
            progress, status, client_comment, ceo_comment, company_id, businessTeam, technicalTeam
        } = this.state;

        let employees = [];

        businessTeam.forEach(u => employees.push(u.id));
        technicalTeam.forEach(u => employees.push(u.id));

        const fd = new FormData();

        fd.append('name', name);
        fd.append('start_date', start_date);
        fd.append('end_date', end_date);
        fd.append('deadline', deadline);

        if (detail_file) {
            fd.append('detail_file', detail_file, detail_file.name);
        }

        if (prof_and_loss) {
            fd.append('prof_and_loss', prof_and_loss, prof_and_loss.name);
        }

        fd.append('progress', progress);
        fd.append('status', status);
        fd.append('company_id', company_id);
        fd.append('client_comment', client_comment);
        fd.append('ceo_comment', ceo_comment);
        fd.append('employees', employees);



        edit(user.accessToken, id, fd).then(res => {

            dispatch({
                type: actions.EDIT_PROJECT,
                payload: res.data.data
            });

            this.setState({
                isOpen: false
            });

            alertify.success(res.data.message);

        }).catch(errorHandler).finally(() => {
            this.setState({
                processing: false
            });
        });
    };

    onCompanyChange = companies => {
        const company_id = companies[0].id;
        this.setState({ company_id });
    }

    render() {

        const {
            isOpen, processing, name, start_date, end_date, deadline,
            progress, status, client_comment, ceo_comment,
            businessTeam, technicalTeam, Company
        } = this.state;

        const { project_status } = this.props.metaData;

        return (
            <React.Fragment>

                <Button block color="link primary" onClick={this.toggle} className="mr-1"><i className="fa fa-edit" /></Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-lg modal-primary">

                    <ModalHeader toggle={this.toggle}><i className="fa fa-edit" /> Edit Project</ModalHeader>

                    <ModalBody>
                        <div className="container-fluid">

                            <FormGroup>
                                <Label htmlFor="name">Name*</Label>
                                <Input type="text" name="name" placeholder="Name" value={name} onChange={this.onChange} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="start_date">Start Date*</Label>
                                <Input type="date" name="start_date" placeholder="Start Date" value={start_date} onChange={this.onChange} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="end_date">End Date*</Label>
                                <Input type="date" name="end_date" placeholder="End Date" value={end_date} onChange={this.onChange} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="deadline">Deadline*</Label>
                                <Input type="date" name="deadline" placeholder="Deadline" value={deadline} onChange={this.onChange} />
                            </FormGroup>


                            <FormGroup>
                                <div className="container-fluid">
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <Label htmlFor="detail_file">Detail file*</Label>
                                            <Input type="file" name="detail_file" onChange={this.onChange} />
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <Label htmlFor="prof_and_loss">Profit and Loss File</Label>
                                            <Input type="file" name="prof_and_loss" onChange={this.onChange} />
                                        </Col>
                                    </Row>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="progress">Progress*</Label>
                                <Slider className="mb-2" name="progress" value={progress} onChange={progress => this.setState({ progress })}></Slider>
                                <Progress value={progress}>{`${progress} %`}</Progress>
                            </FormGroup>

                            <FormGroup>
                                <Label>Business Team</Label>
                                <UserSelect
                                    isMulti
                                    {...this.props}
                                    onChange={businessTeam => this.setState({ businessTeam })}
                                    placeholder="Select Business Team"
                                    search="employee_type=business"
                                    users={businessTeam}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Technical Team</Label>
                                <UserSelect
                                    isMulti
                                    {...this.props}
                                    onChange={technicalTeam => this.setState({ technicalTeam })}
                                    placeholder="Select Technical Team"
                                    search="employee_type=Technical"
                                    users={technicalTeam}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Company</Label>
                                <CompanySelect
                                    {...this.props}
                                    onChange={this.onCompanyChange}
                                    placeholder="Select Company"
                                    companies={[Company]}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="status">Status*</Label>
                                <Input type="select" name="status" onChange={this.onChange} value={status}>
                                    {project_status.map(p => <option key={p.key} value={p.key} >{p.value}</option>)}
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="client_comment">Client Remarks</Label>
                                <Input type="textarea" name="client_comment" value={client_comment} onChange={this.onChange} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="ceo_comment">CTO/CEO Comments</Label>
                                <Input type="textarea" name="ceo_comment" value={ceo_comment} onChange={this.onChange} />
                            </FormGroup>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.edit}>{(processing) ? "Updating..." : "Update"}</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>

                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        metaData: state.MetaDataReducer
    };
};

const mapDispatchToProps = () => {
    return {
        edit: (token, id, params) => actions.editProject(token, id, params),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProject);
