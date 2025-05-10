import { getDaysLeft } from "../utils/dateUtils";

type DetailsProp = {
    startingDate: Date,
    endingDate: Date
}

export function Details({ startingDate, endingDate }: DetailsProp) {
    return (
        <div className="details">
            <p><b>Starting Date: </b>{startingDate.toDateString()}</p>
            <p><b>End Date: </b>{endingDate.toDateString()}</p>
            <p>Days Left: {getDaysLeft(endingDate)}</p>
        </div>
    );
}