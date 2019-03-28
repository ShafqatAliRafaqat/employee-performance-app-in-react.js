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

class CreateCompany extends Component {

    initState = {
        name: "",
        description: "",
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

        let { user, create, dispatch, alertify, errorHandler } = this.props;
        let params = { ...this.state };

        create(user.accessToken, params).then(res => {

            dispatch({
                type: actions.CREATE_COMPANY,
                payload: res.data.data
            });

            this.setState({...this.initState});

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

                <Button block color="success" onClick={this.toggle} className="mr-1"><i className="fa fa-plus" />Create Company</Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-success">
                    
                    <ModalHeader toggle={this.toggle}><i className="fa fa-plus" /> Create Company</ModalHeader>

                    <ModalBody>
                        <CompanyForm {...this.props} {...this.state} onChange={this.onChange} />
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
        create: (token, params) => actions.createCompany(token, params),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CreateCompany);
