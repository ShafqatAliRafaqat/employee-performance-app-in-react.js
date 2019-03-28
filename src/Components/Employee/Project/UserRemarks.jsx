import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../Store/Actions/Employee/ProjectActions";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    Input
} from 'reactstrap';


class UserRemarks extends Component {

    state = {
        user_remarks: "",
        is_edit_able: null,
        ...this.props.project,
        processing: false,
        isOpen: false,
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

    updateRemarks = () => {

        this.setState({
            processing: true
        });

        let { user, updateRemarks, alertify, errorHandler } = this.props;
        let { user_remarks, id } = this.state;

        let parms = { user_remarks, is_edit_able: 0, id };

        updateRemarks(user.accessToken, id, parms).then(res => {

            this.setState({
                isOpen: false,
                is_edit_able: 0,
            });

            alertify.success(res.data.message);

        }).catch(errorHandler).finally(() => {
            this.setState({
                processing: false
            });
        });

    };

    render() {

        const { isOpen, user_remarks, is_edit_able, processing } = this.state;
        
        const disable_field = (is_edit_able === 0) ? "disabled" : "";

        
        return (
            <React.Fragment>

                <Button block color="link" onClick={this.toggle} className="mr-1">
                    <i className="fas fa-edit" />
                </Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-success">

                    <ModalHeader toggle={this.toggle}><i className="fas fa-edit" />User Remarks</ModalHeader>

                    <ModalBody>
                        <Input type="textarea" style={{ minHeight: 150 }} name="user_remarks" value={user_remarks} onChange={this.onChange} disabled = {disable_field} />
                    </ModalBody>

                    <ModalFooter>

                        <Button color="primary" onClick={this.updateRemarks} disabled={disable_field} >{(processing) ? "Updating..." : "Update"}</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>

                    </ModalFooter>

                </Modal>
            </React.Fragment>
        );
    }

}

const mapDispatchToProps = () => {
    return {
        updateRemarks: (token, id, params) => actions.updateRemarks(token, id, params),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(UserRemarks);