import React, { Component } from "react";
import News from "../News/News";

import Projects from "../Employee/Project/Projects";
import moment from "moment";
import EmployeesCreditPoint from "../EmployeesCreditPoint";
import GoalsPerWeek from "./Goal/GoalsPerWeek";

class Dashboard extends Component {

    render() {

        const today = moment();
        const start = today.format('YYYY-MM-DD');
        const end = today.format('YYYY-MM-DD');

        return (
            <React.Fragment>
                <Projects {...this.props} />
                <GoalsPerWeek {...this.props} start_date={start} end_date={end} />
                <News {...this.props}></News>
                <EmployeesCreditPoint {...this.props} />
            </React.Fragment>
        );
    }
}

export default Dashboard;