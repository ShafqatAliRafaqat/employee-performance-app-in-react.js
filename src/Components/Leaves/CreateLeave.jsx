import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/LeaveActions";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    FormGroup, Input, Label,
} from 'reactstrap';


class CreateLeave extends Component {

    initState = {

        user_id: this.props.user_id,
        leave_date: "",
        isTracked: "",
        isFull: "",
        leave_type: "",
        detail: "",

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

    create = () => {

        this.setState({
            processing: true
        });

        let { user, create, dispatch, alertify, user_id, errorHandler } = this.props;

        const {
            leave_date, isTracked,
            leave_type, detail, isFull
        } = this.state;

        const params = { leave_date, isTracked, leave_type, detail, user_id, isFull };

        create(user.accessToken, params).then(res => {

            dispatch({
                type: actions.CREATE_LEAVE,
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


    renderLeaveTypes = () => {

        const { leave_type } = this.state;
        const { metaData } = this.props;

        const { leaveTypes } = metaData;

        if (leaveTypes) {
            return (
                <FormGroup>
                    <Label htmlFor="leave_type">Type</Label>
                    <Input type="select" name="leave_type" onChange={this.onChange} value={leave_type}>
                        <option value="">Select</option>
                        {leaveTypes.map(p => <option key={p.key} value={p.key} >{p.value}</option>)}
                    </Input>
                </FormGroup>
            );
        }
    };

    render() {

        const { isOpen, processing, leave_date, isTracked, detail, isFull } = this.state;

        return (
            <React.Fragment>

                <Button block color="success" onClick={this.toggle} className="mr-1"><i className="fa fa-plus" /> Add Leave</Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-success">

                    <ModalHeader toggle={this.toggle}><i className="fa fa-plus" /> Add Leave</ModalHeader>

                    <ModalBody>

                        <FormGroup>
                            <Label htmlFor="leave_date">Leave Date</Label>
                            <Input type="date" name="leave_date" value={leave_date} onChange={this.onChange} />
                        </FormGroup>

                        {this.renderLeaveTypes()}

                        <FormGroup>
                            <Label title="If No, leave will be excluded from yearly leave calculations">Tracked</Label>
                            <Input type="select" name="isTracked" value={isTracked} onChange={this.onChange} >
                                <option value="">Select</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label>Leave</Label>
                            <Input type="select" name="isFull" value={isFull} onChange={this.onChange} >
                                <option value="">Select</option>
                                <option value="1">Full</option>
                                <option value="0">Short</option>
                            </Input>
                        </FormGroup>



                        <FormGroup>
                            <Label htmlFor="detail">Details</Label>
                            <Input type="textarea" name="detail" value={detail} onChange={this.onChange} />
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

const mapDispatchToProps = () => {
    return {
        create: (token, params) => actions.createLeave(token, params)
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CreateLeave);