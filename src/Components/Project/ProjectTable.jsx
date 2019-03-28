import React, { Component } from "react";
import { connect } from "react-redux";

import { Table } from "reactstrap";
import * as actions from "../../Store/Actions/ProjectActions";
import EditProject from "./EditProject";

import DeleteModal from "../Common/Modals/DeleteModal";
import ProjectDetails from "./ProjectDetails";


class ProjectTable extends Component {

    renderEditCell = (isHead = true, modal = null) => {
        const { ability } = this.props;
        if (ability('project-update')) {
            return isHead ? <th>Edit</th> : <td className="text-center"><EditProject {...this.props} project={modal} /></td>;
        }
    };

    renderDeleteCell = (isHead = true, model = null) => {
        const { ability } = this.props;
        if (ability('project-delete')) {
            return isHead ? <th>Delete</th> : <td className="text-center"><DeleteModal model="Project" delete={() => this.deleteProject(model.id)} /></td>;
        }
    };


    renderDetailsCell = (isHead = true, modal = null) => {
        const { ability } = this.props;
        return isHead ? <th>Details</th> : <td className="text-center"><ProjectDetails {...this.props} project={modal} /></td>;
    };

    renderBody = () => {

        const { projects } = this.props;

        if (projects.length > 0) {
            return projects.map(m => {

                return (<tr key={m.id}>
                    <td>{m.id}</td>
                    <td>{m.name}</td>
                    {/* <td>{(m.Company) ? m.Company.name : ""}</td> */}
                    <td className="text-center">{m.start_date}</td>
                    <td className="text-center">{m.end_date}</td>
                    <td className="text-center">{m.deadline}</td>
                    <td className="text-center">{m.status}</td>
                    {this.renderDetailsCell(false, m)}
                    {this.renderEditCell(false, m)}
                    {this.renderDeleteCell(false, m)}
                </tr>);
            });
        }
    };

    renderCells = () => {
        return (
            <tr>
                <th>ID</th>
                <th>Name</th>
                {/* <th>Company</th> */}
                <th>Start Date</th>
                <th>Date Completed</th>
                <th>Deadline</th>
                <th>Status</th>
                {this.renderDetailsCell()}
                {this.renderEditCell()}
                {this.renderDeleteCell()}
            </tr>
        );
    };


    deleteProject(id) {

        let { user, deleteProject, dispatch, alertify, errorHandler } = this.props;

        deleteProject(user.accessToken, id).then(res => {

            dispatch({
                type: actions.DELETE_PROJECT,
                payload: id
            });

            alertify.success(res.data.message);

        }).catch(errorHandler);
    }

    render() {

        return (

            <Table responsive bordered striped>
                <thead>
                    {this.renderCells()}
                </thead>
                <tbody>
                    {this.renderBody()}
                </tbody>
            </Table>
        );
    }
}

const mapDispatchToProps = () => {
    return {
        deleteProject: (token, id) => actions.deleteProject(token, id),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ProjectTable);
