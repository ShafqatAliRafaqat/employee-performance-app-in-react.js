import React, { Component } from "react";
import { connect } from "react-redux";

// import CEORemarks from "./CEORemarks";

import * as actions from "../../../Store/Actions/Employee/GoalActions";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Input,
    Modal,
    TabContent, TabPane, Nav, NavItem, NavLink,
    Card, CardHeader,  CardBody, CardText,
} from 'reactstrap';

import classnames from 'classnames';
import 'rc-slider/assets/index.css';


class GoalDetail extends Component {

    initState = {
        emp_comment: "",
        ...this.props.goals,
        activeTab: 1,
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

    toggleTab = tab => {
        const { activeTab } = this.state;
        if (activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

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


    renderEditComments = () => {
        const { ceo_comment, emp_comment, processing } = this.state;
        console.log("my state----- ",this.props.goals);
        return (
            <CardText>
                <label htmlFor="ceo_comment" className="my-2"><strong>CEO/ CTO Comment</strong></label>
                <Input type="textarea" style={{ minHeight: 150 }} name="ceo_comment" value={ceo_comment} onChange={this.onChange} disabled />
                <label htmlFor="emp_comment" className="my-2 mt-3"><strong>Employee Comment</strong></label>
                <Input type="textarea" style={{ minHeight: 150 }} name="emp_comment" value={emp_comment} onChange={this.onChange} />

                <Button className="my-2 pull-right" color="primary" onClick={this.updateEmpComments}>{(processing) ? "Updating..." : "Update"}</Button>{' '}
            </CardText>
        )
        
    };


    render() {

        const {
            isOpen, name, user_remarks, description,
            ceo_comment, activeTab
        } = this.state;

        return (
            <React.Fragment>

                <Button block color="link" onClick={this.toggle} className="mr-1"><i className="fa fa-eye" /></Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-lg modal-success">

                    <ModalHeader toggle={this.toggle}>{name}</ModalHeader>

                    <ModalBody>
                        <React.Fragment>
                            <Nav tabs>

                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === 1 })} onClick={() => this.toggleTab(1)}>Goal Description</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === 2 })} onClick={() => this.toggleTab(2)}>CEO/CTO Comments</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === 3 })} onClick={() => this.toggleTab(3)}>Evaluation</NavLink>
                                </NavItem>

                            </Nav>
                            <TabContent activeTab={activeTab}>

                                <TabPane tabId={1}>
                                    <Card>
                                        <CardHeader>Goal Description</CardHeader>
                                        <CardBody>
                                            <CardText>{description}</CardText>
                                        </CardBody>
                                    </Card>

                                </TabPane>

                                <TabPane tabId={2}>
                                    <Card>
                                        <CardHeader>CEO/CTO Comments</CardHeader>
                                        <CardBody>
                                            {/* <CardText>{ceo_comment}</CardText> */}
                                            {this.renderEditComments()}
            
                                        </CardBody>
                                    </Card>

                                </TabPane>

                                <TabPane tabId={3}>
                                    <Card>
                                        <CardHeader>Evaluation</CardHeader>
                                        <CardBody>
                                            <CardText>{user_remarks}</CardText>
                                        </CardBody>
                                    </Card>
                                </TabPane>




                            </TabContent>
                        </React.Fragment>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
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
        updateEmpComments: (token, id, params) => actions.updateEmpComments(token, id, params),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoalDetail);
