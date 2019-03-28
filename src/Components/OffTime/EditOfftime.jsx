import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/OffTimeActions";

import moment from "moment";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal, FormGroup, Label, Input
} from 'reactstrap';

class EditOfftime extends Component {


    state = {
        ...this.props.offtime,
        login_time: moment(this.props.offtime.login_time).format('YYYY-MM-DDTHH:mm'),
        logout_time: moment(this.props.offtime.logout_time).format('YYYY-MM-DDTHH:mm'),
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
        let { id, login_time, logout_time, date } = this.state;

        login_time = moment(login_time).format('YYYY-MM-DD HH:mm:ss')
        logout_time = moment(logout_time).format('YYYY-MM-DD HH:mm:ss')

        const params = { id, login_time, logout_time, date }


        edit(user.accessToken, params.id, params).then(res => {

            dispatch({
                type: actions.EDIT_OFFTIME,
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
        const { isOpen, processing, login_time, logout_time } = this.state;

        return (
            <React.Fragment>

                <Button color="primary" onClick={this.toggle} className="mr-1"><i className="fa fa-edit" /></Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-primary">

                    <ModalHeader toggle={this.toggle}><i className="fa fa-edit" /> Edit</ModalHeader>

                    <ModalBody>

                        <FormGroup>
                            <Label htmlFor="login_time">Login Time</Label>
                            <Input type="datetime-local" name="login_time" value={login_time} onChange={this.onChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="logout_time">Logout Time</Label>
                            <Input type="datetime-local" name="logout_time" value={logout_time} onChange={this.onChange} />
                        </FormGroup>

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
        edit: (token, id, params) => actions.editOfftime(token, id, params),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(EditOfftime);
