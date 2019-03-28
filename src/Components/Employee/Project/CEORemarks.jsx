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


class CEORemarks extends Component {

    state = {
        emp_comment: "",
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

    updateEmpComments = () => {

        this.setState({
            processing: true
        });

        let { user, updateEmpComments, alertify, errorHandler } = this.props;
        let { emp_comment, id } = this.state;

        let parms = { emp_comment, id };

        updateEmpComments(user.accessToken, id, parms).then(res => {

            this.setState({
                isOpen: false,
            });

            alertify.success(res.data.message);

        }).catch(errorHandler).finally(() => {
            this.setState({
                processing: false
            });
        });

    };

    render() {

        const { isOpen, ceo_comment, emp_comment, processing } = this.state;
   
        return (
            <React.Fragment>

                <Button block color="link" onClick={this.toggle} className="mr-1">
                    <i className="fas fa-eye" />
                </Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-success">

                    <ModalHeader toggle={this.toggle}><i className="fas fa-edit" />Comments</ModalHeader>

                    <ModalBody>
                        <label htmlFor="ceo_comment" className="my-2"><strong>CEO/ CTO Comment</strong></label>
                        <Input type="textarea" style={{ minHeight: 150 }} name="ceo_comment" value={ceo_comment} onChange={this.onChange} disabled />
                        <label htmlFor="emp_comment" className="my-2 mt-3"><strong>Employee Comment</strong></label>
                        <Input type="textarea" style={{ minHeight: 150 }} name="emp_comment" value={emp_comment} onChange={this.onChange} />
                    </ModalBody>

                    <ModalFooter>

                        <Button color="primary" onClick={this.updateEmpComments}>{(processing) ? "Updating..." : "Update"}</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>

                    </ModalFooter>

                </Modal>
            </React.Fragment>
        );
    }

}

const mapDispatchToProps = () => {
    return {
        updateEmpComments: (token, id, params) => actions.updateEmpComments(token, id, params),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CEORemarks);