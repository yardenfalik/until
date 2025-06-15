import "./DotsView.css"
import {getNumberOfDaysInBetween, getTodaysDate} from "../utils/dateUtils";
import { useEffect, useState } from "react";
import { Details } from "./Details";

type NotesViewProp = {
    startingDate: Date,
    endingDate: Date,
    isActive?: boolean
}

export function DotView({ startingDate, endingDate, isActive }: NotesViewProp) {
    const today = getTodaysDate();

    const [currentStartingDate, setCurrentStartingDate] = useState(startingDate);

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
            setCurrentStartingDate(date);
        } else {
            setClickedDate(today.toDateString());
            setCurrentStartingDate(date);
        }
    }

    useEffect(() => {
        if (!isActive) {
            setCurrentStartingDate(today);
            setClickedDate(today.toDateString());
        }
    }, [isActive]);

    return (
        <>
            <Details startingDate={currentStartingDate} endingDate={endingDate} currentView="dots"></Details>
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