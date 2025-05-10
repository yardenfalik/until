import "./NotesView.css"
import {getNumberOfDaysInBetween, getNumberOfMonthInBetween, getNumberOfWeeksInBetween } from "../utils/dateUtils";

type NotesViewProp = {
    startingDate: Date,
    endingDate: Date,
    isActive?: boolean
}

export function NotesView({ startingDate, endingDate, isActive }: NotesViewProp) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const numberOfDays = getNumberOfDaysInBetween(startingDate, endingDate);
    const daysArray = Array.from({ length: numberOfDays + 1 }, (_, i) => {
        const date = new Date(startingDate);
        date.setDate(date.getDate() + i);
        return date;
    });

    const numberOfMonths = getNumberOfMonthInBetween(startingDate, endingDate);
    const monthsArray = Array.from({ length: numberOfMonths + 1 }, (_, i) => {
        const date = new Date(startingDate);
        date.setMonth(date.getMonth() + i);
        return date;
    });

    const numberOfWeeks = getNumberOfWeeksInBetween(startingDate, endingDate);
    const weeksArray = Array.from({ length: numberOfWeeks + 1 }, (_, i) => {
        const date = new Date(startingDate);
        date.setDate(date.getDate() + i * 7);
        return date;
    });

    return (
        <>
            <div className={`noteView ${isActive ? "active" : ""}`}>
                <h2>Months Left</h2>
                <div className="daysLeft">
                    {[...monthsArray].reverse().map((date, index) => {
                        const isPast = date < today;
                        return (
                            <div
                                key={index}
                                className={`pin ${isPast ? "past" : ""}`}
                                title={date.toDateString()}
                            >
                                📌
                            </div>
                        );
                    })}
                </div>

                <h2>Weeks Left</h2>
                <div className="daysLeft">
                    {[...weeksArray].reverse().map((date, index) => {
                        const isPast = date < today;
                        return (
                            <div
                                key={index}
                                className={`pin ${isPast ? "past" : ""}`}
                                title={date.toDateString()}
                            >
                                📌
                            </div>
                        );
                    })}
                </div>

                <h2>Days Left</h2>
                <div className="daysLeft">
                    {[...daysArray].reverse().map((date, index) => {
                        const isPast = date < today;
                        return (
                            <div
                                key={index}
                                className={`pin ${isPast ? "past" : ""}`}
                                title={date.toDateString()}
                            >
                                📌
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}