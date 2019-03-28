import React, { Component } from "react";

import EmployeeDashboard from "../Components/Employee/Dashboard";
import AdminDashboard from "./AdminDashboard";

class Dashboard extends Component {

    render() {
        const {ability} = this.props;
        if(ability('isEmployee')){
            return <EmployeeDashboard {...this.props}/>
        }

        return <AdminDashboard {...this.props}/>
    }
}

export default Dashboard;