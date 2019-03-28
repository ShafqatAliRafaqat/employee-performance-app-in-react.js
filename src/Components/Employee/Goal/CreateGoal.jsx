import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import * as actions from "../../../Store/Actions/Employee/GoalActions";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    FormGroup, Input, Label
} from 'reactstrap';

import ProjectSelect from "./ProjectSelect";
import moment from "moment";
import 'rc-slider/assets/index.css';


class CreateGoal extends Component {

    initState = {

        project_id: "",
        start_date: "",
        end_date: "",
        description: "",
        file: null,
        status: "",
        user_remarks: "",
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

    addgoals = () => {

        this.setState({
            processing: true
        });

        let { user, addgoals, dispatch, alertify, errorHandler } = this.props;

        const {
            start_date, end_date,
            description, file, status, user_remarks, project_id
        } = this.state;

        const fd = new FormData();

        fd.append('start_date', moment(start_date, 'YYYY-MM-DD').format('YYYY-MM-DD'));
        fd.append('end_date', moment(end_date, 'YYYY-MM-DD').format('YYYY-MM-DD'));
        fd.append('description', description);

        if (file) {
            fd.append('file', file);
        }

        fd.append('status', status);
        fd.append('user_remarks', user_remarks);

        fd.append('project_id', project_id);

        addgoals(user.accessToken, fd).then(res => {

            dispatch({
                type: actions.ADD_GOALS,
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
            description, status, user_remarks
        } = this.state;

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
                                <option value="ongoing" >Ongoing</option>
                                <option value="upcoming" >Upcoming</option>
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="user_remarks">Evaluation</Label>
                            <Input type="textarea" name="user_remarks" value={user_remarks} onChange={this.onChange} />
                        </FormGroup>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="success" onClick={this.addgoals}>{(processing) ? "Creating..." : "Create"}</Button>{' '}
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
        addgoals: (token, params) => actions.addgoals(token, params),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateGoal);
