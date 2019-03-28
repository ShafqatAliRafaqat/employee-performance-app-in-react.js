import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/Employee/EmployeeActions";


class Profile extends Component {

    state = {
        isLoading: false,
        updating: false,
    };

    get = () => {

        this.setLoading(true);

        let { user, get, dispatch, alertify, errorHandler } = this.props;

        get(user.accessToken).then(res => {

            dispatch({
                type: actions.GET_EMPLOYEE_Details,
                payload: res.data.data
            });


            // console.log("Data", res.data.data);


        }).catch(errorHandler).finally(() => {
            this.setLoading(false);
        });
    };

    setLoading = v => {
        this.setState({
            isLoading: v
        });
    };

    componentDidMount() {
        this.get();
    }

    render() {

        const { isLoading } = this.state;


        if (isLoading) {
            return <p>Loading....</p>
        }

        const { user } = this.props;
        const { name, email, address, cnic, joining,
            phone, designation, } = user;

        return (
            <div className="main-content-container container-fluid px-4">
                {/* <!-- Page Header --> */}
                <div className="page-header row no-gutters py-4">
                    <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                        <h3 className="page-title">{name} Profile</h3>
                    </div>
                </div>
                {/* <!-- End Page Header -->  */}
                {/* <!-- / Start Main Content --> */}

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card card-small mb-4">
                            <div className="card-header border-bottom">
                                <h6
                                    className="m-0 d-inline-block float-left"
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {name} Account Details
                </h6>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item p-3">
                                    {/* <div className="row">
                    <div className="col"> */}
                                    <div className="form-group  form-row">
                                        {/* <div className="col-md-4 mb-3 mx-auto">
                          </div> */}
                                        {/* <div className="col-md-12"> */}
                                        {/* <div className="row"> */}
                                        <div className="form-group col-md-6">
                                            <label className="pb-1" for="feFirstName">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="feFirstName"
                                                placeholder="First Name"
                                                value={name}
                                                disabled

                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="pb-1" for="feLastName">Designation</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="feLastName"
                                                placeholder="Last Name"
                                                value={designation}
                                                disabled
                                            />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label className="pb-1" for="feNickName">joining Date</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="feNickName"
                                                placeholder="Nick Name"
                                                value={joining}
                                                disabled
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="pb-1" for="feEmailAddress">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="feEmailAddress"
                                                placeholder="Email"
                                                value={email}
                                                disabled
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="pb-1" for="fePhone">Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fePhone"
                                                placeholder="Phone"
                                                value={phone}
                                                disabled
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="pb-1" for="feGender">Cnic Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="feGender"
                                                placeholder="Gender"
                                                value={cnic}
                                                disabled
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label className="pb-1" for="feAddress">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="feAddress"
                                                placeholder="Notification Status"
                                                value={address}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    {/* </div> */}
                                    {/* </div> */}
                                    {/* </div>
                  </div> */}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.EmployeeReducer.profile
    };
};

const mapDispatchToProps = () => {
    return {
        get: token => actions.getProfileDetails(token)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
