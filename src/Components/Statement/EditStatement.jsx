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

class EditStatement extends Component {

    state = {
        ...this.props.statement,
        file: null,
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

    edit = () => {

        this.setState({
            processing: true
        });

        let { user, edit, dispatch, alertify, errorHandler } = this.props;
        let { id, file, year, month, company_id } = { ...this.state };

        const fd = new FormData();

        if (file) {
            fd.append('file', file, file.name);
        }

        fd.append('year', year);
        fd.append('month', month);
        fd.append('company_id', company_id);

        edit(user.accessToken, id, fd).then(res => {

            dispatch({
                type: actions.EDIT_STATEMENT,
                payload: res.data.data
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

        const { isOpen, processing, company, company_id } = this.state;

        return (
            <React.Fragment>

                <Button block color="link" onClick={this.toggle} className="mr-1"><i className="fa fa-edit" /></Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-primary">

                    <ModalHeader toggle={this.toggle}><i className="fa fa-edit" /> Edit Satement</ModalHeader>

                    <ModalBody>
                        <StatementForm {...this.props} {...this.state} onChange={this.onChange} companies={[{ id: company_id, name: company }]} />
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
        edit: (token, id, params) => actions.editStament(token, id, params),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(EditStatement);
