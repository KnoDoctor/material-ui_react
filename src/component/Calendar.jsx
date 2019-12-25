import React from "react";
import {
    getDaysInMonth,
    isSameDay,
    addMonths,
    subMonths,
    format,
    startOfWeek,
    addDays,
    startOfMonth,
    endOfMonth,
    endOfWeek,
    isSameMonth
} from "date-fns";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export default class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        bookedDates: []
    };

    generateRandomBooking = () => {
        const { currentMonth } = this.state;
        const daysInMonth = getDaysInMonth(currentMonth);
        const randomDaysToGenerate = Math.floor(
            Math.random() * daysInMonth + 1
        );

        let bookedDates = [];
        for (let i = 0; i < randomDaysToGenerate; i++) {
            const randomDay = Math.floor(Math.random() * daysInMonth + 1);

            bookedDates.push(
                new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    randomDay
                )
            );
        }

        this.setState(() => ({ bookedDates }));
    };

    isBooked = date => {
        const { bookedDates } = this.state;

        return bookedDates.some(bookedDate => isSameDay(date, bookedDate));
    };

    nextMonth = () => {
        this.setState(() => ({
            currentMonth: addMonths(this.state.currentMonth, 1)
        }));
    };

    prevMonth = () => {
        this.setState(() => ({
            currentMonth: subMonths(this.state.currentMonth, 1)
        }));
    };

    renderButton = () => {
        return (
            <div className="col-center">
                <button onClick={this.generateRandomBooking}>
                    Generate booking
                </button>
            </div>
        );
    };

    renderHeader = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>{format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    };

    renderDays = () => {
        const dayList = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dayList[i]}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    };

    renderCells = () => {
        const { currentMonth } = this.state;
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <Link to="/" key={i}>
                        <div
                            className={`col cell ${
                                !isSameMonth(day, monthStart)
                                    ? "disabled"
                                    : this.isBooked(day)
                                    ? "selected"
                                    : ""
                            }`}
                            key={day}
                        >
                            <span className="number">{formattedDate}</span>
                            <span className="bg">{formattedDate}</span>
                        </div>
                    </Link>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }

        return (
            <div className="body" style={{}}>
                {rows}
            </div>
        );
    };

    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
                {this.renderButton()}
            </div>
        );
    }
}
