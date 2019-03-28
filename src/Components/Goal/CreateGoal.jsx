import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import * as actions from "../../Store/Actions/GoalActions";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    FormGroup, Input, Label
} from 'reactstrap';

import ProjectSelect from "../Project/ProjectSelect";

import UserSelect from "../Users/UserSelect"
import moment from "moment";
import 'rc-slider/assets/index.css';


class CreateGoal extends Component {

    initState = {

        project_id: "",
        user_id: "",
        start_date: "",
        end_date: "",
        description: "",
        file: null,
        status: "",
        ceo_comment: "",
        startDate: new Date(),
        processing: false,
        isOpen: false,
    };

    state = {
        ...this.initState
    };

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

    create = () => {

        this.setState({
            processing: true
        });

        let { user, create, dispatch, alertify, user_id, errorHandler } = this.props;

        const {
            start_date, end_date,
            description, file, status, ceo_comment, project_id
        } = this.state;
       
        if (!user_id) {
            user_id = this.state.user_id;
        }

        const fd = new FormData();

        fd.append('start_date', moment(start_date, 'YYYY-MM-DD').format('YYYY-MM-DD'));
        fd.append('end_date', moment(end_date, 'YYYY-MM-DD').format('YYYY-MM-DD'));
        fd.append('description', description);

        if (file) {
            fd.append('file', file);
        }

        fd.append('status', status);
        fd.append('ceo_comment', ceo_comment);

        fd.append('project_id', project_id);
        fd.append('user_id', user_id);

        create(user.accessToken, fd).then(res => {

            dispatch({
                type: actions.CREATE_GOAL,
                payload: res.data.data
            });

            this.setState({ ...this.initState });

            alertify.success(res.data.message);

        }).catch(errorHandler).finally(() => {
            this.setState({
                processing: false
            });
        });
    };

    onProjectChange = projects => {
        const project_id = projects[0].id;
        this.setState({ project_id });
    }

    renderEmployeeSelect = () => {

        const { user_id } = this.props;

        if (!user_id) {
            return (
                <FormGroup>

                    <Label>Employee</Label>

                    <UserSelect
                        {...this.props}
                        onChange={users => this.setState({ user_id: users[0].id })}
                        placeholder="Select Employee"
                    />
                </FormGroup>
            );
        }

    }
    startDataHandleChange = start => {
        this.setState({
            start_date: start
        });
    }
    endDataHandleChange = end => {
        this.setState({
            end_date: end
        });
    }
    render() {

        const {
            isOpen, processing, start_date, end_date,
            description, status, ceo_comment
        } = this.state;

        const { metaData } = this.props;

        const { goal_status } = metaData;

        return (
            <React.Fragment>

                <Button block color="success" onClick={this.toggle} className="mr-1"><i className="fa fa-plus" /> Create Goal</Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-lg modal-success">

                    <ModalHeader toggle={this.toggle}><i className="fa fa-plus" /> Create Goal</ModalHeader>

                    <ModalBody>

                        <FormGroup>

                            <Label>Project</Label>

                            <ProjectSelect
                                {...this.props}
                                onChange={this.onProjectChange}
                                placeholder="Select Project"
                            />

                        </FormGroup>

                        {this.renderEmployeeSelect()}

                        <FormGroup>
                            <div className="container-fluid" >
                                <div className="row" >

                                    <div className="col-sm-6">
                                        <Label htmlFor="start_date">Start Date*</Label>

                                        <DatePicker
                                            selected={start_date}
                                            onChange={this.startDataHandleChange}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="DD/MM/YYYY"
                                        />

                                    </div>
                                    <div className="col-sm-6">
                                        <Label htmlFor="end_date">End Date*</Label>

                                        <DatePicker
                                            selected={end_date}
                                            onChange={this.endDataHandleChange}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="DD/MM/YYYY"
                                        />

                                    </div>
                                </div>
                            </div >
                        </FormGroup>

                        <FormGroup>

                            <Label>Description</Label>

                            <Input type="textarea" name="description" placeholder="Description" value={description} onChange={this.onChange} />

                        </FormGroup>


                        <FormGroup>
                            <Label htmlFor="file">Detail file*</Label>
                            <Input type="file" name="file" onChange={this.onChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="status">Status*</Label>
                            <Input type="select" name="status" onChange={this.onChange} value={status}>
                                <option key="" value="" >Select</option>
                                {goal_status.map(p => <option key={p.key} value={p.key} >{p.value}</option>)}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="ceo_comment">CTO/CEO Comments</Label>
                            <Input type="textarea" name="ceo_comment" value={ceo_comment} onChange={this.onChange} />
                        </FormGroup>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="success" onClick={this.create}>{(processing) ? "Creating..." : "Create"}</Button>{' '}
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
        create: (token, params) => actions.createGoal(token, params),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateGoal);
