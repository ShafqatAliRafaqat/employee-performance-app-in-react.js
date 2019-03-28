import React, { Component } from "react";
import { connect } from "react-redux";

import {
    FormGroup,
    Label, Table, Button,
    ModalFooter, ModalBody, ModalHeader,
    Modal, Row, Col
} from 'reactstrap';
import ProjectDetails from "../Project/ProjectTable";
class Detail extends Component {
    
    initState = {
        ...this.props.u,
        file: null,
        isOpen: false,
    isLoading: true
    };

    state = {
        ...this.initState
    };
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    render() {
        let {
            name, email, cnic, id,joining,
            phone, address, Company, Projects } = this.state;

        return (
            <React.Fragment>
                <Button color="link" onClick={this.toggle} className="mr-1"> <i className="fa fa-eye" /></Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-primary modal-lg">
                    <ModalHeader toggle={this.toggle}><i className="fa fa-align-justify" /> {name} Detail</ModalHeader>

                    <ModalBody>
                    <div className="container-fluid">

                        <FormGroup>
                            <Row>
                                <Col xs="12" lg="12">
                                    <Label htmlFor="User"><b>User Details</b></Label>
                                    <Table responsive bordered striped>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Email</th>
                                                <th>CNIC Number</th>
                                                <th>Joining Date</th>
                                                <th>Phone</th>
                                                <th>Company Name</th>
                                                <th>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{id}</td>
                                                <td>{email}</td>
                                                <td>{cnic}</td>
                                                <td>{joining}</td>
                                                <td>{phone}</td>
                                                <td>{Company.name}</td>
                                                <td>{address}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col xs="12" lg="12">
                                    <Label htmlFor="Projects"><b>Projects</b></Label>
                                    <ProjectDetails {...this.props} projects={Projects}/>
                                </Col>
                            </Row>
                        </FormGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}
export default connect(
    null,
    null
)(Detail);
