import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Clock from "react-live-clock";

// import moment from "moment";

const AdminHeader = (props) => {

    const { user } = props;

    return (
        <React.Fragment>

            <div id="header">
                <h1> </h1>
            </div>

            <div id="user-nav" className="navbar navbar-inverse">
                <ul className="nav">
                    <li className="dropdown" id="menu-time">
                    <Link to=""><i className="icon-time mx-1"></i>
                            <Clock
                                format={'dd MM YY, h:mm:ss A'}
                                style={{color:"white" ,margin: "1px 1px 0 7px"}}
                                ticking={true} 
                                interval={1000}
                                 />
                        </Link>
                    </li>

                    <li className="dropdown" id="profile-messages" >
                        <Link to="" data-toggle="dropdown" data-target="#profile-messages" className="dropdown-toggle">
                            <i className="icon icon-user mx-1"></i>
                            <span className="text"> {user.name}</span><b className="caret"></b>
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/user/profile"><i className="icon-cog"></i> Profile</Link></li>
                            <li className="divider"></li>
                            <li><Link to="/logout"><i className="icon-signout"></i> Log Out</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>

        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        user: state.AuthReducer.user
    };
};


export default connect(
    mapStateToProps,
    null
)(AdminHeader);
