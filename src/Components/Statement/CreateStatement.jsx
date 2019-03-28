import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/StatementActions";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal
} from 'reactstrap';

import StatementForm from "./StatementForm";

class CreateStatement extends Component {

    initState = {
        year: "",
        month: "",
        company_id: "",
        file: null,
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

        let { user, create, dispatch, alertify, errorHandler } = this.props;
        let { file, year, month, company_id } = { ...this.state };

        const fd = new FormData();

        fd.append('file', file, (file) ? file.name : "");
        fd.append('year', year);
        fd.append('month', month);
        fd.append('company_id', company_id);

        create(user.accessToken, fd).then(res => {

            dispatch({
                type: actions.CREATE_STATEMENT,
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

    render() {

        const { isOpen, processing } = this.state;

        return (
            <React.Fragment>

                <Button block color="success" onClick={this.toggle} className="mr-1"><i className="fa fa-plus" /> Create Satement</Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-success">

                    <ModalHeader toggle={this.toggle}><i className="fa fa-plus" /> Create Satement</ModalHeader>

                    <ModalBody>
                        <StatementForm {...this.props} {...this.state} onChange={this.onChange} companies={null} />
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
        create: (token, params) => actions.createStament(token, params),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CreateStatement);
