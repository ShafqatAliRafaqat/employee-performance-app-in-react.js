import React, { Component } from "react";
import GoalsPerWeek from "./GoalsPerWeek";
import GoalsCalander from "./GoalsCalander";

class Goals extends Component {

    state = {
        user_id: "",
        goalsString: "Goals",
        page: 0,
        totalPages: 0,
        isLoading: true
    };

    render() {

        return (

            <div className="animated fadeIn">
                <GoalsPerWeek {...this.props} />
                <GoalsCalander {...this.props} />
            </div>
        );
    }
}

export default Goals;
