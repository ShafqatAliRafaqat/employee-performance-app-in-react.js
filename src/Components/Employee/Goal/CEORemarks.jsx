// import React, { Component } from "react";
// import { connect } from "react-redux";

// import * as actions from "../../../Store/Actions/Employee/GoalActions";

// import {
//     Button,
//     Input
// } from 'reactstrap';


// class CEORemarks extends Component {

//     state = {
//         emp_comment: "",
//         ...this.props.goal,
//         processing: false,
//     };

//     onChange = e => {
//         this.setState({
//             [e.target.name]: (e.target.files) ? e.target.files[0] : e.target.value
//         });
//     };


//     updateEmpComments = () => {

//         this.setState({
//             processing: true
//         });

//         let { user, updateEmpComments, alertify, errorHandler } = this.props;
//         let { emp_comment, id } = this.state;

//         let parms = { emp_comment, id };

//         updateEmpComments(user.accessToken, id, parms).then(res => {

//             this.setState({
//                 isOpen: false,
//             });

//             alertify.success(res.data.message);

//         }).catch(errorHandler).finally(() => {
//             this.setState({
//                 processing: false
//             });
//         });

//     };

//     render() {
// if(this.state.processing){
//     return false;
// }
//         const { ceo_comment, emp_comment, processing } = this.state;


//         return (
//             <React.Fragment>


//                 <label htmlFor="ceo_comment" className="my-2"><strong>CEO/ CTO Comment</strong></label>
//                 <Input type="textarea" style={{ minHeight: 150 }} name="ceo_comment" value={ceo_comment} onChange={this.onChange} disabled />
//                 <label htmlFor="emp_comment" className="my-2 mt-3"><strong>Employee Comment</strong></label>
//                 <Input type="textarea" style={{ minHeight: 150 }} name="emp_comment" value={emp_comment} onChange={this.onChange} />

//                 <Button color="primary" onClick={this.updateEmpComments}>{(processing) ? "Updating..." : "Update"}</Button>{' '}

//             </React.Fragment>
//         );
//     }

// }

// const mapDispatchToProps = () => {
//     return {
//         updateEmpComments: (token, id, params) => actions.updateEmpComments(token, id, params),
//     };
// };

// export default connect(
//     null,
//     mapDispatchToProps
// )(CEORemarks);