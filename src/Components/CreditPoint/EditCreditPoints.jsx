import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/CreditPointActions";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    FormGroup, Input, Label,
} from 'reactstrap';

class EditCreditPoints extends Component {

    initState = {
        ...this.props.points,
        file: null,
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

        let { user, edit, dispatch, alertify, errorHandler } = this.props;

        const { id, sources, points } = this.state;

        let params = { id, sources, points };

        edit(user.accessToken, id, params).then(res => {

            dispatch({
                type: actions.EDIT_CREDIT_POINT,
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

        const { isOpen, processing, points, sources } = this.state;

        return (
            <React.Fragment>

                <Button block color="link" onClick={this.toggle} className="mr-1"><i className="fa fa-edit" /></Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-lg modal-primary">

                    <ModalHeader toggle={this.toggle}><i className="fa fa-edit" /> Edit Credit Points</ModalHeader>

                    <ModalBody>

                        <FormGroup>

                            <Label>Points</Label>
                            <Input type="number" name="points" value={points} onChange={this.onChange} />

                        </FormGroup>

                        <FormGroup>

                            <Label>Source</Label>

                            <Input type="textarea" name="sources" placeholder="Description" value={sources} onChange={this.onChange} />

                        </FormGroup>

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
        edit: (token, id, params) => actions.editCreditPoints(token, id, params),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCreditPoints);
