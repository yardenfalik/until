import "./DotsView.css"
import {getNumberOfDaysInBetween, getTodaysDate} from "../utils/dateUtils";
import { useState } from "react";

type NotesViewProp = {
    startingDate: Date,
    endingDate: Date,
    isActive?: boolean
}

export function DotView({ startingDate, endingDate, isActive }: NotesViewProp) {
    const today = getTodaysDate();

    const numberOfDays = getNumberOfDaysInBetween(startingDate, endingDate);
    const daysArray = Array.from({ length: numberOfDays + 1 }, (_, i) => {
        const date = new Date(startingDate);
        date.setDate(date.getDate() + i);
        return date;
    });

    const [clickedDate, setClickedDate] = useState<string>();
    function handleClick(date: Date) {
        const dateStr = date.toDateString();
        if (date > today) {
            setClickedDate(dateStr);
        } else {
            setClickedDate(today.toDateString());
        }
    }

    return (
        <>
            <div className={`dotsContainer ${isActive ? "active" : ""}`}>
            <div className="daysDots">
                {[...daysArray].map((date, index) => {
                    const isPast = date < today || date < new Date(clickedDate || "") || date.toDateString() === clickedDate;
                    return (
                        <div key={index} className="dotWrapper" onClick={() => handleClick(date)}>
                            <div className={"dotTooltip"}>
                                {date.toDateString()}
                            </div>
                            <div className={`dot ${isPast ? "" : "past"}`}></div>
                        </div>
                    );
                })}
            </div>

            </div>
        </>
    )
}