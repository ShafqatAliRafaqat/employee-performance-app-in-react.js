import React, { Component } from "react";
import { connect } from "react-redux";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    TabContent, TabPane, Nav, NavItem, NavLink,
    Card, CardHeader, CardBody, CardText,
} from 'reactstrap';

import classnames from 'classnames';
import 'rc-slider/assets/index.css';


class GoalDetail extends Component {

    initState = {
        ...this.props.goals,
        activeTab: 1,
        processing: false,
        isOpen: false,
    };

    state = {
        ...this.initState
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

    render() {

        const {
            isOpen, name, user_remarks, description,
            ceo_comment, emp_comment,activeTab
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
                                        <CardHeader>CEO/CTO Comment</CardHeader>
                                        <CardBody>
                                            <CardText>{ceo_comment}</CardText>
                                        </CardBody>
                                    </Card>
                                    <Card className="mt-2">
                                        <CardHeader>Employee Comment</CardHeader>
                                        <CardBody>
                                            <CardText>{emp_comment}</CardText>
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

export default connect(
    mapStateToProps
)(GoalDetail);
