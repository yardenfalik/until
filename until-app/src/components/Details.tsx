import { getDaysLeftWithStart } from "../utils/dateUtils";

type DetailsProp = {
    startingDate: Date,
    endingDate: Date,
    currentView?: string;
}

export function Details({ startingDate, endingDate, currentView }: DetailsProp) {
    return (
        <div className={`details ${currentView}`}>
            <p className="number">{getDaysLeftWithStart(startingDate, endingDate)}</p>
            <p className="daysLeftText">days left</p>
        </div>
    );
}