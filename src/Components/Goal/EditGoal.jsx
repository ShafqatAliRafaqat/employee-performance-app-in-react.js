import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/GoalActions";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    FormGroup, Input, Label,
} from 'reactstrap';

import ProjectSelect from "../Project/ProjectSelect";
import 'rc-slider/assets/index.css';


class EditGoal extends Component {

    initState = {
        ...this.props.goal,
        file: null,
        user_id: this.props.goal.Users[0].id,
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

    edit = () => {

        this.setState({
            processing: true
        });

        let { user, edit, dispatch, alertify, errorHandler } = this.props;

        const {
            id, start_date, end_date,
            description, file, status, ceo_comment, project_id, isApproved, user_id
        } = this.state;


        const fd = new FormData();

        fd.append('start_date', start_date);
        fd.append('end_date', end_date);
        fd.append('description', description);

        if (file) {
            fd.append('file', file);
        }

        fd.append('status', status);
        fd.append('ceo_comment', ceo_comment);

        fd.append('project_id', project_id);
        fd.append('isApproved', isApproved);
        fd.append('user_id', user_id);


        edit(user.accessToken, id, fd).then(res => {

            dispatch({
                type: actions.EDIT_GOAL,
                payload: res.data.data
            });

            this.setState({ ...this.initState, ...res.data.data });

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

    render() {

        const {
            isOpen, processing, start_date, end_date,
            description, status, ceo_comment, Project, isApproved
        } = this.state;

        const { metaData } = this.props;

        const { goal_status } = metaData;

        return (
            <React.Fragment>

                <Button color="link" onClick={this.toggle} className="mr-1"><i className="fa fa-edit" /></Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-lg modal-primary">

                    <ModalHeader toggle={this.toggle}><i className="fa fa-edit" /> Edit Goal</ModalHeader>

                    <ModalBody>
                        <div className="container-fluid">

                            <FormGroup>

                                <Label>Project</Label>

                                <ProjectSelect
                                    {...this.props}
                                    onChange={this.onProjectChange}
                                    placeholder="Select Project"
                                    projects={[Project]}
                                />

                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="start_date">Start Date*</Label>
                                <Input type="date" name="start_date" placeholder="Start Sate" value={start_date} onChange={this.onChange} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="end_date">End Date*</Label>
                                <Input type="date" name="end_date" placeholder="End Date" value={end_date} onChange={this.onChange} />
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

                            <FormGroup>
                                <Label htmlFor="isApproved">Approved</Label>
                                <Input type="select" name="isApproved" value={isApproved} onChange={this.onChange}>
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
                                </Input>
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
        edit: (token, id, params) => actions.editGoal(token, id, params),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditGoal);
