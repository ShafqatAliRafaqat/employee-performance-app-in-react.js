import React, { Component } from "react";
import { connect } from "react-redux";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    FormGroup, Label, Col, Row,
    Progress,
    TabContent, TabPane, Nav, NavItem, NavLink,
    Card, CardHeader,  CardBody, CardText, Table
} from 'reactstrap';

import classnames from 'classnames';
import 'rc-slider/assets/index.css';


class ProjectDetails extends Component {

    initState = {
        ...this.props.project,
        businessTeam: [],
        technicalTeam: [],
        activeTab: 1,
        processing: false,
        isOpen: false,
    };

    state = {
        ...this.initState
    };


    componentWillMount() {

        const { Users } = this.state;

        const businessTeam = Users.filter(e => e.employee_type === 'business');
        const technicalTeam = Users.filter(e => e.employee_type === 'technical');

        this.setState({ businessTeam, technicalTeam });
    }


    componentWillReceiveProps(nextProps) {

        const { Users } = nextProps.project;

        const businessTeam = Users.filter(e => e.employee_type === 'business');
        const technicalTeam = Users.filter(e => e.employee_type === 'technical');

        this.setState({
            ...nextProps.project,
            businessTeam,
            technicalTeam,
            activeTab: 1,
            processing: false,
            isOpen: false,
        });
    }

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

    renderEmployees = users => {

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Evaluation</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr>
                            <td scope="row">{u.name}</td>
                            <td>{u.user_remarks}</td>
                        </tr>

                    ))}
                </tbody>
            </Table>
        );
    }

    render() {

        const {
            isOpen, name, prof_and_loss,
            progress, detail_file, client_comment, ceo_comment, emp_comment, 
            businessTeam, technicalTeam, Company, activeTab
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
                                    <NavLink className={classnames({ active: activeTab === 1 })} onClick={() => this.toggleTab(1)}>Project Details</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === 2 })} onClick={() => this.toggleTab(2)}>Business Team</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === 3 })} onClick={() => this.toggleTab(3)}>Technical Team</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === 4 })} onClick={() => this.toggleTab(4)}>CEO/CTO Comments</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === 5 })} onClick={() => this.toggleTab(5)}>Client Comments</NavLink>
                                </NavItem>

                            </Nav>
                            <TabContent activeTab={activeTab}>

                                <TabPane tabId={1}>

                                    <FormGroup>
                                        <Row>
                                            <Col xs="12" sm="3">
                                                <Label><b>Company</b></Label>
                                                <p>{(Company.name)? Company.name:""}</p>
                                            </Col>
                                            <Col xs="12" sm="3">
                                                <Label><b>Detail file</b></Label>
                                                <p>
                                                    {(detail_file) ? <a href={detail_file}> <i className="color-dark fas fa-file-download" /></a> : "No File"}
                                                </p>
                                            </Col>
                                            <Col xs="12" sm="3">
                                                <Label><b>Profit and Loss File</b></Label>
                                                <p>
                                                    {(prof_and_loss) ? <a href={prof_and_loss}> <i className="color-dark fas fa-file-download" /></a> : "No File"}
                                                </p>
                                            </Col>
                                            <Col xs="12" sm="3">
                                                <Label ><b>Progress</b></Label>
                                                <Progress value={progress}>{`${progress} %`}</Progress>
                                            </Col>
                                        </Row>
                                    </FormGroup>

                                </TabPane>

                                <TabPane tabId={2}>
                                    {this.renderEmployees(businessTeam)}
                                </TabPane>

                                <TabPane tabId={3}>
                                    {this.renderEmployees(technicalTeam)}
                                </TabPane>

                                <TabPane tabId={4}>
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

                                <TabPane tabId={5}>
                                    <Card>
                                        <CardHeader>Client Comments</CardHeader>
                                        <CardBody>
                                            <CardText>{client_comment}</CardText>
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
)(ProjectDetails);
