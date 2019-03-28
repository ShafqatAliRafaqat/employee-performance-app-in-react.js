import React, { Component } from "react";
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

class Calender extends Component {

    state = {
        ...this.props,
        start_date: "",
        end_date: "",
        user_id: "",
        goalsString: "Goals",
        page: 0,
        totalPages: 0,
        isLoading: true
    };
    eventStyleGetter = (event, start, end, isSelected) => {

        var backgroundColor = event.color;
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }

    getColorFromStatus = (g) => {
        const { status } = g;
        if (!status) {
            return;
        }
        const { goals_color } = this.props;
        if (!goals_color) {
            return;
        }
        return goals_color[status];
    }

    renderCalender = () => {
        const localizer = BigCalendar.momentLocalizer(moment)

        const { calanderGoals: goals } = this.props;
        // const { goals } = this.props;

        if (!goals) {
            return;
        }
        return (

            <BigCalendar
                events={goals.map(g => ({
                    title: g.description,
                    start: g.start_date,
                    end: g.end_date,
                    allDay: true,
                    startAccessor: g.start_date,
                    endAccessor: g.end_date,
                    color: this.getColorFromStatus(g)
                }))}
                views={{
                    month: true,
                    week: true,
                    work_week: true,
                    day: true,
                    agenda: true,
                }}
                drilldownView="month"
                step={60}
                eventPropGetter={(this.eventStyleGetter)}
                showMultiDayTimes
                defaultDate={new Date()}
                localizer={localizer}

            />

        );
    };
    renderGoalsCounter = () => {
        let { Total_Goals, goals_complated, goals_ongoing,
            goals_earlydone, goals_late, credit_point } = this.props;
        return (
            <div class="container-fluid">
                {this.renderCalender()}

                <h3 className="pt-3 pb-2"> Previous Goals Of Employee </h3>
                <div className="row-fluid">
                    <div className="col-md-2 counter mb-2 pt-3 text-center">
                        <h6>Total Goals</h6>
                        <p>{Total_Goals}</p>
                    </div>
                    <div className="col-md-2 counter mb-2 pt-3 text-center">
                        <h6>Completed Goals</h6>
                        <p>{goals_complated}</p>
                    </div>
                    <div className="col-md-2 counter mb-2 pt-3 text-center">
                        <h6>Incompleted Goals</h6>
                        <p>{goals_ongoing}</p>
                    </div>
                    <div className="col-md-2 counter mb-2 pt-3 text-center">
                        <h6>Late Done Goals</h6>
                        <p>{goals_late}</p>
                    </div>
                    <div className="col-md-2 counter mb-2 pt-3 text-center">
                        <h6>Early Done Goals</h6>
                        <p>{goals_earlydone}</p>
                    </div>
                    <div className="col-md-2 counter mb-2 pt-3 text-center">
                        <h6>Credit Points</h6>
                        <p>{credit_point}</p>
                    </div>
                </div>
            </div>

        );
    };
    render() {

        return (

            <div>
                {this.renderGoalsCounter()}
            </div>
        );
    }
}

export default Calender;
