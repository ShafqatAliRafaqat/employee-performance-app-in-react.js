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


class CreateCreditPoints extends Component {

    initState = {
        user_id: this.props.user_id,
        sources: "",
        points: "",
        page: 0,
        totalPages: 0,
        isLoading: true,
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

        let { user, create, dispatch, alertify, errorHandler, user_id } = this.props;

        const { sources, points } = this.state;

        let params = { user_id, sources, points };

        create(user.accessToken, params).then(res => {

            dispatch({
                type: actions.CREATE_CREDIT_POINT,
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
        const { isOpen, processing, sources, points,user_id } = this.state;
        return (
            <React.Fragment>
                <button type="button" onClick={this.toggle} className="btn btn-primary" >Create Credit Points</button>


                <Modal isOpen={isOpen} toggle={this.toggle} className=" modal-primary">

                    <ModalHeader toggle={this.toggle}><i className="fa fa-edit" />Create Credit Points</ModalHeader>

                    <ModalBody>

                        <FormGroup>

                            <Label>Points</Label>
                            <Input type="number" name="points" value={points} onChange={this.onChange} />

                        </FormGroup>

                        <FormGroup>

                            <Label>Source</Label>

                            <Input type="textarea" name="sources" placeholder="Description" value={sources} onChange={this.onChange} />
                            <Input type="hidden" name="user_id" value={user_id} onChange={this.onChange} />

                        </FormGroup>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.create}>{(processing) ? "Creating..." : "Create"}</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>

                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        metaData: state.MetaDataReducer,
        creditpoint: state.CreditPointReducer.creditpoint,
    };
};

const mapDispatchToProps = () => {
    return {
        create: (token, params) => actions.createCreditPoints(token, params),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateCreditPoints);
