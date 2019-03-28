import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../Store/Actions/NewActions";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal
} from 'reactstrap';

import NewsForm from "./NewsForm";

class EditNews extends Component {

    state = {
        ...this.props.news,
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
                type: actions.EDIT_NEWS,
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

                <Button color="link" onClick={this.toggle} className="mr-1"><i className="fa fa-edit" /></Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-primary">

                    <ModalHeader toggle={this.toggle}><i className="fa fa-edit" /> Edit News</ModalHeader>

                    <ModalBody>
                        <NewsForm {...this.props} {...this.state} onChange={this.onChange} />
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
        edit: (token, id, params) => actions.editNews(token, id, params),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(EditNews);
