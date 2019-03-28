import React, { Component } from "react";

import News from "./News/News";
import EmployeesCreditPoint from "./EmployeesCreditPoint";

import DashboardGoals from "./Goal/DashboardGoals";

class AdminDashboard extends Component {

    render() {
        return (
            <React.Fragment>
                <DashboardGoals {...this.props} />
                <News {...this.props} />
                <EmployeesCreditPoint {...this.props} />
            </React.Fragment>
        );
    }
}

export default AdminDashboard;