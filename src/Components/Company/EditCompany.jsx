import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/CompanyActions";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal
} from 'reactstrap';

import CompanyForm from "./CompanyForm";

class EditCompany extends Component {

    state = {
        ...this.props.company,
        processing: false,
        isOpen: false,
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

        let { user, edit, dispatch, alertify, errorHandler } = this.props;
        let params = { ...this.state };

        edit(user.accessToken, params.id, params).then(res => {

            dispatch({
                type: actions.EDIT_COMPANY,
                payload: params
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

    render() {
        const { isOpen, processing } = this.state;

        return (
            <React.Fragment>

                <Button color="primary" onClick={this.toggle} className="mr-1"><i className="fa fa-edit" />Edit</Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-primary">

                    <ModalHeader toggle={this.toggle}><i className="fa fa-edit" /> Edit Company</ModalHeader>

                    <ModalBody>
                        <CompanyForm {...this.props} {...this.state} onChange={this.onChange} />
                    </ModalBody>

                    <ModalFooter>
                        <Button color="success" onClick={this.edit}>{(processing) ? "Updating..." : "Update"}</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>

                </Modal>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = () => {
    return {
        edit: (token, id, params) => actions.editCompany(token, id, params),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(EditCompany);
