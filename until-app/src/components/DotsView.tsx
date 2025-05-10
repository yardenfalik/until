import "./DotsView.css"
import {getNumberOfDaysInBetween, getTodaysDate} from "../utils/dateUtils";

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

    return (
        <>
            <div className={`dotsContainer ${isActive ? "active" : ""}`}>
            <div className="daysDots">
                {[...daysArray].map((date, index) => {
                    const isPast = date < today;
                    return (
                        <div key={index} className="dotWrapper">
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