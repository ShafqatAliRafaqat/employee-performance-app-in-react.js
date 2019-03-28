import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../Store/Actions/Employee/GoalActions";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    Input,
    FormGroup, Label,
} from 'reactstrap';


class EditGoal extends Component {

    initState = {
        user_remarks: "",
        is_edit_able: null,
        ...this.props.goal,
        processing: false,
        isOpen: false,
    };

    state = {
        ...this.initState
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
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

        let { user, edit, alertify, dispatch, errorHandler } = this.props;
        let { user_remarks, status, id } = this.state;
        const params = { user_remarks, status, is_edit_able: 0 };

        edit(user.accessToken, id, params).then(res => {

            dispatch({
                type: actions.UPDATE_EMPLOYEE_GOALS,
                payload: res.data.data
            });

            this.setState({
                is_edit_able: 0,
                ...this.initState,
                ...res.data.data,
            });

            alertify.success(res.data.message);


        }).catch(errorHandler).finally(() => {
            this.setState({
                processing: false
            });
        });

    };

    render() {

        const { isOpen, user_remarks, status, processing, is_edit_able } = this.state;
        
        const disable_field = (is_edit_able === 0) ? "disabled" : "";

        const { metaData } = this.props;

        const { goal_status } = metaData;

        return (
            <React.Fragment>

                <Button block color="link" onClick={this.toggle} className="mr-1">
                    <i className="fas fa-edit" />
                </Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-success">

                    <ModalHeader toggle={this.toggle}><i className="fas fa-edit" />Edit Goal</ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="status">Status*</Label>
                            <Input type="select" name="status" onChange={this.onChange} value={status} disabled={disable_field} >
                                {goal_status.map(p => <option key={p.key} value={p.key} >{p.value}</option>)}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="status">User Comments</Label>
                            <Input type="textarea" name="user_remarks" value={user_remarks} onChange={this.onChange} disabled={disable_field} />
                        </FormGroup>


                    </ModalBody>

                    <ModalFooter>

                        <Button color="primary" onClick={this.edit} disabled={disable_field} >{(processing) ? "Updating..." : "Update"}</Button>{' '}
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