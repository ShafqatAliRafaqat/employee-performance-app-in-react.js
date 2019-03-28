import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table,
} from "reactstrap";
import SimplePagination from "../Common/SimplePagination";

import * as actions from "../../Store/Actions/CreditPointActions";

import { getSearchUrlFromState } from '../../util/functions'

import CreateCreditPoints from "./CreateCreditPoints";

import DeleteModal from "../Common/Modals/DeleteModal";
import EditCreditPoints from "./EditCreditPoints";

class CreditPoint extends Component {
    state = {
        user_id: "",
        source: "",
        points: "",
        date: "",
        page: 0,
        totalPages: 0,
        isLoading: true
    };
    get = (search) => {

        this.setState({
            isLoading: true
        });

        let { get, dispatch, user, errorHandler } = this.props;

        get(user.accessToken, search).then(res => {

            this.setState({
                page: res.data.meta.current_page,
                totalPages: res.data.meta.last_page,
                user: res.data.meta.user
            });

            dispatch({
                type: actions.GET_CREDIT_POINT,
                payload: res.data.data
            });

        }).catch(errorHandler).finally(() => {
            this.setState({
                isLoading: false
            });
        });
    };
    componentDidMount() {

        let search = this.props.location.search;
        const params = qs.parse(search);
        for (let key in params) {
            this.setState({
                [key]: params[key]
            });
        }

        this.get(search);
    }
    next = () => {
        let next = this.state.page + 1;
        if (next <= this.state.totalPages) {
            let search = getSearchUrlFromState(this.state);
            this.get(search + "page=" + next);
        }
    };

    previous = () => {
        let previous = this.state.page - 1;
        if (previous > 0) {
            let search = getSearchUrlFromState(this.state);
            this.get(search + "page=" + previous);
        }
    };

    renderEditCell = (isHead = true, modal = null) => {

        const { ability } = this.props;
        if (ability('creditPoint-update')) {
            return isHead ? <th>Edit</th> : <td className="text-center"><EditCreditPoints {...this.props} points={modal} /></td>;
        }
    };

    renderDeleteCell = (isHead = true, model = null) => {
        const { ability } = this.props;
        if (ability('creditPoint-delete')) {
            return isHead ? <th>Delete</th> : <td className="text-center"><DeleteModal model="Credit Point" delete={() => this.deleteCreditPoint(model.id)} /></td>;
        }
    };

    renderCells = () => {
        return (
            <tr>
                <th>ID</th>
                <th>Points</th>
                <th>Source</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        );
    };
    renderBody = () => {
        if (this.state.isLoading) {
            return;
        }
        const { creditpoint } = this.props;
        if (!creditpoint) {
            return;
        }
        return creditpoint.map(m => {

            return (
                <tr key={m.id}>
                    <td className="text-center">{m.id}</td>
                    <td className="text-center">{m.points}</td>
                    <td>{m.sources}</td>
                    <td className="text-center">{m.created_at}</td>
                    {this.renderEditCell(false, m)}
                    {this.renderDeleteCell(false, m)}
                </tr>
            );
        });
    };
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };


    filter = () => {
        let search = getSearchUrlFromState(this.state);
        this.get(search);
    };

    deleteCreditPoint(id) {

        let { user, deleteCreditPoint, dispatch, alertify } = this.props;

        deleteCreditPoint(user.accessToken, id).then(res => {

            dispatch({
                type: actions.DELETE_CREDIT_POINT,
                payload: id
            });

            alertify.success(res.data.message);

        }).catch(({ response }) => {
            alertify.alert('Error ' + response.status + ' - ' + response.statusText, response.data.message);
        });
    }
    render() {
        let { page, totalPages, user_id } = this.state;
        return (

            <div className="animated fadeIn">

                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md="3">
                                        <i className="fa fa-align-justify" /> Credit Points - Page {page} of {totalPages}
                                    </Col>

                                    <Col md="6">

                                    </Col>

                                    <Col md="3">
                                        <CreateCreditPoints {...this.props} user_id={user_id} />
                                    </Col>
                                </Row>

                            </CardHeader>
                            <CardBody>
                                <Table responsive bordered striped>
                                    <thead>
                                        {this.renderCells()}
                                    </thead>
                                    <tbody>
                                        {this.renderBody()}
                                    </tbody>
                                </Table>
                                <SimplePagination next={this.next} previous={this.previous} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        creditpoint: state.CreditPointReducer.creditpoint,
        metaData: state.MetaDataReducer
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actions.getCreditPoints(token, search),
        deleteCreditPoint: (token, id) => actions.deleteCreditPoints(token, id),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditPoint);
